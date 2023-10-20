import { AppBar, Box, Toolbar, Typography, Button, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';
import { useSelector } from "react-redux";
import DrawerComp from './DrawerComp';


const Navbar = () => {
  const { access_token } = getToken();
  const { id } = useSelector(state => state.user)
  const { is_patient, is_doctor } = useSelector(state => state.user)
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

  let booking_url = `/booking/${id}`
  let doctor_review=`/doctorreview/${id}`


  return <>
    <CssBaseline />

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant='h5' component="div" sx={{ flexGrow: 1 }}>VaxHub</Typography>

          {isMatch ? (
            <DrawerComp />
          ) : (
            <>
              <Button component={NavLink} to="/" style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' }; }} sx={{ color: 'white', textTransform: 'none' }} >
                Home
              </Button>

              {access_token ? (is_patient ? (
                <Button component={NavLink} to="/dashboard" style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' }; }} sx={{ color: 'white', textTransform: 'none' }} >
                  Dashboard
                </Button>
              ) : null
              ) : (
                <Button component={NavLink} to="/login" style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' }; }} sx={{ color: 'white', textTransform: 'none' }} >
                  Login/Registration
                </Button>
              )}

              {access_token ? (
                <Button component={NavLink} to={booking_url} style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' }; }} sx={{ color: 'white', textTransform: 'none' }} >
                  Booking
                </Button>
              ) : null}

              {access_token ? (
                is_doctor ? (
                  <Button component={NavLink} to="/doctordata" style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' }; }} sx={{ color: 'white', textTransform: 'none' }} >
                    Add Data
                  </Button>
                ) : null
              ) : null}

              {access_token ? (
                is_doctor ? (
                  <Button component={NavLink} to={doctor_review} style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' }; }} sx={{ color: 'white', textTransform: 'none' }} >
                    Review
                  </Button>
                ) : null
              ) : null}

              {access_token ? (
                <Button component={NavLink} to="/profile" style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' }; }} sx={{ color: 'white', textTransform: 'none' }} >
                  Profile
                </Button>
              ) : null}

            </>
          )}


        </Toolbar>
      </AppBar>
    </Box>
  </>;
};

export default Navbar;





// Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>

//           {access_token ? is_patient? <Button component={NavLink} to='/dashboard' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Dashboard</Button>:'' : <Button component={NavLink} to='/login' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Login/Registration</Button>}

//           {access_token ? <Button component={NavLink} to={booking_url} style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Booking</Button> : ''}
//           {access_token ? is_doctor? <Button component={NavLink} to='/doctordata' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Add Data</Button>:'' : ''}

//           {access_token ? <Button component={NavLink} to='/profile' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Profile</Button> : ''}











// import { AppBar, Box, Toolbar, Typography, Button, CssBaseline ,useMediaQuery,useTheme} from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { getToken } from '../services/LocalStorageService';
// import { useSelector } from "react-redux";
// import DrawerComp from './DrawerComp';


// const Navbar = () => {
//   const { access_token } = getToken();
//   const { id } =useSelector(state=>state.user)
//   const { is_patient,is_doctor } =useSelector(state=>state.user)

//   let booking_url=`/booking/${id}`


//   return <>
//     <CssBaseline />

//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" color="secondary">
//         <Toolbar>
//           <Typography variant='h5' component="div" sx={{ flexGrow: 1 }}>VaxHub</Typography>

//           <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>

//           {access_token ? is_patient? <Button component={NavLink} to='/dashboard' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Dashboard</Button>:'' : <Button component={NavLink} to='/login' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Login/Registration</Button>}

//           {access_token ? <Button component={NavLink} to={booking_url} style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Booking</Button> : ''}
//           {access_token ? is_doctor? <Button component={NavLink} to='/doctordata' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Add Data</Button>:'' : ''}

//           {access_token ? <Button component={NavLink} to='/profile' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Profile</Button> : ''}


//         </Toolbar>
//       </AppBar>
//       <DrawerComp></DrawerComp>
//     </Box>
//   </>;
// };

// export default Navbar;
