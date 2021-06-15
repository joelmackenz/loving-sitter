import { AuthApiData } from '../../context/interface/AuthApiData';
import { FetchOptions } from '../../context/interface/FetchOptions';

const logout = async (): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/auth/logout`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default logout;
