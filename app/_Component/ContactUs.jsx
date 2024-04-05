import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);
  const { name, email, message } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
  
    // Perform validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      alert('Please fill in all fields');
      return; // Prevent form submission if fields are not filled
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return; 
    }

    if (message.trim().length < 10) {
      toast.error('Message should be at least 10 characters long');
      return;
    }
  
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setSuccessMessageVisible(true); // Show success message

    // Reset form data after success message is displayed
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };
  useEffect(() => {
    // If successMessageVisible is true, show the success message for 3 seconds
    if (successMessageVisible) {
      setTimeout(() => {
        setSuccessMessageVisible(false);
      }, 3000);
    }
  }, [successMessageVisible]);

  return (
    <section id="contact" className="bg-blue-900 bg-opacity-10 py-5 mt-11">
      <ToastContainer /> {/* Toast container for displaying notifications */}
      <h1 className="section-header text-white text-center text-5xl font-semibold uppercase mb-8">Contact Us</h1>
      <div className="contact-wrapper flex flex-col md:flex-row justify-between mx-auto max-w-3xl">
        <form id="contact-form" className="form-horizontal max-w-md md:mr-8 mx-auto" onSubmit={onSubmit} role="form">
          <div className="form-group">
            <input 
              type="text" 
              className="form-control text-black border border-blue-600 rounded p-2 mb-4 w-full transition-transform duration-300 ease-in-out " 
              id="name" 
              placeholder="NAME" 
              name="name" 
              value={name} 
              onChange={onChange} 
              onFocus={() => setNameFocused(true)} 
              onBlur={() => setNameFocused(false)} 
              required 
              style={{ transform: nameFocused ? "scale(1.02)" : "scale(1)" }}
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              className="form-control text-black border border-gray-600 rounded p-2 mb-4 w-full transition-transform duration-300 ease-in-out" 
              id="email" 
              placeholder="EMAIL" 
              name="email" 
              value={email} 
              onChange={onChange} 
              onFocus={() => setEmailFocused(true)} 
              onBlur={() => setEmailFocused(false)} 
              required 
              style={{ transform: emailFocused ? "scale(1.02)" : "scale(1)" }}
            />
          </div>
          <div className="form-group">
            <textarea 
              className="form-control text-black border border-gray-600 rounded p-2 mb-4 w-full transition-transform duration-300 ease-in-out" 
              rows="10" 
              placeholder="MESSAGE" 
              name="message" 
              value={message} 
              onChange={onChange} 
              onFocus={() => setMessageFocused(true)} 
              onBlur={() => setMessageFocused(false)} 
              required 
              style={{ transform: messageFocused ? "scale(1.02)" : "scale(1)" }}
            ></textarea>
          </div>
          <button 
            className="btn btn-primary send-button w-full bg-transparent hover:bg-blue-800 text-white hover:text-black border border-white rounded p-2 transition duration-200" 
            type="submit"
          >
            <div className="alt-send-button">
              <FontAwesomeIcon icon={faPaperPlane} size="s" className="text-white mr-2 bg-transparent hover:bg-blue" />
              <span className="send-text">SEND</span>
            </div>
          </button>
        </form>
        <div className={`direct-contact-container max-w-md mx-auto md:ml-8 mt-8 md:mt-0 ${submitted ? 'ml-auto' : ''}`}>
          <ul className="contact-list">
            <li className="list-item">
              <FontAwesomeIcon icon={faMapMarker} size="xl" className="text-white mr-6 mt-10" />
              <span className="contact-icon text-white mr-2 place">SAP Labs, Bangalore</span>
            </li>
            <li className="list-item">
              <FontAwesomeIcon icon={faPhone} size="xl" className="text-white mr-6 mt-10" />
              <span className="contact-text phone mr"><a href="+91 80 4139 5139" title="Give me a call" className="text-white">+91 9003536756</a></span>
            </li>
            <li className="list-item">
              <FontAwesomeIcon icon={faEnvelope} size="xl" className="text-white mr-6 mt-10" />
              <span className="contact-text gmail"><a href="mailto:#" title="Send me an email" className="text-white">saplabshelpline@gmail.com</a></span>
            </li>
          </ul>
          <hr className="border-white mt-8" />
          <ul className="social-media-list flex justify-center items-center mt-4">
            <li><a href="https://github.com/Sajithrajan03/Trip-Estimator-WEB" target="_blank" className="contact-icon text-white mr-4 text-xl"><FontAwesomeIcon icon={faGithub} /></a></li>
            <li><a href="https://twitter.com/saplabsindia" target="_blank" className="contact-icon text-white mr-4 text-xl"><FontAwesomeIcon icon={faTwitter} /></a></li>
            <li><a href="https://www.instagram.com/sap/" target="_blank" className="contact-icon text-white mr-4 text-xl"><FontAwesomeIcon icon={faInstagram} /></a></li>
          </ul>
          <hr className="border-white mt-3" />
          <div className="copyright text-center text-gray-500">&copy; ALL OF THE RIGHTS RESERVED</div>
        </div>
      </div>
      {successMessageVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="bg-black bg-opacity-25 absolute inset-0 backdrop-filter backdrop-blur-lg"></div> 
          <div className="bg-transparent rounded-lg p-6 shadow-none relative z-10">
            <p className="text-3xl text-center text-blue-500 font-bold bg-white p-4 rounded-xl">
              Thank you for reaching out. We'll be in contact shortly!
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contact;
