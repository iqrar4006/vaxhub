import { Card, CardContent, CardMedia, Typography, Box, CssBaseline, Paper, Button, TextField, Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Review from './Review';
import RatingDoctor from './RatingDoctor';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDoctorAppointmentMutation, useGetDoctorQuery, useReviewRetrieveQuery } from '../services/userAuthApi';
import { getToken } from '../services/LocalStorageService';
import { useSelector } from 'react-redux';


const DoctorPersonalPage = () => {

    const { access_token } = getToken()
    let { id } = useParams()
    const { data, isSuccess } = useGetDoctorQuery({ id, access_token })
    const doctorReview = useReviewRetrieveQuery({ id, access_token })
    const user_data = useSelector(state => state.user)
    const [doctorAppointment] = useDoctorAppointmentMutation();
    // console.log('user',user_data.id)
    const [formData, setFormData] = useState({
        selectedDate: null,
        selectedTime: null,
    });

    const [arr, setArr] = useState({})
    const [server_error, setServerError] = useState({});
    const navigate = useNavigate();
    const [reviw, setReviw] = useState([])


    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            selectedDate: date,
        });
    };
    const handleTimeChange = (time) => {
        setFormData({
            ...formData,
            selectedTime: time,
        });
    };


    let im = `http://127.0.0.1:8000${arr['doctor_image']}`

    const handleClick = async (e) => {
        // e.preventDefault();
        const formattedDate = formData.selectedDate ? dayjs(formData.selectedDate).format('YYYY-MM-DD') : '';
        const formattedTime = formData.selectedTime ? dayjs(formData.selectedTime).format('hh:mm') : '';
        const actualData = {
            doctor_name: arr['name'],
            doctor_email: arr['email'],
            patient_name: user_data.name,
            patient_email: user_data.email,
            problem: arr['specialist'],
            fees: arr['fee'],
            appointment_date: formattedDate,
            appointment_time: formattedTime,
        }


        const res = await doctorAppointment({ actualData, access_token });
        // console.log('res',res)
        if (res.error) {

            setServerError(res.error.data.errors)
        }
        if (res.data) {
            navigate(`/booking/${user_data.id}`)
        }
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based (0 = January)
    const day = currentDate.getDate();

    // You can format the date as needed, for example, "YYYY-MM-DD"
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const minTimeStr = arr['avail_time_start'];
    const minTime = `${formattedDate}T${minTimeStr}`
    const maxTimeStr = arr['avail_time_end'];
    const maxTime = `${formattedDate}T${maxTimeStr}`

    useEffect(() => {
        if (data && isSuccess) {
            let new_data = data.data
            setArr({ ...new_data })
        }
    }, [data, isSuccess])

    useEffect(() => {
        if (doctorReview.data && doctorReview.isSuccess) {
            let new_data = doctorReview.data.data.map((el, i) => {
                return el;
            })
            setReviw([...new_data])
        }
    }, [doctorReview.data, doctorReview.isSuccess])

    return (
        <>
            <CssBaseline />
            <Paper variant="outlined" >
                <Card sx={{ display: 'flex', p: 2, my: 3, mx: 5, flexDirection: { sm: 'column', md: 'row', xs: 'column' } }}>

                    <CardMedia
                        sx={{ height: 250, borderRadius: 1, width: { md: '20%', sm: '30%', xs: 200 }, mx: { sm: 'auto', md: 0, xs: 'auto' } }}
                        image={im}
                        alt="Doctor"
                    ></CardMedia>

                    <Box sx={{ display: 'flex', flexDirection: { sm: 'row', xs: 'column' }, width: { lg: '80%', md: '100%' } }}>
                        <Box sx={{ width: { sm: '75%', xs: '100%' } }} >
                            <Box sx={{ display: 'flex', flexDirection: { sm: 'row', xs: 'column' }, justifyContent: 'space-around' }} >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    <Typography component="div" variant="h6" sx={{ my: 1, }}>
                                        {arr['name']?arr['name'].toUpperCase():''}
                                    </Typography>
                                    <Typography variant="h6" component="div" sx={{ my: 1 }}>
                                        Experience:{arr['experience']}
                                    </Typography>
                                    <Typography variant="h6" component="div" sx={{ my: 1 }}>
                                        Study: {arr['study']?arr['study'].toUpperCase():''}
                                    </Typography>
                                </CardContent>

                                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    <Typography variant="h6" component="div" sx={{ my: 1 }}>
                                        Time: {arr['avail_time_start']} AM - {arr['avail_time_end']} PM
                                    </Typography>
                                    <Typography variant="h6" component="div" sx={{ my: 1 }}>
                                        Specialist: {arr['specialist']?arr['specialist'].toUpperCase():''}
                                    </Typography>
                                    <Typography variant="h6" component="div" sx={{ my: 1 }}>
                                        Fees: {arr['fee']}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <Box>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <Typography variant="h6" component="div" sx={{ my: 1 }}>
                                        About: {arr['about']}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Box>
                        <Box sx={{ width: { sm: '25%', xs: '100%' } }}>
                            <CardContent sx={{ display: 'flex', flexDirection: { sm: 'row', xs: 'column' }, justifyContent: 'space-evenly' }}>

                                <Stack sx={{ mt: 1 }} spacing={{ sm: 2, md: 3, xs: 1 }} >

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker placeholder="Select Date" minDate={dayjs(formattedDate)} value={formData.selectedDate} onChange={handleDateChange}  > {(params) => <TextField {...params} variant="standard" />} </DatePicker>
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker placeholder="Select Time" minTime={dayjs(minTime)} maxTime={dayjs(maxTime)} value={formData.selectedTime} onChange={handleTimeChange} > {(params) => <TextField {...params} variant="standard" />} </TimePicker>
                                    </LocalizationProvider>

                                    <Button color='secondary' type='submit' variant='contained' sx={{ my: 1 }} onClick={handleClick}>Booking</Button>
                                    {server_error.appointment_date ? <Typography style={{ fontSize: 8, color: 'red', }}>{server_error.appointment_date[0]}</Typography> : ""}
                                    {server_error.appointment_time ? <Typography style={{ fontSize: 8, color: 'red', }}>{server_error.appointment_time[0]}</Typography> : ""}
                                </Stack>

                            </CardContent>
                        </Box>
                    </Box>
                </Card>
            </Paper>

            <Typography component="div" variant="h3" sx={{ mx: 10, mt: 2 }}>Review</Typography>
            <Box m={5} sx={{ display: 'flex', flexDirection: { md: 'row', sm: 'column', xs: 'column' } }}>
                <Box sx={{ width:{ md:1/2,sm:1} }}>

                    {reviw.length >= 1 ? reviw.map(((el, i) => (
                        <Review key={i} info={el} />
                    ))) : <Paper variant="outlined" sx={{ px: 4 }}>
                        <Box >
                            <Typography component="div" variant="h5" sx={{ my: 1, }}>
                                No review yet !!
                            </Typography>

                        </Box>
                    </Paper>}

                </Box>
                <Box sx={{ width:{ md:1/2,sm:1},ml:{sm:0,md:4 },mt:{md:0,sm:4,xs:4} }}>
                <RatingDoctor />
                </Box>
                
            </Box>

        </>
    )
}

export default DoctorPersonalPage
