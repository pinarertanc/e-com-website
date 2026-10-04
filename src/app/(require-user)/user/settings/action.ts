'use server';

import { revalidatePath } from "next/cache";
import { actionResponse, profileSchema } from "@/types/form";


export async function updateProfileAction(prevState: actionResponse, formData:FormData):Promise<actionResponse>{
  try{
    const rawData ={
   phone: formData.get('phone') as string,
     city: formData.get('city') as string,
     address: formData.get('address') as string,
     district: formData.get("district") as string,
    }

    const validationResult = profileSchema.safeParse(rawData);

    if (!validationResult.success) {
      const flattenedErrors = validationResult.error.flatten().fieldErrors;
      
      return {
        success: false,
        message: null,
        error: "Lütfen formdaki hataları düzeltiniz.",
        errors: flattenedErrors, 
      };
    }

    const { phone, city, district, address } = validationResult.data;

  await new Promise ((resolve)=>
    setTimeout(resolve, 1000)
  );

  revalidatePath("/user/settings");
  return {
      success: true,
      message: "Profil bilgileriniz başarıyla güncellendi!",
      error: null,
    };
  } catch (error) {
    console.error("Profile update error:", error);
    return {
      success: false,
      message: null,
      error: "Bir sorun oluştu, lütfen tekrar deneyin.",
    };
  }
}