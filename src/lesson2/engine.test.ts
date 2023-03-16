import { topPrioritiesCalc, lowestPriorityCalc } from "./engine";

describe("topPrioritiesCalc simple cases", () => {
  it("[1, *, 32]", () => {
    expect(topPrioritiesCalc([1, "*", 32], 2)).toEqual([32]);
  });

  it("[32, /, 32]", () => {
    expect(topPrioritiesCalc([32, "/", 32], 2)).toEqual([1]);
  });

  it("[32, +, 32]", () => {
    expect(topPrioritiesCalc([32, "+", 32], 2)).toEqual([32, "+", 32]);
  });
});

describe("topPrioritiesCalc mixed with second priorities cases", () => {
  it("[32, /, 32, +, 10, *, 10]", () => {
    expect(topPrioritiesCalc([32, "/", 32, "+", 10, "*", 10], 2)).toEqual([
      1,
      "+",
      100,
    ]);
  });
});

describe("lowestPriorityCalc invalid cases", () => {
  it("[32, / 32]", () => {
    expect(() => lowestPriorityCalc([32, "/", 32], 3)).toThrow(
      TypeError("Unexpected stack!")
    );
  });
});

describe("lowestPriorityCalc simple cases", () => {
  it("[32, + 32]", () => {
    expect(lowestPriorityCalc([32, "+", 32], 3)).toEqual(64);
  });

  it("[32, - 32]", () => {
    expect(lowestPriorityCalc([32, "-", 32], 3)).toEqual(0);
  });

  it("[32, - 32, +, 10]", () => {
    expect(lowestPriorityCalc([32, "-", 32, "+", 10], 3)).toEqual(10);
  });
});
