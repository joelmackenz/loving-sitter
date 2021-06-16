import { FetchOptions } from '../../context/interface/FetchOptions';

interface ApiData {
  error?: string;
  success?: string;
}

interface CreateConvoApiData extends ApiData {
  _id?: string;
}

interface getConvosApiData extends ApiData {
  _id?: string;
  users: [{ _id: string; firstName: string; lastName: string }];
}

export const createConvo = async (userOneId: string, userTwoId: string): Promise<CreateConvoApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ users: [userOneId, userTwoId] }),
    credentials: 'include',
  };
  return await fetch(`/convo`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const getAllConvosWithoutMessages = async (): Promise<getConvosApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/convo`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
