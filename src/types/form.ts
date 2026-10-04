import {z} from "zod";

 export const profileSchema = z.object({
  phone: z
    .string()
    .min(10, "Telefon numarası en az 10 karakter olmalıdır.")
    .max(15, "Geçersiz telefon numarası."),
  city: z
    .string()
    .min(2, "Şehir adı en az 2 karakter olmalıdır."),
  district: z
    .string()
    .min(2, "İlçe adı en az 2 karakter olmalıdır."),
  address: z
    .string()
    .min(10, "Adres en az 10 karakter olmalıdır."),
});

export type actionResponse = {
  success: boolean;
  message: string | null;
  error: string | null;
  errors?: {
    phone?: string[];
    city?: string[];
    district?: string[];
    address?: string[];
  };
}