import { TextField, FormControlLabel, Checkbox, Button, Box, Alert, Typography,CssBaseline } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDoctordataMutation } from '../services/userAuthApi';
import { getToken } from '../services/LocalStorageService';

const DoctorData = () => {
    const { id,name,email } =useSelector(state=>state.user)
    console.log(name,email)
    const { access_token } = getToken()
    const [server_error, setServerError] = useState({});
    const [doc_img,setDocImg]=useState('')
    const navigate = useNavigate();
    const [doctordata, { isLoading }] = useDoctordataMutation();
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('user',id)
        data.append('name',name)
        data.append('email',email)
        data.append('doctor_image',doc_img)
        data.append('study',e.currentTarget.study.value)
        data.append('specialist',e.currentTarget.specialist.value)
        data.append('experience',e.currentTarget.experience.value)
        data.append('fee',e.currentTarget.fee.value)
        data.append('avail_time_start',e.currentTarget.avail_time_start.value)
        data.append('avail_time_end',e.currentTarget.avail_time_end.value)
        data.append('about',e.currentTarget.about.value)


       
        const res = await doctordata({ data,access_token });
        if (res.error){
          setServerError(res.error.data.errors)
        }
        if (res.data){
          document.getElementById('doctor-data').reset()
          setServerError({"msg":res.data.msg})
        }



    }
    return <>
        <CssBaseline />
        <Typography component="div" variant="h3" sx={{ mx: 10, mt: 2 }}>Add Your Data</Typography>
        <Box component='form' noValidate sx={{ mt: 1,mx:2,px:4,pt:2 }} id='doctor-data' onSubmit={handleSubmit}>
            <Box sx={{border:1, p:2, borderColor: 'grey.500'}}>
                <input type="file" accept="image/*" required id='doctor_image' name='doctor_image' onChange={(e)=>{setDocImg(e.target.files[0])}} />
                Image
            </Box>
            
            {server_error.doctor_image ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.doctor_image[0]}</Typography> : ""}
            <TextField margin='normal' required fullWidth id='study' name='study' label='Study' />
            {server_error.study ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.study[0]}</Typography> : ""}
            <TextField margin='normal' required fullWidth id='specialist' name='specialist' label='Specialist' />
            {server_error.specialist ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.specialist[0]}</Typography> : ""}
            <TextField margin='normal' required fullWidth id='experience' name='experience' label='Experience' type='number' inputProps={{min:0}}/>
            {server_error.experience ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.experience[0]}</Typography> : ""}
            <TextField margin='normal' required fullWidth id='fee' name='fee' label='Fee' type='number' inputProps={{min:0}} />
            {server_error.fee ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.fee[0]}</Typography> : ""}
            <TextField margin='normal' required fullWidth id='avail_time_start' name='avail_time_start' helperText='Start Time' type='time' />
            {server_error.avail_time_start ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.avail_time_start[0]}</Typography> : ""}
            <TextField margin='normal' required fullWidth id='avail_time_end' name='avail_time_end' helperText='End Time' type='time' />
            {server_error.avail_time_end ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.avail_time_end[0]}</Typography> : ""}
            <TextField margin='normal' required fullWidth id='about' name='about' label='About' />
            {server_error.about ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.about[0]}</Typography> : ""}
            <Box textAlign='center'>
                <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Submit</Button>
            </Box>
            {server_error.msg ? <Alert severity='success'>{server_error.msg}</Alert> : ''}
            {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
        </Box>
    </>;
};

export default DoctorData
