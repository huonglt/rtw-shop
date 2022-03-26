import { validateQty } from "../index";

describe("util module", () => {
  it('validateQty method', () => {
    expect(validateQty()).toEqual(false);
    expect(validateQty(-1)).toEqual(false);
    expect(validateQty("2")).toEqual(true);
    expect(validateQty(20)).toEqual(true);
    expect(validateQty(2100)).toEqual(false);
    expect(validateQty(1)).toEqual(true);
    expect(validateQty("abc")).toEqual(false);
    expect(validateQty("1a")).toEqual(false);
  });
});