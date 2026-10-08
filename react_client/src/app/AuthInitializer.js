import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getToken, removeToken } from '../services/LocalStorageService';
import { setUserToken, unSetUserToken } from '../features/authSlice';
import { setUserInfo, unSetUserInfo } from '../features/userSlice';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { CircularProgress, Box } from '@mui/material';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { access_token } = getToken();
  const [initialized, setInitialized] = useState(false);
  const {data,isSuccess,isError,isLoading,} = useGetLoggedUserQuery({skip: !access_token,});

  useEffect(() => {
    if (!access_token) {
      setInitialized(true);
      return;
    }

    dispatch(setUserToken({
      access_token
    }));
  }, [access_token, dispatch]);

  useEffect(() => {
    if (isSuccess && data) {

      dispatch(setUserInfo({
        id: data.id,
        email: data.email,
        name: data.name,
        is_patient: data.is_patient,
        is_doctor: data.is_doctor,
      }));

      setInitialized(true);
    }

    if (isError) {

      removeToken();

      dispatch(unSetUserToken({
        access_token: null
      }));

      dispatch(unSetUserInfo({
        id: '',
        email: '',
        name: '',
        is_patient: '',
        is_doctor: '',
      }));

      setInitialized(true);
    }
  }, [isSuccess, isError, data, dispatch]);

  if (!initialized || (access_token && isLoading)) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return children;
};

export default AuthInitializer;