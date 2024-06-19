import { Category, Product } from "../src/type-alias";

describe("Data Type", (): void => {
  it("alias", (): void => {
    const category: Category = {
      id: 1,
      name: "HP",
    };

    const product: Product[] = [
      {
        id: 1,
        name: "Samsung S24",
        price: 4000000,
        category,
      },
      {
        id: 2,
        name: "Samsung S54",
        price: 8000000,
        category,
        description: "Mahal",
      },
    ];

    console.info(product);
  });
});
