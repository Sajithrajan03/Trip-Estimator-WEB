"use client"
import React,{useState,useRef} from 'react';
import { UPDATE_TRIP_DETAILS_URL } from "@/app/_Component/_util/constants"
import secureLocalStorage from 'react-secure-storage';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from "primereact/toast";

import { Button } from 'primereact/button';
const TripDisplay = ({ selectedTrip, setOpenModal }) => {
  const toast = useRef(null);
    if (!selectedTrip) {
    return null; // If selectedTrip is not provided, render nothing
  }
  
const reject = () => {
  toast.current.show({ severity: 'warn', summary: 'Request Canceled', detail: 'You have canceled the request', life: 3000 });
  setTimeout(()=>{
    setOpenModal(false)
  },1000)
}
const confirm1 = () => {
  confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept:()=>{
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted the Application', life: 3000 })
        setTimeout(()=>{
          handleUpdate(1)
        
        },1000)
      },
      reject
  });
};

const confirm2 = () => {
   
  confirmDialog({
      message: 'Do you want to Reject this Application?',
      header: 'Reject Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'accept',
      acceptClassName: 'p-button-danger',
      reject,
      accept:()=>{
        toast.current.show({ severity: 'error', summary: 'Rejected', detail: 'You have rejected the Application', life: 3000 });
        setTimeout(()=>{
          handleUpdate(2)
        
        },1000)
    }
  });
  
};
  const [tripStatus, setTripStatus] = useState(selectedTrip.trip_status);
  const [tripAmount, setTripAmount] = useState(selectedTrip.trip_amount);
  const [adminMessage, setAdminMessage] = useState(selectedTrip.admin_message);
  
  const handleUpdate = async (status) => {
     
    try {
      const response = await fetch(UPDATE_TRIP_DETAILS_URL, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + secureLocalStorage.getItem('SECRET_TOKEN'),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "trip_id": selectedTrip.trip_id,
            "trip_status" : status,
            "trip_amount" : tripAmount, 
            "admin_message" : adminMessage
        }),
      });
      if (response.status === 401) {
        ToastAlert(
          "error",
          "Error",
          "Session Expired, Please Login Again",
          toastRef
        );
        setTimeout(() => {
          secureLocalStorage.clear();
          router.replace('/');  
        }, 3000);
      }

      const data = await response.json();

      
      setOpenModal(false)
    } catch (error) {
      console.error("Error:", error);
      setOpenModal(false)
    }
  };


  return (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-[90%] h-[90%] overflow-auto">
          <Toast ref={toast} position="bottom-center" className="p-5"/>
            <ConfirmDialog />
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Trip Details</h1>
              <button
                onClick={() => setOpenModal(false)}
                className="text-2xl font-bold fixed left-[88%] mt-[3%]"
              >
                X
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h1 className="text-xl font-bold">Trip ID</h1>
                <p>{selectedTrip.trip_id}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Employee ID</h1>
                <p>{selectedTrip.emp_id}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Start City</h1>
                <p>{selectedTrip.start_city_name}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">End City</h1>
                <p>{selectedTrip.end_city_name}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Travel Start Date</h1>
                <p>
                  {new Date(selectedTrip.travel_start_date).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Travel End Date</h1>
                <p>
                  {new Date(selectedTrip.travel_end_date).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Transport Mode</h1>
                <p>{selectedTrip.transport_mode}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Transport Estimate</h1>
                <p>₹ {selectedTrip.transport_estimate}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Transport Amount</h1>
                <p>₹ {selectedTrip.transport_amount}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Hotel Type</h1>
                <p>{selectedTrip.hotel_type}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Hotel Estimate</h1>
                <p>₹ {selectedTrip.hotel_estimate}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Hotel Amount</h1>
                <p>₹ {selectedTrip.hotel_amount}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Food Estimate</h1>
                <p>₹ {selectedTrip.food_estimate}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Food Amount</h1>
                <p>₹ {selectedTrip.food_amount}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Miscellaneous Estimate</h1>
                <p>₹ {selectedTrip.miscellaneous_estimate}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Miscellaneous Amount</h1>
                <p>₹ {selectedTrip.miscellaneous_amount}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Total Estimate</h1>
                <p>₹ {selectedTrip.total_estimate}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Total Amount</h1>
                <p>₹ {selectedTrip.total_amount}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Travel Reason</h1>
                <p>{selectedTrip.travel_reason}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Message</h1>
                <p>{selectedTrip.admin_message || "N/A"}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Trip Status</h1>
                <p>{selectedTrip.trip_status === 0 ? "Pending" : selectedTrip.trip_status === 1 ? "Accepted" : "Rejected"}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Trip Estimate</h1>
                <p>₹ {selectedTrip.trip_estimate}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Trip Amount</h1>
                <p>₹ {selectedTrip.trip_amount}</p>
              </div>
              <div>
                <h1 className="text-xl font-bold">Employee Name</h1>
                <p>{selectedTrip.emp_name}</p>
              </div>
            </div>
            <div className="mt-5">
            <textarea
              rows="4"
              cols="50"
              placeholder="Type your admin message here..."
              value={selectedTrip.adminMessage}
              onChange={(e)=>setAdminMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            ></textarea>
            <div className="flex justify-center mt-3 space-x-4">
              <Button
                onClick={(e) =>  {confirm1()}}
                icon="pi pi-check mr-2 font-bold"
                className="bg-green-500 text-white font-bold rounded-md hover:scale-105" >
                Approve
              </Button>
              <Button
                onClick={(e) => {confirm2()}}
                icon="pi pi-times mr-2"
              className="bg-[#EE4544] text-white  font-bold rounded-md hover:scale-105" >
                Reject
              </Button>
              <Button
                onClick={(e) =>  {confirm1()}}
                icon="pi pi-spin pi-cog font-bold mr-2"
                className="bg-[#07B6D5] text-white font-bold rounded-md hover:scale-105" >
                Modify
              </Button>
            </div>
          </div>
          </div>
        </div>

      )
      
}

export default TripDisplay