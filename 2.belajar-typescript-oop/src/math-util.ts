export namespace MathUtil {
  export const PI: number = 3.14;

  export function sum(...args: number[]): number {
    let total: number = 0;
    for (let value of args) {
      total += value;
    }

    return total;
  }
}
