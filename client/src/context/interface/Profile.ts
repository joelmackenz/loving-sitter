import { User } from './User';

export interface Profile {
  isDogSitter: { type: Boolean; require: true; default: false };
  isAvailable: { type: Boolean; require: true; default: false };
  firstName: { type: String; require: true };
  lastName: { type: String; require: true };
  gender: String;
  title: String;
  birthDate: Date;
  email: String;
  phoneNumber: String;
  address: {
    street: String;
    city: String;
    provinceState: String;
  };
  description: String;
  profileImg: String;
  coverImg: String;
  galleryImg: String[];
  availableDates: String[];
  priceRate: Number;
}

export interface ProfilesApiData {
  users?: User[];
  error?: { message: string };
}
