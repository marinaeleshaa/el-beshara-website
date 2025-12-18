// lib/validation/contactFormSchema.ts
import * as Z from "zod";

export const ContactFormSchema = Z.object({
  name: Z.string().min(5, "formValidation.name.min"),

  email: Z.string()
    .nonempty("formValidation.email.required")
    .email("formValidation.email.invalid"),

  phone: Z.string()
    .nonempty("formValidation.phone.required")
    .length(11, "formValidation.phone.length"),

  subject: Z.string()
    .nonempty("formValidation.subject.required")
    .min(5, "formValidation.subject.min"),

  message: Z.string()
    .nonempty("formValidation.message.required")
    .min(10, "formValidation.message.min"),
});

export type ContactFormType = Z.infer<typeof ContactFormSchema>;
