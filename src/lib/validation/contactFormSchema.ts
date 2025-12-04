// lib/validation/contactFormSchema.ts
import * as Z from "zod";

export const ContactFormSchema = Z.object({
  name: Z.string()
    .min(5, "Please enter your name"),
  email: Z.string()
    .email("Please enter a valid email address")
    .nonempty("Please enter an email address"),
  phone: Z.string()
    .length(11, "Phone number must be 11 digits")
    .nonempty("Please enter a phone number"),
  subject: Z.string()
    .min(5, "Please enter a subject")
    .nonempty("Please enter a subject"),
  message: Z.string()
    .min(10, "Please enter a message")
    .nonempty("Please enter a message"),
});

// نوع البيانات inferred
export type ContactFormType = Z.infer<typeof ContactFormSchema>;
