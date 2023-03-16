function makeRangeArray(start = 0, end = 100): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

export type BinaryOperationType = (first: number, second: number) => number;
export type UnaryOperationType = (first: number) => number;

export const mul: BinaryOperationType = (
  first: number,
  second: number
): number => first * second;

export const div: BinaryOperationType = (
  first: number,
  second: number
): number => first / second;

export const add: BinaryOperationType = (
  first: number,
  second: number
): number => first + second;

export const minus: BinaryOperationType = (
  first: number,
  second: number
): number => first - second;

export const power: BinaryOperationType = (
  first: number,
  second: number
): number => Math.pow(first, second);

export const sqr: UnaryOperationType = (first: number): number =>
  power(first, 2);

export const factorial: UnaryOperationType = (first: number): number => {
  return first == 0
    ? 1
    : makeRangeArray(1, first).reduce(
        (result, curValue) => curValue * result,
        1
      );
};

export const unaryMathOperators: { [key: string]: UnaryOperationType } = {
  "**": sqr,
  "!": factorial,
};

export const mathOperators: { [key: string]: BinaryOperationType } = {
  "*": mul,
  "/": div,
  "+": add,
  "-": minus,
  "^": power,
};

export const mathPriorities: number[] = [1, 2, 3];

const [FIRST, SECOND, THIRD] = mathPriorities;

export const mathOperatorsPriorities: { [key: string]: number } = {
  "^": FIRST,
  "*": SECOND,
  "/": SECOND,
  "+": THIRD,
  "-": THIRD,
};
