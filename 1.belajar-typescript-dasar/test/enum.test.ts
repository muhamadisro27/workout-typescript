import { Customer, CustomerType } from "../src/type-alias";

describe("Data Type", (): void => {
  it("enum", (): void => {
    const customer1: Customer = {
      id: 1,
      name: "Muhamad Isro",
      type: CustomerType.GOLD,
    };

    console.info(customer1);
  });
});
