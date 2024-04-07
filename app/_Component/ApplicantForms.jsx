import React, { useState, useEffect } from "react";
// import DatePicker from 'react-datepicker';
import {useRef} from 'react';
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useRouter } from 'next/navigation'
import { Checkbox } from "primereact/checkbox";
import { ENTER_TRIP_DETAILS_URL } from "@/app/_Component/_util/constants";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import ToastAlert from "@/app/_Component/_util/ToastAlerts";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { TbAirConditioning } from "react-icons/tb";
import { RiFlightTakeoffLine, RiFlightLandLine } from "react-icons/ri";
import { FaCalendar, FaCalendarCheck } from "react-icons/fa";
import { GET_AVERAGES_DETAILS_URL } from "@/app/_Component/_util/constants";
import { MdOutlineFlight } from "react-icons/md";
import { FaCar, FaBusAlt, FaStar } from "react-icons/fa";
import { FaTrainSubway,FaCarrot  } from "react-icons/fa6";
import { Co2Sharp } from "@mui/icons-material";
import { TbMeat } from "react-icons/tb";
import { Dialog } from 'primereact/dialog';
import TripApplication from "./TripApplication";
import LoadingScreen from "@/app/_Component/LoadingScreen";
 

import secureLocalStorage from "react-secure-storage"
import { dialog } from "@material-tailwind/react";
const ApplicantForms = ({ formData, setFormData, secretToken }) => {
  const [checkedStatus, setCheckedStatus] = useState(false);
  const today = new Date();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toastRef = useRef();
  const handleFromDateChange = (date) => {
    if (date >= today) {
      setFormData((prevState) => ({
        ...prevState,
        travelDates: { ...prevState.travelDates, from: date },
      }));
    }
  };

  const handleToDateChange = (date) => {
    if (date >= today && date >= formData.travelDates.from) {
      setFormData((prevState) => ({
        ...prevState,
        travelDates: { ...prevState.travelDates, to: date },
        no_of_days: Math.round((new Date(date).getTime() - new Date(formData.travelDates.from).getTime()) / (1000 * 3600 * 24))+1
      }));
      
    }
  };

  const handleResetDates = () => {
    setCheckedStatus(true);
    setFormData((prevState) => ({
      ...prevState,
      travelDates: { from: null, to: null },
    }));
  };

  const [averageData, setAverageData] = useState(null);
  const [selectedFromCity, setSelectedFromCity] = useState(null);

  useEffect(() => {
    if (secretToken != null && formData.location.from && formData.location.to) {
      const fetchTrips = async () => {
        try {
          const response = await fetch(GET_AVERAGES_DETAILS_URL, {
            method: "POST",
            headers: {
              Authorization: "Bearer " + secretToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              start_city: formData.location.from,
              end_city: formData.location.to,
              hotel_rating: formData.hotel_rating || "3",
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

          setAverageData(data.Message[0] || []);
        } catch (error) {
          console.error(error);
        }
      };

      fetchTrips();
    }
  }, [
    secretToken,
    formData.location.from,
    formData.location.to,
    formData.hotel_rating,
  ]);
  useEffect(() => {
     
     
      dialogTrip = {
      start_city: formData.location.from,
      end_city: formData.location.to,
      emp_email: formData.emp_email,
      emp_name: formData.emp_name,
      no_of_days :formData.no_of_days,
      travel_start_date: formData.travelDates.from,
      travel_end_date: formData.travelDates.to,
      transport_mode: formData.transportation.toUpperCase() + " - " + formData.transportationDetails.toUpperCase(),
      transport_estimate: formData.transport_estimate,
      transport_amount: formData.transport_amount,
      hotel_type: formData.hotels.toUpperCase() + " Stars - "+formData.hotel_type.toUpperCase(),
      hotel_estimate: formData.hotel_estimate,
      hotel_amount: formData.hotel_amount,
      food_estimate: formData.food_estimate,
      food_amount: formData.food_amount,
      miscellaneous_estimate: formData.miscellaneous_estimate,
      miscellaneous_amount: formData.miscellaneous_amount,
      total_estimate: formData.total_estimate,
      total_amount: formData.total_amount,
      travel_reason: formData.travel_reason,
      trip_estimate: formData.trip_estimate,
      trip_amount: formData.trip_amount,
    }
     
  }, [averageData,formData ]);

  const cityOptions = [
    { value: "1", label: "Coimbatore" },
    { value: "2", label: "Chennai" },
    { value: "5", label: "Mumbai" },
    { value: "6", label: "Kolkata" },
    { value: "4", label: "Hyderabad" },
    { value: "3", label: "Bangalore" },
  ];

  const transportationOptions = [
    { value: "Flight", label: "Flight", icon: MdOutlineFlight },
    {
      value: "Bus",
      label: "Bus",
      icon: FaBusAlt,
      details: ["Sleeper AC", "Sleeper Non-AC", "Seater AC", "Seater Non-AC"],
      getter: ["ac_sleeper", "noac_sleeper", "ac_nosleeper", "noac_nosleeper"],
    },
    {
      value: "Train",
      label: "Train",
      icon: FaTrainSubway,
      details: [
        "Seater",
        "Sleeper",
        "1A",
        "2A",
        "3A",
        "AC Executive",
        "AC Chair",
      ],
      getter: ["seater", "sl", "1A", "2A", "3A", "ac_executive", "ac_chair"],
    },
    {
      value: "Car",
      label: "Car",
      icon: FaCar,
      details: ["AC"],
      getter: ["carAverage"],
    },
  ];

  const transportationDetailsOptions = {
    Flight: [
      { value: "business", label: " Business Class" },
      { value: "economy", label: "Economy Class" },
      { value: "premium", label: "Premium Economy" },
    ],
    Bus: [
      { value: "ac_sleeper", label: "Sleeper AC" },
      { value: "noac_sleeper", label: "Sleeper Non-AC" },
      { value: "ac_nosleeper", label: "Seater AC" },
      { value: "noac_nosleeper", label: "Seater Non-AC" },
    ],
    Train: [
      { value: "1A", label: "1A" },
      { value: "2A", label: "2A" },
      { value: "3A", label: "3A" },

      { value: "ac_executive", label: "AC Executive" },
      { value: "ac_chair", label: "AC Chair" },
      { value: "sl", label: "Sleeper" },
      { value: "seater", label: "Seater" },
    ],
    Car: [{ value: "carAverage", label: "AC" }],
  };

  const hotelOptions = [
    { value: "3", label: "3 Stars", icon: "FaStar" },
    { value: "4", label: "4 Stars", icon: "FaStar" },
    { value: "5", label: "5 Stars", icon: "FaStar" },
  ];
  const foodOptions = [
    
    { value: "vegFoodAverage", label: "VEG", icon: FaCarrot  },
    { value: "nonVegFoodAverage", label: "N - VEG", icon: TbMeat },
     
  ];

  const hotelDetailsOptions = {
    3: [
      { value: "standard", label: "Standard" },
      { value: "deluxe", label: "Deluxe" },
      { value: "suite", label: "Suite" },
    ],
    4: [
      { value: "standard", label: "Standard" },
      { value: "deluxe", label: "Deluxe" },
      { value: "suite", label: "Suite" },
    ],
    5: [
      { value: "standard", label: "Standard" },
      { value: "deluxe", label: "Deluxe" },
      { value: "suite", label: "Suite" },
    ],
  }
  let dialogTrip = {
    start_city: formData.location.from,
    end_city: formData.location.to,
    start_city_name: formData.start_city_name,
    end_city_name: formData.end_city_name,
    no_of_days :formData.no_of_days,
    emp_email: formData.emp_email,
    emp_name: formData.emp_name,
    travel_start_date: formData.travelDates.from,
    travel_end_date: formData.travelDates.to,
    transport_mode: formData.transportation.toUpperCase() + " - " + formData.transportationDetails.toUpperCase(),
    transport_estimate: formData.transport_estimate,
    transport_amount: formData.transport_amount,
    hotel_type: formData.hotels.toUpperCase() + " Stars - "+formData.hotel_type.toUpperCase(),
    hotel_estimate: formData.hotel_estimate,
    hotel_amount: formData.hotel_amount,
    food_estimate: formData.food_estimate,
    food_amount: formData.food_amount,
    miscellaneous_estimate: formData.miscellaneous_estimate,
    miscellaneous_amount: formData.miscellaneous_amount,
    total_estimate: formData.total_estimate,
    total_amount: formData.total_amount,
    travel_reason: formData.travel_reason,
    trip_estimate: formData.trip_estimate,
    trip_amount: formData.trip_amount,
  }

  const handlesubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(ENTER_TRIP_DETAILS_URL, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + secretToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_city: formData.location.from,
          end_city: formData.location.to,
          emp_email: formData.emp_email,
          travel_start_date: formData.travelDates.from
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, ""),
          travel_end_date: formData.travelDates.to
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, ""),
          transport_mode:
            formData.transportation + " - " + formData.transportationDetails,
          transport_estimate: formData.transport_estimate,
          transport_amount: formData.transport_amount,
          hotel_type: formData.hotels + " - "+formData.hotel_type,
          hotel_estimate: formData.hotel_estimate,
          hotel_amount: formData.hotel_amount,
          food_estimate: formData.food_estimate,
          food_amount: formData.food_amount,
          miscellaneous_estimate: formData.miscellaneous_estimate,
          miscellaneous_amount: formData.miscellaneous_amount,
          total_estimate: formData.total_estimate,
          total_amount: formData.total_amount,
          travel_reason: formData.travel_reason,
          trip_estimate: formData.trip_estimate,
          trip_amount: formData.trip_amount,
          "travel": formData.start_city_name + " to " + formData.end_city_name,
          "days": dialogTrip.no_of_days,
        }),
      });
      const data = await response.json();
       
      if (response.status === 200) {
        setLoading(false);
        ToastAlert(
          "success",
          "Successful",
          `${data.Message}`,
          toastRef
        );
        setVisible(false);
         
      } else if (response.status === 500) {
        setLoading(false);
        ToastAlert(
          "error",
          "Oops!",
          "Something went wrong! Please try again.",
          toastRef
        );
        setVisible(false);
      } else if (data.Message !== undefined || data.Message !== null) {
        setLoading(false);
        ToastAlert("error", "Failed", `${data.Message}`, toastRef);
      } else {
        setLoading(false);
        ToastAlert(
          "error",
          "Oops!",
          "Something went wrong! Please try again!",
          toastRef
        );
      }
      



      
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [visible, setVisible] = useState(false);
  return (
    <div className="">
      <div className="p-2">
                  <Toast ref={toastRef} position="bottom-center" className="p-5" />
       </div>
       {loading ? <LoadingScreen /> : null}
      <div className="flex xl:space-x-2 space-y-4 xl:space-y-0 flex-col xl:flex-row mt-[20px]">
        <div className=" md:flex-row   lg flex flex-col space-y-3  font-bold p-2:space-y-0 md:space-y-0 md:space-x-4 justify-center items-center w-full">
          <div
            className=" bg-white w-full md:w-[300px] border-blue-700 ring-2 p-1 cursor-pointer group hover:ring-4 hover:bg-[#CBE3F7] rounded-lg flex flex-col space-y-3 justify-center items-center font-bold p-2 py-3"
            onClick={() => document.getElementById("dropdown1").click()}
          >
            <div className="ml-2">
              <RiFlightTakeoffLine className="text-[30px] " />
            </div>
            <div className="flex flex-col ">
              <p className="text-md font-medium ml-[10px] text-gray-700 mt-1">
                From City
              </p>
              <div className="w-[220px] p-2">
                <Dropdown
                  id="dropdown1"
                  options={cityOptions}
                  value={selectedFromCity}
                  onChange={(selectedOption) => {
                    setSelectedFromCity(selectedOption.value); // Update the selected "From City" state
                    setFormData((prevState) => ({
                      ...prevState,
                      location: {
                        ...prevState.location,
                        from: selectedOption.value,
                      },
                      start_city_name : cityOptions.find(city => city.value == selectedOption.value).label,
                      
                      transportation: "",
                      transportationDetails: "",
                      hotels: "",
                      hotel_type: "",
                      food: "",
                      food_estimate : "0",
                      food_amount : "0",
                      miscellaneous_estimate : "0",
                      miscellaneous_amount : "0",
                      trip_amount:"0",
                      trip_estimate:"0",
                      total_amount:"0",
                      total_estimate:"0",

                    }));
                  }}
                  placeholder={selectedFromCity ? null : "Select City"}
                  ptOptions={{ mergeSections: false }}
                  checkmark={true}
                  filter
                  className="w-[200px] rounded-md  text-black"
                  pt={{
                    root: {
                      className:
                        "font-bold text-[40px] border-none group-hover:bg-[#CBE3F7]",
                    },
                    trigger: { className: "-ml-3 " },
                    input: {
                      className:
                        "font-bold text-[30px] text-black font-sans w-[200px] p-0 ",
                    },
                    item: ({ context }) => ({
                      className: `text-black rounded-lg flex flex-col space-y-3 justify-center items-center font-bold p-2 m-1 ${
                        context.selected
                          ? "bg-blue-100"
                          : "bg-transparent hover:bg-[#CBE3F7]"
                      }`,
                    }),
                    panel: { className: "-ml-8 w-[250px]" },
                    list: {
                      className:
                        " border-black border-1 rounded-lg flex flex-col space-y-1 justify-center items-center font-bold p-1 ",
                    },
                    virtualScroller: { className: "rounded-md" },
                    itemLabel: {
                      className:
                        "text-black font-medium text-[20px] text-blue-900",
                    },
                    header: {
                      className:
                        "text-black font-medium text-[20px] text-blue-900 bg-blue-100",
                    },
                  }}
                />
              </div>
              <p className="-mt-[5px] text-md font-bold text-gray-700 ml-[10px]">
                INDIA
              </p>
            </div>
          </div>
          <div
            className="flex bg-white w-full md:w-[300px] border-blue-700 ring-2 p-1 cursor-pointer group hover:ring-4 hover:bg-[#CBE3F7] rounded-lg flex flex-col space-y-3 justify-center items-center font-bold p-2 py-3"
            onClick={() => document.getElementById("dropdown").click()}
          >
            <div className="ml-2">
              <RiFlightLandLine className="text-[30px] " />
            </div>
            <div className="flex flex-col ">
              <p className="text-md font-medium ml-[10px] text-gray-700 mt-1">
                To City
              </p>
              <div className="w-[220px] p-2">
                <Dropdown
                  id="dropdown"
                  placeholder="Select City"
                  options={cityOptions.filter(
                    (option) => option.value !== formData.location.from
                  )}
                  value={formData.location.to}
                  onChange={(selectedOption) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      location: {
                        ...prevState.location,
                        to: selectedOption.value,
                      },
                      end_city_name : cityOptions.find(city => city.value == selectedOption.value).label,
                      transportation: "",
                      transportationDetails: "",
                      hotels: "",
                      hotel_type: "",
                      food: "",
                      food_estimate : "0",
                      food_amount : "0",
                      miscellaneous_estimate : "0",
                      miscellaneous_amount : "0",
                      trip_amount:"0",
                      trip_estimate:"0",
                      total_amount:"0",
                      total_estimate:"0",
                    }))
                  }
                  ptOptions={{ mergeSections: false }}
                  checkmark={true}
                  filter
                  className="w-[200px] rounded-md  text-black"
                  pt={{
                    root: {
                      className:
                        "font-bold text-[40px] border-none group-hover:bg-[#CBE3F7]",
                    },
                    trigger: { className: "-ml-3" },
                    input: {
                      className:
                        "font-bold text-[30px] text-black font-sans w-[200px] p-0 ",
                    },
                    item: ({ context }) => ({
                      className: `text-black rounded-lg flex flex-col space-y-3 justify-center items-center font-bold p-2 m-1 ${
                        context.selected
                          ? "bg-blue-100"
                          : "bg-transparent hover:bg-[#CBE3F7]"
                      }`,
                    }),

                    panel: { className: "-ml-8 w-[250px]" },
                    list: {
                      className:
                        " border-black border-1 rounded-lg flex flex-col space-y-1 justify-center items-center font-bold p-1 ",
                    },
                    virtualScroller: { className: "rounded-md" },
                    itemLabel: {
                      className:
                        "text-black font-medium text-[20px] text-blue-900",
                    },
                    header: {
                      className:
                        "text-black font-medium text-[20px] text-blue-900 bg-blue-100",
                    },
                  }}
                />
              </div>
              <p className="-mt-[5px] text-md font-bold text-gray-700 ml-[10px]">
                INDIA
              </p>
            </div>
          </div>
        </div>
        <div className="flex  ">
          <div className="flex flex-col md:flex-row space-y-4   md:space-x-4  justify-center md:space-y-0 items-center w-full">
            <div className="flex bg-white w-full md:w-[300px] border-blue-700 ring-2 p-1   group hover:ring-4 hover:bg-[#CBE3F7] rounded-lg flex flex-col space-y-3 justify-center items-center font-bold p-2 py-3">
              <div className="ml-2">
                <FaCalendarCheck className="text-[30px] " />
              </div>
              <div className="flex flex-col ">
                <p className="text-md font-medium ml-[10px] text-gray-700 mt-1">
                  Departure Date
                </p>
                <div className="w-[220px] p-2">
                  <Calendar
                    id="calendar2"
                    value={formData.travelDates.from}
                    onChange={(e) => handleFromDateChange(e.value)}
                    placeholder="From Date"
                    minDate={today}
                    showIcon
                    pt={{
                      input: {
                        root: { className: "border-teal-500" },
                      },
                      dropdownButton: {
                        root: { className: "bg-teal-500 border-teal-500" },
                      },
                    }}
                  />
                </div>
                <div className="flex ml-[10px] items-center space-x-3">
                  <Checkbox
                    checked={checkedStatus}
                    onChange={(e) => {
                      setCheckedStatus(e.checked);
                      if (e.checked) {
                        handleResetDates();
                      }
                    }}
                  />
                  <p className=" text-md font-bold text-blue-900 ">
                    Reset Date
                  </p>
                </div>
              </div>
            </div>
            <div className=" bg-white w-full md:w-[300px] border-blue-700 ring-2 p-1   group hover:ring-4 hover:bg-[#CBE3F7] rounded-lg flex flex-col space-y-3 justify-center items-center font-bold p-2 py-3">
              <div className="ml-2">
                <FaCalendarCheck className="text-[30px] " />
              </div>
              <div className="flex flex-col ">
                <p className="text-md font-medium ml-[10px] text-gray-700 mt-1">
                  Arrival Date
                </p>
                <div className="w-[220px] p-2">
                  <Calendar
                    id="calendar2"
                    value={formData.travelDates.to}
                    showIcon
                    onChange={(e) => handleToDateChange(e.value)}
                    placeholder="To Date"
                    minDate={formData.travelDates.from}
                    disabled={!formData.travelDates.from}
                    //minDate={today}
                    pt={{
                      input: {
                        root: { className: "border-teal-500" },
                      },
                      dropdownButton: {
                        root: { className: "bg-teal-500 border-teal-500" },
                      },
                    }}
                  />
                </div>
                <div className="flex ml-[10px] items-center space-x-3">
                  <Checkbox
                    checked={checkedStatus}
                    onChange={(e) => {
                      setCheckedStatus(e.checked);
                      if (e.checked) {
                        handleResetDates();
                      }
                    }}
                  />
                  <p className=" text-md font-bold text-blue-900 ">
                    Reset Date
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-[60px] bg-[#ecf1f7] pb-[40px] rounded-lg p-2">
        <p className=" font-bold ring-2 ring-blue-900 flex justify-center my-10 text-blue-900 bg-[#ffffff] text-[30px] w-fit mx-auto rounded-md px-2 p-1">
          Transportation
        </p>

        <div className="flex items-center justify-evenly flex-wrap gap-3 gap-y-5 w-full text-blue-900">
          {transportationOptions.map((option) => (
            <div
              key={option.value}
              className={`ring-2 ring-blue-900  hover:scale-105 lg:w-[140px] text-[70px] rounded-lg flex flex-col space-y-2 justify-center items-center font-bold p-2 bg-[#c0ebff] ${
                formData.transportation === option.value
                  ? "bg-blue-900 text-gray-300 ring-4 ring-black"
                  : ""
              } ${
                averageData !== null &&
                averageData[`${option.value.toLowerCase()}Price`] &&
                averageData[`${option.value.toLowerCase()}Price`][
                  `${option.value.toLowerCase()}Average`
                ]
                  ? "cursor-pointer"
                  : "bg-[#989999] text-gray-800 cursor-not-allowed disabled pointer-events-none hover:scale-100 "
              }`}
              onClick={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  transportation: option.value,
                  transportationDetails: "",
                  transport_amount : "0",
                  transport_estimate:"0",
                      hotels: "",
                      hotel_type: "",
                      food: "",
                      food_estimate : "0",
                      food_amount : "0",
                      trip_amount:"0",
                      trip_estimate:"0",
                      total_amount:"0",
                      total_estimate:"0",

                  // Reset transportation details when transportation option changes
                }))
              }
            >
              <option.icon />
              <div
                className={`text-[26px]  ${
                  formData.transportation === option.value
                    ? " text-gray-300  "
                    : ""
                }`}
              >
                {option.label}
              </div>
              {averageData != null &&
                averageData[`${option.value.toLowerCase()}Price`] && (
                  <p className="text-[14px] flex justify-center">
                    Estimate: ₹
                    {parseInt(
                      averageData[`${option.value.toLowerCase()}Price`][
                        `${option.value.toLowerCase()}Average`
                      ]
                    ).toFixed(0) || "N/A"}
                  </p>
                )}
            </div>
          ))}
        </div>
        <p className=" font-bold ring-2 ring-blue-900 flex justify-center my-10 text-blue-900 bg-[#ffffff] text-[30px] w-fit mx-auto rounded-md px-2 p-1">
          Transportation Details
        </p>
        {formData.transportation && (
          <div className="mt-[5%] flex items-center justify-evenly flex-wrap    gap-3 gap-y-20  text-blue-900">
            {transportationDetailsOptions[formData.transportation].map(
              (option) => (
                <div
                  key={option.value}
                  className={`ring-2 ring-blue-900  md:hover:scale-105 w-full lg:w-[140px] lg:h-[140px] text-[70px] rounded-lg flex flex-col space-y-2 justify-center items-center font-bold p-2 bg-[#c0ebff] ${
                    formData.transportationDetails === option.value
                      ? "bg-blue-900 text-white ring-4 ring-black"
                      : ""
                  } ${
                    averageData !== null &&
                    averageData[
                      `${formData.transportation.toLowerCase()}Price`
                    ] &&
                    averageData[
                      `${formData.transportation.toLowerCase()}Price`
                    ][`${option.value}`]
                      ? "cursor-pointer"
                      : "bg-[#989999] text-gray-800   hover:scale-100 pointer-events-none cursor-not-allowed"
                  }`}
                  onClick={() =>
                    setFormData((prevState) => ({
                      ...prevState,
                      transportationDetails: option.value,
                      transport_estimate: parseInt(
                        averageData[
                          `${formData.transportation.toLowerCase()}Price`
                        ][`${option.value}`]
                      ).toFixed(0),
                      transport_amount: parseInt(
                        averageData[
                          `${formData.transportation.toLowerCase()}Price`
                        ][`${option.value}`]
                      ).toFixed(0),
                      trip_estimate : parseInt(formData.transport_estimate) +
                  parseInt(formData.hotel_estimate) +
                  parseInt(formData.food_estimate) +
                  parseInt(formData.miscellaneous_estimate),
                  trip_amount : parseInt(formData.transport_amount) +
                  parseInt(formData.hotel_amount) +
                  parseInt(formData.food_amount) +
                  parseInt(formData.miscellaneous_amount),
                  total_estimate : parseInt(formData.trip_estimate)*parseInt(formData.no_of_days),
                  total_amount : parseInt(formData.trip_amount)*parseInt(formData.no_of_days)

                    }))
                  }
                >
                  <div
                    className={`text-[26px]  flex justify-center items-center ${
                      formData.transportationDetails === option.value
                        ? " text-gray-300  "
                        : ""
                    }`}
                  >
                    {option.label}
                  </div>
                  {averageData !== null &&
                    averageData[
                      `${formData.transportation.toLowerCase()}Price`
                    ] && (
                      <p className="text-[14px] flex justify-center">
                        Estimate: ₹
                        {parseInt(
                          averageData[
                            `${formData.transportation.toLowerCase()}Price`
                          ][`${option.value}`]
                        ).toFixed(0) || "N/A"}
                      </p>
                    )}
                </div>
              )
            )}
            <div className="mt-[60px] xl:mt-0 flex justify-between">
              <div>
                <span className="p-float-label flex  bg-gray-400 rounded-lg">
                  <p className="text-black ml-2 text-[25px] flex items-center">
                    ₹
                  </p>
                  <InputText
                    className="w-[150px] cursor-not-allowed pointer-events-none bg-gray-400 rounded-lg"
                    id="TransportEstimate"
                    keyfilter="int"
                    placeholder="Transport Estimate"
                    pt={{
                      root: { className: "border-none text-[20px] font-bold " },
                    }}
                    value={formData.transport_estimate}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        transport_estimate: e.target.value,
                      }))
                    }
                  />
                  <label
                    htmlFor="TransportEstimate"
                    className="text-black text-[17px]"
                  >
                    Transport Estimate
                  </label>
                </span>
              </div>
              <div className="ml-5">
                <span className="p-float-label w-[170px] flex rounded-lg bg-white">
                  <p className="text-black ml-2 text-[25px] flex items-center mr-2">
                    ₹
                  </p>
                  <InputText
                    className="w-[150px] rounded-lg"
                    id="TransportAmount"
                    keyfilter="int"
                    placeholder="Transport Amount"
                    value={formData.transport_amount}
                    pt={{
                      root: { className: "border-none text-[20px] font-bold " },
                    }}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        transport_amount: e.target.value,
                        trip_estimate : parseInt(formData.transport_estimate) +
                  parseInt(formData.hotel_estimate) +
                  parseInt(formData.food_estimate) +
                  parseInt(formData.miscellaneous_estimate),
                  trip_amount : parseInt(formData.transport_amount) +
                  parseInt(formData.hotel_amount) +
                  parseInt(formData.food_amount) +
                  parseInt(formData.miscellaneous_amount),
                  total_estimate : parseInt(formData.trip_estimate)*parseInt(formData.no_of_days),
                  total_amount : parseInt(formData.trip_amount)*parseInt(formData.no_of_days)
                      }))
                    }
                  />
                  <label
                    htmlFor="TransportAmount"
                    className="text-black text-[17px]"
                  >
                    Transport Amount
                  </label>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="my-[60px] bg-[#ecf1f7] pb-[40px] rounded-lg p-2">
        <p className=" font-bold ring-2 ring-blue-900 flex justify-center my-10 text-blue-900 bg-[#ffffff] text-[30px] w-fit mx-auto rounded-md px-2 p-1">
          HOTELS
        </p>
        <div className="flex items-center justify-evenly flex-wrap gap-3 gap-y-5 w-full text-blue-900">
          {hotelOptions.map((option) => (
            <div
              key={option.value}
              className={`ring-2 ring-blue-900  hover:scale-105 lg:w-[140px] text-[50px] rounded-lg flex flex-col space-y-1 justify-center items-center font-bold p-1 bg-[#c0ebff] ${
                formData.hotels == option.value
                  ? "bg-blue-700 text-yellow-400 ring-4 ring-black"
                  : ""
              } ${
                averageData !== null &&
                averageData[`hotelPrice`] &&
                averageData[`hotelPrice`][`${option.value}`]
                  ? "cursor-pointer"
                  : "bg-[#989999] text-gray-800 cursor-not-allowed disabled pointer-events-none hover:scale-100 "
              }`}
              onClick={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  hotels: option.value,
                  hotel_type: "",
                  hotel_amount : "0",
                  hotel_estimate:"0", // Reset hotel details when hotels option changes
                }))
              }
            >
              {option.value} <FaStar className="text-[60px]" />
            </div>
          ))}
        </div>
        <p className=" font-bold ring-2 ring-blue-900 flex  justify-center my-10 text-blue-900 bg-[#ffffff] text-[30px] w-fit mx-auto rounded-md px-2 p-1">
          Hotel Details
        </p>
        {formData.hotels && (
          <div className="mt-[5%] flex items-center justify-evenly  flex-wrap   gap-3 gap-y-5  text-blue-900">
            {hotelDetailsOptions[formData.hotels].map((option) => (
              <div
                key={option.value}
                className={`ring-2 ring-blue-900  md:hover:scale-105 w-full lg:w-[140px] lg:h-[140px] text-[70px] rounded-lg flex flex-col space-y-2 justify-center items-center font-bold p-2 bg-[#c0ebff] ${
                  formData.hotel_type == option.label
                    ? "bg-blue-900 text-white ring-4 ring-black"
                    : ""
                } ${
                  averageData !== null &&
                  averageData[`hotelPrice`] &&
                  averageData[`hotelPrice`][formData.hotels] &&
                  averageData[`hotelPrice`][formData.hotels][`${option.value}`]
                    ? "cursor-pointer"
                    : "bg-[#989999] text-gray-800 cursor-not-allowed disabled pointer-events-none hover:scale-100 "
                }`}
                onClick={() =>
                  setFormData((prevState) => ({
                    ...prevState,
                    hotel_type: option.label,
                    hotel_estimate: parseInt(
                      averageData[`hotelPrice`][formData.hotels][
                        `${option.value}`
                      ]
                    ).toFixed(0),
                    hotel_amount: parseInt(
                      averageData[`hotelPrice`][formData.hotels][
                        `${option.value}`
                      ]
                    ).toFixed(0),
                    trip_estimate : parseInt(formData.transport_estimate) +
                  parseInt(formData.hotel_estimate) +
                  parseInt(formData.food_estimate) +
                  parseInt(formData.miscellaneous_estimate),
                  trip_amount : parseInt(formData.transport_amount) +
                  parseInt(formData.hotel_amount) +
                  parseInt(formData.food_amount) +
                  parseInt(formData.miscellaneous_amount),
                  total_estimate : parseInt(formData.trip_estimate)*parseInt(formData.no_of_days),
                  total_amount : parseInt(formData.trip_amount)*parseInt(formData.no_of_days)
                  }))
                }
              >
                <div
                  className={`text-[26px]  flex justify-center items-center ${
                    formData.hotel_type === option.value
                      ? " text-gray-300  "
                      : ""
                  }`}
                >
                  {option.label}
                </div>
                {averageData !== null &&
                  averageData[`hotelPrice`][formData.hotels] && (
                    <p className="text-[14px] flex justify-center">
                      Estimate: ₹
                      {parseInt(
                        averageData[`hotelPrice`][formData.hotels][
                          `${option.value}`
                        ]
                      ).toFixed(0) || "N/A"}
                    </p>
                  )}
              </div>
            ))}
            <div className="mt-[60px] xl:mt-0 flex justify-between">
              <div>
                <span className="p-float-label flex  bg-gray-400 rounded-lg">
                  <p className="text-black ml-2 text-[25px] flex items-center">
                    ₹
                  </p>
                  <InputText
                    className="w-[150px] cursor-not-allowed pointer-events-none bg-gray-400 rounded-lg"
                    id="HotelEstimate"
                    keyfilter="int"
                    placeholder="Hotel Estimate"
                    pt={{
                      root: { className: "border-none text-[20px] font-bold " },
                    }}
                    value={formData.hotel_estimate}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        hotel_estimate: e.target.value,
                      }))
                    }
                  />
                  <label
                    htmlFor="HotelEstimate"
                    className="text-black text-[17px]"
                  >
                    Hotel Estimate
                  </label>
                </span>
              </div>
              <div className="ml-5">
                <span className="p-float-label w-[170px] flex rounded-lg bg-white">
                  <p className="text-black ml-2 text-[25px] flex items-center mr-2">
                    ₹
                  </p>
                  <InputText
                    className="w-[150px] rounded-lg"
                    id="HotelAmount"
                    keyfilter="int"
                    placeholder="Hotel Amount"
                    value={formData.hotel_amount}
                    pt={{
                      root: { className: "border-none text-[20px] font-bold " },
                    }}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        hotel_amount: e.target.value,
                        trip_estimate : parseInt(formData.transport_estimate) +
                  parseInt(formData.hotel_estimate) +
                  parseInt(formData.food_estimate) +
                  parseInt(formData.miscellaneous_estimate),
                  trip_amount : parseInt(formData.transport_amount) +
                  parseInt(formData.hotel_amount) +
                  parseInt(formData.food_amount) +
                  parseInt(formData.miscellaneous_amount),
                  total_estimate : parseInt(formData.trip_estimate)*parseInt(formData.no_of_days),
                  total_amount : parseInt(formData.trip_amount)*parseInt(formData.no_of_days)
                      }))
                    }
                  />
                  <label
                    htmlFor="HotelAmount"
                    className="text-black text-[17px]"
                  >
                    Hotel Amount
                  </label>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="my-[60px] bg-[#ecf1f7] pb-[40px] rounded-lg p-2">
        <p className=" font-bold ring-2 ring-blue-900 flex justify-center my-10 text-blue-900 bg-[#ffffff] text-[30px] w-fit mx-auto rounded-md px-2 p-1">
          Food Details
        </p>
        <div className="flex items-center justify-evenly flex-wrap gap-3 gap-y-5 w-full text-blue-900">
        {foodOptions.map((option) => (
            <div
              key={option.value}
              className={`ring-2 ring-blue-900  hover:scale-105 lg:w-[140px] text-[70px] rounded-lg flex flex-col space-y-2 justify-center items-center font-bold p-2 bg-[#c0ebff] ${
                formData.food === option.label
                  ? "bg-blue-900 text-gray-300 ring-4 ring-black"
                  : ""
              } ${
                averageData !== null &&
                averageData[`foodPrice`] &&
                averageData[`foodPrice`][`${option.value}`] 
                  ? "cursor-pointer"
                  : "bg-[#989999] text-gray-800 cursor-not-allowed disabled pointer-events-none hover:scale-100 "
              }`}
              onClick={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  food: option.label,
                  food_estimate: parseInt(
                    averageData[`foodPrice`][`${option.value}`] 
                  ).toFixed(0),
                  food_amount: parseInt(
                    averageData[`foodPrice`][`${option.value}`] 
                  ).toFixed(0),
                  miscellaneous_estimate :  parseInt(
                    averageData[`miscellaneousPrice`][`miscellaneousAverage`] 
                  ).toFixed(0),
                  miscellaneous_amount :  
                  parseInt(
                    averageData[`miscellaneousPrice`][`miscellaneousAverage`] 
                  ).toFixed(0),
                  trip_estimate : parseInt(formData.transport_estimate) +
                  parseInt(formData.hotel_estimate) +
                  parseInt(formData.food_estimate) +
                  parseInt(formData.miscellaneous_estimate),
                  trip_amount : parseInt(formData.transport_amount) +
                  parseInt(formData.hotel_amount) +
                  parseInt(formData.food_amount) +
                  parseInt(formData.miscellaneous_amount),
                  total_estimate : parseInt(formData.trip_estimate)*parseInt(formData.no_of_days),
                  total_amount : parseInt(formData.trip_amount)*parseInt(formData.no_of_days)


                  // Reset transportation details when transportation option changes
                }))
              }
            >
              <option.icon />
              <div
                className={`text-[26px]  ${
                  formData.food === option.label
                    ? " text-gray-300  "
                    : ""
                }`}
              >
                {option.label}
              </div>
              {averageData != null &&
              averageData[`foodPrice`] &&
               (
                  <p className="text-[14px] flex justify-center">
                    Estimate: ₹
                    {parseInt(
                     
                      averageData[`foodPrice`][`${option.value}`] 
                    ).toFixed(0) || "N/A"}
                  </p>
                )}
            </div>
          ))}
          <div className="mt-[60px] xl:mt-0 flex justify-between">
              <div>
                <span className="p-float-label flex  bg-gray-400 rounded-lg">
                  <p className="text-black ml-2 text-[25px] flex items-center">
                    ₹
                  </p>
                  <InputText
                    className="w-[150px] cursor-not-allowed pointer-events-none bg-gray-400 rounded-lg"
                    id="FoodEstimate"
                    keyfilter="int"
                    placeholder="Food Estimate"
                    pt={{
                      root: { className: "border-none text-[20px] font-bold " },
                    }}
                    value={formData.food_estimate}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        hotel_food: e.target.value,
                        
                      }))
                    }
                  />
                  <label
                    htmlFor="FoodEstimate"
                    className="text-black text-[17px]"
                  >
                    Food Estimate
                  </label>
                </span>
              </div>
              <div className="ml-5">
                <span className="p-float-label w-[170px]  flex rounded-lg bg-white">
                  <p className="text-black ml-2 text-[25px] flex items-center mr-2">
                    ₹
                  </p>
                  <InputText
                    className="w-[150px] rounded-lg"
                    id="FoodAmount"
                    keyfilter="int"
                    placeholder="Food Amount"
                    value={formData.food_amount}
                    pt={{
                      root: { className: "border-none text-[20px] font-bold " },
                    }}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        food_amount: e.target.value,
                        trip_estimate : parseInt(formData.transport_estimate) +
                  parseInt(formData.hotel_estimate) +
                  parseInt(formData.food_estimate) +
                  parseInt(formData.miscellaneous_estimate),
                  trip_amount : parseInt(formData.transport_amount) +
                  parseInt(formData.hotel_amount) +
                  parseInt(formData.food_amount) +
                  parseInt(formData.miscellaneous_amount),
                  total_estimate : parseInt(formData.trip_estimate)*parseInt(formData.no_of_days),
                  total_amount : parseInt(formData.trip_amount)*parseInt(formData.no_of_days)
                      }))
                    }
                  />
                  <label
                    htmlFor="FoodAmount"
                    className="text-black text-[17px]"
                  >
                    Food Amount
                  </label>
                </span>
              </div>
            </div>
        </div>

         
      </div>
      {formData.food && <div className="mt-[60px] bg-[#ecf1f7] pb-[40px] rounded-lg p-2">
        <p className=" font-bold ring-2 ring-blue-900 flex justify-center my-10 text-blue-900 bg-[#ffffff] text-[30px] w-fit mx-auto rounded-md px-2 p-1">
        Miscellaneous Expense
        </p>
        <div className="flex items-center justify-evenly flex-wrap gap-3 gap-y-5 w-full text-blue-900">
        
          <div className="mt-[10px] xl:mt-0 flex justify-between">
              <div>
                <span className="p-float-label flex  bg-gray-400 rounded-lg">
                  <p className="text-black ml-2 text-[25px] flex items-center">
                    ₹
                  </p>
                  <InputText
                    className="w-[150px] cursor-not-allowed pointer-events-none bg-gray-400 rounded-lg"
                    id="MiscellaneousEstimate"
                    keyfilter="int"
                    placeholder="Miscellaneous Estimate"
                    pt={{
                      root: { className: "border-none text-[20px] font-bold " },
                    }}
                    value={formData.miscellaneous_estimate}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        miscellaneous_estimate: e.target.value,
                      }))
                    }
                  />
                  <label
                    htmlFor="MiscellaneousEstimate"
                    className="text-black text-[17px]"
                  >
                    Estimate
                  </label>
                </span>
              </div>
              <div className="ml-5">
                <span className="p-float-label w-[170px]  flex rounded-lg bg-white">
                  <p className="text-black ml-2 text-[25px] flex items-center mr-2">
                    ₹
                  </p>
                  <InputText
                    className="w-[150px] rounded-lg"
                    id="MiscellaneousAmount"
                    keyfilter="int"
                    placeholder="Miscellaneous Amount"
                    value={formData.miscellaneous_amount}
                    pt={{
                      root: { className: "border-none text-[20px] font-bold " },
                    }}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        miscellaneous_amount: e.target.value,
                      }))
                    }
                  />
                  <label
                    htmlFor="MiscellaneousAmount"
                    className="text-black text-[17px]"
                  >
                     Amount
                  </label>
                </span>
              </div>
            </div>
        </div>

         
      </div>}

      <div className="flex justify-center">
      <Button 
  className="bg-green-500 mt-[40px] p-2 mx-auto font-bold text-[22px] px-3 mb-3 rounded-2xl transition-transform hover:scale-105 border border-none "

        // onClick={handlesubmit}

        onClick={() => {

          if (
            !selectedFromCity ||
            !formData.location.to ||
            !formData.travelDates.from ||
            !formData.travelDates.to ||
            !formData.transportation ||
            !formData.transportationDetails ||
            !formData.hotels ||
            !formData.hotel_estimate ||
            !formData.hotel_amount ||
            !formData.food ||
            !formData.miscellaneous_estimate
          ) {
            // If any field is null or empty, display a message and stop further execution
            
            ToastAlert(
              "error",
              "Error",
             "Please fill in all required fields.",
              toastRef
            );
            return;
          }
           setFormData((prevState) => ({
            ...prevState,
            trip_estimate : parseInt(formData.transport_estimate)*2 +
                  parseInt(formData.hotel_estimate) +
                  parseInt(formData.food_estimate) +
                  parseInt(formData.miscellaneous_estimate),
                  trip_amount : parseInt(formData.transport_amount)*2 +
                  parseInt(formData.hotel_amount) +
                  parseInt(formData.food_amount) +
                  parseInt(formData.miscellaneous_amount),
                  total_estimate : (parseInt(formData.hotel_estimate) +
                  parseInt(formData.food_estimate) +
                  parseInt(formData.miscellaneous_estimate))*parseInt(formData.no_of_days) + parseInt(formData.transport_estimate)*2,
                  total_amount : (parseInt(formData.hotel_amount) +
                  parseInt(formData.food_amount) +
                  parseInt(formData.miscellaneous_amount))*parseInt(formData.no_of_days) + parseInt(formData.transport_amount)*2 
           }))
          setVisible(true)
        }}
        >
          Review
        </Button>
      </div>

      <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <TripApplication selectedTrip={dialogTrip} setTravelReason={setFormData} setOpenModal={()=>setVisible(false)} handleUpdate={handlesubmit}/>
      </Dialog>
    </div>
  );
};

export default ApplicantForms;