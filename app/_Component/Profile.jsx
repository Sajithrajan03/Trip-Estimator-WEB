import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEnvelope, FaMale, FaFemale, FaBriefcase, FaIdCard, FaSave, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileSettings = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    gender: '',
    jobRole: '',
    EmployeeId: ''
  };

  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('profileFormData');
      return savedData ? JSON.parse(savedData) : initialFormData;
    } else {
      return initialFormData;
    }
  });

  const [editMode, setEditMode] = useState(false);
  const [showSavedAnimation, setShowSavedAnimation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = (name === "firstName" || name === "lastName") ? value.toUpperCase() : value;

    setFormData({
      ...formData,
      [name]: formattedValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.jobRole.trim() === '') {
      alert("Job Role is required");
      return;
    }
  
    if (formData.EmployeeId.trim() === '') {
      alert("Employee Id is required");
      return;
    }
  
    if (typeof window !== 'undefined') {
      localStorage.setItem('profileFormData', JSON.stringify(formData));
      setShowSavedAnimation(true); // Show the animation
      setTimeout(() => {
        setShowSavedAnimation(false); // Hide the animation after some time (e.g., 3 seconds)
        setEditMode(false); // Change edit mode to false after saving
      }, 3000);
      toast.success("Profile Saved!"); // Show success message
      setEditMode(true); // Set edit mode to true after saving
    }
  };
  

  const handleCancel = () => {
    setFormData(initialFormData);
    setEditMode(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('profileFormData', JSON.stringify(formData));
      localStorage.setItem('editMode', editMode);
    }
  }, [formData, editMode]);

  return (
    <div className="flex justify-center items-center h-full mt-2">
      <div className="container rounded bg-white p-5 mt-5" style={{ width: "90%", height: "550px" }}>
        {showSavedAnimation && <ToastContainer />} 
        <div className="flex justify-center">
          <div className="w-full md:w-1/3 border-r border-gray-300">
            <div className="flex flex-col items-center text-center p-3 py-5">
              <FaUserCircle className="rounded-full mt-5 text-6xl text-blue-500 mb-3" />
              <div className="flex flex-col">
                <span className="font-bold mb-2">{`${formData.firstName} ${formData.lastName}`}</span>
                {formData.email ? (
                  <div className="text-gray-600 flex items-center mb-2">
                    <FaEnvelope className="mr-1" />
                    <span>{formData.email}</span>
                  </div>
                ) : null}
                <div className="text-gray-600 flex items-center ">
                  {formData.gender === 'Male' && <FaMale className="mr-1" />}
                  {formData.gender === 'Female' && <FaFemale className="mr-1" />}
                  {formData.gender === 'Prefer not to say' ? <span style={{ fontWeight: 'bold' }}>Gender:&nbsp;&nbsp;</span> : null}
                  <span>{formData.gender}</span>
                </div>
                {formData.jobRole ? (
                  <div className="text-gray-600 flex items-center mt-2">
                    <FaBriefcase className="mr-1" />
                    <span>{formData.jobRole}</span>
                  </div>
                ) : null}
                {formData.EmployeeId && (
                  <div className="text-gray-600 flex items-center mt-2">
                    <FaIdCard className="mr-1" />
                    <span>{formData.EmployeeId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto border-r border-gray-400" style={{ width: '50%' }}>
            <div className="p-3 py-6">
              <h4 className="text-left mb-4 font-bold text-2xl">PROFILE DETAILS</h4>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-8">
                  <div>
                    <label className="text-sm mb-2">First name</label>
                    <input type="text" className="form-input" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter First Name" required readOnly={!editMode} />
                  </div>
                  <div>
                    <label className="text-sm mb-2">Surname</label>
                    <input type="text" className="form-input" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Surname" required readOnly={!editMode} />
                  </div>
                  <div>
                    <label className="text-sm block mb-2">Email ID</label>
                    <input type="email" className="form-input" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email ID" required readOnly={!editMode} />
                  </div>
                  <div>
                    <label className="text-sm block mb-2">Mobile Number</label>
                    <input type="tel" className="form-input" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter Mobile Number" required readOnly={!editMode} />
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <label className="text-sm block mt-2 mb-2">Gender</label>
                      <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required disabled={!editMode}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm block mt-3 mb-1">Address Line 1</label>
                      <input type="text" className="form-input w-full md:w-96 h-8" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Enter Address Line 1" required readOnly={!editMode} />
                    </div>
                    <div>
                      <label className="text-sm block mt-3">Address Line 2</label>
                      <input type="text" className="form-input w-full md:w-96 h-8" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Enter Address Line 2" required readOnly={!editMode} />
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center mt-2">
                  {!editMode && (
                    <button type="button" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 focus:outline-none mr-2" onClick={() => setEditMode(true)}>Edit</button>
                  )}
                  {editMode && (
                    <>
                      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 focus:outline-none mr-2">
                        Save Profile <FaSave className="inline-block mr-1 mb-1 bg-coolor-black" size={16} /> 
                      </button> 
                      <button type="button" className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none" onClick={handleCancel}>
                        Cancel <FaTimes className="inline-block mr-1" size={17} /> 
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="w-full md:w-5/12 border-r border-gray-300">
            <div className="p-3 py-5">
              <h5 className="text-left mb-8 font-bold text-2xl">JOB DETAILS</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div>
                  <div className="mb-6">
                    <label className="text-sm block mb-2">Job Role</label>
                    <input type="text" className="form-input" name="jobRole" value={formData.jobRole} onChange={handleChange} placeholder="Enter Job Role" required readOnly={!editMode} />
                  </div>
                  <div>
                    <label className="text-sm block mb-2">Employee Id</label>
                    <input type="text" className="form-input" name="EmployeeId" value={formData.EmployeeId} onChange={handleChange} placeholder="Enter Employee Id" required readOnly={!editMode} />
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
