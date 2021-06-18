import { User } from '../context/interface/User';

const mockLoggedInUser: User = {
  email: 'mockLoggedInUser@gmail.com',
  _id: '123',
  firstName: 'Mock',
  lastName: 'One',
  isDogSitter: true,
};

const mockOtherUser1: User = {
  _id: '456',
  firstName: 'Mock',
  lastName: 'Other User 1',
  isDogSitter: false,
  email: 'mockTestUser1@gmail.com',
};
const mockOtherUser2: User = {
  _id: '789',
  firstName: 'Mock',
  lastName: 'Other User 2',
  isDogSitter: false,
  email: 'mockTestUser2@gmail.com',
};
const mockOtherUser3: User = {
  _id: '101112',
  firstName: 'Mock',
  lastName: 'Other User 2',
  isDogSitter: false,
  email: 'mockTestUser3@gmail.com',
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
