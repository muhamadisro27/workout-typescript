describe("gettersetter", () => {
  class Category {
    _name?: string;

    get name(): string {
      if (this._name) {
        return this._name;
      } else {
        return "Empty";
      }
    }

    set name(value: string) {
      if (value !== "") {
        this._name = value;
      }
    }
  }

  it("should return getter setter", () => {
    const category = new Category();

    console.info(category.name);
  });
});
