import { FetchOptions } from '../../interface/FetchOptions';
import { RequestApiData, Request } from '../../interface/Request';

export const createRequest = async (data: Request): Promise<RequestApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data }),
    credentials: 'include',
  };
  return await fetch(`/request/create`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
