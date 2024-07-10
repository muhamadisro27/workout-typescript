import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt";

export class UtilTesting {
  static async removeAllUser() {
    return await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async createOneUser() {
    const password = await bcrypt.hash("rahasia", 10);

    return await prismaClient.user.create({
      data: {
        username: "test",
        name: "test user",
        password: password,
      },
    });
  }
}
