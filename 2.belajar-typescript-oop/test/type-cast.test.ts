describe("polymorphism", () => {
  class Employee {
    constructor(public name: string) {}
  }

  class Manager extends Employee {}

  class VicePresident extends Manager {}

  function sayHello(employee: Employee): void {
    if (employee instanceof VicePresident) {
      const vp = employee as VicePresident;
      console.info(`Hello VP ${vp.name}`);
    } else if (employee instanceof Manager) {
      const manager = employee as Manager;
      console.info(`Hello Manager ${manager.name}`);
    } else {
      console.info(`Hello Employee ${employee.name}`);
    }
  }

  it("should support method parameters polymorphism", () => {
    sayHello(new Employee("Budi"));
    sayHello(new Manager("Budi"));
    sayHello(new VicePresident("Budi"));
  });
});
