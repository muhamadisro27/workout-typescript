describe("Data Type", (): void => {
  it("null or undefined", (): void => {
    function sayHello(name?: string | null): string {
      if (name) {
        return `Hello ${name}`;
      } else {
        return `Hello`;
      }
    }
    console.info(sayHello("Isro"));
    const name: string | undefined = undefined;
    console.info(sayHello(name));
    console.info(sayHello(null));
  });
});
