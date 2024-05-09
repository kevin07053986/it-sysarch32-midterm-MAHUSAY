import { axiosPrivate } from "../axios/axiosPrivate";
import { useAppContext } from "../provider";
import logo from "../assets/logo.png";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye } from "lucide-react";
import FieldInput from "../components/FieldInput";
import Button from "../components/Button";

const Login = () => {
  const { login, setTokenExpired } = useAppContext();

  const emailRef = useRef<HTMLInputElement>(null);
  const [errorMes, setErrorMes] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [loggingIn, setLogginIn] = useState(false);

  useEffect(() => emailRef.current?.focus(), []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLogginIn(true);
      const response = await axiosPrivate.post("/api/auth/login", {
        email: emailRef.current?.value,
        password,
      });

      console.log("DATA DURING LOGIN", response.data);
      login({ ...response.data.user, token: response.data.token });
      setTokenExpired(false); //NEED THIS SO THAT IF USER RE-LOGS IN WE RESET TO TOKEN EXPIRED STATE
      console.log(response);
    } catch (error: any) {
      console.log(error);
      setErrorMes(error.response.data.message);
    } finally {
      setLogginIn(false);
    }
  };
  return (
    <form 
      onSubmit={handleLogin}
      onChange={() => setErrorMes(null)}
      className="z-[1] w-full max-w-[330px] mx-auto flex flex-col gap-2 text-black"
    >
      
      <div className="flex flex-col gap-1 ">
        <label htmlFor="email" className="text-black font-medium">
          Email
        </label>
        <input
          ref={emailRef}
          className="flex-1 outline-none border-2 border-purple-700 py-2 px-4 rounded"
          type="text"
          id="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="mt-5 flex flex-col gap-1">
        <label className="text-black font-medium" htmlFor="password">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 outline-none border-2 border-purple-700 py-2 px-4 rounded"
          type={`${showPassword ? "text" : "password"}`}
          id="password"
          placeholder="Password"
          required
        />
      </div>
      <button className="mt-5 bg-purple-500 py-2 w-full" disabled={loggingIn}>
        {loggingIn ? "Authenticating..." : "Log in"}
      </button>
      <p className="font-normal text-sm text-black">
       {" "}
        <Link to="/signup" className="font-bold">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default Login;
