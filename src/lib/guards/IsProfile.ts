import { IProfile } from "../Interfaces/AboutInterface";

export const   IsProfile = (obj: unknown, requiredFields: (keyof IProfile)[] = []): obj is IProfile => {
  if (!obj || typeof obj !== "object") return false;

  // Default required fields لو مش محددة
  const defaultFields: (keyof IProfile)[] = ["logo", "socialMedia", "email", "phoneNumbers", "address"];
  const fieldsToCheck = requiredFields.length ? requiredFields : defaultFields;

  return fieldsToCheck.every((key) => key in obj);
};
