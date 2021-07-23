import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from './useStyles';
import Booking from './Booking';
import { Typography } from '@material-ui/core';
import { BookingRequest } from '../../interface/BookingRequest';
import getBookingRequests from '../../helpers/APICalls/bookingRequests/getBookingRequests';
import { Badge } from '@material-ui/core';

export default function ManageBookings(): JSX.Element {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [requestDates, setRequestDates] = useState<(string | null)[]>();
  const [nextBookingRequest, setNextBookingRequest] = useState<BookingRequest>();
  const [pastBookingRequests, setPastBookingRequests] = useState<BookingRequest[]>();
  const [currentBookingRequests, setCurrentBookingRequests] = useState<BookingRequest[]>();
  const [nextBookingDisplay, setNextBookingDisplay] = useState<JSX.Element>();
  const [currentBookingsDisplay, setCurrentBookingsDisplay] = useState<JSX.Element>();
  const [pastBookingsDisplay, setPastBookingsDisplay] = useState<JSX.Element>();

  const updateBookingDisplay = (bookingRequestName: any, time: string) => {
    const methods: any = {
      next: setNextBookingDisplay,
      current: setCurrentBookingsDisplay,
      past: setPastBookingsDisplay,
    };
    // if bookingRequestName is array, map the booking requests (current and past)
    if (bookingRequestName && bookingRequestName.length >= 1) {
      methods[time](
        <>
          {bookingRequestName.map((booking: BookingRequest) => {
            const profile = booking.user_id;
            return (
              <Grid key={booking._id}>
                <Booking
                  outlined
                  accepted={!booking.accepted && !booking.declined ? undefined : booking.accepted}
                  name={`${profile && profile.firstName} ${profile && profile.lastName}`}
                  avatar={profile && profile.profileImg}
                  date={booking.start_date}
                />
              </Grid>
            );
          })}
        </>,
      );
      // if bookingRequestName is not an array, display the single booking request (next booking request)
    } else if (bookingRequestName) {
      const profile = bookingRequestName.user_id && bookingRequestName.user_id.profile;
      methods[time](
        <>
          <Grid key={bookingRequestName._id}>
            <Booking
              outlined
              accepted={
                !bookingRequestName.accepted && !bookingRequestName.declined ? undefined : bookingRequestName.accepted
              }
              name={`${profile && profile.firstName} ${profile && profile.lastName}`}
              avatar={profile && profile.profileImg}
              date={bookingRequestName.start_date}
            />
          </Grid>
        </>,
      );
    }
  };

  const getRequests = async () => {
    const data = await getBookingRequests();
    const currentRequestsList: BookingRequest[] = [];
    const pastRequestsList: BookingRequest[] = [];
    const requestDatesList: (string | null)[] = [];
    const now = new Date();
    const nowString = now.toLocaleDateString('en-US');
    if (data.requests) {
      data.requests.map((request) => {
        const requestDate = new Date(request.start_date);
        const formattedDate = requestDate.toLocaleDateString('en-US');
        requestDatesList.push(formattedDate);
        console.log('formatted date: ' + formattedDate);
        if (nowString === formattedDate || requestDate > now) {
          currentRequestsList.push(request);
        } else {
          pastRequestsList.push(request);
        }
      });
      setRequestDates(requestDatesList);
      setNextBookingRequest(currentRequestsList[0]);
      setCurrentBookingRequests(currentRequestsList[0] ? currentRequestsList.slice(1) : undefined);
      setPastBookingRequests(pastRequestsList);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  useEffect(() => {
    updateBookingDisplay(nextBookingRequest, 'next');
    updateBookingDisplay(currentBookingRequests, 'current');
    updateBookingDisplay(pastBookingRequests, 'past');
  }, [nextBookingRequest, currentBookingRequests, pastBookingRequests]);

  return (
    <Grid container justify="center" spacing={10} className={classes.root}>
      <Grid item xs={10} md={6} xl={4}>
        <Card raised className={classes.bookingCard}>
          <CardContent>
            <Grid className={classes.cardHeader}>
              <Typography className={classes.bookingTitle}>Your next booking:</Typography>
            </Grid>
            {nextBookingDisplay ? (
              nextBookingDisplay
            ) : (
              <Typography className={classes.noBookingDisplay}>No upcoming bookings</Typography>
            )}
          </CardContent>
        </Card>
        <Card raised className={classes.bookingCard}>
          <CardContent className={classes.bookingListCurrentPast}>
            <Grid className={classes.cardHeader}>
              <Typography className={classes.bookingTitle}>Current Bookings:</Typography>
            </Grid>
            {currentBookingsDisplay ? (
              currentBookingsDisplay
            ) : (
              <Typography className={classes.noBookingDisplay}>No current bookings</Typography>
            )}
          </CardContent>
        </Card>
        <Card raised className={classes.bookingCard}>
          <CardContent>
            <Grid className={classes.cardHeader}>
              <Typography className={classes.bookingTitle}>Past Bookings:</Typography>
            </Grid>
            {pastBookingsDisplay ? (
              pastBookingsDisplay
            ) : (
              <Typography className={classes.noBookingDisplay}>No past bookings</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card raised>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              fullWidth
              showTodayButton={false}
              autoOk
              orientation="landscape"
              variant="static"
              value={null}
              onChange={(newDate) => setSelectedDate(newDate)}
              disableToolbar
              disabled
              readOnly
              renderDay={(date, selectedDate, isInCurrentMonth, dayComponent) => {
                const dateString: string | undefined | null = date && date.toLocaleDateString('en-US');
                const isSelected: boolean | undefined | null =
                  date && isInCurrentMonth && requestDates && requestDates.includes(dateString);
                console.log('requestDates: ' + requestDates);
                return isSelected ? (
                  <Badge
                    overlap="circle"
                    classes={{ anchorOriginTopRightCircle: classes.badgeAnchorTopRight, badge: classes.badge }}
                    badgeContent={'🐾'}
                  >
                    {dayComponent}
                  </Badge>
                ) : (
                  <>{dayComponent}</>
                );
              }}
            />
          </MuiPickersUtilsProvider>
        </Card>
      </Grid>
    </Grid>
  );
}
