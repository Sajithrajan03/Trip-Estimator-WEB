"use client";
import React, { useState,useEffect } from "react";
import Navbar from "@/app/_Component/Navbar";
import { TabMenu } from "primereact/tabmenu";
import "primeicons/primeicons.css";
import { FaCircleArrowRight } from "react-icons/fa6";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useRouter } from "next/navigation";
import TripDisplay from "./TripDisplay";
import secureLocalStorage from "react-secure-storage";
import {GET_EMPLOYEE_TRIP_URL } from "@/app/_Component/_util/constants";
const TripTable = ({ trips,m1,m2 }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  
  const router= useRouter()
  const items = [
    {
      label: "All",
      icon: "pi pi-caret-up text-black font-bold text-[20px]",
      value: 3,
    },
    {
      label: "Pending",
      icon: "pi pi-spin pi-cog text-yellow-600 font-bold text-[20px]",
      value: 0,
    },
    {
      label: "Accepted",
      icon: "pi pi-check text-green-900 font-bold text-[20px]",
      value: 1,
    },
    {
      label: "Rejected",
      icon: "pi pi-times text-red-900 font-bold text-[20px]",
      value: 2,
    },
  ];
  const [secretToken, setSecretToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
     
    setSecretToken(secureLocalStorage.getItem('SECRET_TOKEN'));
    setUserEmail(secureLocalStorage.getItem('userEmail'));
     
  }, []);


  useEffect(() => {
    console.log(userEmail)
    if (userEmail != null ) {
      const fetchTrips = async () => {
        try {
          const response = await fetch(GET_EMPLOYEE_TRIP_URL, {
            method: "POST",
            headers: {
           
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              emp_email : userEmail,
            }),
          });
          
          if (response.status == 401) {
            ToastAlert("error", "Error", "You are Unauthorized", toastRef);
            setTimeout(() => {
              router.replace("/");
            }, 3000);
          }

          if (!response.ok) {
            throw new Error("Failed to fetch trips");
          }

          const data = await response.json();

          setSelectedTrip(data.Message || []);
        } catch (error) {
          console.error(error);
        }
      };

      fetchTrips();
    }
  }, [
    userEmail,
     
  ]);
  const openModal = m1
  const  setOpenModal = m2
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectionChange = (index) => {
     
    setSelectedIndex(index);
  };
  return (
    <div className="  overflow-x-auto">
      
      
      <div className="p-2  bg-opacity-30 bg-black backdrop-filter  backdrop-blur-lg w-fit h-fit mx-auto mt-5 rounded-md flex items-center">
        <div className="flex">
        <div className="flex w-[400px] justify-evenly md:w-[460px] my-auto mx-auto rounded-md">
  {items.map((item, index) => (
    <div
      key={index}
      className={`tab flex px-2 group mx-1 items-center space-x-0 bg-white rounded-md text-black`}
      style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
      onClick={() => handleSelectionChange(item.value)}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.12)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div><i className={`-ml-2 ${item.icon} text-2xl p-2 rounded-md`}></i></div>
      <div className="font-bold text-black">{item.label}</div>
    </div>
  ))}
</div>


        </div>
        
      </div>
      <div className=" w-full  mt-5 p-5 px-10 mx-auto  bg-opacity-30 bg-black backdrop-filter  backdrop-blur-lg rounded-lg ">
        {(selectedTrip) && selectedTrip.map((trip) =>
    
          selectedIndex === trip.trip_status || selectedIndex === 3 ? ( // Check if selectedIndex matches trip_status
            <div
              key={trip.trip_id}
              onClick={()=>{
                 
                
                 
              }}
              className="flex font-bold space-x-4 justify-evenly lg:justify-evenly bg-white rounded-xl py-1 mb-5 items-center border-gray-200 hover:scale-105 cursor-pointer transition ease-in-out hover:bg-gray-200 duration-300"
            >
              <div className="flex flex-col sm:min-w-[100px] bg-[#3083ff] rounded-md ml-1 sm:ml-3">
                <div className="w-full text-[14px] sm:text-[16px] min-w-[70px] md:min-w-[80px] sm:bg-white m-1 mx-auto rounded-md font-bold sm:w-1/2 md:w-auto px-0 mt-1 flex justify-center">
                  Trip ID
                </div>
                <div className="w-full text-[16px] font-bold sm:w-1/2 md:w-auto px-2 flex justify-center mx-auto">
                  {trip.trip_id}
                </div>
              </div>
              <div className="lg:flex hidden">
                <div className="w-full flex justify-center text-[20px] font-bold md:w-auto px-4">
                  {/* {trip.emp_name.toUpperCase()} */}
                </div>
              </div>
              <div className="flex w-[60%] md:w-[40%] flex-col space-y-1 ml-1">
                <div className="lg:hidden flex mx-auto justify-between text-[16px] font-bold w-auto px-4">
                  {/* {trip.emp_name.toUpperCase()} */}
                </div>
                <div className="flex justify-evenly items-center my-auto bg-gray-300 rounded-md p-1">
                  <div className="text-[14px] xl:text-[17px] font-bold px-2">
                    {trip.start_city_name}
                  </div>
                  <FaCircleArrowRight className="text-[20px] sm:text-[20px]" />
                  <div className="text-[14px] xl:text-[17px] font-bold px-2">
                    {trip.end_city_name}
                  </div>
                </div>
                <div className="flex justify-evenly items-center my-auto bg-gray-300 rounded-md p-1">
                  <div className="text-[14px] xl:text-[17px] font-bold px-2">
                    {new Date(trip.travel_start_date).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" }
                    )}
                  </div>
                  <FaCircleArrowRight className="text-[20px] sm:text-[20px]" />
                  <div className="text-[14px] xl:text-[17px] font-bold px-2">
                    {new Date(trip.travel_end_date).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" }
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex lg:flex-col space-y-3 lg:w-[280px] bg-[#3083ff] text-white rounded-lg font-bold sm:w-1/2 md:w-auto mt-2 py-2 px-4">
                <div className="bg-white text-black rounded-lg font-bold flex justify-center text-[18px] px-1">
                  Travel Details
                </div>
                <div className="flex justify-center text-[18px] text-black">
                  {trip.transport_mode}
                </div>
              </div>
              <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row md:justify-evenly justify-center items-center ">
                <div className=" bg-gray-400 min-w-[100px] text-black font-bold flex justify-center rounded-lg sm:w-1/2 md:w-auto py-2 px-4">
                  ₹ {trip.total_estimate}
                </div>
                <div className="w-full sm:w-1/2 md:w-auto min-w-[125px] flex justify-center px-4">
                  {trip.trip_status === 0 ? (
                    <div className="bg-yellow-300 border-2 border-black text-black font-bold rounded-lg p-2">
                      Pending
                    </div>
                  ) : trip.trip_status === 1 ? (
                    <div className="bg-green-500 border-2 border-black text-black font-bold rounded-lg p-2">
                      Accepted
                    </div>
                  ) : (
                    <div className="bg-red-300 border-2 border-black text-black font-bold rounded-lg p-2">
                      Rejected
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
      {openModal && (<TripDisplay selectedTrip={selectedTrip} setOpenModal={setOpenModal} openModal={openModal} className={`transition-transform duration-300 transform ${openModal ? 'scale-100' : 'scale-0'}`}/>)}
      
    </div>
  );
};

export default TripTable;
