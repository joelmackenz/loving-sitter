const mongoose = require('mongoose');
import { User } from './User';

export interface BookingRequest {
  _id: string;
  user_id: User;
  sitter_id: string;
  start_date: any;
  end_date: any;
  accepted: boolean;
  declined: boolean;
  paid: boolean;
}

export interface GetBookingRequestApiData {
  requests: BookingRequest[];
}
