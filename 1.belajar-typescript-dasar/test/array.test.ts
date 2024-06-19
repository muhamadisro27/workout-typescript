describe("Data Type", (): void => {
  it("array", (): void => {
    const names: string[] = ["Muhamad Isro", "Sabanur"];
    const values: number[] = [1, 2, 3];

    console.info(names);
    console.info(values);
  });

  it("readonly", (): void => {
    const hobbies: ReadonlyArray<string> = ["Membaca", "Menulis"];

    console.info(hobbies);
  });

  it("readonly with tuple", (): void => {
    const person : readonly [string, string, number] = ["John", "Alex", 40]

    console.info(person)
  })
});
