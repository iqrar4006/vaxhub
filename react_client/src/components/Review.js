import React from 'react'
import { Typography, Box, CssBaseline, Paper, Rating } from '@mui/material';


const Review = (props) => {
    return (
        <>
        <CssBaseline />
            <Paper variant="outlined" sx={{ px: 4 ,my:2}}>
                <Box >
                    <Typography component="div" variant="h5" sx={{ my: 1, }}>
                        {props.info.review}
                    </Typography>
                    <Typography>
                        <Rating name="read-only" value={props.info.rating} readOnly />
                    </Typography>
                    <Typography component="div" variant="h6" sx={{ my: 1, }}>
                        -{props.info.patient_name}
                    </Typography>
                </Box>
            </Paper>
        </>
    )
}

export default Review
