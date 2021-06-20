import { FetchOptions } from '../../context/interface/FetchOptions';
import { ProfilesApiData } from '../../interface/Profile';

const getProfiles = async (): Promise<ProfilesApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getProfiles;
