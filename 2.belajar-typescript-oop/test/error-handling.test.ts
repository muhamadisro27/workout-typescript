describe("error handling", () => {
  class ValidationError extends Error {
    constructor(public message: string) {
      super(message);
    }
  }

  it("should support error handling", () => {
    function doubleIt(value: number): number {
      if (value < 0) {
        throw new ValidationError("Internal Server Error");
      } else {
        return value * 2;
      }
    }

    try {
      const result = doubleIt(-500);
      console.info(result);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.info(error.message);
      }
    }
  });
});
