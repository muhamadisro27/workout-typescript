import { NextFunction, Response } from "express";
import { logger } from "../app/logging";
import {
  CreateContactRequest,
  SearchContactRequest,
  UpdateContactRequest,
} from "../model/contact-model";
import { ContactService } from "../service/contact-service";
import { UserRequest } from "../type/user-request";

export class ContactController {
  static create = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const request: CreateContactRequest = req.body as CreateContactRequest;

      const result = await ContactService.create(req.user!, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  static get = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const contactId = Number(req.params.contactId);
      const result = await ContactService.get(req.user!, contactId);

      return res.status(200).json({
        data: result,
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
      const request: UpdateContactRequest = req.body as UpdateContactRequest;
      request.id = Number(req.params.contactId);

      const result = await ContactService.update(req.user!, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  static delete = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const contactId = Number(req.params.contactId);

      await ContactService.delete(req.user!, contactId);

      return res.status(200).json({
        data: "OK",
      });
    } catch (error) {
      next(error);
    }
  };

  static search = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const request: SearchContactRequest = {
        name: req.query.name as string,
        email: req.query.email as string,
        phoneNumber: req.query.phoneNumber as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };

      const result = await ContactService.search(req.user!, request);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
