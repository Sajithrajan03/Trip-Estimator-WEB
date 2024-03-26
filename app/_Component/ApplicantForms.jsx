import React, { useState, useRef } from "react";
// import DatePicker from 'react-datepicker';

import { Calendar } from "primereact/calendar";

import { Checkbox } from "primereact/checkbox";
import { ENTER_TRIP_DETAILS_URL } from "@/app/_Component/_util/constants";

import { Dropdown } from "primereact/dropdown";

import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { TbAirConditioning } from "react-icons/tb";
import { RiFlightTakeoffLine, RiFlightLandLine } from "react-icons/ri";
import { FaCalendar, FaCalendarCheck } from "react-icons/fa";


const ApplicantForms = ({ formData, setFormData ,secretToken}) => {
  //   const filterPastDates = (date) => {
  //     const today = new Date();
  //     const yesterday = new Date(today);
  //     yesterday.setDate(yesterday.getDate() - 1);
  //     return date >= yesterday;
  //   };

  const handleFromDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      travelDates: { ...prevState.travelDates, from: date },
    }));
  };

  const handleToDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      travelDates: { ...prevState.travelDates, to: date },
    }));
  };

  const cityOptions = [
    { value: "1", label: "Coimbatore" },
    { value: "2", label: "Chennai" },
    { value: "5", label: "Mumbai" },
    { value: "6", label: "Kolkata" },
    { value: "4", label: "Hyderabad" },
    { value: "3", label: "Bangalore" },
  ];

  const transportationOptions = [
    { value: "Flight", label: "✈️ Flight" },
    { value: "Bus", label: "🚌 Bus" },
    { value: "Train", label: "🚆 Train" },
    { value: "Car", label: "🚗 Car" },
  ];

  const transportationDetailsOptions = {
    Flight: [
      { value: "Business Class", label: "Business Class" },
      { value: "Economy Class", label: "Economy Class" },
    ],
    Bus: [
      {
        value: "Sleeper AC",
        label: (
          <>
            Sleeper{" "}
            <span className="big-icon">
              <TbAirConditioning />
            </span>
          </>
        ),
      },
      { value: "Sleeper Non-AC", label: "Sleeper Non-AC" },
      { value: "Seater AC", label: "Seater AC" },
      { value: "Seater Non-AC", label: "Seater Non-AC" },
    ],
    Train: [
      { value: "1A", label: "1A" },
      { value: "2A", label: "2A" },
      { value: "3A", label: "3A" },
      { value: "AC Executive", label: "AC Executive" },
      { value: "AC Chair", label: "AC Chair" },
      { value: "Sleeper", label: "Sleeper" },
      { value: "Seater", label: "Seater" },
    ],
    Car: [
      { value: "AC", label: "AC" },
      { value: "Non-AC", label: "Non-AC" },
    ],
  };

  const hotelOptions = [
    { value: "3 Stars", label: "3 Stars" },
    { value: "4 Stars", label: "4 Stars" },
    { value: "5 Stars", label: "5 Stars" },
  ];

  const hotelDetailsOptions = {
    "3 Stars": [
      { value: "Deluxe Room", label: "Deluxe Room" },
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
    console.log("sd");
    try {
      const response = await fetch(ENTER_TRIP_DETAILS_URL, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + secretToken,
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

      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [checked, setChecked] = useState(false);
  return (
    <div className="">
      <form>
        <div className="flex xl:space-x-2 space-y-4 xl:space-y-0 flex-col xl:flex-row mt-[20px]">
          <div className="flex flex-col md:flex-row space-y-4 lg:space-y-0 md:space-y-0 md:space-x-4 justify-center items-center w-full">
            <div
              className="flex bg-white w-full md:w-[300px] border-blue-700 ring-2 p-1 cursor-pointer group hover:ring-4 hover:bg-[#CBE3F7] rounded-lg py-3"
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
                    id="dropdown1" // Add an id to the Dropdown component
                    options={cityOptions}
                    value={formData.location.from}
                    onChange={(selectedOption) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        location: {
                          ...prevState.location,
                          from: selectedOption.value,
                        },
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
                      trigger: { className: "-ml-3 " },
                      input: {
                        className:
                          "font-bold text-[30px] text-black font-sans w-[200px] p-0 ",
                      },
                      item: ({ context }) => ({
                        className: context.selected
                          ? "bg-[#CBE3F7] text-black rounded-lg m-1"
                          : "hover:bg-gray-300 rounded-lg m-1",
                      }),
                      panel: { className: "-ml-8 w-[250px]" },
                      list: { className: " border-black border-2 rounded-lg " },
                      virtualScroller: { className: "rounded-md" },
                      itemLabel: {
                        className: "text-black font-medium text-[20px]",
                      },
                      header: {
                        className:
                          "text-black font-medium text-[20px] bg-blue-100",
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
              className="flex bg-white w-full md:w-[300px] border-blue-700 ring-2 p-1 cursor-pointer group hover:ring-4 hover:bg-[#CBE3F7] rounded-lg py-3"
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
                    options={cityOptions}
                    value={formData.location.to}
                    onChange={(selectedOption) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        location: {
                          ...prevState.location,
                          to: selectedOption.value,
                        },
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
                        className: context.selected
                          ? "bg-[#CBE3F7] text-black rounded-lg m-1"
                          : "hover:bg-gray-300 rounded-lg m-1",
                      }),
                      panel: { className: "-ml-8 w-[250px]" },
                      list: { className: " border-black border-2 rounded-lg " },
                      virtualScroller: { className: "rounded-md" },
                      itemLabel: {
                        className: "text-black font-medium text-[20px]",
                      },
                      header: {
                        className:
                          "text-black font-medium text-[20px] bg-blue-100",
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
              <div className="flex bg-white w-full md:w-[300px] border-blue-700 ring-2 p-1   group hover:ring-4 hover:bg-[#CBE3F7] rounded-lg py-3">
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
                      showIcon
                      onChange={(e) => handleFromDateChange(e.value)}
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
                      checked={checked} // Ensure that checked state
                      onChange={() => {
                        const currentDateStr = new Date().toISOString();
                        handleToDateChange("");
                        setChecked(!checked);
                      }}
                    ></Checkbox>
                    <p className=" text-md font-bold text-blue-900 ">
                      Reset Date
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex bg-white w-full md:w-[300px] border-blue-700 ring-2 p-1   group hover:ring-4 hover:bg-[#CBE3F7] rounded-lg py-3">
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
                      highlightOnSelect={0}
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
                      checked={checked} // Ensure that checked state
                      onChange={() => {
                        handleToDateChange("");
                        setChecked(!checked);
                      }}
                    ></Checkbox>
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
          <p className="text-xl font-bold text-black">Transportation</p>
          <div className="form-input">
            <Dropdown
              options={transportationOptions}
              value={formData.transportation}
              onChange={(selectedOption) => {
                setFormData((prevState) => ({
                  ...prevState,
                  transportation: selectedOption.value,
                  transportationDetails: "", // Reset transportation details when transportation option changes
                }));
              }}
              className="w-full"
            />
          </div>
          <input
            type="text"
            placeholder="Transport Estimate"
            value={formData.transport_estimate}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                transport_estimate: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="Transport Amount"
            value={formData.transport_amount}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                transport_amount: e.target.value,
              }))
            }
          />
        </div>

        {formData.transportation && (
          <div className="mt-[20px]">
            <p className="text-xl font-bold text-black">Travel Preferences</p>
            <div className="form-input">
              <Dropdown
                options={transportationDetailsOptions[formData.transportation]}
                value={formData.transportationDetails}
                onChange={(selectedOption) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    transportationDetails: selectedOption.value,
                    hotels: "", // Reset hotels when transportation details option changes
                    hotelDetails: "", // Reset hotel details when transportation details option changes
                  }))
                }
                checkmark={true}
                filter
                pt={{
                  root: {
                    className:
                      "font-bold text-[40px] border-none group-hover:bg-[#CBE3F7]",
                  },
                  trigger: { className: "-ml-3" },
                  input: {
                    className:
                      "font-bold text-[20px] text-black font-sans w-[700px]  p-0 ",
                  },
                  item: ({ context }) => ({
                    className: context.selected
                      ? "bg-[#CBE3F7] text-black rounded-lg m-1"
                      : "hover:bg-gray-300 rounded-lg m-1",
                  }),
                  panel: { className: "-ml-8 " },
                  list: { className: "border-black border-2 rounded-lg" },
                  virtualScroller: { className: "rounded-md" },
                  itemLabel: {
                    className: "text-black font-medium text-[20px]",
                  },
                  header: {
                    className: "text-black font-medium text-[20px] bg-blue-100",
                  },
                }}
              />
            </div>
            <input
              type="text"
              placeholder="Hotel Estimate"
              value={formData.hotel_estimate}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  hotel_estimate: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Hotel Amount"
              value={formData.hotel_amount}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  hotel_amount: e.target.value,
                }))
              }
            />
          </div>
        )}

        <div className="form-field">
          <label className="from-label">HOTELS</label>
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
        </div>

        <p onClick={handlesubmit}>Submit</p>
      </form>
    </div>
  );
};

export default ApplicantForms;
