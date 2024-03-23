"use client"
import React,{useState,useEffect,useRef} from 'react'
import { useRouter } from 'next/navigation'
import secureLocalStorage from 'react-secure-storage';

import { Toast } from "primereact/toast";
import ToastAlert from "@/app/_Component/_util/ToastAlerts";
import LoadingScreen from "@/app/_Component/LoadingScreen";
import ApplicantForms from "@/app/_Component/ApplicantForms"
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
     
    if (accountStatus === 0 || accountStatus === 2) {
         
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
  return (
    <div className={`bg-[rgb(6,55,129)] min-h-screen transition-opacity duration-500 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        { loading ? <LoadingScreen/> :null }
        <div className=' flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0' >
            <div className="p-2">
                <Toast ref={toastRef} position="bottom-center" className="p-5" />
            </div>
            <div className=' text-black py-[2%] px-[3%] rounded-[24px] bg-clip-padding bg-opacity-80  md:mt-0 md:w-[70%]   bg-white '>
                <ApplicantForms/>
            </div>
            
        
        </div>
    </div>
  )
}

export default Page