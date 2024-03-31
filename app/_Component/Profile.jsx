import React, { useState } from 'react';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    postcode: '',
    jobRole: '',
    additionalDetails: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Perform length validation and restrict to alphabetic characters
    if ((name === "firstName" || name === "lastName") && (/^[a-zA-Z]*$/.test(value) || value === '')) {
      setFormData({
        ...formData,
        [name]: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate Job Role
    if (formData.jobRole.trim() === '') {
      alert("Job Role is required");
      return;
    }

    // Validate Additional Details
    if (formData.additionalDetails.trim() === '') {
      alert("Additional Details are required");
      return;
    }

    console.log("Form submitted", formData);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/; // Regular expression to match exactly 10 digits
    return regex.test(phoneNumber);
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="container rounded bg-white p-5 mt-5" style={{ width: "90%", height: "550px" }}>
        <div className="flex justify-center">
          <div className="w-full md:w-1/3 border-r border-gray-300">
            <div className="flex flex-col items-center text-center p-3 py-5">
              <img className="rounded-full mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="Profile" />
              <span className="font-bold">Guru</span>
              <span className="text-gray-600">Guru@mail.com</span>
            </div>
          </div>
          <div className="w-full md:w-auto border-r border-gray-400" style={{ width: '50%' }}>
            <div className="p-3 py-6">
              <h4 className="text-left mb-4 font-bold text-2xl">PROFILE DETAILS</h4>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <label className="text-sm mb-2">First name</label>
                    <input type="text" className="form-input" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter First Name" required />
                  </div>
                  <div>
                    <label className="text-sm mb-2">Surname</label>
                    <input type="text" className="form-input" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Surname" required />
                  </div>
                  <div>
                    <label className="text-sm block mb-2">Email ID</label>
                    <input type="email" className="form-input" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email ID" required />
                  </div>
                  <div>
                    <label className="text-sm block mb-2">Mobile Number</label>
                    <input type="tel" className="form-input" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter Phone Number" required />
                  </div>
                  <div className="flex flex-col">
                  <div className="mb-4">
                    <label className="text-sm block mb-1">Address Line 1</label>
                    <input type="text" className="form-input w-full md:w-96 h-8" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Enter Address Line 1" required />
                  </div>
                  <div>
                    <label className="text-sm block mb-1">Address Line 2</label>
                    <input type="text" className="form-input w-full md:w-96 h-8" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Enter Address Line 2" required />
                  </div>
                  <div>
                    <label className="text-sm block mt-3 mb-2">Postcode</label>
                    <input type="text" className="form-input" name="postcode" value={formData.postcode} onChange={handleChange} placeholder="Enter Postcode" required />
                  </div>
                </div>
                </div>
                <div className="mt-5 text-center">
                  <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 focus:outline-none ">Save Profile</button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full md:w-5/12 border-r border-gray-300">
            <div className="p-3 py-5">
              <h5 className="text-left mb-4 font-bold text-2xl">JOB DETAILS</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div>
                  <div className="mb-3">
                    <label className="text-sm block mb-2">Job Role</label>
                    <input type="text" className="form-input" name="jobRole" value={formData.jobRole} onChange={handleChange} placeholder="Enter Job Role" required />
                  </div>
                  <div>
                    <label className="text-sm block mb-2">Additional Details</label>
                    <input type="text" className="form-input" name="additionalDetails" value={formData.additionalDetails} onChange={handleChange} placeholder="Enter Additional Details" required />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
