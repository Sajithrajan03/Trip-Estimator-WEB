"use client";
import React,{useEffect,useState,useRef} from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import 'primeicons/primeicons.css';
import { IoIosCompass } from "react-icons/io";
import ProfileCard from './ProfileCard';
import secureLocalStorage from 'react-secure-storage';
import Link from 'next/link';
import { Menu } from 'primereact/menu';
import 'primeicons/primeicons.css';
import { useRouter } from 'next/navigation';
import { comma } from 'postcss/lib/list';
export default function CustomDemo() {
    const[ userName,setUserName]=useState("")
    const [accountStatus,setAccountStatus]=useState('nostatus');
    useEffect(() => {
      setUserName(secureLocalStorage.getItem("userName"));
      setAccountStatus(secureLocalStorage.getItem("accountStatus"));
      
    }, []);
     
    const router =useRouter();
    const startContent = (
        <React.Fragment>
            <Link href="/">
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
            </Link>
        </React.Fragment>
    );
    const menuRight = useRef(null);
    let menu;
     
    if (accountStatus !== 'nostatus' && accountStatus != 2) {
        menu = [
            {
                label: 'Options',
                items: [
                    {
                        label: 'Apply for Trip',
                        icon: 'pi pi-plus',
                        command: () => router.push('/applicant')
                    },
                    {
                        label: 'View Application',
                        icon: 'pi  pi-th-large',
                        command: () => router.push('/applicant/dashboard')
    
                    },
                    {
                        label: 'View Profile',
                        icon: 'pi pi-user',
                        command: () => router.push('/profile')
    
                    }
                ]
            },
            {
                label: 'Help',
                items: [
                    {
                        label: 'Contact Us',
                        icon: 'pi pi-phone',
                        command: () => router.push('/contactus')
                    },
                    {
                        label: 'FAQ',
                        icon: 'pi pi-question-circle',
                        command: () => router.push('/faq')
                    }
                ]
            }
        ];
    }
    else{
        menu = [
            {
                label: 'Options',
                items: [
                    {
                        label: 'View Dashboard',
                        icon: 'pi pi-slack',
                        command: () => router.push('/approver')
                    },
                    
                    {
                        label: 'View Profile',
                        icon: 'pi pi-user',
                        command: () => router.push('/profile')
    
                    }
                ]
            },
            {
                label: 'Help',
                items: [
                    {
                        label: 'Contact Us',
                        icon: 'pi pi-phone',
                        command: () => router.push('/contactus')
                    },
                    {
                        label: 'FAQ',
                        icon: 'pi pi-question-circle',
                        command: () => router.push('/faq')
                    }
                ]
            }
        ];
    }

    const centerContent = (
        <div className="flex justify-between flex-wrap align-items-center gap-8 lg:gap-17 md:gap-12  ">
            
            <Menu model={menu} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" 
            pt={{
                submenuHeader: { className: 'text-cyan  font-bold text-[20px] p-1 flex justify-center rounded-lg mx-2 mb-1' },
                menu: { className: 'text-blue-900  bg-gray-300 ' },
                menuitem: { className: 'font-bold text-[15px] flex justify-start text-white w-full' },
                root: { className : "font-bold bg-gray-300 w-fit" },
                icon:{className:"font-bold text-black text-[20px] mr-5"},
                label : {className:"font-bold text-black text-[18px] "}
            }}/>
            <Link href="/">
            <div className="p-link inline-flex hover:scale-110 justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-home text-2xl  bg-blue-800 text-gray-200 border-2 border-black p-2 rounded-md ml-4"></i>
            </div>
            </Link>
             
            
            <div onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup
            className="p-link inline-flex hover:scale-110 justify-content-center align-items-center  text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
            <div className='bg-blue-800 border-2 p-1 border-black  rounded-md ml-1 flex justify-center items-center'>
                <i className="pi pi-bars text-2xl  text-gray-200 mr-1"></i>
                <i className='pi pi-angle-double-down text-black text-[16px]'></i>
            </div>
            </div>
             
        </div>
    );
    

    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center items-center gap-2">
                <ProfileCard email={"sajith"}/>
                {(userName != null && userName != undefined && userName != "") &&
                <span className="font-bold text-blue-800 text-[20px]">{userName.toUpperCase()}</span>
                }
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
        