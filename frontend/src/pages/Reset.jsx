import React, { useState } from 'react'
import Login from './Login'
import { useNavigate } from 'react-router-dom'

function Reset() {
    const [otp, setOtp] = useState('')
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isResetSuccessful, setIsResetSuccessful] = useState(false)

    const navigate = useNavigate()

    const sendOtp = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.msg);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    }

    const ResetPassword = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp, newPassword }),
            });
            const data = await response.json();
            if (response.ok) {
                setIsResetSuccessful(true);
                alert(data.msg);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    }



    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                <h2>Reset Password</h2>
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input onChange={(e) => setOtp(e.target.value)} type="text" placeholder="OTP" />
                <input onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="New Password" />
                <div>
                    <button onClick={sendOtp} >send otp</button>

                    <button onClick={ResetPassword} >Reset Password</button>
                </div>

                {isResetSuccessful &&
                    navigate('/login')
                }
            </div>
        </>
    )
}

export default Reset
