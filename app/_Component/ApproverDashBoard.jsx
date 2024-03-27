"use client"
import React,{useState} from 'react';
import Navbar from "@/app/_Component/Navbar"
import { TabMenu } from 'primereact/tabmenu';
import 'primeicons/primeicons.css';
import { FaCircleArrowRight } from "react-icons/fa6";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const TripTable = ({ trips }) => {
  const items = [
    { label: 'All', icon: 'pi pi-caret-up text-black font-bold text-[20px]',value:0 },
    { label: 'Pending', icon: 'pi pi-spin pi-cog text-yellow-900 font-bold text-[20px]',value:1  },
    { label: 'Accepted', icon: 'pi pi-check text-green-900 font-bold text-[20px]',value:2 },
    { label: 'Rejected', icon: 'pi pi-times text-red-900 font-bold text-[20px]',value:3  }
    
];

const [selectedIndex, setSelectedIndex] = useState(0);

 
const handleSelectionChange = (index) => {
  
  setSelectedIndex(index.value);
};
  return (
    <div className="  overflow-x-auto">
      <Navbar />
      <div className='p-2 bg-gray-900 w-fit h-fit mx-auto mt-10 rounded-md flex items-center'>
        <TabMenu
          model={items}
          className='w-[400px] md:w-[460px] my-auto mx-auto rounded-md'
          activeIndex={selectedIndex}
          onTabChange={(e)=>handleSelectionChange(e.value)}
          pt={{
            label: { className: "font-bold text-black group-hover:text-white group-hover:text-white" },
            icon: { className: "text-black group-hover:text-white hover:scale-125" },
            
          }}
        />
      </div>
      <table className="table-auto hidden border-collapse border border-gray-800 w-full">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Trip ID</th>
            <th className="px-4 py-2">Start City</th>
            <th className="px-4 py-2">End City</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Transport Mode</th>
            <th className="px-4 py-2">Transport Estimate</th>
            <th className="px-4 py-2">Transport Amount</th>
            <th className="px-4 py-2">Hotel Type</th>
            <th className="px-4 py-2">Hotel Estimate</th>
            <th className="px-4 py-2">Hotel Amount</th>
            <th className="px-4 py-2">Food Estimate</th>
            <th className="px-4 py-2">Food Amount</th>
            <th className="px-4 py-2">Miscellaneous Estimate</th>
            <th className="px-4 py-2">Miscellaneous Amount</th>
            <th className="px-4 py-2">Total Estimate</th>
            <th className="px-4 py-2">Total Amount</th>
            <th className="px-4 py-2">Travel Reason</th>
            <th className="px-4 py-2">Admin Message</th>
            <th className="px-4 py-2">Trip Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(trip => (
            <tr key={trip.trip_id} className="bg-gray-200">
              <td className="border px-4 py-2">{trip.trip_id}</td>
              <td className="border px-4 py-2">{trip.start_city}</td>
              <td className="border px-4 py-2">{trip.end_city}</td>
              <td className="border px-4 py-2">{trip.travel_start_date}</td>
              <td className="border px-4 py-2">{trip.travel_end_date}</td>
              <td className="border px-4 py-2">{trip.transport_mode}</td>
              <td className="border px-4 py-2">{trip.transport_estimate}</td>
              <td className="border px-4 py-2">{trip.transport_amount}</td>
              <td className="border px-4 py-2">{trip.hotel_type}</td>
              <td className="border px-4 py-2">{trip.hotel_estimate}</td>
              <td className="border px-4 py-2">{trip.hotel_amount}</td>
              <td className="border px-4 py-2">{trip.food_estimate}</td>
              <td className="border px-4 py-2">{trip.food_amount}</td>
              <td className="border px-4 py-2">{trip.miscellaneous_estimate}</td>
              <td className="border px-4 py-2">{trip.miscellaneous_amount}</td>
              <td className="border px-4 py-2">{trip.total_estimate}</td>
              <td className="border px-4 py-2">{trip.total_amount}</td>
              <td className="border px-4 py-2">{trip.travel_reason}</td>
              <td className="border px-4 py-2">{trip.admin_message}</td>
              <td className="border px-4 py-2">{trip.trip_status}</td>
              <td className="border px-4 py-2">
                {/* Add actions here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="md:block">
  <div className="mx-1">
      
    
    <div className='bg-gray-400 mt-10 p-3 mx-auto lg:w-[960px] rounded-lg '>
      {trips.map(trip => (
        <div key={trip.trip_id} className="flex space-x-4 justify-evenly lg:justify-evenly  bg-white rounded-lg pb-1 mb-3 items-center border-b border-gray-200">
          <div className='flex w-[30%] flex-col space-y-1 ml-1'>
            <div className="w-full flex justify-center text-[20px] font-bold mt-2 sm:w-1/2 md:w-auto  px-4">
            {trip.emp_name.toUpperCase()}
            </div>
            <div className='flex justify-evenly items-center bg-green-400 rounded-md p-1'>
              <div className="w-full  text-[16px] font-bold  sm:w-1/2 md:w-auto  px-2">
                {trip.start_city_name}
              </div>
              <div><FaCircleArrowRight/></div>
              <div className="w-full text-[16px] font-bold  sm:w-1/2 md:w-auto  px-2">
                {trip.end_city_name}
              </div>
            </div>
            <div className='flex justify-evenly items-center  bg-gray-400 rounded-md p-1'>
              <div className="w-full text-[12px] font-bold  sm:w-1/2 md:w-auto  px-2">
              {new Date(trip.travel_start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div><FaCircleArrowRight/></div>
              <div className="w-full text-[12px] font-bold    md:w-auto  px-2 ">
              {new Date(trip.travel_end_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
          <div className=" hidden lg:flex lg:flex-col space-y-3  lg:w-[280px] bg-[#0c185a] text-white rounded-lg font-bold sm:w-1/2 md:w-auto py-2 px-4">
            <div className='bg-white text-black rounded-lg font-bold flex justify-center text-[18px] px-1'>Travel Details</div>
            <div className='flex justify-center'>{trip.transport_mode}</div>
          </div>
           
          
          <div className='flex flex-col justify-center items-center mt-5'>
            <div className=" bg-blue-900 min-w-[100px] text-white font-bold flex justify-center rounded-lg sm:w-1/2 md:w-auto py-2 px-4">
            ₹ {trip.total_estimate}  
            </div>
            
            
            <div className="w-full sm:w-1/2 md:w-auto py-2 px-4">
              {trip.trip_status==0?<div className='bg-yellow-300 border-2 border-black text-black font-bold rounded-lg p-2'>Pending</div>
              :trip.trip_status==1?<div className='bg-green-500 border-2 border-black text-black font-bold rounded-lg p-2'>Accepted</div>:
              <div className='bg-red-300 border-2 border-black text-black font-bold rounded-lg p-2'>Rejected</div>}
            </div>
          </div>
           
        </div>
      ))}
    </div>
  </div>
</div>


    </div>
    
  );
};

export default TripTable;
