import supertest from "supertest";
import { logger } from "../src/app/logging";
import { web } from "../src/app/web";
import { UtilTesting } from "./util-test";

describe("/POST /api/users", (): void => {
  afterEach(async (): Promise<void> => {
    await UtilTesting.removeAllUser();
  });

  it("should reject users if request is invalid", async (): Promise<void> => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      name: "",
      password: "",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should success create new user", async (): Promise<void> => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      name: "test user",
      password: "rahasia",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test user");
  });
});

describe("/POST /api/users/login", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeAllUser();
  });

  it("should reject users if request is invalid", async (): Promise<void> => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "",
      name: "",
      password: "",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should success login", async (): Promise<void> => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      name: "test user",
      password: "rahasia",
    });

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.token).toBeDefined();
  });

  describe("")
});
