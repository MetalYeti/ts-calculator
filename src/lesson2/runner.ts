import { parser, BracketsPositions } from "./parser";

import { priorityChainExecutor } from "./engine";

const recalculateBracketPositions = (
  brackets: BracketsPositions,
  bracket: { start: number; end: number }
): BracketsPositions => {
  for (const b of brackets) {
    if (bracket.start >= b.start && bracket.end <= b.end) {
      b.end -= bracket.end - bracket.start;
    }
  }
  return brackets;
};

export const runner = (line: string): number => {
  const parsed = parser(line);
  let stack;
  let brackets;

  if (parsed) {
    stack = parsed[0];
    brackets = parsed[1];
  }

  if (!stack) {
    throw new TypeError("Unexpected string");
  }

  if (brackets && brackets.length > 0) {
    while (brackets.length > 0) {
      const bracket = brackets.pop();

      if (bracket) {
        const bracketStack = stack.slice(bracket.start, bracket.end + 1);
        const bracketValue = priorityChainExecutor(bracketStack);
        stack.splice(
          bracket.start,
          1 + bracket.end - bracket.start,
          bracketValue
        );
        brackets = recalculateBracketPositions(brackets, bracket);
      }
    }
  }

  return priorityChainExecutor(stack);
};
