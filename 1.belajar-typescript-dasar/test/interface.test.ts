import {
  Employee,
  Manager,
  Payment,
  Person,
  Seller,
  StringArray,
  StringDictionary,
  SumFunc,
} from "../src/interface";

describe("Data Type", (): void => {
  it("interface", (): void => {
    const seller1: Seller = {
      id: 1,
      name: "John",
      address: "123 Main St",
      nib: "123123123",
      npwp: "123123123",
    };

    console.info(seller1);
  });

  it("interface func", (): void => {
    const add: SumFunc = (value1, value2) => {
      return value1 + value2;
    };

    expect(add(40, 20)).toBe(60);
  });

  it("support indexable interface", (): void => {
    const names: StringArray = ["a", "b", "c", "d", "e"];

    const dictionary: StringDictionary = {
      id: "Isro",
      name: "Isro",
    };

    console.info(names);
  });

  it("extending interface", (): void => {
    const employee1: Manager = {
      id: 1,
      name: "Muhamad Isro",
      division: "Marketing",
      numberOfEmployees: 10,
    };
    const employee2: Employee = {
      id: 1,
      name: "Muhamad Isro",
      division: "IT",
    };

    console.info(employee1);
    console.info(employee2);
  });

  it("should support function in interface", (): void => {
    const paymentEmployee: Payment = {
      id: 1,
      name: "Muhamad Isro",
      division: "IT",
      discount: function (amount: number): number {
        return (amount * 40) / 100;
      },
    };

    console.info(paymentEmployee.discount(10000000));
  });

  it("intersects type", function (): void {
    type Employee = {
      employeeId: number;
      role: string;
    };

    type EmployeeDetails = Person & Employee;

    const employee: EmployeeDetails = {
      name: "John Doe",
      age: 30,
      employeeId: 1,
      role: "Developer",
    };

    console.info(employee);
  });

  it("type assertions", (): void => {
    const person: any = {
      name: "John Doe",
      age: 30,
    };

    const person2: Person = person as Person;

    console.info(person2);
  });

  it("rest parameters", (): void => {
    function sum(...values: number[]): number {
      let total: number = 0;
      for (const value of values) {
        total += value;
      }

      return total;
    }

    expect(sum(1, 2, 3, 4, 5)).toBe(15);
  });
});
