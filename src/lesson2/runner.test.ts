import { runner } from "./runner";

describe("Runner simple cases", () => {
  it("1 * 32", () => {
    expect(runner("1 * 32")).toEqual(32);
  });

  it("2 * 32", () => {
    expect(runner("2 * 32")).toEqual(64);
  });

  it("2 + 32", () => {
    expect(runner("2 + 32")).toEqual(34);
  });
});

describe("Runner tripled/mixed cases", () => {
  it("2 * 2 * 3", () => {
    expect(runner("2 * 2 * 3")).toEqual(12);
  });

  it("2 * 2 + 3", () => {
    expect(runner("2 * 2 + 3")).toEqual(7);
  });

  it("2 + 2 * 3", () => {
    expect(runner("2 + 2 * 3")).toEqual(8);
  });
});

describe("Runner long cases", () => {
  it("20 + 1 * 10 - 5 * 3", () => {
    expect(runner("20 + 1 * 10 - 5 * 3")).toEqual(15);
  });

  it("20 - 10 * 10 / 5 - 3", () => {
    expect(runner("20 - 10 * 10 / 5 - 3")).toEqual(-3);
  });

  it("18 + 3 * 2 ^ 3 / 12 - 6", () => {
    expect(runner("18 + 3 * 2 ^ 3 / 12 - 6")).toEqual(14);
  });
});

describe("Runner long cases with ! and **", () => {
  it("20 + 1 * 10 - 5 * 3 / 3! + 4**", () => {
    expect(runner("20 + 1 * 10 - 5 * 3 / 3! + 4**")).toEqual(43.5);
  });

  it("5 * 4! + 21 - 5** + 8", () => {
    expect(runner("5 * 4! + 21 - 5** + 8")).toEqual(124);
  });
});

describe("Runner long cases with brackets", () => {
  it("((1 + 3) * 4) * (2 + (1 - 3) * 2)", () => {
    expect(runner("((1 + 3) * 4) * (2 + (1 - 3) * 2)")).toEqual(-32);
  });

  it("3 * ((2 + 7) / ((3 + 1) * 2))", () => {
    expect(runner("3 * ((2 + 7) / ((3 + 1) * 2))")).toEqual(3.375);
  });
});
