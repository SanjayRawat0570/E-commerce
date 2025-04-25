import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import VerifyOTP from '../pages/VerifyOTP';
import ForgotPassword from '../pages/ForgotPassword';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Reset from '../pages/Reset';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/reset" element={<Reset/>}/>

        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/verify" element={<VerifyOTP />} /> */}
        <Route path="/forgot" element={<ForgotPassword />} />
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route path="/reset-password" element={<Reset />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
