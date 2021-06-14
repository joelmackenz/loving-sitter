import { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EditProfile from '../../components/EditProfile/EditProfile';
import ProfilePhoto from '../../components/ProfilePhoto/ProfilePhoto';
import PaymentMethods from '../../components/PaymentMethods/PaymentMethods';
import { useUser } from '../../context/useUserContext';
import useStyles from './useStyles';
import { getOneProfile } from '../../helpers/APICalls/profileFields';

const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

interface TabPanelProps {
  children: JSX.Element;
  value: number;
  index: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

const Settings = (): JSX.Element => {
  const classes = useStyles();
  const { userState, dispatchUserContext } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const [isChangedAnything, setIsChangedAnything] = useState<boolean>(false);

  const handleChangedAnything = () => setIsChangedAnything(true);
  const handleChangedAnythingToFalse = () => setIsChangedAnything(false);

  useEffect(() => {
    getOneProfile().then((data) => {
      if (data.error) {
        console.log(data.error);
        setIsLoading(false);
      } else if (data.profile) {
        dispatchUserContext({ type: 'UPDATE_EDIT_PROFILE_FIELDS', fields: data.profile });
        setIsLoading(false);
      }
    });
  }, []);

  // eslint-disable-next-line
  const handleTabIndexChange = (event: any, newValue: number): void => {
    setCurrentTabIndex(newValue);
  };
  return (
    <>
      {!isLoading ? (
        <Container className={classes.root}>
          <Grid container component="main" justify="space-evenly">
            <CssBaseline />
            <Grid item xs={12} sm={8} md={2} component="section" className={classes.leftColumn}>
              <Tabs
                orientation="vertical"
                value={currentTabIndex}
                onChange={(event, newValue) => {
                  if (isChangedAnything) {
                    const result = confirm('You have unsaved changes. Are you sure you want to continue');
                    if (result) {
                      handleChangedAnythingToFalse();
                      handleTabIndexChange(event, newValue);
                    }
                  } else {
                    handleTabIndexChange(event, newValue);
                  }
                }}
                aria-label="Vertical tabs"
                centered
                classes={{ indicator: classes.indicator }}
              >
                <Tab label="Edit Profile" className={classes.tab} {...a11yProps(0)} />
                <Tab label="Profile Photo" className={classes.tab} {...a11yProps(1)} />
                <Tab label="Payment" className={classes.tab} {...a11yProps(2)} />
              </Tabs>
            </Grid>
            <Grid item xs={12} sm={8} md={7} component="section">
              <Card elevation={6} square className={classes.rightColumn}>
                <TabPanel value={currentTabIndex} index={0}>
                  <EditProfile
                    userState={userState}
                    dispatchUserContext={dispatchUserContext}
                    handleChangedAnything={handleChangedAnything}
                    handleChangedAnythingToFalse={handleChangedAnythingToFalse}
                  />
                </TabPanel>
                <TabPanel value={currentTabIndex} index={1}>
                  <ProfilePhoto
                    userState={userState}
                    dispatchUserContext={dispatchUserContext}
                    handleChangedAnything={handleChangedAnything}
                    handleChangedAnythingToFalse={handleChangedAnythingToFalse}
                  />
                </TabPanel>
                <TabPanel value={currentTabIndex} index={2}>
                  <PaymentMethods />
                </TabPanel>
              </Card>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Settings;
