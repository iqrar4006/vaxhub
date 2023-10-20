import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import DoctorPersonalPage from "./components/DoctorPersonalPage";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import Booking from "./components/Booking";
import DoctorData from "./components/DoctorData";
import DoctorReview from "./components/DoctorReview";

function App() {
  const {access_token}=useSelector(state=>state.auth)
  const { is_patient,is_doctor } =useSelector(state=>state.user)
  // console.log('is_patient',is_patient)
  // let booking_url=`/booking/:${user_data['id']}`
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={!access_token?<LoginReg />:<Navigate to='/profile'/>} />
            <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
            <Route path="/dashboard" element={access_token?is_patient?<Dashboard />:<Navigate to='/profile'/>:<Navigate to='/login'/>} />
            <Route path="/dashboard/:id" element={access_token?is_patient?<DoctorPersonalPage />:<Navigate to='/profile'/>:<Navigate to='/login'/>} />
            <Route path="/doctordata" element={access_token?is_doctor?<DoctorData />:'':<Navigate to='/login'/>} />
            <Route path="/doctorreview/:id" element={access_token?is_doctor?<DoctorReview />:'':<Navigate to='/login'/>} />


            <Route path="/profile" element={access_token?<Profile />:<Navigate to='/login'/>} />
            <Route path="booking/:id" element={access_token?<Booking />:<Navigate to='/login'/>} />
          </Route>
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
