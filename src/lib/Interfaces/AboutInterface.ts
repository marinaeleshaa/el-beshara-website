export interface ILogo {
  public_id: string;
  url: string;
  secure_url?: string;
}

export interface ISocialMedia {
  icon: string;
  url: string;
  title: string;
}

export interface IAddress {
  building: number;
  street: string;
  city: string;
}

export interface IProfile {
  logo: ILogo;
  socialMedia: ISocialMedia[];
  email: string;
  phoneNumbers: string[];
  address: IAddress;
}

export interface SocialOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}