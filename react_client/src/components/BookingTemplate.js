import { Typography, Box, CssBaseline, Paper, Button, Rating, TextField, CircularProgress, Badge } from '@mui/material';
import React from 'react'

const BookingTemplate = (props) => {
    // console.log(props)
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based (0 = January)
    const day = currentDate.getDate();

    // You can format the date as needed, for example, "YYYY-MM-DD"
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    // console.log(props.info.appointment_date<formattedDate)
    return (
        <>
            <CssBaseline />
            <Badge badgeContent={props.info.appointment_date>=formattedDate?'pending':'successfull'} color={props.info.appointment_date>=formattedDate?'error':'success'} sx={{ my: 2,width:1, }} >
                <Box sx={{ my: 1,width:1 }} >
                    <Paper variant="outlined" sx={{ px: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: { md: 'row', sm: 'column', xs: 'column' }, justifyContent: 'space-around', py: 1 }}>
                            <Box >
                                <Typography component="div" variant="h5" sx={{ my: 1, }}>
                                    Patient Name: {props.info.patient_name.toUpperCase()}
                                </Typography>
                                <Typography component="div" variant="h5" sx={{ my: 1, }}>
                                    Patient email: {props.info.patient_email}
                                </Typography>
                                <Typography component="div" variant="h5" sx={{ my: 1, }}>
                                    Doctor name: {props.info.doctor_name.toUpperCase()}
                                </Typography>
                                <Typography component="div" variant="h5" sx={{ my: 1, }}>
                                    Doctor email: {props.info.doctor_email}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography component="div" variant="h5" sx={{ my: 1, }}>
                                    Problem: {props.info.problem.toUpperCase()}
                                </Typography>
                                <Typography component="div" variant="h5" sx={{ my: 1, }}>
                                    Appointment date: {props.info.appointment_date}
                                </Typography>
                                <Typography component="div" variant="h5" sx={{ my: 1, }}>
                                    Appointment time: {props.info.appointment_time}
                                </Typography>
                                <Typography component="div" variant="h5" sx={{ my: 1, }}>
                                    <Button type='submit' variant='outlined'>₹ {props.info.fees}</Button>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                </Box>
            </Badge>



        </>
    )
}

export default BookingTemplate
