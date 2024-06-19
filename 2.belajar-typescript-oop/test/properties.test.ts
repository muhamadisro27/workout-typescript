describe("Test", (): void => {
  class Customer {
    readonly id: number;
    name: string = "Guest";
    age?: number;

    constructor(id: number, name: string, age?: number) {
      this.id = id;
      this.name = name;
      this.age = age;
    }

    sumAll = (value1: number, value2: number): number => {
      return value1 + value2;
    };
    
  }

  class Order {}

  it("should can create class", (): void => {
    const customer = new Customer(1, "Roozy");
    const order = new Order();
  });

  it("should can create constructor", (): void => {
    const customer1 = new Customer(1, "Maya");
    const customer2 = new Customer(2, "Laza");
    customer2.age = 40;
  });

  it("should can return methods", () : void => {
    const customer1 = new Customer(1, "Roozy");

    console.info(customer1.sumAll(1,4));
  })


});
