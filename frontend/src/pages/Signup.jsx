import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "../api/auth";
import VerifyOTP from "./VerifyOTP";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function Signup() {
  const [otpSent, setotpSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const email = watch("email"); // ✅ Correct usage

  const onSubmit = async (data) => {
    try {
      await signup(data);
      setotpSent(true);
      alert("Signup successful. Please check your email for OTP.");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Signup</h2>

        <input placeholder="Name" {...register("name")} />
        <p>{errors.name?.message}</p>

        <input type="email" placeholder="Email" {...register("email")} />
        <p>{errors.email?.message}</p>

        <input type="password" placeholder="Password" {...register("password")} />
        <p>{errors.password?.message}</p>

        <button type="submit">Signup</button>
      </form>

      {otpSent && <VerifyOTP email={email} />}

      <div>
        <p>have account</p>
        <a href="/login">Login</a>
      </div>
    </>
  );
}
