import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt";
import { Address, Contact, User } from "@prisma/client";
import { UserResponse } from "../src/model/user-model";

export class UtilTesting {
  static async removeAllUser() {
    return await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async createOneUser(): Promise<User> {
    const password = await bcrypt.hash("rahasia", 10);

    return await prismaClient.user.create({
      data: {
        username: "test",
        name: "test user",
        password: password,
        token: "test",
      },
    });
  }

  static async createOneContact(): Promise<Contact> {
    const user = await this.getCurrentUser();
    return await prismaClient.contact.create({
      data: {
        firstName: "Muhamad",
        lastName: "Isro",
        email: "mohammadisro2710@gmail.com",
        phoneNumber: "085157708597",
        username: user.username,
      },
    });
  }

  static async createOneAddress(): Promise<Address> {
    const contact = await this.getContact();
    return await prismaClient.address.create({
      data: {
        street: "Jl. Unocal",
        city: "Jakarta Selatan",
        province: "Jakarta",
        country: "Indonesia",
        postalCode: "76141",
        contactId: contact.id,
      },
    });
  }

  static async getCurrentUser(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "test",
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  static async getAddress(): Promise<Address> {
    const contact = await this.getContact();

    if (!contact) {
      throw new Error("Contact not found");
    }

    const address = await prismaClient.address.findFirst({
      where: {
        contactId: contact.id,
      },
    });

    if (!address) {
      throw new Error("Address not found");
    }

    return address;
  }

  static async getContact(): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        username: "test",
      },
    });

    if (!contact) {
      throw new Error("Contact not found");
    }

    return contact;
  }

  static async removeContacts() {
    return await prismaClient.contact.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async removeAddresses() {
    return await prismaClient.address.deleteMany();
  }
}
