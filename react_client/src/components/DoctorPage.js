import { Card, CardContent, CardMedia, Typography, Box, CssBaseline, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react'

const DoctorPage = (props) => {
  // console.log('props',props)
  let navigate = useNavigate()
  let im = `http://127.0.0.1:8000${props.info.doctor_image}`
  return (
    <>
      <CssBaseline />
      <Paper variant="outlined" >
        <Card sx={{ display: 'flex', p: 2, my: 3, mx: 5, flexDirection: { sm: 'column', md: 'row', xs: 'column' } }}>

          <CardMedia sx={{ height: 250, borderRadius: 1, width: { md: '20%', sm: '30%', xs: 200 }, mx: { sm: 'auto', md: 0, xs: 'auto' } }}
            image={im}
            alt="Doctor"
            component='img'
          />
          <Box sx={{ display: 'flex', flexDirection: { sm: 'row', xs: 'column' }, width: { lg: '80%', md: '100%' },justifyContent:'space-evenly' }}>

            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
              <Typography component="div" variant="h6" sx={{ my: 1, }}>{props.info.name.toUpperCase()}</Typography>
              <Typography variant="h6" component="div" sx={{ my: 1 }}>
                Spec: {props.info.specialist.toUpperCase()}
              </Typography>
              <Typography variant="h6" component="div">
                Experience: {props.info.experience}
              </Typography>
            </CardContent>

            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', pl:{sm:0,xs:2.5} }}>
              <Typography variant="h6" component="div"sx={{ my: 1 }}>
                Fees: {props.info.fee}
              </Typography>
              <Button onClick={() => { navigate(`/dashboard/${props.info.user}`) }} color='secondary' variant='contained' sx={{ my: 1 }}>Booking</Button>
            </CardContent>

          </Box>
        </Card>
      </Paper>
    </>
  )
}

export default DoctorPage











