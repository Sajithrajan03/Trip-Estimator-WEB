"use client"
import React,{useState} from 'react';
import Navbar from "@/app/_Component/Navbar"
import { TabMenu } from 'primereact/tabmenu';
import 'primeicons/primeicons.css';

const TripTable = ({ trips }) => {
  const items = [
    { label: 'All', icon: 'pi pi-caret-up text-black font-bold text-[20px]',value:0 },
    { label: 'Accepted', icon: 'pi pi-check text-green-900 font-bold text-[20px]',value:1  },
    { label: 'Rejected', icon: 'pi pi-times text-red-900 font-bold text-[20px]',value:2  },
    { label: 'Modified', icon: 'pi pi-spin pi-cog text-yellow-900 font-bold text-[20px]',value:3  }
];

const [selectedIndex, setSelectedIndex] = useState(0);

 
const handleSelectionChange = (index) => {
  console.log(index);
  setSelectedIndex(index);
};
  return (
    <div className="  overflow-x-auto">
      <Navbar />
      <TabMenu
  model={items}
  className='w-[480px] mt-[10px] mx-auto rounded-md'
  
  onTabChange={(e)=>console.log(e.value)}
  pt={{
    root: { className: "bg-[#063781] text-white" },
    action: {
      className: 'surface-ground hover:bg-blue-900 hover:rounded-full group',
    },
    menuitem: { className: "bg-[#063781] text-white" },
    label: { className: "font-bold text-black group-hover:text-white group-hover:text-white" },
    icon: { className: "text-black group-hover:text-white hover:scale-125" },
    inkbar: { className: "bg-white h-3 " },
  }}
/>
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

    </div>
    
  );
};

export default TripTable;
