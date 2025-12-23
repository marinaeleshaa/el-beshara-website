// lib/validation/contactFormSchema.ts
import * as Z from "zod";

// Country phone length mapping for validation
const countryPhoneLengths: { [key: string]: number } = {
  "+20": 13, // Egypt
  "+1": 12, // USA/Canada
  "+44": 13, // UK
  "+966": 13, // Saudi Arabia
  "+971": 13, // UAE
  "+965": 12, // Kuwait
  "+974": 12, // Qatar
  "+973": 12, // Bahrain
  "+968": 12, // Oman
  "+962": 13, // Jordan
  "+961": 12, // Lebanon
  "+970": 13, // Palestine
  "+964": 14, // Iraq
  "+963": 13, // Syria
  "+90": 13, // Turkey
  "+49": 13, // Germany
  "+33": 12, // France
  "+39": 13, // Italy
  "+34": 12, // Spain
  "+61": 12, // Australia
  "+91": 13, // India
  "+92": 13, // Pakistan
  "+86": 14, // China
  "+81": 13, // Japan
  "+82": 13, // South Korea
};

export const ContactFormSchema = Z.object({
  name: Z.string().min(5, "formValidation.name.min"),

  email: Z.string()
    .nonempty("formValidation.email.required")
    .email("formValidation.email.invalid"),

  phone: Z.string()
    .nonempty("formValidation.phone.required")
    .regex(/^\+\d{1,4}\d{7,14}$/, "formValidation.phone.invalidFormat")
    .refine((phone) => {
      const matchedCountry = Object.keys(countryPhoneLengths)
        .sort((a, b) => b.length - a.length) // مهم جدًا
        .find((code) => phone.startsWith(code));

      if (!matchedCountry) {
        return phone.length >= 10 && phone.length <= 18;
      }

      return phone.length === countryPhoneLengths[matchedCountry];
    }, "formValidation.phone.invalidLength"),
  subject: Z.string()
    .nonempty("formValidation.subject.required")
    .min(5, "formValidation.subject.min"),

  message: Z.string()
    .nonempty("formValidation.message.required")
    .min(10, "formValidation.message.min"),
});

export type ContactFormType = Z.infer<typeof ContactFormSchema>;
