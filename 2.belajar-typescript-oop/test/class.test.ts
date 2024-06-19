describe("Test", (): void => {
  class Customer {
    constructor() {
      console.info("creating new customers");
    }
  }

  class Order {}

  it("should can create class", (): void => {
    const customer = new Customer();
    const order = new Order();
  });

  it("should can create constructor", (): void => {
    new Customer();
    new Customer();
  });
});
