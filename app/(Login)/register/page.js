"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { GET_OTP_URL } from "@/app/_Component/_util/constants";
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
import ToastAlert from "@/app/_Component/_util/ToastAlerts";
import LoadingScreen from "@/app/_Component/LoadingScreen";
import { IoIosCompass } from "react-icons/io";
export default function Login() {
  const [emailFocused, setEmailFocused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleNameFocus = () => {
    setNameFocused(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  useEffect(() => {
    secureLocalStorage.clear();
  }, []);

  const toastRef = useRef();

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showName, setShowName] = useState(false);

  const handleClickShowName = () =>
    setShowName((showName) => !showName);

  const router = useRouter();

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(GET_OTP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "userEmail": userEmail,
          "userName": userName,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        setLoading(false);

        secureLocalStorage.setItem("SECRET_TOKEN", data["SECRET_TOKEN"]);
        secureLocalStorage.setItem("userName", userName);
        secureLocalStorage.setItem("userEmail", userEmail);
        secureLocalStorage.setItem("accountStatus", data["accountStatus"]);
        secureLocalStorage.setItem("userGender", data["userGender"]);
        ToastAlert(
          "success",
          "Successful Login",
          `${data.Message}`,
          toastRef
        );
        setTimeout(() => {
            router.push("/otp");
        },2000)

         
      } else if (response.status === 500) {
        setLoading(false);
        ToastAlert(
          "error",
          "Oops!",
          "Something went wrong! Please try again.",
          toastRef
        );
      } else if (data.Message !== undefined || data.Message !== null) {
        setLoading(false);
        ToastAlert("error", "Login Failed", `${data.Message}`, toastRef);
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

  return (
    <div
      className={` transition-opacity duration-500 ease-in-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <main className="flex min-h-screen flex-col bg-[rgb(6,55,129)] ">
        <div className="bg-gradient-to-r  from-cyan-300 to-blue-900 md:w-[20%] sm:w-[80%] p-8 rounded-[0%] h-[55%] left-[40%] top-[230px] absolute blur-3xl levitate"></div>
        <div className="block">
          <div className="p-2">
            <Toast ref={toastRef} position="bottom-center" className="p-5" />
          </div>
          {loading ? <LoadingScreen /> : null}
          <div className="relative min-h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
              <div className="w-full  rounded-[24px] bg-clip-padding bg-opacity-80  md:mt-0 sm:max-w-md xl:p-0 bg-white ">
                <div className="p-6 space-y-8 sm:p-8">
                <div className=' flex group justify-center -mb-5'>
                <IoIosCompass className='text-[45px]  text-blue-800'/>
                <div className='hidden group-hover:underline   underline-offset-1   decoration-black md:flex ml-2 text-[30px] font-bold text-blue-800'>
                    <span className="text-gray-900">
                             Trip</span>Estimator
                </div>
                <div className='ml-2 md:hidden text-[30px] font-bold text-blue-800'>
                    <span className="text-gray-900">
                            T</span>E
                </div>
            </div>
                  
                  <h1 className="text-xl bg-blue-800 text-white -mt-5 w-fit px-4 p-2 mx-auto rounded-lg font-medium    md:text-[30px] flex justify-center">
                    Registration
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                       Enter your Email
                      </label>
                      <div>
                  <TextField
                    id="outlined-error-helper-text"
                    placeholder="Enter Email"
                    value={userEmail}
                    sx={{
                      width: "100%",
                      borderRadius: 5,
                      transition: "transform 0.3s ease",
                      transform: emailFocused ? "scale(1.02)" : "scale(1)",
                      marginBottom: "16px", // Add margin bottom for spacing
                    }}
                    onFocus={() => {
                      handleEmailFocus();
                      setNameFocused(false); // Ensure Name field doesn't scale up when email field is focused
                    }}
                    onBlur={() => setEmailFocused(false)}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/\s/g, '');
                      setUserEmail(newValue);
                    }}
                    required
                  />
                </div>

                <div>
                    
                <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Enter your First Name
                      </label>
                     
                    
                <TextField
                    id="outlined-error-helper-text"
                    placeholder="Enter Name"
                    value={userName}
                    sx={{
                      width: "100%",
                      borderRadius: 5,
                      transition: "transform 0.3s ease",
                      transform: nameFocused ? "scale(1.02)" : "scale(1)",
                      marginBottom: "16px", // Add margin bottom for spacing
                    }}
                    onFocus={() => {
                      handleEmailFocus();
                      setNameFocused(false); // Ensure Name field doesn't scale up when email field is focused
                    }}
                    onBlur={() => setNameFocused(false)}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/\s/g, '');
                      setUserName(newValue);
                    }}
                    required
                  />
                </div>

                    </div>
                     
                    <button
                      type="submit"
                      onClick={HandleLogin}
                      className="w-full text-black bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium rounded-lg text-[16px] px-5 py-2 text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                      style={{ transition: "background 0.3s ease" }}
                      disabled={loading || userEmail === "" || userName === ""}
                    >
                      GET OTP
                    </button>
                    <p
                      className="text-sm font-light text-[#f32525] flex flex-col justify-center"
                      id="Others"
                    >
                      <span className="text-center">
                        Already have a account?{" "}
                      </span>
                      <a
                        href="/login"
                        className="font-medium text-primary-500 hover:underline text-center"
                      >
                        LOGIN
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
