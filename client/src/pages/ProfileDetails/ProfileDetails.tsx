import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Box, CardMedia } from '@material-ui/core';
import ProfileDetailCard from '../../components/ProfileDetail/ProfileDetailCard';
import useStyles from './useStyles';
import RequestCard from '../../components/ProfileDetail/RequestCard';

export default function ProfileDetails(): JSX.Element {
  const classes = useStyles();

  //testing data
  const [profile, setProfile] = useState({
    coverImg: '',
    profileImg: '',
    firstName: 'Norma',
    lastName: 'Byers',
    address: 'Toronto, Ontario',
    description: 'This is testing decription',
    galleryImg: null,
    priceRate: 14,
  });

  //plug in when dashboard data is ready
  // useEffect(()=>{
  //   const fetchProfileData = async () => {
  //     const profileData = await axios.get<any>(`/profile/${userId}`);
  //     setProfile(profileData);
  //   }
  //   fetchProfileData();
  // },[userId]);

  return (
    <Box className={classes.profileDetailContainer}>
      <Paper elevation={3} className={classes.profileInfo}>
        <ProfileDetailCard profile={profile} />
      </Paper>
      <Paper elevation={3} className={classes.requestInfo}>
        <RequestCard profile={profile} />
      </Paper>
    </Box>
  );
}
