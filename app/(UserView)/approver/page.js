"use client"
import React, { useEffect, useState ,useRef} from 'react';
import { useRouter } from 'next/navigation'
import secureLocalStorage from 'react-secure-storage';
import LoadingScreen from '@/app/_Component/LoadingScreen';

import { Toast } from "primereact/toast";
import ToastAlert from "@/app/_Component/_util/ToastAlerts";
import ApproverDashBoard from '@/app/_Component/ApproverDashBoard';
import { GET_DASHBOARD_DETAILS_URL } from "@/app/_Component/_util/constants";

const Page = () => {
  const [secretToken, setSecretToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [accountStatus, setAccountStatus] = useState(null);
  const router = useRouter();
  const [loading,setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const toastRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  useEffect(() => {
    setSecretToken(secureLocalStorage.getItem('SECRET_TOKEN'));
    setUserEmail(secureLocalStorage.getItem('userEmail'));
    setAccountStatus(parseInt(secureLocalStorage.getItem('accountStatus'))); // Ensure accountStatus is parsed as number
  }, []);

  useEffect(() => {
     
    if (accountStatus != 2 && accountStatus != null) {
         
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

  
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (accountStatus !== null) {
      const fetchTrips = async () => {
        try {
          const response = await fetch(GET_DASHBOARD_DETAILS_URL, {
            method: "GET",
            headers: {
              "Authorization": "Bearer " + secretToken,
              "Content-Type": "application/json",
            }
          });
        
          if (response.status === 401) {
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
        
          if (!response.ok) {
            throw new Error('Failed to fetch trips');
          }
        
          const data = await response.json();
          
          setTrips(data.Message || []);
        } catch (error) {
          console.error(error);
           
        }
        
      };
  
      fetchTrips();
    }
  }, [accountStatus,openModal]); // Add accountStatus as a dependency
  
  

  return (
    
    <div className={`bg-[rgb(6,55,129)] min-h-screen transition-opacity duration-500 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        { loaded ? null: <LoadingScreen/>  }
         
        <div className=' text-black' >            
            <div >
                <Toast ref={toastRef} position="bottom-center" className="p-5" />
            </div>
            <ApproverDashBoard className="z-50" trips={trips} m1={openModal} m2={setOpenModal}/>
        </div>
    </div>
  );
};

export default Page;
