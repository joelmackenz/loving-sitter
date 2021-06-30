import { createConvo } from '../helpers/APICalls/conversation';
import { IConversations, DispatchConvos } from '../context/useMessageContext';
import { User } from '../interface/User';
import { Socket } from 'socket.io-client';
import { IUserContext } from '../context/useUserContext';
import { History } from 'history';

export const newConvo = (
  conversations: IConversations[],
  handleActiveConversation: (conversationId: string) => void,
  recipientUser: {
    recipientUserId: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImg: string;
  },
  loggedInUser: User | null | undefined,
  updateSnackBarMessage: (message: string) => void,
  userState: IUserContext,
  socket: Socket | undefined,
  dispatchConversations: DispatchConvos,
  history: History,
): void => {
  const findConvo = conversations.find(
    (convo) => convo.recipientUser.recipientUserId === recipientUser.recipientUserId,
  );
  if (findConvo?.conversationId) {
    handleActiveConversation(findConvo.conversationId);
    history.push({
      pathname: '/messages',
      state: { previousPath: location.pathname },
    });
  } else {
    const userOneId = loggedInUser?._id ? loggedInUser._id : '';
    const userTwoId = recipientUser.recipientUserId;
    createConvo(userOneId, userTwoId).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success && data._id) {
        const conversation = {
          conversationId: data._id,
          latestMessage: {
            latestMessageText: '',
            createdAt: '',
          },
          recipientUser: {
            fullName: `${recipientUser.firstName} ${recipientUser.lastName}`,
            email: recipientUser.email,
            online: false, // TODO: Figure out if the user is online or not.
            recipientUserId: recipientUser.recipientUserId,
            profileImg: recipientUser.profileImg,
          },
        };
        dispatchConversations({ type: 'ADD_NEW_CONVO', conversation });

        const conversationSocketDataToAnotherUser = {
          conversationId: data._id,
          latestMessage: {
            latestMessageText: '',
            createdAt: '',
          },
          recipientUser: {
            fullName: `${loggedInUser?.firstName} ${loggedInUser?.lastName}`,
            email: loggedInUser?.email,
            online: false,
            recipientUserId: loggedInUser?._id,
            profileImg: userState.profileImg,
          },
        };

        socket?.emit('new-convo', {
          recipientUserId: recipientUser.recipientUserId,
          ...conversationSocketDataToAnotherUser,
        });

        handleActiveConversation(data._id);
        history.push({
          pathname: '/messages',
          state: { previousPath: location.pathname },
        });
      }
    });
  }
};
