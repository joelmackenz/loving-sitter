import { FetchOptions } from '../../interface/FetchOptions';
import { NotificationApiData, Notification } from '../../interface/Notification';

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
