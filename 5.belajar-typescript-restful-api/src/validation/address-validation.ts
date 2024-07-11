import { z, ZodType } from "zod";

export class AddressValidation {
  static readonly CREATE_AND_UPDATE: ZodType = z.object({
    street: z.string().min(3).max(100).optional(),
    city: z.string().min(3).max(100).optional(),
    province: z.string().min(3).max(100).optional(),
    country: z.string().min(3).max(100),
    postalCode: z.string().min(3).max(10),
  });

  static readonly GET: ZodType = z.object({
    id: z.number().min(1).positive(),
    contact_id: z.number().min(1).positive(),
  });
  
  static readonly SEARCH: ZodType = z.object({
    name: z.string().min(1).optional(),
    phone: z.string().min(1).optional(),
    email: z.string().min(1).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).positive(),
  });
}
