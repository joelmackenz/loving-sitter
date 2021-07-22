import { FetchOptions } from '../../../context/interface/FetchOptions';
import { GetBookingRequestApiData } from '../../../interface/BookingRequest';

export async function getBookingRequests(): Promise<GetBookingRequestApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/request?sortBy=start_date`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export default getBookingRequests;
