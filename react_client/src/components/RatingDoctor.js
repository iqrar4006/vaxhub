import { Typography, Box, CssBaseline, Button, Rating, TextField, CircularProgress,Alert } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';
import { useGetDoctorQuery } from '../services/userAuthApi';
import { useSelector } from 'react-redux';
import { useReviewInsertMutation } from '../services/userAuthApi';



const RatingDoctor = () => {

    const { access_token } = getToken()
    let { id } = useParams()
    const { data, isSuccess } = useGetDoctorQuery({ id, access_token })
    const user_data =useSelector(state=>state.user)

    const [value, setValue] = useState(0);
    const [doctor_data, setDoctorData] = useState({})
    const [server_error,setServerError] = useState({});
    const [ reviewInsert ] = useReviewInsertMutation();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            doctor_name:doctor_data.name,
            doctor_email:doctor_data.email,
            patient_name:user_data.name,
            patient_email:user_data.email,
            review: data.get('review'),
            rating: data.get('rating'),
        }

        const res = await reviewInsert({actualData,access_token});
        if (res.error){
            
          setServerError(res.error.data.errors)
        }
        if (res.data){
            setServerError({"msg":res.data.msg})
            // console.log(props.revupd)
            // console.log(props.rev)
            // props.revupd([])
            

        }
        
    }
    

    useEffect(() => {
        if (data && isSuccess) {
            let new_data = data.data
            setDoctorData({ ...new_data })
        }
    }, [data, isSuccess])

    return (
        <>
            <CssBaseline />
            <Box component='form' noValidate  id='review-form' onSubmit={handleSubmit}>
                <TextField margin='normal' required fullWidth id='review' name='review' multiline rows={4} sx={{mt:0}}
                    placeholder="Write your review after appointment..." />
                {server_error.review ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.review[0]}</Typography> : ""}
                <Rating name="rating" value={value} onChange={(event, newValue) => { setValue(newValue); }} />
                {server_error.rating ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.rating[0]}</Typography> : ""}
                <Box textAlign='center'>
                    <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Submit</Button>
                </Box>
                {server_error.msg ? <Alert severity='success'>{server_error.msg}</Alert> : ''}
                {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
            </Box>
        </>
    )
}

export default RatingDoctor
