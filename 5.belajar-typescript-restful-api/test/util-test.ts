import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
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
}
