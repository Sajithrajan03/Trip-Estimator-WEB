// TravelApprovalPage.js
import React, { useState } from 'react';
import AdminApproverCard from './AdminApproverCard';

const TravelApprovalPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [adminMessage, setAdminMessage] = useState('');

  const travelDetails = {
    from: 'New York',
    to: 'Los Angeles',
    startDate: '2024-04-01',
    endDate: '2024-04-10',
    amountRequired: '$5000',
    estimatedAmount: '$6000',
    requirements: {
      requiredHotelRating: '4 stars',
      requiredTravelMethod: 'Flight',
      requiredFoodPreferences: 'Vegetarian'
    },
    reasonForTravel: 'Business Meeting',
    employeeMessage: 'Please approve my travel request.',
    adminMessage: adminMessage,
    estimatedHotelAmount: '$2000',
    estimatedFoodAmount: '$1000',
    estimatedTravelAmount: '$3000',
    requiredHotelAmount: '$1800',
    requiredFoodAmount: '$900',
    requiredTravelAmount: '$2500'
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAdminMessageChange = (e) => {
    setAdminMessage(e.target.value);
  };

  return (
     
        <div className="bg-gray-200 w-[80%]p-5 rounded-md mx-auto my-auto">
          <AdminApproverCard travelDetails={travelDetails} />
          
        </div>
       

  );
};

export default TravelApprovalPage;
