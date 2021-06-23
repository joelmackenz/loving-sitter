export interface User {
  email: string;
  _id: string;
  firstName: string;
  lastName: string;
  isDogSitter: boolean;
  profileImg?: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
