import { useReducer, useContext, createContext, FunctionComponent, useState } from 'react';

export interface IConversations {
  conversationId: string;
  latestMessage: {
    latestMessageText: string;
    createdAt: string;
  };
  recipientUser: {
    fullName: string;
    email: string;
    online: boolean;
    recipientUserId: string;
    profileImg?: string;
  };
}

export interface IMessages {
  _id: string;
  author: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

type ActionMessages =
  | { type: 'UPDATE_MESSAGES'; activeConversation: string; messages: IMessages[] }
  | { type: 'ADD_NEW_MESSAGE'; activeConversation: string; message: IMessages };

export type DispatchMessages = (action: ActionMessages) => void;

type ActionConvos =
  | { type: 'UPDATE_CONVOS'; conversations: IConversations[] }
  | { type: 'ADD_ONLINE_USER'; recipientUserId: string }
  | { type: 'REMOVE_OFFLINE_USER'; recipientUserId: string }
  | { type: 'UPDATE_LATEST_MESSAGE'; activeConversation: string; message: string; createdAt: string };

export type DispatchConvos = (action: ActionConvos) => void;

interface IUseMessage {
  messages: { [key: string]: IMessages[] };
  dispatchMessages: DispatchMessages;
  conversations: IConversations[];
  dispatchConversations: DispatchConvos;
  activeConversation: string;
  handleActiveConversation: (conversationId: string) => void;
}

const messageReducer = (state: { [key: string]: IMessages[] }, action: ActionMessages) => {
  switch (action.type) {
    case 'UPDATE_MESSAGES':
      return {
        ...state,
        [action.activeConversation]: action.messages,
      };
    case 'ADD_NEW_MESSAGE':
      const resultedArray = state[action.activeConversation];
      if (resultedArray) {
        resultedArray.push(action.message);
      } else {
        console.error('activeConversation is undefined in resultedArray.');
      }
      return {
        ...state,
        [action.activeConversation]: resultedArray,
      };
    default:
      return state;
  }
};

const convoReducer = (state: IConversations[], action: ActionConvos) => {
  switch (action.type) {
    case 'UPDATE_CONVOS':
      return action.conversations;
    case 'ADD_ONLINE_USER':
      return state.map((convo) => {
        if (convo.recipientUser.recipientUserId === action.recipientUserId) {
          convo.recipientUser.online = true;
          return convo;
        } else {
          return convo;
        }
      });
    case 'REMOVE_OFFLINE_USER':
      return state.map((convo) => {
        if (convo.recipientUser.recipientUserId === action.recipientUserId) {
          convo.recipientUser.online = false;
          return convo;
        } else {
          return convo;
        }
      });
    case 'UPDATE_LATEST_MESSAGE':
      return state.map((convo) => {
        if (convo.conversationId === action.activeConversation) {
          convo.latestMessage.latestMessageText = action.message;
          convo.latestMessage.createdAt = action.createdAt;
          return convo;
        } else {
          return convo;
        }
      });
    default:
      return state;
  }
};

const MessageContext = createContext<IUseMessage>({
  messages: {},
  // eslint-disable-next-line
  dispatchMessages: (action: ActionMessages) => {
    // all clear comments
  },
  conversations: [],
  // eslint-disable-next-line
  dispatchConversations: (action: ActionConvos) => {
    // all clear comments
  },
  activeConversation: '',
  // eslint-disable-next-line
  handleActiveConversation: (conversationId: string) => {
    // all clear comments
  },
});

const MessageProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [messages, dispatchMessages] = useReducer(messageReducer, {});
  const [conversations, dispatchConversations] = useReducer(convoReducer, []);
  const [activeConversation, setActiveConversation] = useState<string>('');

  const handleActiveConversation = (conversationId: string) => setActiveConversation(conversationId);

  const value = {
    messages,
    dispatchMessages,
    conversations,
    dispatchConversations,
    activeConversation,
    handleActiveConversation,
  };

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};

const useMessage = (): IUseMessage => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};

export { MessageProvider, useMessage };
