describe("abstract", () => {
  class Configuration {
    static NAME: string = "Belajar Typescript OOP";
    static VERSION: number = 1.0;
    static AUTHOR: string = "Muhamad Isro";
  }

  class MathUtil {
    static sum(...args: number[]): number {
      let total: number = 0;
      for (let value of args) {
        total += value;
      }

      return total;
    }
  }

  it("should support static class", () => {
    console.info(Configuration.NAME);
    console.info(Configuration.VERSION);
    console.info(Configuration.AUTHOR);

    console.info(MathUtil.sum(1, 2, 3, 4, 5, 6, 7, 8, 9));
  });
});
