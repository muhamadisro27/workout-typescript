describe("Data Type", (): void => {
  it("union", (): void => {
    function process(value: string | number | boolean) {
      if (typeof value === "string") {
        return value.toLocaleUpperCase();
      } else if (typeof value === "number") {
        return value + 1;
      } else {
        return !value;
      }
    }
    expect(process("roozy")).toBe("ROOZY");
    expect(process(5)).toBe(6);
    expect(process(true)).toBeFalsy();
  });
});
