describe("gettersetter", () => {
  interface HashName {
    name: string;
  }

  interface canSayHello {
    sayHello(name: string): void;
  }

  class Employee implements HashName {
    name: string;

    constructor(name: string) {
      this.name = name;
    }

    sayHello(name: string): void {
      console.info(`Hello ${name}`);
    }
  }

  class Manager extends Employee implements canSayHello {
    _department: string;

    constructor(name: string, department: string) {
      super(name);
      this._department = department;
    }
    sayHello(name: string): void {
      super.sayHello(name);
      console.info(`And, I am your manager`);
    }

    get department() {
      if (this._department) {
        return this._department;
      } else {
        return "Empty";
      }
    }

    set department(value: string) {
      if (value !== "") {
        this._department = value;
      }
    }
  }

  it("should return getter setter", () => {
    const employee = new Employee("Isro");
    const manager = new Manager("Roozy Manager", "Human Resource");
    employee.sayHello(employee.name);
    manager.sayHello(manager.name);
    console.info(manager.department);
  });
});
