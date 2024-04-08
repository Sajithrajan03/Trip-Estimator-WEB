import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import LoadingScreen from "@/app/_Component/LoadingScreen";
import { InputText } from "primereact/inputtext";

import ToastAlert from "@/app/_Component/_util/ToastAlerts";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';        
import {UPDATE_TRIP_DETAILS_URL} from  "@/app/_Component/_util/constants";
import secureLocalStorage from 'react-secure-storage';
import { IoCloseCircle } from 'react-icons/io5';

const TripDisplay = ({ selectedTrip, setOpenModal }) => {
  const toast = useRef(null);
  const [adminMessage, setAdminMessage] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [loading,setLoading] = useState(false);
  
  // if (!selectedTrip) {
  //   return null; // If selectedTrip is not provided, render nothing
  // }

   
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setOpenModal(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [setOpenModal]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = ('0' + date.getDate()).slice(-2);
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Request Canceled', detail: 'You have canceled the request', life: 3000 });
    
    setTimeout(() => {
      setLoading(false)
      setOpenModal(false);
    }, 1000);
  };
  const [showModify,setShowModify]=useState(false) 
  const [newTrip,setNewTrip]=useState(0)
  useEffect(()=>{
    if (selectedTrip){
    setNewTrip(selectedTrip.total_amount)
    console.log(selectedTrip)
    }

  },[selectedTrip])
  
  const confirm3 =()=>{
      setShowModify(true);
      
  }

  const confirm1 = () => {

    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: () => {
        setLoading(true);
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted the Application', life: 3000 });
        setTimeout(() => {
          handleUpdate(1);
        }, 1000);
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
      accept: () => {
        setLoading(true);
        toast.current.show({ severity: 'error', summary: 'Rejected', detail: 'You have rejected the Application', life: 3000 });
        setTimeout(() => {
          handleUpdate(2);
        }, 1000);
      }
    });
  };

  const handleUpdate = async (status) => {
    console.log(selectedTrip.start_city_name + " to " + selectedTrip.end_city_name)
    console.log(selectedTrip)
    console.log()
    try {
      
      const response = await fetch(UPDATE_TRIP_DETAILS_URL, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + secureLocalStorage.getItem('SECRET_TOKEN'),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "trip_id": selectedTrip.trip_id,
          "trip_status": status,
          "trip_amount": newTrip,
          "admin_message": adminMessage,
          "travel": selectedTrip.start_city_name + " to " + selectedTrip.end_city_name,
          "toemail" : selectedTrip.emp_email,
          "empName": selectedTrip.emp_name,
          "days": Math.round((new Date(selectedTrip.travel_end_date).getTime() - new Date(selectedTrip.travel_start_date).getTime()) / (1000 * 3600 * 24))+1
        }),
      });
      const data2 = await response.json()
      setLoading(false)
      if (response.status == 200){
        toast.current.show({ severity: 'success', summary: 'Success', detail: `${data2.Message}`, life: 3000 });
        setTimeout(() => {
            setOpenModal(false);
          },4000)
      }
      if (response.status == 401) {
        toast.current.show({ severity: 'error', summary: 'Failed', detail: 'Session Expired, Please Login Again', life: 3000 });
        setTimeout(() => {
          secureLocalStorage.clear();
          setOpenModal(false);
          router.replace('/');
        }, 3000);
      }
      if (response.status == 400) {
        
         
        toast.current.show({ severity: 'error', summary: 'Failed', detail: `${data2.Message}`, life: 3000 });
         
      }
      // setTimeout(() => {
      //   setOpenModal(false);
      // },4000)

      
    } catch (error) {
      console.error("Error:", error);
      setOpenModal(false);
    }
  };

  const downloadCSV = () => {
    setDownloading(true);

    const csvData = [
      ['Trip ID', 'Employee ID', 'Employee Name', 'Travel Reason', 'Start City', 'End City', 'Travel Start Date', 'Travel End Date', 'Transport Mode', 'Hotel Type', 'Transport Estimate', 'Transport Amount', 'Hotel Estimate', 'Hotel Amount', 'Food Estimate', 'Food Amount', 'Miscellaneous Estimate', 'Miscellaneous Amount', 'Total Estimate', 'Total Amount', 'Trip Estimate', 'Trip Amount', 'Trip Status', 'Admin Message'],
      [
        selectedTrip.trip_id,
        selectedTrip.emp_id,
        selectedTrip.emp_name,
        selectedTrip.travel_reason,
        selectedTrip.start_city_name,
        selectedTrip.end_city_name,
        formatDate(selectedTrip.travel_start_date),
        formatDate(selectedTrip.travel_end_date),
        selectedTrip.transport_mode,
        selectedTrip.hotel_type,
        selectedTrip.transport_estimate,
        selectedTrip.transport_amount,
        selectedTrip.hotel_estimate,
        selectedTrip.hotel_amount,
        selectedTrip.food_estimate,
        selectedTrip.food_amount,
        selectedTrip.miscellaneous_estimate,
        selectedTrip.miscellaneous_amount,
        selectedTrip.total_estimate,
        selectedTrip.total_amount,
        selectedTrip.trip_estimate,
        selectedTrip.trip_amount,
        selectedTrip.trip_status === 0 ? "Pending" : selectedTrip.trip_status === 1 ? "Accepted" : "Rejected",
        selectedTrip.admin_message || "N/A"
      ].join(',')
    ].join('\n');

    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvData}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'trip_details.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Simulate a delay for demonstration purposes (remove this in production)
    setTimeout(() => {
      setDownloading(false);
    }, 2000); 
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
      <div className="bg-gray-200 pt-10 rounded-lg  border-4 border-blue-200 p-3 w-[85%] h-[95%] overflow-auto shadow-md">
        <Toast ref={toast} position="bottom-center" className="p-5" />
        <ConfirmDialog />
        <div className="flex items-center justify-between ">
            <dir></dir>
          <h1 className="text-[30px] font-bold text-white p-1 px-2 rounded-lg bg-green-500 ml-16 ">
            Review Application
          </h1>
          <button onClick={() => setOpenModal(false)}
            className="text-2xl font-bold mr-8 hover:text-gray-600 focus:outline-none"
          >
            <IoCloseCircle size={30} className="text-red-400 "/>
          </button>
        </div>

        <div className="xl:flex justify-evenly items-center mx-auto">

          <div className="mt-4 mx-auto text-[20px]">
          <div className="bg-blue-500 p-2 rounded-lg my-[30px] font-bold w-fit text-white text-[20px]  mx-auto">Travel Details</div>
            <div className=" p-4 bg-white rounded-lg lg:w-[600px] mx-auto xl:mr-3 mb-4 h-fit ">
            
                <div className="flex space-x-16 border-2 justify-evenly border-blue-500 p-8 rounded-lg ">
                    <div className="flex flex-col font-bold gap-3  ">
                        <h1>Employee Name</h1>
                        <h1>Start City</h1>
                        <h1>End City</h1>
                        <h1>Travel Start Date</h1>
                        <h1>Travel End Date</h1>
                        <h1>No of Day(s)</h1>
                        <h1>Mode of Transport</h1>
                        <h1>Hotel Type</h1>
            
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1>{selectedTrip.emp_name.toUpperCase()}</h1>
                        <h1>{selectedTrip.start_city_name.toUpperCase()}</h1>
                        <h1>{selectedTrip.end_city_name.toUpperCase()} </h1>
                        <h1>{new Date(selectedTrip.travel_start_date).toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" }
                      )}</h1>
                      <h1>{new Date(selectedTrip.travel_end_date).toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" }
                      )}</h1>
                      <h1>{Math.round((new Date(selectedTrip.travel_end_date).getTime() - new Date(selectedTrip.travel_start_date).getTime()) / (1000 * 3600 * 24))+1}</h1>
                      <h1>{selectedTrip.transport_mode}</h1>
                      <h1>{selectedTrip.hotel_type}</h1>
                    </div>
                </div>
            </div>
          </div>
          <div className="mt-4 lg:w-[900px]">
        <div className="bg-blue-500 p-2 rounded-lg my-[30px] font-bold w-fit text-white text-[20px]  mx-auto">Travel Expenses</div>
          <table className="w-full border-collapse mb-4">
            <tbody className="font-semibold">
              
              
            <tr className="bg-blue-800 text-white">
            <th className="text-xl font-bold  p-3">
              Estimate
            </th>
            <td className="border-r border-blue-900">
              
            </td>
            <th className="text-xl font-bold border-0 p-3">
              Amount
            </th>
            <td className="border-0">
                
            </td>
          </tr>

              <tr className="">
                <th className="text-xl font-bold border border-blue-900 p-3 bg-blue-600 text-white">
                  Transport Estimate
                </th>
                <td className="border border-blue-900 p-3">
                  ₹ {selectedTrip.transport_estimate}
                </td>
                <th className="text-xl font-bold border border-blue-900 p-3 bg-blue-600 text-white">
                  Transport Amount
                </th>
                <td className="border border-blue-900 p-3">
                  ₹ {selectedTrip.transport_amount}
                </td>
              </tr>

              <tr>
                <th className="text-xl font-bold border border-blue-900 p-3 bg-blue-600 text-white">
                  Hotel Estimate
                </th>
                <td className="border border-blue-900 p-3">
                  ₹ {selectedTrip.hotel_estimate}
                </td>
                <th className="text-xl font-bold border border-blue-900 p-3 bg-blue-600 text-white">
                  Hotel Amount
                </th>
                <td className="border border-blue-900 p-3">
                  ₹ {selectedTrip.hotel_amount}
                </td>
              </tr>
              <tr>
                <th className="text-xl font-bold border border-blue-900 p-3 bg-blue-600 text-white">
                  Food Estimate
                </th>
                <td className="border border-blue-900 p-3">
                  ₹ {selectedTrip.food_estimate}
                </td>
                <th className="text-xl font-bold border border-blue-900 p-3 bg-blue-600 text-white">
                  Food Amount
                </th>
                <td className="border border-blue-900 p-3">
                  ₹ {selectedTrip.food_amount}
                </td>
              </tr>
              <tr>
                <th className="text-xl font-bold border border-blue-900 p-3 bg-blue-600 text-white">
                  Miscellaneous Estimate
                </th>
                <td className="border border-blue-900 p-3">
                  ₹ {selectedTrip.miscellaneous_estimate}
                </td>
                <th className="text-xl font-bold border border-blue-900 p-3 bg-blue-600 text-white">
                  Miscellaneous Amount
                </th>
                <td className="border border-blue-900 p-3">
                  ₹ {selectedTrip.miscellaneous_amount}
                </td>
              </tr>
              
              <tr>
                <th className="text-xl font-bold border border-blue-900 p-3 bg-blue-600 text-white">
                  Trip Estimate (1 Day)
                </th>
                <td className="border border-blue-900 p-3">
                  ₹ {selectedTrip.trip_estimate}
                </td>
                <th className="text-xl font-bold border border-blue-900 p-3 bg-blue-600 text-white">
                  Trip Amount (1 Day)
                </th>
                <td className="border border-blue-900 p-3">
                  ₹ {selectedTrip.trip_amount}
                </td>
              </tr>
              <tr>
                <th className="text-xl font-bold border border-blue-900 p-3 bg-blue-600 text-white">
                  Total Estimate ({selectedTrip.no_of_days} Days)
                </th>
                <td className="border border-blue-900 p-3">
                  ₹ {selectedTrip.total_estimate}
                </td>
                <th className="text-xl font-bold border border-blue-900 p-3 bg-blue-600 text-white">
                  Total Amount ({selectedTrip.no_of_days} Days)
                </th>
                <td className="border border-blue-900 p-3">
                  ₹ {selectedTrip.total_amount}
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        </div>
        <div className="flex flex-col gap-y-5">
        <div className="bg-blue-500 p-2 rounded-lg my-[30px] font-bold w-fit text-white text-[20px]  mx-auto">Calculations</div>
          <div className="w-fit mx-auto flex justify-center  bg-white font-bold text-[18px] text-black px-3 p-2 rounded-lg text-center">Total Estimate = 2 * (Transport Estimate) +( Hotel Estimate + Food Estimate + Miscellaneous Estimate)* No of Days</div>
          <div className="w-fit mx-auto flex justify-center bg-white font-bold text-[18px] text-blue-700 px-3 p-2 rounded-lg">{selectedTrip.total_estimate} = 2 * {selectedTrip.transport_estimate} + ({selectedTrip.hotel_estimate} + {selectedTrip.food_estimate} + {selectedTrip.miscellaneous_estimate}) * {selectedTrip.no_of_days}</div>
          <div className="w-fit mx-auto flex justify-center bg-white font-bold text-[18px] text-black px-3 p-2 rounded-lg text-center">Total Amount = 2 * (Transport Amount) +( Hotel Amount + Food Amount + Miscellaneous Amount)* No of Days</div>
          <div className="w-fit mx-auto flex justify-center bg-white font-bold text-[18px] text-blue-700 px-3 p-2 rounded-lg">{selectedTrip.total_amount} = 2 * {selectedTrip.transport_amount} + ({selectedTrip.hotel_amount} + {selectedTrip.food_amount} + {selectedTrip.miscellaneous_amount}) * {selectedTrip.no_of_days}</div>
          <div className="w-fit mx-auto bg-white flex justify-center font-bold text-[18px] text-black px-3 p-2 rounded-lg">Difference in Estimate vs Amount = {selectedTrip.total_amount - selectedTrip.total_estimate}</div>
           
        </div>
        <div className="mt-5">
        <div className="bg-blue-500 p-2 rounded-lg my-[30px] font-bold w-fit text-white text-[20px]  mx-auto">Admin Message</div>
          {selectedTrip.trip_status ==0 && <textarea
            rows="4"
            cols="50"
            placeholder="Type your message here..."
            value={adminMessage}
            onChange={(e) => setAdminMessage(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>}
          {
            !selectedTrip.trip_status == 0 &&
            <InputText
                    className="w-fit bg-white rounded-lg mx-auto flex justify-center text-center"
                    id="Admin"
                    
                    placeholder="Message"
                    pt={{
                      root: { className: "border-none text-[20px] font-bold " },
                    }}
                    value={selectedTrip.admin_message} 
                    
                  />
          }

          {showModify && <span className="p-float-label mt-10 flex w-fit mx-auto bg-white rounded-lg">
                  <p className="text-black ml-2 mr-2 text-[25px] flex items-center">
                    ₹
                  </p>
                  <InputText
                    className="w-[150px] bg-white rounded-lg"
                    id="TripAmount"
                    keyfilter="int"
                    placeholder="Modify Trip Amount"
                    pt={{
                      root: { className: "border-none text-[20px] font-bold " },
                    }}
                    value={newTrip} onChange={(e)=>setNewTrip(e.target.value)}
                    
                  />
                  <label
                    htmlFor="TripAmount"
                    className="text-black text-[17px]"
                  >
                    Modify Trip Amount
                  </label>
                </span>}
          <div className="flex justify-center mt-3 space-x-4">
            {selectedTrip.trip_status ==0 && <Button
              onClick={(e) => confirm1()}
              icon="pi pi-check mr-2 font-bold"
              className="bg-green-500 text-black font-bold rounded-md hover:scale-105"
            >
              Approve
            </Button>}
            { selectedTrip.trip_status ==0 && !showModify &&<Button
              onClick={(e) => confirm2()}
              icon="pi pi-times mr-2"
              className="bg-[#EE4544] text-black font-bold rounded-md hover:scale-105"
            > 
              Reject
            </Button>}
            { selectedTrip.trip_status ==0 && !showModify && <Button
              onClick={(e) => confirm3()}
              icon="pi pi-spin pi-cog font-bold mr-2"
              className="bg-yellow-500 text-black font-bold rounded-md hover:scale-105"
            >
              Modify
            </Button>}
            <Button
              onClick={downloadCSV}
              icon="pi pi-download mr-2"
              className="bg-blue-200 text-black font-bold rounded-md hover:scale-105"
              disabled={downloading} // Disable the button when downloading is in progress
            >
              Download CSV
            </Button>
          </div>
          {downloading && <div className="download-animation">Downloading...</div>}
        </div>
      </div>
    </div>
  );
};

export default TripDisplay;