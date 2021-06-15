import { FetchOptions } from '../../context/interface/FetchOptions';
import { ProfilesApiData } from '../../context/interface/Profile';

const searchProfilesByDay = async (search: string[]): Promise<ProfilesApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/search/day/${search}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default searchProfilesByDay;
