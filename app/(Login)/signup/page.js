"use client";

import { hashPassword } from "@/app/_Component/_util/hash.js";
import { useEffect, useState, useRef } from "react";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import { IoIosCompass } from "react-icons/io";
import { Toast } from "primereact/toast";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import ToastAlert from "@/app/_Component/_util/ToastAlerts";
import MenuItem from '@mui/material/MenuItem'; 
import Autocomplete from '@mui/material/Autocomplete';
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
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [isGenderValid, setIsGenderValid] = useState(false);
  const [state, setState] = useState("");
  const [isStateValid, setIsStateValid] = useState(false);
  const [city, setCity] = useState("");
  const [isCityValid, setIsCityValid] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [isJobRoleValid, setIsJobRoleValid] = useState(false);
  const [designation, setDesignation] = useState("");
  const [isDesignationValid, setIsDesignationValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const router = useRouter();

  const passwordRegex = /^(?!.*[-"]).{8,}$/;
  const nameRegex = /^[a-zA-Z ]{1,25}$/;
  const phoneRegex = /^[0-9]{10}$/;

  const isPasswordValid = passwordRegex.test(password);
  const isPhoneValid = phoneRegex.test(phone);
  const isNameValid = nameRegex.test(name);
  const isConfirmPasswordValid = password === confirmPassword;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const statesInIndia = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry',
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();
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
          designation: designation,
          studentState: state,
          studentCity: city, 
          jobRole: jobRole,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        secureLocalStorage.setItem("tempRegisterToken", data["SECRET_TOKEN"]);
        secureLocalStorage.setItem("registerEmail", email);
        ToastAlert("success","Email Verification", `${data.MESSAGE}`, toastRef);
        setTimeout(() => {
          router.push("/register/verify");
        }, 1500);
      } else if (response.status === 500) {
        ToastAlert("error", "Oops!", "Something went wrong! Please try again later!", toastRef);
      } else if (data.MESSAGE !== undefined || data.MESSAGE !== null) {
        ToastAlert("error", "Registration Failed", data.MESSAGE, toastRef);
      } else {
        ToastAlert("error", "Oops!", "Something went wrong! Please try again later!", toastRef);
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

  const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);
  const handleClickShowConPassword = () => setShowConPassword((showConPassword) => !showConPassword);

  return (
    <main className="flex min-h-screen flex-col bg-[#192032]">
  <div className="block space-y-24 md:space-y-10">
    <div className="relative min-h-screen">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 ">
        <Toast ref={toastRef} position="bottom-center" className="p-5" />
        <div className="w-full rounded-[24px] bg-clip-padding backdrop-blur-xl bg-opacity-80 md:-top-2 lg:w-3/4 xl:p-0 bg-white">
          <div className='flex group justify-center mt-5'>
            <IoIosCompass className='text-[45px]  text-blue-800'/>
            <div className='hidden group-hover:underline   underline-offset-1   decoration-black md:flex ml-2 text-[30px] font-bold text-blue-800'>
              <span className="text-gray-900">Trip</span>Estimator
            </div>
            <div className='ml-2 md:hidden text-[30px] font-bold text-blue-800'>
              <span className="text-gray-900">TE</span>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl mx-auto top-10 font-bold leading-tight tracking-tight text-black md:text-2xl">
              Register
            </h1>
            <form className="grid grid-cols-1 gap-10" onSubmit={handleSignUp}>
              <div className="space-y-4">
                {/* Name */}
                <div id="Fields" className="mb-6">
                  <TextField
                    error={!isNameValid && name !== ""}
                    placeholder={"Enter Name"}
                    label="Name"
                    value={name}
                    helperText={!isNameValid && name !== "" ? "Should not contain special characters" : ""}
                    sx={{
                      width: "100%",
                      borderRadius: 5,
                    }}
                    onChange={(e) => { setName(e.target.value); }}
                    required
                  />
                </div>
                {/* Phone Number */}
                <div id="Fields" className="mb-6">
                  <TextField
                    error={!isPhoneValid && phone !== ""}
                    placeholder={"9999999999"}
                    label="Phone Number"
                    value={phone}
                    helperText={!isPhoneValid && phone !== "" ? "Should contain 10 digits" : ""}
                    sx={{
                      width: "100%",
                      borderRadius: 5,
                    }}
                    onChange={(e) => { setPhone(e.target.value); }}
                    required
                  />
                </div>
                {/* Gender */}
                <div id="Fields" className="mb-6">
                  <TextField
                    select
                    label="Gender"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                      setIsGenderValid(e.target.value !== "");
                    }}
                    sx={{
                      width: "100%",
                      borderRadius: 5,
                    }}
                    required
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </div>
                {/* State */}
                <div id="Fields" className="mb-6">
                  <Autocomplete
                    options={statesInIndia}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State"
                        variant="outlined"
                        onChange={(e) => {
                          setState(e.target.value);
                          setIsStateValid(e.target.value !== "");
                        }}
                        required
                      />
                    )}
                    filterOptions={(options, state) => {
                      return options.filter((option) =>
                        option.toLowerCase().includes(state.inputValue.toLowerCase())
                      );
                    }}
                  />
                </div>
                {/* City */}
                <div id="Fields" className="mb-6">
                  <TextField
                    label="City"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setIsCityValid(e.target.value !== "");
                    }}
                    sx={{
                      width: "100%",
                      borderRadius: 5,
                    }}
                    required
                  />
                </div>
              </div>
              {/* Right side */}
              <div className="space-y-4">
                {/* Email */}
                <div id="Fields" className="mb-6">
                  <TextField
                    error={!isEmailValid && email !== ""}
                    placeholder="example@example.com"
                    label="Email"
                    value={email}
                    helperText={!isEmailValid && email !== "" ? "Invalid email address" : ""}
                    sx={{
                      width: "100%",
                      borderRadius: 5,
                    }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsEmailValid(validateEmail(e.target.value));
                    }}
                    required
                  />
                </div>
                {/* Designation */}
                <div id="Fields" className="mb-6">
                  <Autocomplete 
                    options={["Engineer", "Manager", "Developer", "Analyst", "Designer", "Consultant"]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Designation"
                        variant="outlined"
                        onChange={(e) => {
                          setDesignation(e.target.value);
                          setIsDesignationValid(e.target.value !== "");
                        }}
                        required
                      />
                    )}
                  />
                </div>
                {/* Job Role */}
                <div id="Fields" className="mb-6">
                  <Autocomplete
                    options={["Applicant", "Approver"]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Job Role"
                        variant="outlined"
                        onChange={(e) => {
                          setJobRole(e.target.value);
                          setIsJobRoleValid(e.target.value !== "");
                        }}
                        required
                      />
                    )}
                  />
                </div>
                {/* Password */}
                <div id="Fields" className="mb-6">
                  <TextField
                    error={!isPasswordValid && password !== ""}
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
                          <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? (<VisibilityOff />) : (<Visibility />)}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div className="flex flex-row gap-[40px] text-[10px] mt-2">
                    <div className={password !== "" ? /^[^-"']*$/.test(password) ? "text-green-600" : "text-red-600" : ""}>
                      Should not contain - (hyphen) or `&quot;` (quotes)
                    </div>
                    <div className={password ? /^.{8,}$/.test(password) ? "text-green-600" : "text-red-600" : ""}>
                      8 characters in length
                    </div>
                  </div>
                </div>
                {/* Confirm Password */}
                <div id="Fields" className="mb-6">
                  <TextField
                    error={confirmPassword !== password && confirmPassword !== ""}
                    type={showConPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    label="Confirm Password"
                    value={confirmPassword}
                    helperText={confirmPassword !== password && confirmPassword !== "" ? "Should match password" : ""}
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
                          <IconButton onClick={handleClickShowConPassword} edge="end">
                            {showConPassword ? (<VisibilityOff />) : (<Visibility />)}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                {/* Sign Up Button */}
                <div className="mb-6 mt-3 text-center">
                  <button
                    type="submit"
                    className="w-[200px] text-black bg-blue-500 mb-2 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!isNameValid || !isPhoneValid || !isPasswordValid || !isConfirmPasswordValid}
                  >
                    Sign Up
                  </button>
                  <p className="text-sm font-light text-[#ed1d21]" id="Others">
                    Already have an account?{" "}
                    <a href="/login" className="font-medium text-primary-500 hover:underline">Sign in</a>
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



