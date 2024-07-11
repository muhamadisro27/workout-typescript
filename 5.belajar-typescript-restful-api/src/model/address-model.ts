import { Address } from "@prisma/client";

export interface AddressResponse {
  id: number;
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postalCode: string;
}

export interface CreateAddressRequest {
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postalCode: string;
  contact_id: number;
}

export interface UpdateAddressRequest extends CreateAddressRequest {
  id: number;
}

export interface GetAddressRequest {
  id: number;
  contact_id: number;
}

export function toAddressResponse({
  id,
  street,
  city,
  province,
  country,
  postalCode,
}: Address): AddressResponse {
  return {
    id,
    street: street || undefined,
    city: city || undefined,
    province: province || undefined,
    country,
    postalCode,
  };
}
