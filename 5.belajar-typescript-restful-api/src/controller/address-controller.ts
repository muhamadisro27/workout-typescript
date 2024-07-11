import { NextFunction, Response } from "express";
import {
  CreateAddressRequest,
  GetAddressRequest,
  UpdateAddressRequest,
} from "../model/address-model";
import { AddressService } from "../service/address-service";
import { UserRequest } from "../type/user-request";

export class AddressController {
  static create = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const request: CreateAddressRequest = req.body as CreateAddressRequest;
      request.contact_id = Number(req.params.contactId);

      const result = await AddressService.create(req.user!, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  static get = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      let request = {
        id: Number(req.params.addressId),
        contact_id: Number(req.params.contactId),
      };

      request = request as GetAddressRequest;

      const result = await AddressService.get(req.user!, request);

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
      const request = {
        id: Number(req.params.addressId),
        contact_id: Number(req.params.contactId),
        street: req.body.street,
        city: req.body.city,
        province: req.body.province,
        country: req.body.country,
        postalCode: req.body.postalCode,
      } as UpdateAddressRequest;

      const result = await AddressService.update(req.user!, request);

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
      const request = {
        id: Number(req.params.addressId),
        contact_id: Number(req.params.contactId),
      } as GetAddressRequest;

      await AddressService.delete(req.user!, request);

      return res.status(200).json({
        data: "OK",
      });
    } catch (error) {
      next(error);
    }
  };

  static list = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const contactId = Number(req.params.contactId);

      const result = await AddressService.list(req.user!, contactId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
