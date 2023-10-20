import { Grid, Card, Tabs, Typography, Tab, Box } from '@mui/material';
import { useState } from 'react';
import pic1 from '../../images/pic1.jpg'
import Registration from './Registration';
import DoctorRegistration from './DoctorRegistration';
import UserLogin from './UserLogin';
import { ShoppingBag } from '@mui/icons-material';

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role='tabpanel' hidden={value !== index}>
      {
        value === index && (
          <Box>{children}</Box>
        )
      }
    </div>
  )
}

const LoginReg = () => {

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    // console.log(event,newValue);
    setValue(newValue);
  }

  return <>
    <Box sx={{ mb: 4 }} >
      <Grid container sx={{ height: '90vh', }}>
        <Grid item md={7} sx={{
          backgroundImage: `url(${pic1})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', sm: 'block' }
        }}>
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <Card sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ mx: 3, height: 470 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} textColor='secondary' indicatorColor='secondary' onChange={handleChange} variant="scrollable" scrollButtons={true}>
                  <Tab label='Login' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
                  <Tab label='User Registration' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
                  <Tab label='Doctor Registration' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <UserLogin />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Registration />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <DoctorRegistration />
              </TabPanel>
            </Box>
            <Box textAlign='center' sx={{ mt: 2 }}>
              <ShoppingBag sx={{ color: 'purple', fontSize: 100 }} />
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>VaxHub</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </>;
};

export default LoginReg;
