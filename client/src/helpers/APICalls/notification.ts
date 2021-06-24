import { FetchOptions } from '../../interface/FetchOptions';
import { NotificationApiData, Notification } from '../../interface/Notification';

export interface ICreateNotification {
  title: string;
  type: 'VIEWED_ACCOUNT' | 'SERVICE_REQUEST' | 'SERVICE_ACCEPTED' | 'SERVICE_DECLINED';
  description: string;
  userReceiverId: string;
  userCreatorId: string;
  requestId?: string;
}

export const createNotification = async (
  data: ICreateNotification,
): Promise<{
  error?: string;
  success?: string;
}> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data }),
    credentials: 'include',
  };
  return await fetch(`/notification/create`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const getUnreadNotifications = async (): Promise<NotificationApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/notification/unread`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const updateReadStatus = async (notifications: Notification[]): Promise<NotificationApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notifications }),
    credentials: 'include',
  };
  return await fetch(`/notification/updatereadstatus`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
