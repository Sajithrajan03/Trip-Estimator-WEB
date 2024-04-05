import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
        
const TripDisplay = ({ selectedTrip, setOpenModal }) => {
  const toast = useRef(null);
  const [adminMessage, setAdminMessage] = useState("");
  const [downloading, setDownloading] = useState(false);

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
          handleUpdate();
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
      <div className="bg-white rounded-lg border-4 border-blue-200 p-3 w-11/12 h-5/6 overflow-auto shadow-md">
        <Toast ref={toast} position="bottom-center" className="p-5" />
        <div className="relative">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-900 underline -lightgray p-2 rounded-full mt-0 transform -translate-y-6">Trip Details</h1>
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
    <th className="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Transport Estimate</th>
    <td className="border border-gray-400 p-3">₹ {selectedTrip.transport_estimate}</td>
    <th className="text-xl font-bold border border-gray-400 p-3 bg-blue-100">Transport Amount</th>
    <td className="border border-gray-400 p-3">₹ {selectedTrip.transport_amount}</td>
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
              className="bg-green-500 text-black font-bold rounded-md hover:scale-105"
            >
              Approve
            </Button>
            <Button
              onClick={(e) => confirm2()}
              icon="pi pi-times mr-2"
              className="bg-[#EE4544] text-black font-bold rounded-md hover:scale-105"
            >
              Reject
            </Button>
            <Button
              onClick={(e) => confirm1()}
              icon="pi pi-spin pi-cog font-bold mr-2"
              className="bg-yellow-500 text-black font-bold rounded-md hover:scale-105"
            >
              Modify
            </Button>
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
