import supertest from "supertest";
import { logger } from "../src/app/logging";
import { web } from "../src/app/web";
import { UtilTesting } from "./util-test";
import bcrypt from "bcrypt";

describe("POST /api/users", (): void => {
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

describe("POST /api/users/login", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeAllUser();
  });

  it("should reject if request is invalid", async (): Promise<void> => {
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

  it("should reject if password user is not match", async (): Promise<void> => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      name: "test user",
      password: "rahasia1",
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if user is not found", async (): Promise<void> => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test1",
      name: "test user",
      password: "rahasia",
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeAllUser();
  });

  it("should return success get current user", async (): Promise<void> => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
  });

  it("should reject get user if token is invalid", async (): Promise<void> => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "test1");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeAllUser();
  });

  it("should reject update current user if request is invalid", async (): Promise<void> => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        name: "",
        password: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject update current user if token is invalid", async (): Promise<void> => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "salah")
      .send({
        name: "Roozy Updated",
        password: "rahasia updated",
      });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should return success update current user", async (): Promise<void> => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        name: "Roozy Updated",
        password: "rahasia updated",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe("Roozy Updated");
    const getUser = await UtilTesting.getCurrentUser();

    expect(
      await bcrypt.compare("rahasia updated", getUser.password)
    ).toBeTruthy();
  });
});

describe("DELETE /api/users/current", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeAllUser();
  });

  it("should successfully logout", async (): Promise<void> => {
    const result = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    const user = await UtilTesting.getCurrentUser();

    expect(user.token).toBeNull();
  });

  it("should reject logout user if token is invalid", async (): Promise<void> => {
    const result = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "test1");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
