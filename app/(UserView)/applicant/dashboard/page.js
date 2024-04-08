"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import secureLocalStorage from 'react-secure-storage';
import { Toast } from 'primereact/toast';
import ToastAlert from '@/app/_Component/_util/ToastAlerts';
import LoadingScreen from '@/app/_Component/LoadingScreen';
import ApplicantDashboard from '@/app/_Component/ApplicantDashboard';
import Navbar from '@/app/_Component/Navbar';

const Page = () => {
  const [accountStatus, setAccountStatus] = useState('nostatus');
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (accountStatus !== 'nostatus' && accountStatus !== 2) {
      console.log('Unauthorized');
      ToastAlert('error', 'Error', 'You are Unauthorized', toastRef);
      setTimeout(() => {
        router.replace('/');
      }, 3000);
    }
  }, [accountStatus, router]);

  return (
    <div className="bg-gradient-to-r from-cyan-300 to-blue-900 min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Loading Screen */}
      {!loaded && <LoadingScreen />}
      
      {/* Toast */}
      <div className="fixed bottom-0 right-0 p-2">
        <Toast ref={toastRef} position="bottom-center" className="p-5" />
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center h-full ">
        <div className="text-black bg-transparent rounded-lg  mt-1"> {/* Adjusted margin top */}
          <ApplicantDashboard />
        </div>
      </div>
    </div>
  );
};

export default Page;
