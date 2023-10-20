import { Card, CardContent, CardMedia, Typography, Box, CssBaseline, Paper, Button, Rating, TextField, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import BookingTemplate from './BookingTemplate';
import { useParams } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';
import { useGetAppointmentQuery } from '../services/userAuthApi';


const Booking = () => {
  let { id } = useParams()
  const { access_token } = getToken()
  const { data, isSuccess } = useGetAppointmentQuery({ id, access_token })
  const [arr, setArr] = useState([])

  useEffect(() => {
    if (data && isSuccess) {
      let new_data = data.data
      setArr([ ...new_data ])
    }
  }, [data, isSuccess])

  return (
    <>
      <CssBaseline />
      <Typography component="div" variant="h3" sx={{ mx: 10, mt: 2 }}>Booking</Typography>
      <Box m={5} sx={{px:2}} >
        {arr.length >= 1 ? arr.map(((el, i) => (
          <BookingTemplate key={i} info={el} />
        ))) : <Paper variant="outlined" sx={{ px: 4 }}>
          <Box >
            <Typography component="div" variant="h5" sx={{ my: 1, }}>
              You have no appointment !!
            </Typography>

          </Box>
        </Paper>}


      </Box>

    </>
  )
}

export default Booking
