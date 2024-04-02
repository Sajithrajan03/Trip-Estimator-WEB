import React, { useState, useEffect } from "react";
// import DatePicker from 'react-datepicker';

import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

import { Checkbox } from "primereact/checkbox";
import { ENTER_TRIP_DETAILS_URL } from "@/app/_Component/_util/constants";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { TbAirConditioning } from "react-icons/tb";
import { RiFlightTakeoffLine, RiFlightLandLine } from "react-icons/ri";
import { FaCalendar, FaCalendarCheck } from "react-icons/fa";
import { GET_AVERAGES_DETAILS_URL } from "@/app/_Component/_util/constants";
import { MdOutlineFlight } from "react-icons/md";
import { FaCar, FaBusAlt } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";
const ApplicantForms = ({ formData, setFormData, secretToken }) => {
  const [checkedStatus, setCheckedStatus] = useState(false);
  const today = new Date();

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

          if (response.status === 401) {
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
  useEffect(() => {}, [averageData]);

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
      { value: "noac_nosleepe", label: "Seater Non-AC" },
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
    { value: "3", label: "3 Stars" , icon: "pi-star-filled"},
    { value: "4", label: "4 Stars" ,icon: "pi-star-filled"},
    { value: "5", label: "5 Stars" ,icon: "pi-star-filled"},
  ];

  const hotelDetailsOptions = {
    "3 Stars": [
      { value: "Deluxe Room", label: "Delux" },
      { value: "Suite", label: "Suite" },
      { value: "Normal", label: "Normal" },
    ],
    "4 Stars": [
      { value: "Deluxe Room", label: "Deluxe Room" },
      { value: "Suite", label: "Suite" },
      { value: "Normal", label: "Normal" },
    ],
    "5 Stars": [
      { value: "Deluxe Room", label: "Deluxe Room" },
      { value: "Suite", label: "Suite" },
      { value: "Normal", label: "Normal" },
    ],
  };

  const handlesubmit = async () => {
    try {
      const response = await fetch(ENTER_TRIP_DETAILS_URL, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + secretToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_city: formData.location.from,
          end_city: formData.location.to,
          emp_email: "root",
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
          hotel_type: formData.hotelDetails,
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
        }),
      });

      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="">
      <div className="flex xl:space-x-2 space-y-4 xl:space-y-0 flex-col xl:flex-row mt-[20px]">
        <div className=" md:flex-row   lg flex flex-col space-y-3  font-bold p-2:space-y-0 md:space-y-0 md:space-x-4 justify-center items-center w-full">
          <div
            className="flex bg-white w-full md:w-[300px] border-blue-700 ring-2 p-1 cursor-pointer group hover:ring-4 hover:bg-[#CBE3F7] rounded-lg flex flex-col space-y-3 justify-center items-center font-bold p-2 py-3"
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
                      transportation: "",
                      transportationDetails: "",
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
                      transportation: "",
                      transportationDetails: "",
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
            <div className="flex bg-white w-full md:w-[300px] border-blue-700 ring-2 p-1   group hover:ring-4 hover:bg-[#CBE3F7] rounded-lg flex flex-col space-y-3 justify-center items-center font-bold p-2 py-3">
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

      <div className="mt-[20px]">
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
                  transportationDetails: "", // Reset transportation details when transportation option changes
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
                  <p className="text-[13px] flex justify-center">
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
          <div className="mt-[5%] flex items-center justify-evenly flex-wrap xl:flex-nowrap   gap-3 gap-y-5  text-blue-900">
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
                      <p className="text-[13px] flex justify-center">
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
                <p className="text-black ml-2 text-[25px] flex items-center">₹</p>
                  <InputText
                    className="w-[150px] cursor-not-allowed pointer-events-none bg-gray-400 rounded-lg"
                    id="TransportEstimate"
                    keyfilter="int"
                    placeholder="Transport Estimate"
                    pt={{
                      root: { className: 'border-none text-[20px] font-bold ' }
                  }}
                    value={formData.transport_estimate}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        transport_estimate: e.target.value,
                      }))
                    }
                  />
                  <label htmlFor="TransportEstimate" className="text-black text-[17px]">Transport Estimate</label>
                  
                </span>
              </div>
              <div className="ml-5">
                <span className="p-float-label w-[170px] flex rounded-lg bg-white">
                <p className="text-black ml-2 text-[25px] flex items-center mr-2">₹</p>
                  <InputText
                    className="w-[150px] rounded-lg"
                    id="TransportAmount"
                    keyfilter="int"
                    placeholder="Transport Amount"
                    value={formData.transport_amount}
                    pt={{
                      root: { className: 'border-none text-[20px] font-bold ' }
                  }}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        transport_amount: e.target.value,
                      }))
                    }
                  />
                  <label htmlFor="TransportAmount" className="text-black text-[17px]">Transport Amount</label>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className=" font-bold ring-2 ring-blue-900 flex justify-center my-10 text-blue-900 bg-[#ffffff] text-[30px] w-fit mx-auto rounded-md px-2 p-1">
      HOTELS
        </p>

        <div className="flex items-center justify-evenly flex-wrap gap-3 gap-y-5 w-full text-blue-900">
          {hotelOptions.map((option) => (
            <div
              key={option.value}
              className={`ring-2 ring-blue-900  hover:scale-105 lg:w-[140px] text-[70px] rounded-lg flex flex-col space-y-2 justify-center items-center font-bold p-2 bg-[#c0ebff] ${
                formData.hotels === option.value
                  ? "bg-blue-900 text-gray-300 ring-4 ring-black"
                  : ""
              } ${
                averageData !== null &&
                averageData[`hotelPrice`] &&
                averageData[`hotelPrice`][
                  `${option.value}`
                ]
                  ? "cursor-pointer"
                  : "bg-[#989999] text-gray-800 cursor-not-allowed disabled hover:scale-100 "
              }`}
              onClick={(selectedOption) =>
                setFormData((prevState) => ({
                  ...prevState,
                  hotels: selectedOption.value,
                  hotelDetails: "", // Reset hotel details when hotels option changes
                }))}
            >
              {option.label}
              {option.value}
              {/* <option.icon />
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
                  <p className="text-[13px] flex justify-center">
                    Estimate: ₹
                    {parseInt(
                      averageData[`${option.value.toLowerCase()}Price`][
                        `${option.value.toLowerCase()}Average`
                      ]
                    ).toFixed(0) || "N/A"}
                  </p>
                )} */}
            </div>
          ))}
        </div>

       <div className="form-field">
          <label className="from-label"></label>
          <div className="form-input">
            <Dropdown
              options={hotelOptions}
              value={formData.hotels}
              onChange={(selectedOption) =>
                setFormData((prevState) => ({
                  ...prevState,
                  hotels: selectedOption.value,
                  hotelDetails: "", // Reset hotel details when hotels option changes
                }))
              }
              className="w-full"
            />
          </div>
          <input
            type="text"
            placeholder="Food Estimate"
            value={formData.food_estimate}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                food_estimate: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="Food Amount"
            value={formData.food_amount}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                food_amount: e.target.value,
              }))
            }
          />
        </div>

        <div className="form-field">
          <label className="from-label">ROOMS PREFERENCES</label>
          <div className="form-input">
            <Dropdown
              options={hotelDetailsOptions[formData.hotels]}
              value={formData.hotelDetails}
              onChange={(selectedOption) =>
                setFormData((prevState) => ({
                  ...prevState,
                  hotelDetails: selectedOption.value,
                }))
              }
              className="w-full"
            />
          </div>
          <input
            type="text"
            placeholder="Miscellaneous Estimate"
            value={formData.miscellaneous_estimate}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                miscellaneous_estimate: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="Miscellaneous Amount"
            value={formData.miscellaneous_amount}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                miscellaneous_amount: e.target.value,
              }))
            }
          />
        </div>
{/*
        <div className="form-field">
          <label className="from-label">FOOD</label>
          <div className="form-input">
            <Dropdown
              options={[
                { value: "Vegetarian", label: "Vegetarian" },
                { value: "Non-Vegetarian", label: "Non-Vegetarian" },
              ]}
              value={formData.food}
              onChange={(selectedOption) =>
                setFormData((prevState) => ({
                  ...prevState,
                  food: selectedOption.value,
                }))
              }
              className="w-full"
            />
          </div>
          <input
            type="text"
            placeholder="Total Estimate"
            value={formData.total_estimate}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                total_estimate: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="Total Amount"
            value={formData.total_amount}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                total_amount: e.target.value,
              }))
            }
          />
        </div>

        <div className="mt-[20px]">
          <label className="from-label">Trip Estimate</label>
          <div className="form-input">
            <input
              type="text"
              value={formData.trip_estimate}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  trip_estimate: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div>

        <div className="mt-[20px]">
          <label className="from-label">Trip Amount</label>
          <div className="form-input">
            <input
              type="text"
              value={formData.trip_amount}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  trip_amount: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div>

        <div className="form-field">
          <label className="from-label" htmlFor="travel_reason">
            Travel Reason
          </label>
          <div className="form-input">
            <InputText
              type="text"
              id="travel_reason"
              name="travel_reason"
              value={formData.travel_reason}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  travel_reason: e.target.value,
                }))
              }
              required // Make the field required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div> */}

      <Button className="bg-blue-900 p-2" onClick={handlesubmit}>
        Submit
      </Button>
    </div>
  );
};

export default ApplicantForms;
