export interface Notification {
  createdAt: string;
  description: string;
  readStatus: boolean;
  title: string;
  type: 'VIEWED_ACCOUNT' | 'SERVICE_REQUEST' | 'SERVICE_ACCEPTED' | 'SERVICE_DECLINED';
  user: string | object;
  _id: string;
}

export interface NotificationApiData {
  notifications?: Notification[];
  error?: { message: string };
  success?: string;
}
