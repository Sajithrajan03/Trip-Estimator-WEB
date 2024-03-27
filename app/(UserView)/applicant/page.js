"use client"
import React,{useState,useEffect,useRef} from 'react'
import { useRouter } from 'next/navigation'
import secureLocalStorage from 'react-secure-storage';

import { Toast } from "primereact/toast";
import ToastAlert from "@/app/_Component/_util/ToastAlerts";
import LoadingScreen from "@/app/_Component/LoadingScreen";
import ApplicantForms from "@/app/_Component/ApplicantForms"
import Navbar from "@/app/_Component/Navbar"
const Page = () => {
  const [secretToken, setSecretToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [accountStatus, setAccountStatus] = useState(null);
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const toastRef = useRef();
  
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
       
    }, 500);
  }, []);
  useEffect(() => {
    setSecretToken(secureLocalStorage.getItem('SECRET_TOKEN'));
    setUserEmail(secureLocalStorage.getItem('userEmail'));
    setAccountStatus(parseInt(secureLocalStorage.getItem('accountStatus'))); // Ensure accountStatus is parsed as number
  }, []);

  useEffect(() => {
     
    if (accountStatus != 1 && accountStatus != null) {
         
        ToastAlert(
            "error",
            "Error",
            "You are Unauthorized",
            toastRef
          );
          setTimeout(() => {
            router.replace('/');  
          }, 3000);
        
    }
    
  }, [accountStatus, router]);

  const [formData, setFormData] = useState({
    travelDates: {
      from: null,
      to: null,
    },
    location: {
      from: "1",
      to: '',
    },
    
    transportation: "",
    transportationDetails: "",
    hotels: "",
    hotelDetails: "",
    food: "",
    isToCalendarOpen: false,
    transport_estimate: "",
    transport_amount: "",
    hotel_estimate: "",
    hotel_amount: "",
    food_estimate: "",
    food_amount: "",
    miscellaneous_estimate: "",
    miscellaneous_amount: "",
    total_estimate: "",
    total_amount: "",
    travel_reason: "",
    trip_estimate: "",
    trip_amount: "",
  });
  return (
    <div>
      <div className="bg-gradient-to-r overflow-x-hidden w-[90%] lg:w-[55%] md:w-[90%] from-cyan-300 to-blue-900   p-8 rounded-[0%] md:h-[80%] left-[10%] md:top-[10%] lg:top-[13%] lg:left-[30%] lg:scale-x-150 absolute blur-3xl levitate -z-10"></div>
       
      <div className={`bg-[rgb(6,55,129)]]  min-h-screen transition-opacity duration-500 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <Navbar/>
          { loaded ? null: <LoadingScreen/>  }
          
          <div className='z-10 flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0' >
              <div className="p-2">
                  <Toast ref={toastRef} position="bottom-center" className="p-5" />
              </div>
              <div className=' text-black py-[2%] px-[3%] rounded-[24px] bg-clip-padding bg-opacity-80  md:mt-0 w-[95%] md:w-[95%] xl:w-[1400px]  bg-white '>
                  <ApplicantForms formData={formData} setFormData={setFormData} secretToken={secretToken}/>
              </div>
      
      
          </div>
    </div>
    </div>
  )
}

export default Page