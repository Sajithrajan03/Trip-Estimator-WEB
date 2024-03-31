import React, { useState, useRef } from 'react';
import { UPDATE_TRIP_DETAILS_URL } from "@/app/_Component/_util/constants";
import secureLocalStorage from 'react-secure-storage';
import { Toast } from "primereact/toast";
import { Button } from 'primereact/button';

const TripDisplay = ({ selectedTrip, setOpenModal }) => {
  const toast = useRef(null);
  const [adminMessage, setAdminMessage] = useState("");

  if (!selectedTrip) {
    return null; // If selectedTrip is not provided, render nothing
  }

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Request Canceled', detail: 'You have canceled the request', life: 3000 });
    setTimeout(() => {
      setOpenModal(false);
    }, 1000);
  };

  const confirm1 = () => {
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: () => {
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
        toast.current.show({ severity: 'error', summary: 'Rejected', detail: 'You have rejected the Application', life: 3000 });
        setTimeout(() => {
          handleUpdate(2);
        }, 1000);
      }
    });
  };

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
          "trip_status": status,
          "trip_amount": selectedTrip.trip_amount,
          "admin_message": adminMessage
        }),
      });

      if (response.status === 401) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Session Expired, Please Login Again', life: 3000 });
        setTimeout(() => {
          secureLocalStorage.clear();
          router.replace('/');
        }, 3000);
      }

      setOpenModal(false);
    } catch (error) {
      console.error("Error:", error);
      setOpenModal(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
  <div className="bg-white rounded-lg border-4 border-blue-200 p-3 w-11/12 h-5/6 overflow-auto shadow-md">
    <Toast ref={toast} position="bottom-center" className="p-5" />
    <div className="relative">
    <div className="flex items-center justify-center">
    <h1 className="text-4xl font-bold text-gray-900 underline - light gray p-2 rounded-full mt-0 transform -translate-y-6">Trip Details</h1>
      </div>
          <button
            onClick={() => setOpenModal(false)}
            className="text-2xl font-bold absolute top-0 right-0 mt-3 mr-3 translate-x-full -translate-y-1/2 hover:text-gray-600 focus:outline-none"
          >
            X
          </button>
        </div>
        <div className="mt-4">
          <table className="w-full border-collapse mb-4">
            <tbody>
              <tr>
                <th className="text-xl font-bold border border-gray-400 p-3">Trip ID</th>
                <td className="border border-gray-400 p-3">{selectedTrip.trip_id}</td>
                <th className="text-xl font-bold border border-gray-400 p-3">Employee ID</th>
                <td className="border border-gray-400 p-3">{selectedTrip.emp_id}</td>
              </tr>
              <tr>
                <th className="text-xl font-bold border border-gray-400 p-3">Employee Name</th>
                <td colSpan="3" className="border border-gray-400 p-3">{selectedTrip.emp_name}</td>
              </tr>
              <tr>
              <th className="text-xl font-bold border border-gray-400 p-3">Travel Reason</th>
                <td colSpan="3" className="border border-gray-400 p-3">{selectedTrip.travel_reason}</td>
              </tr>
              <tr>
                <th className="text-xl font-bold border border-gray-400 p-3">Start City</th>
                <td className="border border-gray-400 p-3">{selectedTrip.start_city_name}</td>
                <th className="text-xl font-bold border border-gray-400 p-3">End City</th>
                <td className="border border-gray-400 p-3">{selectedTrip.end_city_name}</td>
              </tr>
              <tr>
                <th className="text-xl font-bold border border-gray-400 p-3">Travel Start Date</th>
                <td className="border border-gray-400 p-3">
                  {new Date(selectedTrip.travel_start_date).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </td>
                <th className="text-xl font-bold border border-gray-400 p-3">Travel End Date</th>
                <td className="border border-gray-400 p-3">
                  {new Date(selectedTrip.travel_end_date).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </td>
              </tr>
              <tr>
                <th className="text-xl font-bold border border-gray-400 p-3">Transport Mode</th>
                <td className="border border-gray-400 p-3">{selectedTrip.transport_mode}</td>
                <th className="text-xl font-bold border border-gray-400 p-3">Hotel Type</th>
                <td className="border border-gray-400 p-3">{selectedTrip.hotel_type}</td>
              </tr>
              <tr>
    <th class="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Transport Estimate</th>
    <td class="border border-gray-400 p-3">₹ {selectedTrip.transport_estimate}</td>
    <th class="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Transport Amount</th>
    <td class="border border-gray-400 p-3">₹ {selectedTrip.transport_amount}</td>
</tr>




              <tr>
              <th className="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Hotel Estimate</th>
                <td className="border border-gray-400 p-3">₹ {selectedTrip.hotel_estimate}</td>
                <th className="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Hotel Amount</th>
                <td className="border border-gray-400 p-3">₹ {selectedTrip.hotel_amount}</td>
              </tr>
              <tr>
                <th className="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Food Estimate</th>
                <td className="border border-gray-400 p-3">₹ {selectedTrip.food_estimate}</td>
                <th className="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Food Amount</th>
                <td className="border border-gray-400 p-3">₹ {selectedTrip.food_amount}</td>
              </tr>
              <tr>
               <th className="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Miscellaneous Estimate</th>
                <td className="border border-gray-400 p-3">₹ {selectedTrip.miscellaneous_estimate}</td>
                <th className="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Miscellaneous Amount</th>
                <td className="border border-gray-400 p-3">₹ {selectedTrip.miscellaneous_amount}</td>
                
              </tr>
              <tr>
                <th className="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Total Estimate</th>
                <td className="border border-gray-400 p-3">₹ {selectedTrip.total_estimate}</td>
                <th className="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Total Amount</th>
                <td className="border border-gray-400 p-3">₹ {selectedTrip.total_amount}</td>
              </tr>
              <tr>
                <th className="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Trip Estimate</th>
                <td className="border border-gray-400 p-3">₹ {selectedTrip.trip_estimate}</td>
                <th className="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Trip Amount</th>
                <td className="border border-gray-400 p-3">₹ {selectedTrip.trip_amount}</td>
              </tr>
              <tr>
                <th className="text-xl font-bold border border-gray-400 p-3">Trip Status</th>
                <td colSpan="3" className="border border-gray-400 p-3">{selectedTrip.trip_status === 0 ? "Pending" : selectedTrip.trip_status === 1 ? "Accepted" : "Rejected"}</td>
              </tr>
              <tr>
                <th className="text-xl font-bold border border-gray-400 p-3">Admin Message</th>
                <td colSpan="3" className="border border-gray-400 p-3">{selectedTrip.admin_message || "N/A"}</td>
              </tr>
              
            </tbody>
          </table>
        </div>
        <div className="mt-5">
          <textarea
            rows="4"
            cols="50"
            placeholder="Type your message here..."
            value={adminMessage}
            onChange={(e) => setAdminMessage(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
          <div className="flex justify-center mt-3 space-x-4">
            <Button
              onClick={(e) => confirm1()}
              icon="pi pi-check mr-2 font-bold"
              className="bg-green-500 text-white font-bold rounded-md hover:scale-105"
            >
              Approve
            </Button>
            <Button
              onClick={(e) => confirm2()}
              icon="pi pi-times mr-2"
              className="bg-[#EE4544] text-white font-bold rounded-md hover:scale-105"
            >
              Reject
            </Button>
            <Button
              onClick={(e) => confirm1()}
              icon="pi pi-spin pi-cog font-bold mr-2"
              className="bg-[#07B6D5] text-white font-bold rounded-md hover:scale-105"
            >
              Modify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripDisplay;
