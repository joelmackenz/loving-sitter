import { S3UploadAPIData } from '../../interface/S3Upload';
import { FetchOptions } from '../../interface/FetchOptions';

const uploadImagesAPI = async (data: FormData): Promise<S3UploadAPIData> => {
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
