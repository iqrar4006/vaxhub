import { Box, CssBaseline, Typography } from '@mui/material'
import React from 'react'

const CopyRightFooter = () => {
    return (
        <>
            <CssBaseline />
            <Box sx={{ flexGrow: 1, my: 2 }}>

            <Typography variant="h6" sx={{textAlign: 'center','@media (min-width:600px)': {variant: 'subtitle1', },}}component="div" >
                Copyright &copy; {new Date().getFullYear()} VaxHub All rights reserved
            </Typography>

        </Box > 
    </>
  )
}

export default CopyRightFooter
