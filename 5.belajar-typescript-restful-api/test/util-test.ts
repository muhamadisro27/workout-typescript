import { prismaClient } from "../src/app/database";

export class UtilTesting {
  static async removeAllUser() {
    return await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }
}
