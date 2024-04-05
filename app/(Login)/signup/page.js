"use client";


import { hashPassword } from "@/app/_Component/_util/hash.js";
import { useEffect, useState, useRef } from "react";
// import { REGISTER_URL } from "../../_Components/_util/constants";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosCompass } from "react-icons/io";
import { Toast } from "primereact/toast";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import ToastAlert from "@/app/_Component/_util/ToastAlerts";
import LoadingScreen from "@/app/_Component/LoadingScreen";

 


import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Register() {

  useEffect(() => {
    secureLocalStorage.clear();
  }, []);
  const toastRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeCity, setCollegeCity] = useState("");
  const [isAmrita, setisAmrita] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regular expression for password validation
  const passwordRegex = /^(?!.*[-"]).{8,}$/;

  //Regular expression to check amrita mail
  const amritaRegex =
    /^[a-zA-Z0-9._%+-]+@(cb\.students\.amrita\.edu|cb\.amrita\.edu|av\.students\.amrita\.edu|av\.amrita\.edu)$/;

  // Check if email is valid
  const isEmailValid = emailRegex.test(email);

  //check if amrita mail or not
  const isAmritaMail = amritaRegex.test(email);

  // Regular expression for name validation max 25 chars
  const nameRegex = /^[a-zA-Z ]{1,25}$/;

  // Regular expression for college name validation max 100 chars
  const collegeNameRegex = /^[a-zA-Z ,-]{1,100}$/;

  // Check if password is valid
  const isPasswordValid = passwordRegex.test(password);

  //Regular expression for phone number validation
  const phoneRegex = /^[0-9]{10}$/;

  //check if phone numer is valid
  const isPhoneValid = phoneRegex.test(phone);

  // Check if name is valid
  const isNameValid = nameRegex.test(name);

  // Check if confirm password matches password
  const isConfirmPasswordValid = password === confirmPassword;

  // Check if college name is valid
  const isCollegeNameValid = collegeNameRegex.test(collegeName);

  const isCollegeCityValid = collegeNameRegex.test(collegeCity);

  const handleCheckboxChange = (e) => {
    setisAmrita(e.target.checked);
    setCollegeName(e.target.checked ? "Amrita Vishwa Vidyapeetham" : "");
    if (e.target.checked) {
      console.log(e);
    } else {
      console.log("Checkbox is unchecked");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log({
      studentFullName: name, // Max 255 chars. Min 1 char.
      studentEmail: email, // Valid Email. Max 255 chars.
      studentPhone: phone, // 10-digit exactly.
      studentPassword: hashPassword(password), // min 8 chars. Cannot include '-'(hiphen) and "'"(quotes) as part of the password. SHA256 hashed version.
      studentCollegeName: collegeName, // Max 255 chars. Min 1 char.
      studentCollegeCity: collegeCity,
    });
    // add toast messages unique to each of this if
    try {
      setLoading(true);
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentFullName: name,
          studentEmail: email,
          studentPhone: phone,
          studentPassword: hashPassword(password),
          studentCollegeName: collegeName,
          studentCollegeCity: collegeCity,
        }),
      });
       
      const data = await response.json();
      if (response.status === 200) {
        console.log("inside")
        secureLocalStorage.setItem("tempRegisterToken", data["SECRET_TOKEN"]);
        secureLocalStorage.setItem("registerEmail", email);
        
        ToastAlert("success","Email Verification", `${data.MESSAGE}`, toastRef);
        console.log(data);
        setTimeout(() => {
          router.push("/register/verify");
        }, 1500);
      } else if (response.status === 500) {
        ToastAlert(
          "error",
          "Oops!",
          "Something went wrong! Please try again later!",
          toastRef
        );
         
      } else if (data.MESSAGE !== undefined || data.MESSAGE !== null) {
        ToastAlert("error", "Registration Failed", data.MESSAGE, toastRef);
      } else {
        ToastAlert(
          "error",
          "Oops!",
          "Something went wrong! Please try again later!",
          toastRef
        );
         
      }
    } catch (e) {
      ToastAlert("error", "Error", "Please try again!", toastRef);
      console.log(e);
      setLoading(false);
    }
    setLoading(false);
  };

   
   

  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);
  const handleClickShowConPassword = () =>
    setShowConPassword((showConPassword) => !showConPassword);

  return (
    <main className="flex min-h-screen flex-col bg-[#192032]">
     

      <div className="block space-y-24 md:space-y-10">
         
        <div className="relative min-h-screen">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 ">
            <Toast ref={toastRef} position="bottom-center" className="p-5" />
            <div className="w-full rounded-[24px] bg-clip-padding backdrop-blur-xl bg-opacity-80 md:-top-2 lg:w-3/4 xl:p-0 bg-white">
            <div className=' flex group justify-center mt-5'>
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
              <div className="w-full flex flex-col justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl mx-auto top-10 font-bold leading-tight tracking-tight text-black md:text-2xl">
                  Register
                </h1>
                <form
                  className="space-y-4 md:space-y-6 flex flex-col md:flex-row md:gap-10 justify-center"
                  onSubmit={handleSignUp}
                >
                  <div className="flex flex-col justify-center flex-1 space-y-8 md:border-r md:border-black md:pr-10 max-w-600">
                    <div id="Fields">
                      <TextField
                        error={!isNameValid && name != ""}
                        placeholder={"Enter Name"}
                        label="Name"
                        value={name}
                        helperText={
                          !isNameValid && name != ""
                            ? "Should not contain special characters"
                            : ""
                        }
                        sx={{
                          width: "100%",
                          borderRadius: 5,
                        }}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div id="Fields">
                      <TextField
                        error={!isPhoneValid && phone != ""}
                        placeholder={"9999999999"}
                        label="Phone Number"
                        value={phone}
                        helperText={
                          !isPhoneValid && phone != ""
                            ? "Should contain 10 digits"
                            : ""
                        }
                        sx={{
                          width: "100%",
                          borderRadius: 5,
                        }}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div id="Fields">
                      <div>
                        <TextField
                          error={!isCollegeNameValid && collegeName != ""}
                          placeholder="Enter College Name"
                          label="College Name"
                          value={collegeName}
                          helperText={
                            !isCollegeNameValid && collegeName != ""
                              ? "Should contain only alphabets"
                              : ""
                          }
                          sx={{
                            width: "100%",
                            borderRadius: 5,
                            borderWidth: 5,
                          }}
                          onChange={(e) => {
                            setCollegeName(e.target.value);
                          }}
                          required
                          disabled={isAmrita}
                        />
                      </div>
                      <div id="Fields" className="mt-8">
                        <TextField
                          error={!isCollegeCityValid && collegeCity != ""}
                          placeholder="Enter College City"
                          label="College City"
                          value={collegeCity}
                          helperText={
                            !isCollegeCityValid && collegeCity != ""
                              ? "Should contain only alphabets"
                              : ""
                          }
                          sx={{
                            width: "100%",
                            borderRadius: 5,
                            borderWidth: 5,
                          }}
                          onChange={(e) => {
                            setCollegeCity(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="flex items-center mb-4 mt-6">
                        <input
                          checked={isAmrita}
                          onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          type="checkbox"
                          name="amrita-student"
                          id="amrita-student"
                          className="mr-2"
                        />
                        <label
                          htmlFor="amrita-student"
                          className="text-sm font-medium text-[#1e1e1e]"
                          id="Others"
                        >
                          Amrita Student?
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 gap-8">
                    <div id="Fields">
                      <TextField
                        error={
                          isAmrita
                            ? !isAmritaMail && email != ""
                            : !isEmailValid && email != ""
                        }
                        placeholder="Enter Email"
                        label="Email"
                        value={email}
                        helperText={
                          isAmrita
                            ? !isAmritaMail && email != ""
                              ? "Should match college email format"
                              : ""
                            : !isEmailValid && email != ""
                            ? "Not a valid email"
                            : ""
                        }
                        sx={{
                          width: "100%",
                          borderRadius: 5,
                          borderWidth: 5,
                        }}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div id="Fields" className="mt-3">
                      <TextField
                        error={!isPasswordValid && password != ""}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        label="Password"
                        value={password}
                        sx={{
                          width: "100%",
                          borderRadius: 5,
                          borderWidth: 5,
                        }}
                        onChange={(e) => {
                          setPassword(e.target.value);
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
                      <div className="flex flex-row gap-[40px] text-[10px] mt-2">
                        <div
                          className={
                            password != ""
                              ? /^[^-"']*$/.test(password)
                                ? "text-green-600"
                                : "text-red-600"
                              : ""
                          }
                        >
                          Should not contain - (hyphen) or `&quot;` (quotes)
                        </div>
                        <div
                          className={
                            password
                              ? /^.{8,}$/.test(password)
                                ? "text-green-600"
                                : "text-red-600"
                              : ""
                          }
                        >
                          8 characters in length
                        </div>
                      </div>
                    </div>
                    <div id="Fields">
                      <TextField
                        error={
                          confirmPassword != password && confirmPassword != ""
                        }
                        type={showConPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        label="Confirm Password"
                        value={confirmPassword}
                        helperText={
                          confirmPassword != password && confirmPassword != ""
                            ? "Should match password"
                            : ""
                        }
                        sx={{
                          width: "100%",
                          borderRadius: 5,
                          borderWidth: 5,
                        }}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowConPassword}
                                edge="end"
                              >
                                {showConPassword ? (
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
                    <div className="text-center">
                      <button
                        type="submit"
                        className="w-[200px] mt-3 text-black bg-[#f69c18] mb-2 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={
                          loading ||
                          !isCollegeNameValid ||
                          !isNameValid ||
                          !isPhoneValid ||
                          !isPasswordValid ||
                          !isConfirmPasswordValid ||
                          (isAmrita ? !isAmritaMail : !isEmailValid)
                        }
                      >
                        Sign Up
                      </button>
                      <p
                        className="text-sm font-light text-[#ed1d21]"
                        id="Others"
                      >
                        Already have an account?{" "}
                        <a
                          href="/login"
                          className="font-medium text-primary-500 hover:underline"
                        >
                          Sign in
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}