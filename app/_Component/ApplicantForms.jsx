import React, { useState, useRef } from 'react';
// import DatePicker from 'react-datepicker';

import { Calendar } from 'primereact/calendar';

import { Dropdown } from 'primereact/dropdown';

import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import { TbAirConditioning } from "react-icons/tb";
import { RiFlightTakeoffLine, RiFlightLandLine } from "react-icons/ri";
// import 'react-datepicker/dist/react-datepicker.css';
// import Select from 'react-select';
// import './Style.css';
import { Panel } from 'primereact/panel';

const ApplicantForms = () => {
  const [formData, setFormData] = useState({
    travelDates: {
      from: null,
      to: null,
    },
    location: {
      to: '',
    },
    transportation: '',
    transportationDetails: '',
    hotels: '',
    hotelDetails: '',
    food: '',
    isToCalendarOpen: false,
  });

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
    { value: "Coimbatore", label: "Coimbatore" },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Bangalore', label: 'Bangalore' },
  ];

  const transportationOptions = [
    { value: 'Flight', label: '✈️ Flight' },
    { value: 'Bus', label: '🚌 Bus' },
    { value: 'Train', label: '🚆 Train' },
    { value: 'Car', label: '🚗 Car' },
  ];

  const transportationDetailsOptions = {
    Flight: [
      { value: 'Business Class', label: 'Business Class' },
      { value: 'Economy Class', label: 'Economy Class' },
    ],
    Bus: [
      { value: 'Sleeper AC', label: <>Sleeper <span className="big-icon"><TbAirConditioning /></span></> },
      { value: 'Sleeper Non-AC', label: 'Sleeper Non-AC' },
      { value: 'Seater AC', label: 'Seater AC' },
      { value: 'Seater Non-AC', label: 'Seater Non-AC' },
    ],
    Train: [
      { value: '1A', label: '1A' },
      { value: '2A', label: '2A' },
      { value: '3A', label: '3A' },
      { value: 'AC Executive', label: 'AC Executive' },
      { value: 'AC Chair', label: 'AC Chair' },
      { value: 'Sleeper', label: 'Sleeper' },
      { value: 'Seater', label: 'Seater' },
    ],
    Car: [
      { value: 'AC', label: 'AC' },
      { value: 'Non-AC', label: 'Non-AC' },
    ],
  };

  const hotelOptions = [
    { value: '3 Stars', label: '3 Stars' },
    { value: '4 Stars', label: '4 Stars' },
    { value: '5 Stars', label: '5 Stars' },
  ];

  const hotelDetailsOptions = {
    '3 Stars': [
      { value: 'Deluxe Room', label: 'Deluxe Room' },
      { value: 'Suite', label: 'Suite' },
      { value: 'Normal', label: 'Normal' },
    ],
    '4 Stars': [
      { value: 'Deluxe Room', label: 'Deluxe Room' },
      { value: 'Suite', label: 'Suite' },
      { value: 'Normal', label: 'Normal' },
    ],
    '5 Stars': [
      { value: 'Deluxe Room', label: 'Deluxe Room' },
      { value: 'Suite', label: 'Suite' },
      { value: 'Normal', label: 'Normal' },
    ],
  };
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="form-container">
      <form>
        <div className='flex space-x-1'>

          <div className='flex bg-white border-blue-700 ring-1 p-1 cursor-pointer group hover:ring-4 hover:bg-[#CBE3F7]' onClick={() => document.getElementById('dropdown1').click()}>
              <div className='ml-2'>
                <RiFlightTakeoffLine className='text-[30px] ' />
              </div>
              <div className="flex flex-col ">
                <p className='text-md font-medium ml-[10px] text-gray-700 mt-1'>From City</p>
                <div className='w-[220px] p-2' >
                  <Dropdown
                    id="dropdown1" // Add an id to the Dropdown component
                    options={cityOptions}
                    value={formData.travelDates.from}
                    onChange={(selectedOption) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        location: { ...prevState.location, to: selectedOption.value },
                    }))
                    }
                    
                    ptOptions={{ mergeSections: false }}
                    highlightOnSelect={0} 
                    checkmark={true}
                    filter
                    className="w-[200px] rounded-md  text-black"
                    pt={{
                      root: { className: 'font-bold text-[40px] border-none group-hover:bg-[#CBE3F7]' },
                      trigger: { className: '-ml-3 ' },
                      input: { className: 'font-bold text-[30px] text-black font-sans w-[200px] p-0 ' },
                      item: ({ context }) => ({
                        className: context.selected ? 'bg-[#CBE3F7] text-black rounded-lg m-1' : "hover:bg-gray-300 rounded-lg m-1"
                      }),
                      panel: { className: '-ml-8 w-[250px]' },
                      list:{className:' border-black border-2 rounded-lg '},
                      virtualScroller:{className:'rounded-md'},
                      itemLabel:{className:'text-black font-medium text-[20px]'},
                      header:{className:'text-black font-medium text-[20px] bg-blue-100'}
                      
                    }}
                  />
                </div>
                <p className='text-md font-bold text-gray-700 ml-[10px]'>INDIA</p>
              </div>

            </div>
          <div className='flex bg-white border-blue-700 ring-1 p-1 cursor-pointer group hover:ring-4 hover:bg-[#CBE3F7]' onClick={() => document.getElementById('dropdown').click()}>
            <div className='ml-2'>
              <RiFlightTakeoffLine className='text-[30px] ' />
            </div>
            <div className="flex flex-col ">
              <p className='text-md font-medium ml-[10px] text-gray-700 mt-1'>From City</p>
              <div className='w-[220px] p-2' >
                <Dropdown
                  id="dropdown" // Add an id to the Dropdown component
                  options={cityOptions}
                  value={formData.location.to}
                  onChange={(selectedOption) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      location: { ...prevState.location, to: selectedOption.value },
                  }))
                  }
                  
                  ptOptions={{ mergeSections: false }}
                  highlightOnSelect={0} 
                  checkmark={true}
                  filter
                  className="w-[200px] rounded-md  text-black"
                  pt={{
                    root: { className: 'font-bold text-[40px] border-none group-hover:bg-[#CBE3F7]' },
                    trigger: { className: '-ml-3' },
                    input: { className: 'font-bold text-[30px] text-black font-sans w-[200px] p-0 ' },
                    item: ({ context }) => ({
                      className: context.selected ? 'bg-[#CBE3F7] text-black rounded-lg m-1' : "hover:bg-gray-300 rounded-lg m-1"
                    }),
                    panel: { className: '-ml-8 w-[250px]' },
                    list:{className:' border-black border-2 rounded-lg '},
                    virtualScroller:{className:'rounded-md'},
                    itemLabel:{className:'text-black font-medium text-[20px]'},
                    header:{className:'text-black font-medium text-[20px] bg-blue-100'}
                    
                  }}
                />
              </div>
              <p className='text-md font-bold text-gray-700 ml-[10px]'>INDIA</p>
            </div>

          </div>
          <div className="flex flex-col bg-white border-blue-700 ring-1 w-[200px] hover:ring-4  ">
            <p className='text-md font-medium text-gray-700 pt-1'>Departure Date</p>
            <Calendar value={formData.travelDates.to}  onChange={(e) => handleToDateChange(e.value)}

              highlightOnSelect={0}  
              style={{
                backgroundColor: '#CDD7E7', borderRadius: '1rem', border: "none", fontSize: "30px", width: "160px", fontWeight: "bold", display: "flex",
                justifyContent: "end",
              }}
            />
             
          </div>

        </div>
         

        

        

        {/* <div className="form-field">
          <label className="from-label">MODE OF TRANSPORT</label>
          <div className="form-input">
            <Dropdown
              options={transportationOptions}
              value={{ value: formData.transportation, label: formData.transportation }}
              onChange={(selectedOption) =>
                setFormData((prevState) => ({
                  ...prevState,
                  transportation: selectedOption.value,
                  transportationDetails: '', // Reset transportation details when transportation option changes
                }))
              }
              className="w-full"
            />
          </div>
        </div>

        <div className="form-field">
          <label className="from-label">TRAVEL PREFERENCES</label>
          <div className="form-input">
            <Dropdown
              options={transportationDetailsOptions[formData.transportation]}
              value={{ value: formData.transportationDetails, label: formData.transportationDetails }}
              onChange={(selectedOption) =>
                setFormData((prevState) => ({
                  ...prevState,
                  transportationDetails: selectedOption.value,
                  hotels: '', // Reset hotels when transportation details option changes
                  hotelDetails: '', // Reset hotel details when transportation details option changes
                }))
              }
              className="w-full"
            />
          </div>
        </div>

        <div className="form-field">
          <label className="from-label">HOTELS</label>
          <div className="form-input">
            <Dropdown
              options={hotelOptions}
              value={{ value: formData.hotels, label: formData.hotels }}
              onChange={(selectedOption) =>
                setFormData((prevState) => ({
                  ...prevState,
                  hotels: selectedOption.value,
                  hotelDetails: '', // Reset hotel details when hotels option changes
                }))
              }
              className="w-full"
            />
          </div>
        </div>

        <div className="form-field">
          <label className="from-label">ROOMS PREFERENCES</label>
          <div className="form-input">
            <Dropdown
              options={hotelDetailsOptions[formData.hotels]}
              value={{ value: formData.hotelDetails, label: formData.hotelDetails }}
              onChange={(selectedOption) =>
                setFormData((prevState) => ({
                  ...prevState,
                  hotelDetails: selectedOption.value,
                }))
              }
              className="w-full"
            />
          </div>
        </div>

        <div className="form-field">
          <label className="from-label">FOOD</label>
          <div className="form-input">
            <Dropdown
              options={[
                { value: 'Vegetarian', label: 'Vegetarian' },
                { value: 'Non-Vegetarian', label: 'Non-Vegetarian' },
              ]}
              value={{ value: formData.food, label: formData.food }}
              onChange={(selectedOption) =>
                setFormData((prevState) => ({
                  ...prevState,
                  food: selectedOption.value,
                }))
              }
              className="w-full"
            />
          </div>
        </div>

        <div className="form-field">
          <label className="from-label" htmlFor="message">YOUR MESSAGE</label>
          <div className="form-input">
            <InputText
              type="text"
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  message: e.target.value,
                }))
              }
              required // Make the field required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div> */}




        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplicantForms;
