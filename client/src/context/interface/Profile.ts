import { User } from './User';

export interface Profile {
  _id: string;
  isDogSitter: { type: Boolean; require: true; default: false };
  isAvailable: { type: Boolean; require: true; default: false };
  firstName: { type: string; require: true };
  lastName: { type: string; require: true };
  gender: string;
  title: string;
  birthDate: Date;
  email: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    provinceState: string;
  };
  description: string;
  profileImg: string;
  coverImg: string;
  galleryImg: string[];
  availableDates: string[];
  priceRate: Number;
}

export interface ProfilesApiData {
  users?: User[];
  error?: { message: string };
  profiles: Profile[];
}
