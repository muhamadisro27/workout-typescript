describe("visibility", (): void => {
  class Counter {
    protected _counter: number = 0;

    public increment(): void {
      this._counter++;
    }

    public getCounter(): number {
      return this._counter;
    }
  }

  class DoubleCounter extends Counter {
    public increment(): void {
      this._counter += 2;
    }
  }

  class Person {
    constructor(public name: string) {}
  }

  it("should return params", (): void => {
    const person = new Person("Hello");

    console.info(person.name);
  });

  it("should increment", (): void => {
    const counter = new Counter();

    counter.increment();
    counter.increment();
    counter.increment();
    console.info(counter.getCounter());

    const double = new DoubleCounter();

    double.increment();
    console.info(double.getCounter());
  });
});
