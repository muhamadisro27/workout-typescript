describe("polymorphism", () => {
  class Employee {
    constructor(public name: string) {}
  }

  class Manager extends Employee {}

  class VicePresident extends Manager {}

  function sayHello(employee: Employee): void {
    console.info(`Hello ${employee.name}`);
  }

  it("should support polymorphism", () => {
    let employee: Employee = new Employee("Budi");
    console.info(employee);

    employee = new Manager("Eko");
    console.info(employee);
    employee = new VicePresident("Reza");
    console.info(employee);
  });

  it("should support method parameters polymorphism", () => {
    sayHello(new Employee("Budi"));
    sayHello(new Manager("Budi"));
    sayHello(new VicePresident("Budi"));
  });
});
