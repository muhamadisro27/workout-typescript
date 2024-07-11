import supertest from "supertest";
import { logger } from "../src/app/logging";
import { web } from "../src/app/web";
import { UtilTesting } from "./util-test";

describe("POST /api/contacts/:contactId/addresses/", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
    await UtilTesting.createOneContact();
    await UtilTesting.createOneAddress();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeAddresses();
    await UtilTesting.removeContacts();
    await UtilTesting.removeAllUser();
  });

  it("should success create new address", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();

    const result = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses/`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jl. Unocal",
        city: "Jakarta Selatan",
        province: "Jakarta",
        country: "Indonesia",
        postalCode: "76141",
      });

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.street).toBe("Jl. Unocal");
  });

  it("should reject create new address if request is invalid", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();

    const result = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses/`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "",
        city: "",
        province: "",
        country: "",
        postalCode: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject create new address if contact is not found", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();

    const result = await supertest(web)
      .post(`/api/contacts/${contact.id + 1}/addresses/`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jl. Unocal",
        city: "Jakarta Selatan",
        province: "Jakarta",
        country: "Indonesia",
        postalCode: "76141",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
    await UtilTesting.createOneContact();
    await UtilTesting.createOneAddress();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeAddresses();
    await UtilTesting.removeContacts();
    await UtilTesting.removeAllUser();
  });

  it("should success get address based on id address", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const address = await UtilTesting.getAddress();

    const result = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });

  it("should reject get address if contact is not found", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const address = await UtilTesting.getAddress();

    const result = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject get address if address is not found", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const address = await UtilTesting.getAddress();

    const result = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  // it("should reject get address if address is address id is negative", async (): Promise<void> => {
  //   const contact = await UtilTesting.getContact();
  //   let address = await UtilTesting.getAddress();

  //   address.id *= -1;

  //   const result = await supertest(web)
  //     .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
  //     .set("X-API-TOKEN", "test");

  //     logger.error(result.body)

  //   expect(result.status).toBe(400);
  //   expect(result.body.errors).toBeDefined();
  // });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
    await UtilTesting.createOneContact();
    await UtilTesting.createOneAddress();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeAddresses();
    await UtilTesting.removeContacts();
    await UtilTesting.removeAllUser();
  });

  it("should success update address based on id address", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const address = await UtilTesting.getAddress();

    const result = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jl. Unocal updated",
        city: "Jakarta Selatan updated",
        province: "Jakarta updated",
        country: "Indonesia updated",
        postalCode: "761edited",
      });

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.street).toBe("Jl. Unocal updated");
    expect(result.body.data.city).toBe("Jakarta Selatan updated");
    expect(result.body.data.province).toBe("Jakarta updated");
    expect(result.body.data.country).toBe("Indonesia updated");
    expect(result.body.data.postalCode).toBe("761edited");
  });

  it("should reject update address if request is invalid", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const address = await UtilTesting.getAddress();

    const result = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "",
        city: "",
        province: "",
        country: "",
        postalCode: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
    await UtilTesting.createOneContact();
    await UtilTesting.createOneAddress();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeAddresses();
    await UtilTesting.removeContacts();
    await UtilTesting.removeAllUser();
  });

  it("should success delete address based on id address", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const address = await UtilTesting.getAddress();

    const result = await supertest(web)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data).toBe("OK");
  });
  
  it("should reject delete address if contact is not found", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const address = await UtilTesting.getAddress();

    const result = await supertest(web)
      .delete(`/api/contacts/${contact.id+1}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  
  it("should reject delete address if address is not found", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
    const address = await UtilTesting.getAddress();

    const result = await supertest(web)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id+1}`)
      .set("X-API-TOKEN", "test")

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses/", (): void => {
  beforeEach(async (): Promise<void> => {
    await UtilTesting.createOneUser();
    await UtilTesting.createOneContact();
    await UtilTesting.createOneAddress();
  });

  afterEach(async (): Promise<void> => {
    await UtilTesting.removeAddresses();
    await UtilTesting.removeContacts();
    await UtilTesting.removeAllUser();
  });

  it("should success get list of address", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();

    const result = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/`)
      .set("X-API-TOKEN", "test")

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });
  
  it("should reject get list of address if contact is not found", async (): Promise<void> => {
    const contact = await UtilTesting.getContact();
   
    const result = await supertest(web)
      .get(`/api/contacts/${contact.id+1}/addresses/`)
      .set("X-API-TOKEN", "test")

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  
})
