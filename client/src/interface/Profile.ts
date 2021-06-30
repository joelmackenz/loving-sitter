import { IUserContext } from '../context/useUserContext';

export interface IProfile extends IUserContext {
  _id: string;
}

export interface ProfilesApiData {
  allUsers?: {
    firstName: string;
    lastName: string;
    isDogSitter: boolean;
    email: string;
    _id: string;
    profileId: IProfile[];
  }[];
  success?: string;
  error?: string;
}
