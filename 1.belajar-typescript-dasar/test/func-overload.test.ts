describe("Data Type", (): void => {
  it("should return by func overload", (): void => {
    function callMe(value: string): string;
    function callMe(value: number): number;

    function callMe(value: any) {
      if (typeof value === "number") {
        return value + 4;
      } else {
        return value.toUpperCase();
      }
    }

    expect(callMe(1)).toBe(5);
    expect(callMe("roozy")).toBe("ROOZY");
  });
});
