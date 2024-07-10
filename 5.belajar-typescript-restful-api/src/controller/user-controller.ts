import { NextFunction, Request, Response } from "express";
import {
  CreateUserRequest,
  LoginRequest,
  UpdateUserRequest,
} from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";

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

  static get = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const response = await UserService.get(req.user!);

      return res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  static update = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;

      const result = await UserService.update(req.user!, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  static logout = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await UserService.logout(req.user!);

      return res.status(200).json({
        data: "OK",
      });
    } catch (error) {
      next(error);
    }
  };
}
