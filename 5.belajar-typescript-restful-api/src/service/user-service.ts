import { prismaClient } from "../app/database";
import { ResponseError } from "../error/error-response";
import {
  CreateUserRequest,
  LoginRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid, v4 } from "uuid";
import { User } from "@prisma/client";

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

  static async login(request: LoginRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        username: request.username,
      },
    });

    if (!user) {
      throw new ResponseError(401, "User don't match with our records.");
    }

    const isPasswordValid = await bcrypt.compare(
      request.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ResponseError(401, "User don't match with our records.");
    }

    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;

    return response;
  }

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  static async update(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    if (updateRequest.name) {
      user.name = updateRequest.name;
    }

    if (updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const result = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });

    return toUserResponse(result);
  }

  static async logout(user: User): Promise<User> {
    return prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });
  }
}
