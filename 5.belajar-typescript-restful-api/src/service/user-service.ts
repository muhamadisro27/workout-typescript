import { prismaClient } from "../app/database";
import { ResponseError } from "../error/error-response";
import {
  CreateUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const checkCountUser = await prismaClient.user.count({
      where: {
        username: request.username,
      },
    });

    if (checkCountUser > 0) {
      throw new ResponseError(400, "User already exists !");
    }

    registerRequest.password = await bcrypt.hash(request.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }
}
