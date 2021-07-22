import { IProfile } from './Profile';

export interface User {
  email: string;
  _id: string;
  firstName: string;
  lastName: string;
  isDogSitter: boolean;
  profileImg?: string;
  profile?: IProfile;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
