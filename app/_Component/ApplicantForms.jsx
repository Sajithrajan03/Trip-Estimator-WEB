import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';

import { Calendar } from 'primereact/calendar';
     
import { Dropdown } from 'primereact/dropdown';
   
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"       
import { TbAirConditioning } from "react-icons/tb";
// import 'react-datepicker/dist/react-datepicker.css';
// import Select from 'react-select';
// import './Style.css';

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

  return (
    <div className="form-container">
      <form>
        <div className="">
        <label className="block mb-2 text-md font-medium text-black"> Travel Dates
                      </label>
          <div className="flex flex-row space-x-10 justify-center">
            <div>
                <label className="block mb-2 text-md font-medium text-black"> ORIGIN
                        </label>
                <Calendar value={formData.travelDates.from} onChange={(e) => handleFromDateChange(e.value)} showIcon showButtonBar  highlightOnSelect={false}/>
            </div>
            <div>
                <Calendar value={formData.travelDates.to} onChange={(e) => handleToDateChange(e.value)} showIcon showButtonBar highlightOnSelect={false}/>
            </div>
          </div>
        </div>
  
        <div className="form-field">
        <label className="block mb-2 text-md font-medium text-black"> Origin </label>
            <div className="form-input">
                <InputText type="text" value="Coimbatore" disabled className="w-full border border-gray-300 rounded-3xl p-2" 
                />
            </div>
        </div>

         <div className="form-field">
         <label className="block mb-2 text-md font-medium text-black"> Destination</label>
        <div className="form-input">
        <Dropdown
            options={cityOptions}
            value={formData.location.to}
            onChange={(selectedOption) =>
                setFormData((prevState) => ({
                ...prevState,
                location: { ...prevState.location, to: selectedOption.value },
                }))
            }
            placeholder="Select the Destination City"
            checkmark={true} highlightOnSelect={false}
            className="w-full rounded-md  text-black"
            style={{ backgroundColor: '#fafbfc',borderRadius: '0.7rem' } }
            />

        </div>
        </div>

        <div className="form-field">
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
        </div>

  
  
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplicantForms;
