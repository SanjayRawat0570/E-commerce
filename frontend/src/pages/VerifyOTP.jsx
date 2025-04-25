// src/pages/VerifyOTP.jsx
import { useForm } from "react-hook-form";
import { verifyOTP } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP({ email }) {  // Accept email as a prop
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  console.log(email)
  const onSubmit = async (data) => {
    try {
      // Pass the email along with OTP to the verifyOTP function
      await verifyOTP({ email, otp: data.otp });
      alert("OTP verified! You can now log in.");
      navigate("/");
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Verify OTP</h2>
      {/* Email field is now passed as a prop and not part of the form */}
      {/* <input type="text" value={email} readOnly /> Display email */}
      <input placeholder="OTP Code" {...register("otp", { required: true })} />
      <button type="submit">Verify</button>
    </form>
  );
}
