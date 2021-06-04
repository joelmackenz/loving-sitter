import { useState, ChangeEvent } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EditProfile from '../../components/EditProfile/EditProfile';
import ProfilePhoto from '../../components/ProfilePhoto/ProfilePhoto';
import PaymentMethods from '../../components/PaymentMethods/PaymentMethods';
import useStyles from './useStyles';

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
  const [currentTab, setCurrentTab] = useState('');
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const handleTabIndexChange = (event: any, newValue: number) => {
    setCurrentTabIndex(newValue);
  };
  return (
    <Container className={classes.root}>
      <Grid container component="main" justify="space-evenly">
        <CssBaseline />
        <Grid item xs={12} sm={8} md={2} component="section" className={classes.leftColumn}>
          <Tabs
            orientation="vertical"
            value={currentTabIndex}
            onChange={handleTabIndexChange}
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
            {/* {currentTab === 'profilePhoto' ? (
              <ProfilePhoto />
            ) : currentTab === 'payment' ? (
              <PaymentMethods />
            ) : (
              <EditProfile />
            )} */}
            <TabPanel value={currentTabIndex} index={0}>
              <EditProfile />
            </TabPanel>
            <TabPanel value={currentTabIndex} index={1}>
              <ProfilePhoto />
            </TabPanel>
            <TabPanel value={currentTabIndex} index={2}>
              <PaymentMethods />
            </TabPanel>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;

// import { makeStyles } from '@material-ui/core/styles';

// function TabPanel(props: any) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && children}
//     </div>
//   );
// }

// const a11yProps = (index: number) => {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     // flexGrow: 1,
//     // backgroundColor: theme.palette.background.paper,
//     // display: 'flex',
//     // height: 224,
//   },
// }));

// export default function VerticalTabs() {
//   const classes = useStyles();
//   const [value, setValue] = useState(0);

//   const handleChange = (event: any, newValue: any) => {
//     setValue(newValue);
//   };

//   return (
//     <div className={classes.root}>
//       <Tabs
//         orientation="vertical"
//         value={value}
//         onChange={handleChange}
//         aria-label="Vertical tabs"
//         // fsfsadaHD
//       >
//         <Tab label="Edit Profile" {...a11yProps(0)} />
//         <Tab label="Profile Photo" {...a11yProps(1)} />
//         <Tab label="Payment" {...a11yProps(2)} />
//       </Tabs>
//       <TabPanel value={value} index={0}>
//         Item One
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         Item Two
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Item Three
//       </TabPanel>
//     </div>
//   );
// }
