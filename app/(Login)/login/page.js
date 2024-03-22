"use client";

import { useEffect, useState, useRef } from "react";
// import Navbar from "../components/EventHeader";

import { useRouter } from "next/navigation";
// import { LOGIN_URL } from "../_util/constants";
import { hashPassword } from "@/app/_Component/_util/hash";
import validator from "validator";
import secureLocalStorage from "react-secure-storage";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";

import { Toast } from "primereact/toast";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import ToastAlert from "@/app/_Component/_util/ToastAlerts";
export default function Login() {
  useEffect(() => {
    secureLocalStorage.clear();
  }, []);

  const toastRef = useRef();

  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const router = useRouter();

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentEmail: studentEmail,
          studentPassword: hashPassword(studentPassword), //
        }),
      });
      console.log(response);

      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        setLoading(false);
        secureLocalStorage.setItem("registerToken", data["SECRET_TOKEN"]);
        secureLocalStorage.setItem("studentFullName", data["studentFullName"]);
        secureLocalStorage.setItem("registerEmail", data["studentEmail"]);
        secureLocalStorage.setItem("isLoggedIn", 1);
        secureLocalStorage.setItem("isAmritaCBE", data["isAmritaCBE"]);
        secureLocalStorage.setItem("needActivePassport", data["needPassport"]);
        secureLocalStorage.setItem(
          "studentAccountStatus",
          data["studentAccountStatus"]
        );
        secureLocalStorage.setItem("studentPhone", data["studentPhone"]);
        secureLocalStorage.setItem(
          "studentCollegeName",
          data["studentCollegeName"]
        );
        secureLocalStorage.setItem(
          "studentCollegeCity",
          data["studentCollegeCity"]
        );
        secureLocalStorage.setItem("needPassport", data["needPassport"]);
        secureLocalStorage.setItem("studentId", data["studentId"]);

        ToastAlert(
          "success",
          "Successful Login",
          "You have logged in successfully!",
          toastRef
        );
        setTimeout(() => {
          router.push("/events");
        }, 1500);
      } else if (response.status === 500) {
        setLoading(false);
        ToastAlert(
          "error",
          "Oops!",
          "Something went wrong! Please try again.",
          toastRef
        );
      } else if (data.MESSAGE !== undefined || data.MESSAGE !== null) {
        setLoading(false);
        ToastAlert("error", "Login Failed", `${data.MESSAGE}`, toastRef);
      } else {
        setLoading(false);
        ToastAlert(
          "error",
          "Oops!",
          "Something went wrong! Please try again!",
          toastRef
        );
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      ToastAlert(
        "error",
        "Oops!",
        "Something went wrong! Please try again!",
        toastRef
      );
    }
  };

  const [webGLColors, setWebGLColors] = useState({
    color1: [43 / 255, 30 / 255, 56 / 255],
    color2: [11 / 255, 38 / 255, 59 / 255],
    color3: [15 / 255, 21 / 255, 39 / 255],
  });

  return (
    <main className="flex min-h-screen flex-col bg-[rgb(10,17,58)]">
       <div className="bg-gradient-to-r  from-cyan-500 to-blue-500 md:w-[20%] sm:w-[80%] p-8 rounded-[80%] h-[55%] left-[40%] top-[230px] absolute blur-3xl levitate"></div>
      <div className="block">
        {/* <Navbar /> */}
        <div className="p-2">
          <Toast ref={toastRef} position="bottom-center" className="p-5" />
        </div>
        <div className="relative min-h-screen">
        
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
            <div className="w-full  rounded-[24px] bg-clip-padding bg-opacity-80  md:mt-0 sm:max-w-md xl:p-0 bg-white ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Your email
                    </label>
                    <TextField
                      id="outlined-error-helper-text"
                      placeholder={"Enter Email"}
                      value={studentEmail}
                      sx={{
                        width: "100%",
                        borderRadius: 5,
                      }}
                      onChange={(e) => {
                        setStudentEmail(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Password
                    </label>
                    <TextField
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      value={studentPassword}
                      sx={{
                        width: "100%",
                        borderRadius: 5,
                        borderWidth: 5,
                      }}
                      onChange={(e) => {
                        setStudentPassword(e.target.value);
                      }}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start"></div>
                    <Link
                      id="Others"
                      href="/forgotpassword"
                      className="text-sm font-medium text-primary-500 text-black hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    onClick={HandleLogin}
                    className="w-full text-black bg-[#f69c18] hover:bg-[#f69c18] focus:ring-4 focus:outline-none focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={
                      !validator.isEmail(studentEmail) ||
                      loading ||
                      studentPassword == ""
                    }
                  >
                    Sign in
                  </button>
                  <p
                    className="text-sm font-light text-[#ed1d21] sm:flex sm:flex-col sm:justify-center"
                    id="Others"
                  >
                    <span className="sm:text-center">
                      Don’t have an account yet?{" "}
                    </span>
                    <a
                      href="/register"
                      className="font-medium text-primary-500 hover:underline sm:text-center"
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
