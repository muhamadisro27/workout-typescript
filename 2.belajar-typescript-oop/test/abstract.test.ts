describe("abstract", () => {
  abstract class Customer {
    abstract name: string;

    constructor(public readonly id: number) {}

    hello(): void {
      console.info(`Hello`);
    }

    abstract sayHello(name: string): void;
  }

  class RegulerCustomer extends Customer {
    public name: string;

    constructor(id: number, name: string) {
      super(id);
      this.name = name;
    }

    sayHello(name: string): void {
      console.info(`Hello ${name}, my name is ${this.name}`);
    }
  }

  it("should support abstract class", () => {
    const regulerCustomer = new RegulerCustomer(1, "Roozy");

    regulerCustomer.sayHello("Reza");
  });
});
