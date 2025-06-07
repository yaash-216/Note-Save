import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

type Inputs = {
  Name: string;
  Email: string;
  Password: string;
};

// Register Page
const Register = (): React.ReactElement => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();
  const [error, setError] = useState<string>("");
  const [shown, setShown] = useState("false");
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/register", {
        data,
      });
      localStorage.setItem("user", JSON.stringify(response.data.message));
      navigate("/");
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="flex justify-center items-center h-full">
          <div className="bg-cyan-500 shadow-2xl  shadow-cyan-700 justify-center rounded px-6 py-3 ">
            <div className="flex justify-center my-7  flex-col ">
              <a
                href="/"
                className="text-4xl  text-center font-bold text-opacity-75 hover:text-opacity-100 text-white font"
              >
                Login
              </a>
              {error && (
                <p className="animate-bounce text-black text-center rounded-full font-bold font ">
                  {error}
                </p>
              )}
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:space-y-3 space-y-2">
                  <label
                    htmlFor="email"
                    className="text-white text-xl sm:text-3xl font"
                  >
                    Email ￫
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("Email", { required: true })}
                    className="rounded px-2 sm:!m-0 h-10 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="Email"
                  />
                  <label
                    htmlFor="password"
                    className="text-white text-xl sm:text-3xl font"
                  >
                    Password ￫
                  </label>
                  <input
                    type={shown == "false" ? "password" : "text"}
                    {...register("Password", { required: true })}
                    id="password"
                    className="rounded h-10  px-2  focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="flex items-center justify-center sm:justify-end my-2">
                  <input
                    type="checkbox"
                    className="sm:size-6 size-4 my-1 cursor-pointer accent-rose-500"
                    value={shown}
                    onChange={() =>
                      shown == "false" ? setShown("true") : setShown("false")
                    }
                  />
                  <p className="text-white text-xl mx-3 font">Show password</p>
                </div>
                <div className="flex justify-center my-3">
                  <div className="flex flex-col gap-1">
                    <button
                      type="submit"
                      className="transition-all font  text-xl rounded px-8 py-1 bg-rose-400 hover:bg-white text-white hover:text-rose-400"
                    >
                      Register
                    </button>
                    <a
                      href="/login"
                      className="text-black font-mono hover:underline"
                    >
                      have account already?
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
