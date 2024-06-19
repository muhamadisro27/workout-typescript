describe("Data Type", (): void => {
  it("should must declare", (): void => {
    let name: string = "Muhamad Isro";
    let balance: number = 1000000;
    let isVip: boolean = true;

    name = "Roozy";
    balance = 500000;
    isVip = false;

    console.info(name, balance, isVip);
  });

  it("array", (): void => {
    const names: string[] = ["Muhamad Isro", "Sabanur"];
    const values: number[] = [1, 2, 3];

    console.info(names)
    console.info(values)
  });
});
