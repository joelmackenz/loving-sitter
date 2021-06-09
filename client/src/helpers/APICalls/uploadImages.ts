import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const uploadImagesAPI = async (data: FormData): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: data,
    credentials: 'include',
  };
  return await fetch(`/upload/uploadimage`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default uploadImagesAPI;
