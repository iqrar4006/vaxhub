import React from 'react'
import { Typography, Box, CssBaseline, Paper, TextField, Stack } from '@mui/material';
import { useReviewRetrieveQuery } from '../services/userAuthApi';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';
import Review from './Review';



const DoctorReview = () => {
    const { access_token } = getToken()
    let { id } = useParams()
    const doctorReview = useReviewRetrieveQuery({ id, access_token })
    const [reviw, setReviw] = useState([])

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

                <Box sx={{ width:1,p:2 }}>

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
    </>
  )
}

export default DoctorReview
