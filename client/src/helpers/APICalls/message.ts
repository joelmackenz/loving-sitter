import { FetchOptions } from '../../context/interface/FetchOptions';

interface AddMsgApiData {
  msg?: string;
  error?: string;
  success?: string;
}

export const addMessage = async (convoId: string, author: string, text: string): Promise<AddMsgApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author, text }),
    credentials: 'include',
  };
  return await fetch(`/message/${convoId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
