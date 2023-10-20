import { TextField, FormControlLabel, Checkbox, Button, Box, Alert, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../services/userAuthApi';
import { getToken, storeToken } from '../../services/LocalStorageService';
import { setUserToken } from '../../features/authSlice';
import { useDispatch } from 'react-redux';

const Registration = () => {

  // const [error, setError] = useState({
  //   status: false,
  //   msg: "",
  //   type: ""
  // })


  const [server_error,setServerError] = useState({});

  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch=useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password2'),
      tc: data.get('tc'),
      is_patient:true,
      is_doctor:false,
    }
    // console.log(actualData)
    const res = await registerUser(actualData);
    // console.log(res)
    if (res.error){
      setServerError(res.error.data.errors)
    }
    if (res.data){
      storeToken(res.data.token)
      let {access_token}=getToken();
      dispatch(setUserToken({access_token:access_token}))
      navigate('/profile')
    }

 

  }
  return <>
    <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
        {server_error.name ? <Typography style={{fontSize: 12, color: 'red', paddingLeft: 10}}>{server_error.name[0]}</Typography> :""}
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
        {server_error.email ? <Typography style={{fontSize: 12, color: 'red', paddingLeft: 10}}>{server_error.email[0]}</Typography> :""}
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      {server_error.password ? <Typography style={{fontSize: 12, color: 'red', paddingLeft: 10}}>{server_error.password[0]}</Typography> :""}
      <TextField margin='normal' required fullWidth id='password2' name='password2' label='Confirm Password' type='password' />
      {server_error.password2 ? <Typography style={{fontSize: 12, color: 'red', paddingLeft: 10}}>{server_error.password2[0]}</Typography> :""}
      <FormControlLabel control={<Checkbox value={true} color="primary" name="tc" id="tc" />} label="I agree to term and condition." />
      {server_error.tc ? <span style={{fontSize: 12, color: 'red', paddingLeft: 10}}>{server_error.tc[0]}</span> :""}
      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Join</Button>
      </Box>
      {/* {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''} */}
      {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
    </Box>
  </>;
};

export default Registration;