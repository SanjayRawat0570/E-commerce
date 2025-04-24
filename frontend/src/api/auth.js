import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const signup = (data) => API.post('api/auth/signup', data);
export const login = (data) => API.post('api/auth/login', data);
export const sendOTP = (email) => API.post('api/auth/send-otp', { email });
export const verifyOTP = (otpData) => API.post('api/auth/verify-otp', otpData);
export const requestPasswordReset = (email) => API.post('api/auth/request-reset', { email });
export const resetPassword = (data) => API.post('api/auth/reset-password', data);
