import { Button, CssBaseline, Grid, Typography, TextField, Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DoctorPage from '../components/DoctorPage'
import { getToken } from '../services/LocalStorageService';
import { useGetAllDoctorQuery, useGetSearchDoctorQuery } from '../services/userAuthApi';
import { useEffect, useState } from 'react';


const Dashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { access_token } = getToken()
  const [actualData, setActualData] = useState({})
  const allDoctorQuery = useGetAllDoctorQuery(access_token)
  const searchDoctorQuery = useGetSearchDoctorQuery({ search_key: actualData['search_key'], access_token: access_token })
  const [arr, setArr] = useState([])
  const [boo, setBoo] = useState(true)

  const data = boo ? allDoctorQuery.data : searchDoctorQuery.data;
  const isSuccess = boo ? allDoctorQuery.isSuccess : searchDoctorQuery.isSuccess;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const dat = new FormData(e.currentTarget);
    setActualData({ search_key: dat.get('search') })
    setBoo(false)
  }

  useEffect(() => {
    if (data && isSuccess) {
      let new_data = data.data.map((el, i) => {
        return el;
      })
      setArr([...new_data])
    }
  }, [data, isSuccess])

  return <>
    <CssBaseline />
    <Box component='form' noValidate sx={{ my: 1, mb: 2 }} id='search-form' onSubmit={handleSubmit}>
      <Typography variant='h4' textAlign='center' sx={{ mt: 5, mb: 2, }}>Stay at Home. Consult Doctors Online.</Typography>
      <TextField margin='normal' required fullWidth id='search' name='search' placeholder='Search for any health keyword, doctor' sx={{ mx: '15%', width: '70%', color: 'info' }} InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon />  </InputAdornment>,
      }} />
      <Box textAlign='center'>
        <Button type='submit' color='secondary' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Search</Button>
      </Box>
      <Box sx={{ mt: 5 }}  >
        <Stack display="flex" alignItems="center" justifyContent="center" direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 4, md: 6 }} >
          <Paper sx={{ p: 1, mx: 1 }} variant="outlined"><LocalHospitalIcon color='secondary' sx={{ fontSize: 100 }} /></Paper>
          <Paper sx={{ p: 1, mx: 1 }} variant="outlined"><BloodtypeOutlinedIcon color='secondary' sx={{ fontSize: 100 }} /> </Paper>
          <Paper sx={{ p: 1, mx: 1 }} variant="outlined"><VaccinesOutlinedIcon color='secondary' sx={{ fontSize: 100 }} /></Paper>
        </Stack>
      </Box>
    </Box>


    {arr.map(((el, i) => (
      <DoctorPage key={i} info={el} />
    )))}

  </>;
};

export default Dashboard;
