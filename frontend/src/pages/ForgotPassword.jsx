// src/pages/ForgotPassword.jsx
import { useForm } from "react-hook-form";
import { sendOTP } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await sendOTP(data.email);
      alert("OTP sent to your email.");
      navigate("/reset-password");
    } catch (err) {
      alert("Failed to send OTP. Try again.",err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        {...register("email", { required: "Email is required" })}
      />
      <p>{errors.email?.message}</p>
      <button type="submit">Send OTP</button>
    </form>
  );
}
