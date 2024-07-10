import { Contact } from "@prisma/client";

export interface ContactResponse {
  id: number;
  firstName: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface CreateContactRequest {
  firstName: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface UpdateContactRequest {
  id: number;
  firstName: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface SearchContactRequest {
  name?: string;
  phoneNumber?: string;
  email?: string;
  page: number;
  size: number;
}

export const toContactResponse = (contact: Contact): ContactResponse => {
  return {
    id: contact.id,
    firstName: contact.firstName,
    lastName: contact.lastName || undefined,
    email: contact.email || undefined,
    phoneNumber: contact.phoneNumber || undefined,
  };
};
