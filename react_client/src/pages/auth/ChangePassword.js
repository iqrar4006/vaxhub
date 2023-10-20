import { Box, TextField, Button, Alert, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from '../../services/LocalStorageService';
import { useChangeUserPasswordMutation } from '../../services/userAuthApi';

const ChangePassword = () => {
  // const [error, setError] = useState({
  //   status: false,
  //   msg: "",
  //   type: ""
  // });

  const [server_error,setServerError] =useState({})
  const [server_msg,setServerMsg] =useState({})
  const [ changeUserPassword ] =useChangeUserPasswordMutation()
  const {access_token}= getToken()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      password: data.get('password'),
      password2: data.get('password2'),
    }

    const res=await changeUserPassword({actualData,access_token})
    if (res.error){
      setServerError(res.error.data.errors)
      setServerMsg({})
      // console.log(server_error)
    }
    if (res.data){
      // console.log(res)
      setServerMsg(res.data)
      setServerError({})
      document.getElementById("password-change-form").reset();
    }
    // if (actualData.password && actualData.password2) {
    //   if (actualData.password === actualData.password2) {
    //     console.log(actualData);
    //     document.getElementById("password-change-form").reset();
    //     setError({ status: true, msg: "Password Changed Successful", type: "success" });
    //   } else {
    //     setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: "error" })
    //   }
    // } else {
    //   setError({ status: true, msg: "All Fields are Required", type: "error" })
    // }

  };
  
  const myData = useSelector(state=>state.user)
  // console.log(myData) 

  return <>
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
      <h1>Change Password</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} id="password-change-form">
        <TextField margin="normal" required fullWidth name="password" label="New Password" type="password" id="password" />
        {server_error.password ? <Typography style={{fontSize: 12, color: 'red', paddingLeft: 10}}>{server_error.password[0]}</Typography> :""}
        <TextField margin="normal" required fullWidth name="password2" label="Confirm New Password" type="password" id="password2" />
        {server_error.password2 ? <Typography style={{fontSize: 12, color: 'red', paddingLeft: 10}}>{server_error.password2[0]}</Typography> :""}
        <Box textAlign='center'>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 }}> Update </Button>
        </Box>
        {/* {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""} */}
        {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
        {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert>:''}
      </Box>
    </Box>
  </>;
};

export default ChangePassword;
