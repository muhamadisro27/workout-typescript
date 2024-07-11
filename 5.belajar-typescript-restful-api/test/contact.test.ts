import supertest from "supertest";
import { logger } from "../src/app/logging";
import { web } from "../src/app/web";
import { UtilTesting } from "./util-test";

describe("POST /api/contacts", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeContacts();
    await UtilTesting.removeAllUser();
  });

  it("should success create new contacts", async (): Promise<void> => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        firstName: "Muhamad",
        lastName: "Isro",
        email: "mohammadisro2710@gmail.com",
        phoneNumber: "085157708597",
      });

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBe("Muhamad");
    expect(result.body.data.lastName).toBe("Isro");
    expect(result.body.data.email).toBe("mohammadisro2710@gmail.com");
    expect(result.body.data.phoneNumber).toBe("085157708597");
  });

  it("should reject create new contacts if token is invalid", async (): Promise<void> => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "salah")
      .send({
        firstName: "Muhamad",
        lastName: "Isro",
        email: "mohammadisro2710@gmail.com",
        phoneNumber: "085157708597",
      });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject create new contacts if request is invalid", async (): Promise<void> => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
    await UtilTesting.createOneContact();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeContacts();
    await UtilTesting.removeAllUser();
  });

  it("should success get contact", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const result = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBe("Muhamad");
    expect(result.body.data.lastName).toBe("Isro");
    expect(result.body.data.email).toBe("mohammadisro2710@gmail.com");
    expect(result.body.data.phoneNumber).toBe("085157708597");
  });

  it("should reject get contact", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const result = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
    await UtilTesting.createOneContact();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeContacts();
    await UtilTesting.removeAllUser();
  });

  it("should success update contact", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const result = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        firstName: "Muhamad Edited",
        lastName: "Isro Edited",
        email: "mohammadisro2710edited@gmail.com",
        phoneNumber: "0851577085971",
      });

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.firstName).toBe("Muhamad Edited");
    expect(result.body.data.lastName).toBe("Isro Edited");
    expect(result.body.data.email).toBe("mohammadisro2710edited@gmail.com");
    expect(result.body.data.phoneNumber).toBe("0851577085971");
  });

  it("should reject update contact if contact is not found", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const result = await supertest(web)
      .put(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test")
      .send({
        firstName: "Muhamad Edited",
        lastName: "Isro Edited",
        email: "mohammadisro2710edited@gmail.com",
        phoneNumber: "0851577085971",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject update contact if request is invalid", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const result = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
    await UtilTesting.createOneContact();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeContacts();
    await UtilTesting.removeAllUser();
  });

  it("should success remove contact", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const result = await supertest(web)
      .delete(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data).toBe("OK");
  });

  it("should reject remove contact if contact is not found", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const result = await supertest(web)
      .delete(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
    await UtilTesting.createOneContact();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeContacts();
    await UtilTesting.removeAllUser();
  });

  it("should success get contacts", async (): Promise<void> => {
    const result = await supertest(web)
      .get(`/api/contacts/`)
      .set("X-API-TOKEN", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.length).toBe(1);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(10);
  });

  it("should success get contacts using name", async (): Promise<void> => {
    const result = await supertest(web)
      .get(`/api/contacts/`)
      .query({
        name: "Is",
      })
      .set("X-API-TOKEN", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.length).toBe(1);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(10);
  });

  it("should success get contacts using email", async (): Promise<void> => {
    const result = await supertest(web)
      .get(`/api/contacts/`)
      .query({
        email: "gmail.com",
      })
      .set("X-API-TOKEN", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.length).toBe(1);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(10);
  });

  it("should success get contacts no result", async (): Promise<void> => {
    const result = await supertest(web)
      .get(`/api/contacts/`)
      .query({
        name: "salah",
      })
      .set("X-API-TOKEN", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.length).toBe(0);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(0);
    expect(result.body.paging.totalItem).toBe(10);
  });

  it("should success get contacts with paging", async (): Promise<void> => {
    const result = await supertest(web)
      .get(`/api/contacts/`)
      .query({
        page: 2,
        size: 1,
      })
      .set("X-API-TOKEN", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.length).toBe(0);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(1);
  });
});
