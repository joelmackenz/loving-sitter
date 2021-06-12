import { useReducer, useContext, createContext, FunctionComponent } from 'react';

export interface EditProfileFields {
  phone: string;
  city: string;
  description: string;
  startDate: string;
  endDate: string;
  priceRate: string;
}

export interface IUserContext extends EditProfileFields {
  background: string;
  profile: string;
  isDogSitter: boolean;
  isAvailable: boolean;
}

type Action =
  | { type: 'UPLOAD_PROFILE'; profile: string }
  | { type: 'UPLOAD_BACKGROUND'; background: string }
  | { type: 'EMPTY_IMAGES' }
  | { type: 'SET_IS_DOG_SITTER' }
  | { type: 'UPDATE_EDIT_PROFILE_FIELDS'; fields: EditProfileFields };

type Dispatch = (action: Action) => void;

export interface IUseUser {
  userState: IUserContext;
  dispatchUserContext: Dispatch;
}

const userReducer = (state: IUserContext, action: Action) => {
  switch (action.type) {
    case 'UPLOAD_PROFILE':
      return { ...state, profile: action.profile };
    case 'UPLOAD_BACKGROUND':
      return { ...state, background: action.background };
    case 'EMPTY_IMAGES':
      return { ...state, background: '', profile: '' };
    case 'SET_IS_DOG_SITTER':
      return { ...state, isDogSitter: true };
    case 'UPDATE_EDIT_PROFILE_FIELDS':
      const { startDate, endDate, ...otherFields } = action.fields;
      return { ...state, startDate: startDate.substring(0, 10), endDate: endDate.substring(0, 10), ...otherFields };
    default:
      throw new Error();
  }
};

const UserContext = createContext({});

const UserProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [userState, dispatchUserContext] = useReducer(userReducer, {
    background: '',
    profile: '',
    isDogSitter: false,
    isAvailable: false,
    phone: '',
    city: '',
    description: '',
    startDate: '',
    endDate: '',
    priceRate: '',
  });
  return <UserContext.Provider value={{ userState, dispatchUserContext }}>{children}</UserContext.Provider>;
};

function useUser(): any {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUser };
