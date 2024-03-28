import React from 'react';

const AdminApproverCard = ({ travelDetails }) => {
  const {
    from,
    to,
    startDate,
    endDate,
    amountRequired,
    estimatedAmount,
    requirements,
    reasonForTravel,
    employeeMessage,
    adminMessage,
    estimatedHotelAmount,
    estimatedFoodAmount,
    estimatedTravelAmount,
    requiredHotelRating,
    requiredTravelMethod,
    requiredFoodPreferences,
    requiredHotelAmount,
    requiredFoodAmount,
    requiredTravelAmount
  } = travelDetails;

  return (
    <div>
      <h2>Travel Details</h2>
      <div>
        <p><strong>From:</strong> {from}</p>
        <p><strong>To:</strong> {to}</p>
        <p><strong>Start Date:</strong> {startDate}</p>
        <p><strong>End Date:</strong> {endDate}</p>
        <p><strong>Amount Required:</strong> {amountRequired}</p>
        <p><strong>Estimated Amount:</strong> {estimatedAmount}</p>
        <p><strong>Requirements:</strong></p>
        <ul>
          <li><strong>Hotel Ratings:</strong> {requiredHotelRating}</li>
          <li><strong>Travel Method:</strong> {requiredTravelMethod}</li>
          <li><strong>Food Preferences:</strong> {requiredFoodPreferences}</li>
        </ul>
        <p><strong>Reason for Travel:</strong> {reasonForTravel}</p>
        <p><strong>Employee Message:</strong> {employeeMessage}</p>
        <p><strong>Admin Message:</strong> {adminMessage}</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Item</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Estimated Amount</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Required Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Food</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{estimatedFoodAmount}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{requiredFoodAmount}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Travel</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{estimatedTravelAmount}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{requiredTravelAmount}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Hotel</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{estimatedHotelAmount}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{requiredHotelAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminApproverCard;
