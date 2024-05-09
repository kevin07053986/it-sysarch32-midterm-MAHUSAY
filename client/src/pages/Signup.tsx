import logo from "../assets/logo.png";
import { User2, Mail, Lock } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { axiosPrivate } from "../axios/axiosPrivate";
import { useAppContext } from "../provider";
import { useNavigate } from "react-router-dom";

type UserDataProps = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<UserDataProps>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => emailRef.current?.focus(), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSaving(true);
      const response = await axiosPrivate.post("/api/auth/signup", userData);
      login({ ...response.data.user, token: response.data.token });
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.message);
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleCreateUser}
      className="z-[1] w-full max-w-[330px] flex flex-col gap-5 text-black"
    >
      <h1 className="text-center text-2xl font-medium mb-5 text-purple-700">Register</h1>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col bg-white gap-1">
          <label htmlFor="name" className=" text-black font-medium">
            Username
          </label>
          <input
            ref={emailRef}
            value={userData.name}
            onChange={handleChange}
            name="name"
            className="flex-1 outline-none border-2 border-purple-700 py-2 px-4 rounded font-medium "
            type="text"
            id="name"
            placeholder="Username"
            required
          />
        </div>
        <div className="flex flex-col bg-white gap-1 text-black font-medium">
          <label htmlFor="email" className="">
             Email
          </label>
          <input
            value={userData.email}
            onChange={handleChange}
            name="email"
            className="flex-1 outline-none border-2 border-purple-700 py-2 px-4 rounded font-medium"
            type="text"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-col bg-white gap-1 text-black font-medium">
          <label htmlFor="password" className="">
          Password
          </label>
          <input
            value={userData.password}
            onChange={handleChange}
            name="password"
            className="flex-1 outline-none border-2 border-purple-700 py-2 px-4 rounded font-medium"
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
      </div>
      <button className="w-full bg-purple-700 py-2 text-white  " disabled={saving}>
        Register
      </button>


      <p className="text-sm -mt-3 font-normal w-full ">
        {" "}
        <Link to="/" className="font-bold ">
          Log in
        </Link>
      </p>
    </form>
  );
};

export default Signup;
