import { useReducer, useContext, createContext, FunctionComponent } from 'react';

import { useAuth } from './useAuthContext';

export type AvailableDays = 'mon' | 'tues' | 'wed' | 'thurs' | 'fri' | 'sat' | 'sun';

export interface EditProfileFields {
  phone: string;
  city: string;
  description: string;
  availableDays: AvailableDays[];
  priceRate: string;
}

export interface IUserContext extends EditProfileFields {
  coverImg: string;
  profileImg: string;
  isDogSitter: boolean;
  isAvailable: boolean;
  [key: string]: string | boolean | AvailableDays[];
}

type Action =
  | { type: 'UPLOAD_PROFILE'; profileImg: string }
  | { type: 'UPLOAD_BACKGROUND'; coverImg: string }
  | { type: 'SET_IS_DOG_SITTER' }
  | { type: 'REMOVE_BACKGROUND' }
  | { type: 'REMOVE_PROFILE' }
  | { type: 'EMPTY_IMAGES' }
  | { type: 'UPDATE_EDIT_PROFILE_FIELDS'; fields: EditProfileFields };

type Dispatch = (action: Action) => void;

export interface IUseUser {
  userState: IUserContext;
  dispatchUserContext: Dispatch;
}

const userReducer = (state: IUserContext, action: Action) => {
  switch (action.type) {
    case 'UPLOAD_PROFILE':
      return { ...state, profileImg: action.profileImg };
    case 'UPLOAD_BACKGROUND':
      return { ...state, coverImg: action.coverImg };
    case 'EMPTY_IMAGES':
      return { ...state, coverImg: '', profileImg: '' };
    case 'SET_IS_DOG_SITTER':
      return { ...state, isDogSitter: true };
    case 'UPDATE_EDIT_PROFILE_FIELDS':
      const { priceRate, ...otherFields } = action.fields;
      return {
        ...state,
        priceRate: `${priceRate}`,
        ...otherFields,
      };
    case 'REMOVE_BACKGROUND':
      return { ...state, coverImg: '' };
    case 'REMOVE_PROFILE':
      return { ...state, profileImg: '' };
    default:
      throw new Error();
  }
};

const UserContext = createContext<IUseUser>({
  userState: {
    coverImg: '',
    profileImg: '',
    isDogSitter: false,
    isAvailable: false,
    phone: '',
    city: '',
    description: '',
    availableDays: [],
    priceRate: '',
  },
  // eslint-disable-next-line
  dispatchUserContext: (action: Action) => {
    // any clear comments.
  },
});

const UserProvider: FunctionComponent = ({ children }): JSX.Element => {
  const { loggedInUser } = useAuth();
  const [userState, dispatchUserContext] = useReducer(userReducer, {
    coverImg: '',
    profileImg: loggedInUser?.profileImg ? loggedInUser.profileImg : '',
    isDogSitter: false,
    isAvailable: false,
    phone: '',
    city: '',
    description: '',
    availableDays: [],
    priceRate: '',
  });

  return <UserContext.Provider value={{ userState, dispatchUserContext }}>{children}</UserContext.Provider>;
};

function useUser(): IUseUser {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUser };
