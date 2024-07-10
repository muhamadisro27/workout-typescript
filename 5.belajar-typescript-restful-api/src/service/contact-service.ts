import { Contact, User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/error-response";
import {
  ContactResponse,
  CreateContactRequest,
  SearchContactRequest,
  toContactResponse,
  UpdateContactRequest,
} from "../model/contact-model";
import { Pageable } from "../model/page";
import { ArrayMix } from "../type/general-type";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";

export class ContactService {
  static async create(
    user: User,
    req: CreateContactRequest
  ): Promise<ContactResponse> {
    const createRequest = Validation.validate(ContactValidation.CREATE, req);

    const record = {
      ...createRequest,
      ...{ username: user.username },
    };

    const contact = await prismaClient.contact.create({
      data: record,
    });

    return toContactResponse(contact);
  }

  static async checkContactMustExist(user: User, id: number): Promise<Contact> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: id,
        username: user.username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }

    return contact;
  }

  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await this.checkContactMustExist(user, id);

    return toContactResponse(contact);
  }

  static async update(
    user: User,
    req: UpdateContactRequest
  ): Promise<ContactResponse> {
    const updateRequest = Validation.validate(ContactValidation.UPDATE, req);

    await this.checkContactMustExist(user, updateRequest.id);

    const result = await prismaClient.contact.update({
      where: {
        id: updateRequest.id,
        username: user.username,
      },
      data: updateRequest,
    });

    return toContactResponse(result);
  }

  static async delete(user: User, id: number): Promise<Contact> {
    await this.checkContactMustExist(user, id);

    return prismaClient.contact.delete({
      where: {
        id: id,
      },
    });
  }

  static async search(
    user: User,
    req: SearchContactRequest
  ): Promise<Pageable<ContactResponse>> {
    const contactSearch = Validation.validate(ContactValidation.SEARCH, req);
    const skip: number = (contactSearch.page - 1) * contactSearch.size;

    const filters: ArrayMix<any> = [];

    filters.push({
      username: user.username,
    });

    if (contactSearch.name) {
      filters.push({
        OR: [
          {
            firstName: {
              contains: contactSearch.name,
            },
          },
          {
            lastName: {
              contains: contactSearch.name,
            },
          },
        ],
      });
    }

    if (contactSearch.email) {
      filters.push({
        email: {
          contains: contactSearch.email,
        },
      });
    }

    if (contactSearch.phoneNumber) {
      filters.push({
        phoneNumber: {
          contains: contactSearch.phoneNumber,
        },
      });
    }

    const contacts = await prismaClient.contact.findMany({
      where: {
        AND: filters,
      },
      take: contactSearch.size,
      skip,
    });

    const totalItem = await prismaClient.contact.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: contacts.map((c) => toContactResponse(c)),
      paging: {
        page: contactSearch.page,
        totalPage: Math.ceil(totalItem / contactSearch.size),
        totalItem: contactSearch.size,
      },
    };
  }
}
