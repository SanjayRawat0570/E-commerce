import React, { useState } from 'react'
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
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>

                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="Email" 
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input 
                    onChange={(e) => setOtp(e.target.value)} 
                    type="text" 
                    placeholder="OTP" 
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    type="password" 
                    placeholder="New Password" 
                    className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex flex-col gap-4">
                    <button 
                        onClick={sendOtp} 
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Send OTP
                    </button>

                    <button 
                        onClick={ResetPassword} 
                        className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        Reset Password
                    </button>
                </div>

                {isResetSuccessful &&
                    navigate('/login')
                }
            </div>
        </div>
    )
}

export default Reset;
