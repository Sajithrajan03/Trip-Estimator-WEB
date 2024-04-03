import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faEnvelope, faPaperPlane,faHeart} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { red } from '@mui/material/colors';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const { name, email, message } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    setSubmissionStatus('success');
  
    // Perform validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      alert('Please fill in all fields');
      return; // Prevent form submission if fields are not filled
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return; // Prevent form submission if email format is invalid
    }
  
    // Your form submission logic here
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  useEffect(() => {
    // Add event listener to document body when the message is displayed
    if (submitted) {
      document.body.addEventListener('click', handleClick);
      document.body.addEventListener('keydown', handleKeyPress);
    }

    // Cleanup event listeners when component unmounts or message is hidden
    return () => {
      document.body.removeEventListener('click', handleClick);
      document.body.removeEventListener('keydown', handleKeyPress);
    };
  }, [submitted]);

  const handleClick = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', message: '' }); // Reset form data
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' }); // Reset form data
    }
  };

  return (
    <section id="contact" className="bg-blue-500 bg-opacity-10 py-5 mt-8">
      <h1 className="section-header text-white text-center text-5xl font-semibold uppercase mb-6">Contact Us</h1>
      <div className="contact-wrapper flex flex-col md:flex-row justify-between mx-auto max-w-3xl">
        <form id="contact-form" className="form-horizontal max-w-md md:mr-8 mx-auto" onSubmit={onSubmit} role="form">
          <div className="form-group">
            <input type="text" className="form-control text-black border border-gray-600 rounded p-2 mb-4 w-full focus:scale-105 transition-transform duration-300 ease-in-out" id="name" placeholder="NAME" name="name" value={name} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="email" className="form-control text-black border border-gray-600 rounded p-2 mb-4 w-full focus:scale-105 transition-transform duration-300 ease-in-out" id="email" placeholder="EMAIL" name="email" value={email} onChange={onChange} required />
          </div>
          <textarea className="form-control text-black border border-gray-600 rounded p-2 mb-4 w-full focus:scale-105 transition-transform duration-300 ease-in-out" rows="10" placeholder="MESSAGE" name="message" value={message} onChange={onChange} required></textarea>
          <button 
            className="btn btn-primary send-button w-full bg-transparent hover:bg-blue-800 text-white hover:text-black border border-white rounded p-2 transition duration-200" 
            type="submit"
          >
            <div className="alt-send-button">
              <FontAwesomeIcon icon={faPaperPlane} size="s" className="text-white mr-2 bg-transparent hover:bg-blue" />
              <span className="send-text">SEND</span>
            </div>
          </button>
          {submitted && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
              <div className="bg-black bg-opacity-25 absolute inset-0 backdrop-filter backdrop-blur-lg"></div> 
              <div className="bg-gray bg-opacity-75 rounded-lg p-6 shadow-md relative z-10">
                {submissionStatus === 'success' ? (
                  <p className="text-lg text-center text-white" style={{ fontSize: "2rem" }}>
                   Thank you for reaching out. We'll be in contact shortly<FontAwesomeIcon icon={faHeart} style={{ fontSize: "1.5rem",marginLeft: "0.5rem", color:"red" }} />
                </p>

                ) : (
                  <p className="text-lg text-center text-black">There was an error submitting the form. Please try again later</p>
                )}
              </div>
            </div>
          )}
        </form>
        <div className={`direct-contact-container max-w-md mx-auto md:ml-8 mt-8 md:mt-0 ${submitted ? 'ml-auto' : ''}`}>
          <ul className="contact-list">
            <li className="list-item">
              <FontAwesomeIcon icon={faMapMarker} size="xl" className="text-white mr-6 mt-10" />
              <span className="contact-icon text-white mr-2 place">Goundampalayam, Coimbatore</span>
            </li>
            <li className="list-item">
              <FontAwesomeIcon icon={faPhone} size="xl" className="text-white mr-6 mt-10" />
              <span className="contact-text phone mr"><a href="tel:1-212-555-5555" title="Give me a call" className="text-white">+91 9003536756</a></span>
            </li>
            <li className="list-item">
              <FontAwesomeIcon icon={faEnvelope} size="xl" className="text-white mr-6 mt-10" />
              <span className="contact-text gmail"><a href="mailto:#" title="Send me an email" className="text-white">callmesk@gmail.com</a></span>
            </li>
          </ul>
          <hr className="border-white mt-8" />
          <ul className="social-media-list flex justify-center items-center mt-4">
            <li><a href="#" target="_blank" className="contact-icon text-white mr-4 text-xl"><FontAwesomeIcon icon={faGithub} /></a></li>
            <li><a href="#" target="_blank" className="contact-icon text-white mr-4 text-xl"><FontAwesomeIcon icon={faTwitter} /></a></li>
            <li><a href="#" target="_blank" className="contact-icon text-white mr-4 text-xl"><FontAwesomeIcon icon={faInstagram} /></a></li>
          </ul>
          <hr className="border-white mt-3" />
          <div className="copyright text-center text-gray-500">&copy; ALL OF THE RIGHTS RESERVED</div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
