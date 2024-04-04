"use client";
import React,{useEffect,useState} from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import 'primeicons/primeicons.css';
import { IoIosCompass } from "react-icons/io";
import ProfileCard from './ProfileCard';
import secureLocalStorage from 'react-secure-storage';
import Link from 'next/link';

export default function CustomDemo() {
    const[ userName,setUserName]=useState("")
    useEffect(() => {
      setUserName(secureLocalStorage.getItem("userName"));
    }, []);
     
  
    const startContent = (
        <React.Fragment>
            <div className='cursor-pointer flex group '>
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
        </React.Fragment>
    );

    const centerContent = (
        <div className="flex justify-between flex-wrap align-items-center gap-8 lg:gap-17 md:gap-12  ">
            <Link href="/ApplicantForms">
            <div className="p-link inline-flex hover:scale-125 justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-home text-2xl  bg-blue-800 text-gray-200 border-2 border-black p-2 rounded-md ml-4"></i>
            </div>
            </Link>
            <Link href="/profile">
            <div className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-user text-2xl hover:scale-125 bg-blue-800 text-gray-200 border-2 border-black p-2 rounded-md ml-1"></i>
            </div>
            </Link>
            <Link href="/contactus">
            <div className="p-link inline-flex hover:scale-125 justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
            <i className="pi pi-envelope text-2xl bg-blue-800 text-gray-200 border-2 border-black p-2 rounded-md ml-1"></i>
            </div>
            </Link>
            <Link href="/faq">
            <div className="p-link inline-flex hover:scale-125 justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
            <i className="pi pi-question-circle text-2xl bg-blue-800 text-gray-200 border-2 border-black p-2 rounded-md ml-1"></i>
            </div>
            </Link>
             
        </div>
    );

    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center items-center gap-2">
                <ProfileCard email={"sajith"}/>
                <span className="font-bold text-blue-800 text-[20px]">{userName}</span>
            </div>
        </React.Fragment>
    );

    return (
        <div className="card">
            <Toolbar start={startContent} center={centerContent} end={endContent} className='lg:w-[950px] xl:w-[1000px] mx-auto mt-4 ' pt={{
        root: { style: { background: 'bg-primary', borderRadius: '24px' } }
    }} />
        </div>
    );
}
        