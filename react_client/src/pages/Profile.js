import { Button, CssBaseline, Grid, Typography } from '@mui/material';
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
  const { access_token }=getToken()
  const { data, isSuccess }=useGetLoggedUserQuery(access_token)
  // console.log('data',data)
  const [ userData, setUserData ] =useState({
    id:'',
    email:'',
    name:'',
    is_patient:'',
    is_doctor:'',
  })

  const handleLogout = () => {
    // console.log("Logout Clicked");
    removeToken()
    dispatch(unSetUserInfo({id:'',email:'',name:'',is_patient:'',is_doctor:''}))
    dispatch(unSetUserToken({ access_token:null }))
    navigate('/login')
  }
  useEffect(() => {
    if (data && isSuccess){
      setUserData({id:data.id,email:data.email,name:data.name,is_patient:data.is_patient,is_doctor:data.is_doctor})
    }
  },[data, isSuccess])

  useEffect(() => {
    if (data && isSuccess){
      dispatch(setUserInfo({
        id:data.id,
        email:data.email,
        name:data.name,
        is_patient:data.is_patient,
        is_doctor:data.is_doctor,
      }))
    }
  },[data, isSuccess,dispatch])


  return <>
    <CssBaseline />
    <Grid container>
      <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
        <h1>Profile</h1>
        <Typography variant='h5'>Email: {userData.email}</Typography>
        <Typography variant='h6'>Name: {userData.name.toUpperCase()}</Typography>
        <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>
      </Grid>
      <Grid item sm={8}>
        <ChangePassword />
      </Grid>
    </Grid>
  </>;
};

export default Profile;
