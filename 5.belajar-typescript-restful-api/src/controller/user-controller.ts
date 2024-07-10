import { NextFunction, Request, Response } from "express";
import {
  CreateUserRequest,
  LoginRequest,
  UserResponse,
} from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {
  static register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;

      const result = await UserService.register(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: LoginRequest = req.body as LoginRequest;

      const result = await UserService.login(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
