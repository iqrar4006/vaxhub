import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './auth/ChangePassword';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { unSetUserToken } from '../features/authSlice';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useEffect, useState } from 'react';
import { setUserInfo, unSetUserInfo } from '../features/userSlice';

const Profile = () => {
  
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const { id, email, name, is_patient, is_doctor } =useSelector(state => state.user)

  const handleLogout = () => {
    // console.log("Logout Clicked");
    removeToken()
    dispatch(unSetUserInfo({id:'',email:'',name:'',is_patient:'',is_doctor:''}))
    dispatch(unSetUserToken({ access_token:null }))
    navigate('/login')
  }

  return <>
    <CssBaseline />
    <Grid container>
      <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
        <h1>Profile</h1>
        <Typography variant='h5'>Email: {email}</Typography>
        <Typography variant='h6'>Name: {name.toUpperCase()}</Typography>
        <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>
      </Grid>
      <Grid item sm={8}>
        <ChangePassword />
      </Grid>
    </Grid>
  </>;
};

export default Profile;