import { Address, Contact, User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/error-response";
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  toAddressResponse,
  UpdateAddressRequest,
} from "../model/address-model";
import { Pageable } from "../model/page";
import { AddressValidation } from "../validation/address-validation";
import { Validation } from "../validation/validation";
import { ContactService } from "./contact-service";

export class AddressService {
  static async create(
    user: User,
    req: CreateAddressRequest
  ): Promise<AddressResponse> {
    const createRequest = Validation.validate(
      AddressValidation.CREATE_AND_UPDATE,
      req
    );
    await ContactService.checkContactMustExist(user, req.contact_id);

    const record = {
      ...createRequest,
      ...{
        contactId: req.contact_id,
      },
    };

    const address = await prismaClient.address.create({
      data: record,
    });

    return toAddressResponse(address);
  }

  static async get(
    user: User,
    request: GetAddressRequest
  ): Promise<AddressResponse> {
    const address = await this.checkAddressMustExist(user, request);

    return toAddressResponse(address);
  }

  static async update(
    user: User,
    request: UpdateAddressRequest
  ): Promise<AddressResponse> {
    const validation = await this.checkAddressMustExist(user, request);

    const validationBody = Validation.validate(
      AddressValidation.CREATE_AND_UPDATE,
      request
    );

    const address = await prismaClient.address.update({
      where: {
        id: validation.id,
      },
      data: {
        street: validationBody.street,
        city: validationBody.city,
        province: validationBody.province,
        country: validationBody.country,
        postalCode: validationBody.postalCode,
        contactId: validation.contactId,
      },
    });

    return toAddressResponse(address);
  }

  static async delete(
    user: User,
    request: GetAddressRequest
  ): Promise<Address> {
    await this.checkAddressMustExist(user, request);

    return prismaClient.address.delete({
      where: {
        contactId: request.contact_id,
        id: request.id,
      },
    });
  }

  static async list(
    user: User,
    contact_id: number
  ): Promise<Array<AddressResponse>> {
    
    await ContactService.checkContactMustExist(user, contact_id);

    const addresses = await prismaClient.address.findMany({
      where: {
        contactId: contact_id,
      },
    });

    return addresses.map((a) => toAddressResponse(a));
  }

  static async checkAddressMustExist<T extends GetAddressRequest>(
    user: User,
    request: T
  ) {
    const getValidation = Validation.validate(AddressValidation.GET, request);

    await ContactService.checkContactMustExist(user, getValidation.contact_id);

    const address = await prismaClient.address.findUnique({
      where: {
        contactId: request.contact_id,
        id: request.id,
      },
    });

    if (!address) {
      throw new ResponseError(404, "Address not found");
    }

    return address;
  }
}
