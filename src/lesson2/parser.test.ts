import {
  parser,
  isUnary,
  parseUnary,
  evaluateUnary,
  parseAndEvaluateUnary,
  removeBracket,
  removeAllBrackets,
} from "./parser";

describe("removeBracketTest", () => {
  it("(2 => 2", () => {
    expect(removeBracket("(2")).toEqual("2");
  });

  it("((2 => (2", () => {
    expect(removeBracket("((2")).toEqual("(2");
  });

  it("2) => 2", () => {
    expect(removeBracket("2)")).toEqual("2");
  });

  it("2)) => 2)", () => {
    expect(removeBracket("2))")).toEqual("2)");
  });

  it("2)) => 2", () => {
    expect(removeAllBrackets("2))")).toEqual("2");
  });

  it("((2 => 2", () => {
    expect(removeAllBrackets("((2")).toEqual("2");
  });
});

describe("Brackets position population", () => {
  it("(2 + 2) * 4", () => {
    expect(parser("(2 + 2) * 4")).toEqual([
      [2, "+", 2, "*", 4],
      [{ start: 0, end: 2 }],
    ]);
  });
});

describe("Parser correct cases", () => {
  it("1 + 32", () => {
    expect(parser("1 + 32")).toEqual([[1, "+", 32], []]);
  });

  it("11 + 3 * 22", () => {
    expect(parser("11 + 3 * 22")).toEqual([[11, "+", 3, "*", 22], []]);
  });

  it("1 + 32 - 2 + 2", () => {
    expect(parser("1 + 32 - 2 + 2")).toEqual([
      [1, "+", 32, "-", 2, "+", 2],
      [],
    ]);
  });

  it("3 * ((2 + 7) / ((3 + 1) * 2))", () => {
    expect(parser("3 * ((2 + 7) / ((3 + 1) * 2))")).toEqual([
      [3, "*", 2, "+", 7, "/", 3, "+", 1, "*", 2],
      [
        { start: 2, end: 10 },
        { start: 2, end: 4 },
        { start: 6, end: 10 },
        { start: 6, end: 8 },
      ],
    ]);
  });
});

describe("Parser invalid cases", () => {
  it("1 + + 33 - 2", () => {
    expect(() => parser("1 + + 33 - 2")).toThrow(
      TypeError("Unexpected string")
    );
  });

  it("1 ! 33 - 2", () => {
    expect(() => parser("1 ! 33 - 2")).toThrow(TypeError("Unexpected string"));
  });
});

describe("isUnary tests", () => {
  it("isUnary('2!')", () => {
    expect(isUnary("2!")).toEqual(true);
  });

  it("isUnary('4**')", () => {
    expect(isUnary("4**")).toEqual(true);
  });

  it("isUnary('!2')", () => {
    expect(isUnary("!2")).toEqual(false);
  });

  it("isUnary('**3')", () => {
    expect(isUnary("**2")).toEqual(false);
  });
});

describe("parseUnary tests", () => {
  it("parseUnary('12!')", () => {
    expect(parseUnary("12!")).toEqual([12, "!"]);
  });

  it("parseUnary('40**')", () => {
    expect(parseUnary("40**")).toEqual([40, "**"]);
  });

  it("parseUnary('2!')", () => {
    expect(parseUnary("2!")).toEqual([2, "!"]);
  });
});

describe("evaluateUnary tests", () => {
  it("evaluateUnary([40, '**'])", () => {
    expect(evaluateUnary([40, "**"])).toEqual(1600);
  });

  it("evaluateUnary([5, '!'])", () => {
    expect(evaluateUnary([5, "!"])).toEqual(120);
  });
});

describe("parseAndEvaluateUnary tests", () => {
  it("parseAndEvaluateUnary('5!')", () => {
    expect(parseAndEvaluateUnary("5!")).toEqual(120);
  });

  it("parseAndEvaluateUnary('3**')", () => {
    expect(parseAndEvaluateUnary("3**")).toEqual(9);
  });
});
