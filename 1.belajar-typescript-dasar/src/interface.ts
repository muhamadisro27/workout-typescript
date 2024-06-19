export interface Seller {
  id: number;
  name: string;
  address?: string;
  readonly nib: string;
  readonly npwp: string;
}

export interface SumFunc {
  (value1: number, value2: number): number;
}

export interface StringArray {
  [index: number]: string;
}

export interface StringDictionary {
  [key: string]: string;
}

export interface Employee {
  id: string | number;
  name: string;
  division: string;
}

export interface Manager extends Employee {
  numberOfEmployees: number;
}

export interface Payment extends Employee {
  name: string;
  discount(amount: number): number;
}

export interface HasName {
  name: string;
}

export interface HasId {
  id: string;
}

export type Domain = HasId & HasName;

export interface Person {
  name: string;
  age: number;
}
