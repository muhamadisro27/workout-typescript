import supertest from "supertest";
import { logger } from "../src/app/logging";
import { web } from "../src/app/web";
import { UtilTesting } from "./util-test";

describe("/POST /api/users", (): void => {
  afterEach(async () => {
    await UtilTesting.removeAllUser();
  });

  it("should reject users if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      name: "",
      password: "",
    });

    logger.error(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should success create new user", async () => {
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
