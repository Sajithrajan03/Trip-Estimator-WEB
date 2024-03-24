import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';

import { Calendar } from 'primereact/calendar';
     
import { Dropdown } from 'primereact/dropdown';
import { Select, Option,Button,Input } from "@material-tailwind/react";
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"       
import { TbAirConditioning } from "react-icons/tb";
import { AiOutlineSwap } from "react-icons/ai";
// import 'react-datepicker/dist/react-datepicker.css';
// import Select from 'react-select';
// import './Style.css';

const ApplicantForms = () => {
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
    { value: 'Chennai', name: 'Chennai' },
    { value: 'Mumbai', name: 'Mumbai' },
    { value: 'Kolkata', name: 'Kolkata' },
    { value: 'Hyderabad', name: 'Hyderabad' },
    { value: 'Bangalore', name: 'Bangalore' },
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
  const handleToggle = () => {}

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
  
    const [formData, setFormData] = useState({
      start_city: 1,
      end_city: '',
      emp_email: '',
      travel_start_date: null,
      travel_end_date: null,
      transport_mode: '',
      transport_estimate: '',
      transport_amount: '',
      hotel_type: '',
      hotel_estimate: '',
      hotel_amount: '',
      food_estimate: '',
      food_amount: '',
      miscellaneous_estimate: '',
      miscellaneous_amount: '',
      total_estimate: '',
      total_amount: '',
      travel_reason: '',
      trip_estimate: '',
      trip_amount: ''
    });
  
    
  
    return (
      <div className="form-container">
        <form>
          <div className="flex items-center justify-between"> 
              <div className="w-[200px] font-bold">
                <select
                  variant="outlined"
                  className="text-center flex items-center flex-nowrap pl-4 mt-[2%] bg-white border border-gray-300 rounded-md px-3 py-2"
                  label='From City'
                  onChange={(e) => { setBusFrom(e) }}>
                  
                  {cityOptions.map((city) => (
                    <option 
                    value={city.value} 
                    key={city.value} 
                    className='text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'
                  >
                    <div className='flex gap-x-5 text-[20px] items-center'>
                      {city.name}
                    </div>
                  </option>
                  ))}
                  
                </select>
              </div>

              <Button className="bg-blue-500 rounded-full text-[30px] p-1" onClick={handleToggle}><AiOutlineSwap/></Button>
              <div className="w-[200px] font-bold  ">
                <select variant="outlined"  
              className="text-center flex items-center flex-nowrap pl-4 mt-[2%]"
              label='From City'
              onChange={(e)=>{setBusFrom(e)}}>
              
              {cityOptions.map((city)=> (
  <option value={city.value} key={city.value} className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
  <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
  {city.name}
  </div>
</option> 
))}

              
              
                </select>
              </div>
          </div>
          <Dropdown
            options={cityOptions}
            optionLabel="name"
            value={formData.start_city|| cityOptions[0].value}
            onChange={(e) => setFormData(prevState => ({ ...prevState, start_city: e.value }))}
            placeholder="Select the Start City"
            className="w-full rounded-md text-black"
            style={{ backgroundColor: '#fafbfc', borderRadius: '0.7rem' }}
          />
          <Dropdown
            options={cityOptions}
            value={formData.end_city}
            onChange={(e) => setFormData(prevState => ({ ...prevState, end_city: e.value }))}
            placeholder="Select the End City"
            className="w-full rounded-md text-black"
            style={{ backgroundColor: '#fafbfc', borderRadius: '0.7rem' }}
          />
  
          {/* Calendar inputs for travel dates */}
          <Calendar
            value={formData.travel_start_date}
            onChange={(e) => handleFromDateChange(e.value)}
            showIcon
            showButtonBar
            highlightOnSelect={false}
          />
          <Calendar
            value={formData.travel_end_date}
            onChange={(e) => handleToDateChange(e.value)}
            showIcon
            showButtonBar
            highlightOnSelect={false}
          />
  
          {/* Dropdowns for transportation mode and details */}
          <Dropdown
            options={transportationOptions}
            value={{ value: formData.transport_mode, label: formData.transport_mode }}
            onChange={(e) => setFormData(prevState => ({ ...prevState, transport_mode: e.value }))}
            className="w-full"
          />
          <Dropdown
            options={transportationDetailsOptions[formData.transport_mode]}
            value={{ value: formData.transportation_details, label: formData.transportation_details }}
            onChange={(e) => setFormData(prevState => ({ ...prevState, transportation_details: e.value }))}
            className="w-full"
          />
  
          {/* Dropdowns for hotel type and details */}
          <Dropdown
            options={hotelOptions}
            value={{ value: formData.hotel_type, label: formData.hotel_type }}
            onChange={(e) => setFormData(prevState => ({ ...prevState, hotel_type: e.value }))}
            className="w-full"
          />
          <Dropdown
            options={hotelDetailsOptions[formData.hotel_type]}
            value={{ value: formData.hotel_details, label: formData.hotel_details }}
            onChange={(e) => setFormData(prevState => ({ ...prevState, hotel_details: e.value }))}
            className="w-full"
          />
  
          {/* Dropdowns for food preferences */}
          <Dropdown
            options={[
              { value: 'Vegetarian', label: 'Vegetarian' },
              { value: 'Non-Vegetarian', label: 'Non-Vegetarian' },
            ]}
            value={{ value: formData.food_estimate, label: formData.food_estimate }}
            onChange={(e) => setFormData(prevState => ({ ...prevState, food_estimate: e.value }))}
            className="w-full"
          />
  
          {/* Input field for additional message */}
          <InputText
            type="text"
            id="message"
            name="message"
            value={formData.travel_reason}
            onChange={(e) => setFormData(prevState => ({ ...prevState, travel_reason: e.target.value }))}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
  
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default ApplicantForms;