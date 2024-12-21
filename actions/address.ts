"'use server'";

import { z } from "zod";
import type { ActionResponse, AddressFormData } from "@/types/address";

export const addressSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(1, "Country is required"),
});

export async function submitAddress(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const rawData: AddressFormData = {
      streetAddress: formData.get("streetAddress") as string,
      apartment: formData.get("apartment") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zipCode: formData.get("zipCode") as string,
      country: formData.get("country") as string,
    };

    // Validate the form data
    const validatedData = addressSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in form",
        errors: Object.fromEntries(
          Object.entries(validatedData.error.flatten().fieldErrors).map(
            ([key, value]) => [key, value[0]]
          )
        ),
        inputs: rawData,
      };
    }

    // Here you would typically save the address to your database
    console.log("Address submitted:", validatedData.data);

    return {
      success: true,
      message: "Address saved successfully!",
    };
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
