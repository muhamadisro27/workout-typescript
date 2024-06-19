import { sayHello } from "../src/say-hello";

describe("sayHello", (): void => {
  it("should return hello isro", (): void => {
    expect(sayHello("Isro")).toBe("Hello Isro");
  });
});
