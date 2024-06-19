describe("Data Type", (): void => {
  it("should return by func params", (): void => {
    function sayHello(value: string, filter: (name: string) => string): string {
      return `Hello ${filter(value)}`;
    }

    expect(sayHello("isro", (name: string): string => name.toUpperCase())).toBe(
      "Hello ISRO"
    );
  });
});
