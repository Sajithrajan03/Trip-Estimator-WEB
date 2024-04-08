import React, { useState, useEffect } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs';


const FAQ = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [utterance, setUtterance] = useState(null);
  const [voiceoverEnabled, setVoiceoverEnabled] = useState(true);

  const speakText = (question, answer, index) => {
    if (!voiceoverEnabled) {
      setActiveIndex(index);
      return;
    }

    if (isSpeaking && activeIndex === index) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveIndex(-1);
    } else {
      const newUtterance = new SpeechSynthesisUtterance(question + " " + answer);
      setUtterance(newUtterance);
      speechSynthesis.speak(newUtterance);
      setIsSpeaking(true);
      setActiveIndex(index);
    }
  };

  const toggleVoiceover = () => {
    setVoiceoverEnabled(!voiceoverEnabled);
    if (!voiceoverEnabled && isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveIndex(-1);
    }
  
    // Determine the icon based on voiceover state
    const Icon = voiceoverEnabled ? BsFillVolumeUpFill : BsFillVolumeMuteFill;
    // Show toast notification
    toast.info(
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>Voiceover is turned {voiceoverEnabled ? 'on' : 'off'} now</span>
        <Icon style={{ marginLeft: '5px',fontSize: '21px' }} />
      </div>,
      {
        autoClose: 2000,
        closeOnClick: true,
      }
    );
  };
  
  

  useEffect(() => {
    if (!voiceoverEnabled && isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveIndex(-1);
    }
  }, [voiceoverEnabled]);

  const handleTabChange = (index) => {
    if (!voiceoverEnabled) {
      return;
    }

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    setActiveIndex(index === activeIndex ? -1 : index);
  };
  return (
    <div className="bg-white p-5 rounded-lg m-5 mx-[10%] relative mt-7">
      <div className="flex justify-center text-[24px] mb-5  font-bold">FAQ</div>
      <div>
        <Accordion activeIndex={activeIndex} onTabChange={(e) => handleTabChange(e.index)}>
          <AccordionTab header="What is the Trip Estimator feature?" onClick={() => speakText("What is the Trip Estimator feature?", "Trip estimates are particularly useful to approve, reject or modify a trip. This also helps in budgeting for the trip. The current process allows users to enter the requested amount for a trip.", 0)}>
            <p className="m-0">
              Trip estimates are particularly useful to approve, reject or modify a trip. This also helps in budgeting for the trip. The current process allows users to enter the requested amount for a trip.
            </p>
          </AccordionTab>
          <AccordionTab header="How does the Trip Estimator work?" onClick={() => speakText("How does the Trip Estimator work?", "The Trip Estimator analyzes trip data based on the data provided in the backend, including travel dates and destinations, to calculate an average cost for similar trips. Users can input their travel details, and the estimator will generate an estimated budget based on these parameters. Approvers can then review this estimate alongside the requested amount to make informed decisions.", 1)}>
            <p className="m-0">
              The Trip Estimator analyzes trip data based on the data provided in the backend, including travel dates and destinations, to calculate an average cost for similar trips. Users can input their travel details, and the estimator will generate an estimated budget based on these parameters. Approvers can then review this estimate alongside the requested amount to make informed decisions.
            </p>
          </AccordionTab>
          <AccordionTab header="What information do I need to input for the Trip Estimator?" onClick={() => speakText("What information do I need to input for the Trip Estimator?", "To use the Trip Estimator, users should provide details such as travel dates, destination city, hotel cost based on ratings, and any specific preferences or requirements related to their trip. This allows the estimator to generate a more accurate projection based on data provided.", 2)}>
            <p className="m-0">
              To use the Trip Estimator, users should provide details such as travel dates, destination city, hotel cost based on ratings, and any specific preferences or requirements related to their trip. This allows the estimator to generate a more accurate projection based on data provided.
            </p>
          </AccordionTab>
          <AccordionTab header="Can the Trip Estimator account for additional expenses like parking or car rentals?" onClick={() => speakText("Can the Trip Estimator account for additional expenses like parking or car rentals?", "Yes, the Trip Estimator takes into account miscellaneous expenses such as parking fees, car rentals, and other incidentals commonly associated with travel. By considering these factors, the estimator provides a comprehensive breakdown of expected costs for a given trip.", 3)}>
            <p className="m-0">
              Yes, the Trip Estimator takes into account miscellaneous expenses such as parking fees, car rentals, and other incidentals commonly associated with travel. By considering these factors, the estimator provides a comprehensive breakdown of expected costs for a given trip.
            </p>
          </AccordionTab>
          <AccordionTab header="Where can I access the Trip Estimator feature?" onClick={() => speakText("Where can I access the Trip Estimator feature?", "The Trip Estimator feature is available within our platform, accessible to both users and approvers during the trip request and approval process. Simply navigate to the designated section or interface within the platform to utilize this valuable tool for estimating trip expenses.", 4)}>
            <p className="m-0">
              The Trip Estimator feature is available within our platform, accessible to both users and approvers during the trip request and approval process. Simply navigate to the designated section or interface within the platform to utilize this valuable tool for estimating trip expenses.
            </p>
          </AccordionTab>
          <AccordionTab header="How accurate are the trip estimates provided by the Trip Estimator?" onClick={() => speakText("How accurate are the trip estimates provided by the Trip Estimator??", "The Trip Estimator strives to provide accurate estimates based on available data and algorithms, it&apos;s essential to understand that actual trip costs may vary. The Trip Estimator utilizes a combination of handpicked data sources and advanced algorithms to generate estimates tailored to each trip&apos;s specific details.", 5)}>
            <p className="m-0">
            Trip Estimator strives to provide accurate estimates based on available data and algorithms, it&apos;s essential to understand that actual trip costs may vary. The Trip Estimator utilizes a combination of handpicked data sources and advanced algorithms to generate estimates tailored to each trip&apos;s specific details.
            </p>
          </AccordionTab>
          <AccordionTab header="Is the Trip Estimator available for international trips?" onClick={() => speakText("Is the Trip Estimator available for international trips?", "Currently, the Trip Estimator covers the five most traveled cities within India. International destinations are not included yet.", 6)}>
          <p className="m-0 ">Currently, the Trip Estimator covers the five most traveled cities within India. International destinations are not included yet.</p>
        </AccordionTab>
        <AccordionTab header="Can I save or export trip estimates generated by the Trip Estimator?" onClick={() => speakText("Can I save or export trip estimates generated by the Trip Estimator?", "Trip estimates can be saved or exported only by the approvers in the form of CSV files.", 7)}>
        <p className="m-0 ">Trip estimates can be saved or exported only by the approvers in the form of CSV files.</p>
      </AccordionTab>
      <AccordionTab header="Can I customize the Trip Estimator to suit specific travel policies or preferences?" onClick={() => speakText("Can I customize the Trip Estimator to suit specific travel policies or preferences?", "Yes, the Trip Estimator can be customized to align with your organization&apos;s travel policies and preferences. This customization ensures that the estimates generated are tailored to meet your specific requirements and guidelines.", 8)}>
      <p className="m-0 ">Yes, the Trip Estimator can be customized to align with your organization&apos;s travel policies and preferences. This customization ensures that the estimates generated are tailored to meet your specific requirements and guidelines.</p>
    </AccordionTab>
    <AccordionTab header="Is it possible to integrate the Trip Estimator with our existing expense management system?" onClick={() => speakText("Is it possible to integrate the Trip Estimator with our existing expense management system?", "Yes, it is possible to integrate the Trip Estimator with your existing expense management system. This integration allows for seamless communication between the two systems, ensuring that trip expenses are accurately recorded and managed within your organization.",9)}>
      <p className="m-0">Yes, it is possible to integrate the Trip Estimator with your existing expense management system. This integration allows for seamless communication between the two systems, ensuring that trip expenses are accurately recorded and managed within your organization.</p>
</AccordionTab>
        </Accordion>
        <div className="absolute top-0 right-0 m-9 ">
          <span className="mr-1 font-bold text-black-500">Voice Over</span>
          <button
            onClick={toggleVoiceover}
            className={`relative inline-block w-11 h-6 rounded-full ${
              voiceoverEnabled ? 'bg-red-400' : 'bg-green-500'
            } focus:outline-none top-[-5px]`}
          >
            <span
              className={`inline-block w-.2 h-.2 rounded-full shadow-md transform ${
                voiceoverEnabled ? 'translate-x-2' : 'translate-x-0'
              } bg-white absolute top-0 left-0`}
            ></span>
            <span className="sr-only">Toggle Voiceover</span>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-black">
              {voiceoverEnabled ? 'OFF' : 'ON'}
            </span>
          </button>
        </div>
      </div>
      {/* Include ToastContainer here */}
      <ToastContainer />
    </div>
  );
};

export default FAQ;