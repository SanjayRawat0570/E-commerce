// src/pages/VerifyOTP.jsx
import { useForm } from "react-hook-form";
import { verifyOTP } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await verifyOTP(data);
      alert("OTP verified! You can now log in.");
      navigate("/");
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Verify OTP</h2>
      <input placeholder="Email" {...register("email")} />
      <input placeholder="OTP Code" {...register("otp")} />
      <button type="submit">Verify</button>
    </form>
  );
}
