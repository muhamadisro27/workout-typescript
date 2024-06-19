describe("relationship class", () => {
  class Person {
    constructor(public name: string) {}
  }

  class Customer {
    constructor(public name: string) {}
  }

  it("should support class relationships", () => {
    const person: Person = new Customer("Reza");

    console.info(person);
  });
});
