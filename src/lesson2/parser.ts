import { isNumber } from "./helpers";
import { mathOperators, unaryMathOperators } from "./mathOperators";

const BRACKETS = "()";

const hasBracket = (item: string): boolean => {
  for (const bracket of BRACKETS) {
    if (item.includes(bracket)) {
      return true;
    }
  }
  return false;
};

export const removeBracket = (item: string): string => {
  for (const bracket of BRACKETS) {
    item = item.replace(bracket, "");
  }
  return item;
};

export const bracketsCount = (item: string): number => {
  let count = 0;
  for (const c of item) {
    if (c == "(" || c == ")") count++;
  }
  return count;
};

export const removeAllBrackets = (item: string): string => {
  const count = bracketsCount(item);
  for (let i = 0; i < count; i++) {
    item = removeBracket(item);
  }
  return item;
};

export const isUnary = (item: string | number): boolean => {
  const tmpItem = item as string;
  for (const key of Object.keys(unaryMathOperators)) {
    if (item && tmpItem.endsWith(key) && tmpItem.length - key.length > 0) {
      return true;
    }
  }
  return false;
};

export const parseUnary = (item: string): [number, string] => {
  const result: [number, string] = [0, ""];
  for (const key of Object.keys(unaryMathOperators)) {
    if (item.endsWith(key)) {
      result[0] = Number(item.slice(0, item.length - key.length));
      result[1] = item.slice(item.length - key.length);
    }
  }

  return result;
};

export const evaluateUnary = (item: [number, string]): number => {
  return unaryMathOperators[item[1]](item[0]);
};

export const parseAndEvaluateUnary = (item: string): number => {
  return evaluateUnary(parseUnary(item));
};

export type ParsedLineType = (number | string)[];
export type BracketsPositions = { start: number; end: number }[];

const setEndPosition = (
  position: number,
  brackets: BracketsPositions
): BracketsPositions => {
  for (let i = brackets.length - 1; i >= 0; i--) {
    const bracket = brackets[i];
    if (bracket && bracket.end === 0) {
      bracket.end = position;
      break;
    }
  }
  return brackets;
};

export const populateBracketsPositions = (
  item: string,
  position: number,
  brackets: BracketsPositions
): BracketsPositions => {
  for (let i = 0; i < bracketsCount(item); i++) {
    if (item.includes("(")) {
      brackets.push({ start: position, end: 0 });
    } else if (item.includes(")")) {
      brackets = setEndPosition(position, brackets);
    }
  }
  return brackets;
};

export const parser = (
  line: string
): [ParsedLineType, BracketsPositions] | null => {
  const stack = line.split(" ");
  let brackets: BracketsPositions = [];

  const parsedLine = stack.reduce<ParsedLineType>((result, item, key) => {
    const prevItem = result[key - 1];

    if (hasBracket(item)) {
      brackets = populateBracketsPositions(item, key, brackets);
      item = removeAllBrackets(item);
    }

    item = isUnary(item) ? parseAndEvaluateUnary(item).toString() : item;

    const isValidNumberPush = !isNumber(prevItem) && isNumber(item);
    const isValidOperatorPush =
      (isNumber(prevItem) || isUnary(prevItem)) &&
      !isNumber(item) &&
      mathOperators.hasOwnProperty(item);

    if (isValidNumberPush) {
      result.push(Number(item));
    } else if (isValidOperatorPush) {
      result.push(item);
    } else {
      throw new TypeError("Unexpected string");
    }
    return result;
  }, []);

  return [parsedLine, brackets];
};
