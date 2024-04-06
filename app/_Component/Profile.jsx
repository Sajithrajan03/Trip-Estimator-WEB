  import React, { useState, useEffect } from 'react';
  import { FaUserCircle, FaEnvelope, FaMale, FaFemale, FaBriefcase, FaIdCard, FaSave, FaTimes, FaUserTie, FaUserCog } from 'react-icons/fa'; // Import FaUserTie icon
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  const ProfileSettings = () => {
    const initialFormData = {
      firstName: '',
      email: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      state: '',
      city: '',
      gender: '',
      jobRole: '',
      designation: ''
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
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      let formattedValue = value;

      if (name === 'phoneNumber') {
        formattedValue = value.replace(/\D/g, '').slice(0, 10);
      }

      setFormData({
        ...formData,
        [name]: formattedValue
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSaving(true);

      // Validation for required fields
      const requiredFields = ['firstName',  'jobRole',  'phoneNumber',  'state', 'city', 'designation'];
      for (const field of requiredFields) {
        if (!formData[field].trim()) {
          toast.error(`${field === 'firstName' ? 'Name' : field} is required`);
          setIsSaving(false);
          return;
        }
      }

      if (!/^\d{10}$/.test(formData.phoneNumber)) {
        toast.error("Invalid mobile number. It should contain exactly 10 digits.");
        setIsSaving(false);
        return;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('profileFormData', JSON.stringify(formData));
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate saving delay
        setIsSaving(false);
        setEditMode(false);
        toast.success("Profile Saved!");
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
          <ToastContainer />
          <div className="flex justify-center">
            <div className="w-full md:w-1/3 border-r border-gray-300">
              <div className="flex flex-col items-center text-center p-3 py-5">
                <FaUserCircle className="rounded-full mt-5 text-6xl text-blue-500 mb-3" />
                <div className="flex flex-col">
                <span className="font-bold mb-2">{formData.firstName}</span>
                {formData.email && (
                  <div className="text-gray-600 flex items-center mb-2">
                    <FaEnvelope className="mr-1" />
                    <span>{formData.email}</span>
                  </div>
                )}
                <div className="text-gray-600 flex items-center ">
                  {formData.gender === 'Male' && <FaMale className="mr-1" />}
                  {formData.gender === 'Female' && <FaFemale className="mr-1" />}
                  {formData.gender === 'Prefer not to say' ? <span style={{ fontWeight: 'bold' }}>Gender:&nbsp;&nbsp;</span> : null}
                  <span>{formData.gender}</span>
                </div>
                {formData.jobRole && (
                  <div className="text-gray-600 flex items-center mt-2">
                    < FaUserCog className="mr-1" />
                    <span>{formData.jobRole}</span>
                  </div>
                )}
                {formData.designation && ( // Check if designation exists
                  <div className="text-gray-600 flex items-center mt-2">
                    {/* Add designation icon here */}
                    <span className="mr-1"><FaUserTie /></span> 
                    <span>{formData.designation}</span>
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
                          <option value="others">others</option>
                        </select>
                      </div>
                      </div>
                      <div>
                      <label className="text-sm block mt-2 mb-2">State</label>
                      <input type="text" className="form-input" name="state" value={formData.state} onChange={handleChange} placeholder="Enter State" required readOnly={!editMode} />
                    </div>
                      <div>
                        <label className="text-sm block mt-2 mb-2">City</label>
                        <input type="text" className="form-input" name="city" value={formData.city} onChange={handleChange} placeholder="Enter City" required readOnly={!editMode} />
                      </div>
                    </div>
                  <div className="mt-5 text-center mt-2">
                    {!editMode && (
                      <button type="button" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 focus:outline-none mr-2" onClick={() => setEditMode(true)}>Edit</button>
                    )}
                    {editMode && (
                      <>
                        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 focus:outline-none mr-2" disabled={isSaving}>
                          {isSaving ? "Please wait..." : "Save Profile"} <FaSave className="inline-block mr-1 mb-1 bg-coolor-black" size={16} /> 
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
                      <label className="text-sm block mt- mb-2">Designation</label>
                      <div className="flex items-center">
                        <input type="text" className="form-input" name="designation" value={formData.designation} onChange={handleChange} placeholder="Enter Designation" required readOnly={!editMode} />
                      </div>
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
