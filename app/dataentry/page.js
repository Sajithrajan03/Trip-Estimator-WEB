"use client"
import { Toast } from 'primereact/toast';
import React,{useState,useEffect,useRef } from 'react'
import { FaDatabase } from "react-icons/fa";
import { Select, Option,Button,Input } from "@material-tailwind/react";
import { HiBuildingOffice } from "react-icons/hi2";
import { FaHotel } from "react-icons/fa";
import { FaMapMarkedAlt,FaRupeeSign,FaBusAlt } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";
import { MdFlight } from "react-icons/md";
import { Switch } from "@material-tailwind/react";
import { AiOutlineSwap } from "react-icons/ai";
import {register_Hotel,register_Bus} from '@/app/(Auth)/useAuth';
import { FaStar } from 'react-icons/fa';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
const Page = () => {
  const toast = useRef(null);
  const [selectedValue, setSelectedValue] = useState("0");
  const [selectedTrasport,setSelectedTransport] = useState("0");
  const [toggle, setToggle] = useState("0");
  
  //Hotel
  const [hotelName,setHotelName] = useState("");
  const [hotelAddress,setHotelAddress] = useState("");
  const [hotelCity,setHotelCity] = useState(0);
  const [hotelRating,setHotelRating] = useState(0);
  const [hotelStandard,setHotelStandard] = useState(0);
  const [hotelDeluxe,setHotelDeluxe] = useState(0);
  const [hotelSuite,setHotelSuite] = useState(0);
  const handleHotelClick = async () => {
    try {
        const response = await register_Hotel({ hotelName, hotelAddress, hotelCity, hotelRating, hotelStandard, hotelDeluxe, hotelSuite });
        
         
        if (response.ok) {
          const data = await response.json(); 
        }  

        if (response.status === 200) {
            toast.current.show({ severity: 'success', summary: 'SUCCESSFULL', detail: data.message, life: 3000 });
        } else if (response.status === 400) {
            toast.current.show({ severity: 'error', summary: 'Duplicate', detail: data.message, life: 3000 });
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Unexpected error occurred', life: 3000 });
        }
    } catch (error) {
        console.error('Error registering hotel:', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while registering the hotel', life: 3000 });
    }
};

  const handleStarClick = (rating) => {
    setHotelRating(rating);
  };

  //BUS 
  const [busName,setBusName] = useState("");
  const [busFrom,setBusFrom] = useState(0);
  const [busTo,setBusTo] = useState(0);

  const handleBusClick = ()=>{
    register_Bus({busFrom,busTo,busName,busAc,busSleeper,busPrice})
  }
   
  const [busAc,setBusAc] = useState(true);
  const [busSleeper,setBusSleeper] = useState(false);
  const [busPrice,setBusPrice] = useState(0);
  const handleToggle = () => {
    setToggle(true); // Set toggle to true to trigger useEffect
  };

  useEffect(() => {
    if (toggle) {
      // Sequential state updates
      setBusFrom((prevFrom) => busTo);
      setBusTo((prevTo) => busFrom);
      setToggle(false); // Reset toggle
    }
  }, [toggle]);
  


  return (
    <div className="w-full min-h-[100vh] bg-[rgb(10,17,58)]">
      <div className="font-poppins text-black mx-auto pt-[2%]">
        <Toast ref={toast} style={{ color: 'red' }}/>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 md:w-[50%] sm:w-[80%] p-8 rounded-[50%] h-[60%] left-[25%] top-[270px] absolute blur-3xl levitate"></div>
        <div className="bg-white  bg-opacity-80  w-fit  px-5 py-5 rounded-xl sm:mx-auto  relative">
          <div className="flex items-center justify-center gap-x-2">
           <div className="text-[30px]">DataEntry </div> 
           <div><FaDatabase size={30}/></div>
           </div>
        </div>
        <div className="bg-white z-10 w-[70%] md:w-[700px] mt-[2%] mx-auto rounded-xl h-full p-[5%] relative">
          <Select variant="outlined" label="Select Expense" 
          className="text-center flex flex-nowrap pl-4"
          onChange={(e)=>{setSelectedValue(e)}}>
          <Option value="1" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
            <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
              <FaHotel/>Hotels
            </div>
          </Option>
          <Option value="2" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
            <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
            <FaMapMarkedAlt/>Transport
            </div>
          </Option> 
           
          </Select>
          {
            selectedValue === "2"?
            <Select variant="outlined" label="Select Mode of Transport" 
          className="text-center flex flex-nowrap pl-4 mt-[2%]"
          onChange={(e)=>{setSelectedTransport(e)}}>
          <Option value="1" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
            <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
              <FaBusAlt/>Bus
            </div>
          </Option>
          <Option value="2" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
            <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
            <FaTrainSubway/>Train
            </div>
          </Option> 
           
          <Option value="3" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
            <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
            <MdFlight/>Flight
            </div>
          </Option> 
          </Select>
            :null
          }
          

          {
            selectedValue === "1"? 
            <div className="mt-[10%]">
              <div className="flex flex-col gap-y-3">
              <div className="flex items-center justify-center">
              <div className="text-[20px] w-[23%] h-10 flex rounded-md   text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Hotel Info </div>
                </div>
                <Input type="text" onChange={(e)=>{setHotelName(e.target.value)}} label="Hotel Name" className="border-2 border-gray-500 p-2 rounded-md"/>
                <Input type="text" onChange={(e)=>{setHotelAddress(e.target.value)}} label="Hotel Address" className="border-2 border-gray-500 p-2 rounded-md"/>
                <Select variant="outlined" label="Select City" 
                  className="text-center flex items-center flex-nowrap pl-4 mt-[2%]"
                  onChange={(e)=>{setHotelCity(e)}}>
                  <Option value="1" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                    <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                      Coimbatore
                    </div>
                  </Option>
                  <Option value="2" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                    <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                    Chennai
                    </div>
                  </Option> 
                  
                  <Option value="3" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                    <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                    Bangalore
                    </div>
                  </Option>
                  <Option value="4" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                    <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                    Hyderabad
                    </div>
                  </Option> 
                  <Option value="5" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                    <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                    Mumbai
                    </div>
                  </Option> 
                  <Option value="6" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                    <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                    Kolkata
                    </div>
                  </Option> 
                </Select>
                <div className="mt-5 flex items-center flex-col">
                  <div className="text-[20px] w-[23%] mt-[2%] h-10 flex rounded-md text-black font-bold border-2 border-black bg-[#ffbd03] items-center justify-center">
                    Rating
                  </div>
                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        size={30}
                        key={star}
                        className={star <= hotelRating ? 'text-yellow-400 cursor-pointer' : 'text-gray-400 cursor-pointer'}
                        onClick={() => handleStarClick(star)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                <div className="text-[20px] w-[23%] mt-[2%] h-10 flex rounded-md   text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Rates </div>
                </div>
                
                <div className="flex flex-col gap-y-5 max-w-[80%] justify-center ml-[10%]"> 
                    <div className="flex gap-x-5 ">
                      <div className="text-[15px] w-[30%] flex rounded-md  px-2 text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Standard </div>
                      <Input type="text" onChange={(e)=>{setHotelStandard(e.target.value)}} icon={<FaRupeeSign/>} variant="outlined" label="Standard Rooms" className="border-2   border-gray-500 p-2 rounded-md"/>
                    </div>
                    <div className="flex gap-x-5">
                      <div className="text-[15px] w-[30%] flex rounded-md  px-2 text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Deluxe </div>
                      <Input type="text" onChange={(e)=>{setHotelDeluxe(e.target.value)}} icon={<FaRupeeSign/>} variant="outlined" label="Deluxe Rooms" className="border-2   border-gray-500 p-2 rounded-md"/>
                    </div>
                    <div className="flex gap-x-5">
                      <div className="text-[15px] w-[30%] flex rounded-md  px-2 text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Suite </div>
                      <Input type="text" onChange={(e)=>{setHotelSuite(e.target.value)}} icon={<FaRupeeSign/>} variant="outlined" label="Suite Rooms" className="border-2   border-gray-500 p-2 rounded-md"/>
                    </div>
                </div>
               
                
              </div>
              
              <div className="flex justify-center">
                <Button onClick={(e)=>{handleHotelClick()}} className="mt-[5%] text-[19px] w-[23%] h-15 flex rounded-md  text-black font-bold border-2 border-black  bg-[#4681f4] items-center justify-center">Submit</Button>
               </div>
            </div>
             :selectedValue === "2" && selectedTrasport=="1" ? 
             <div className="mt-[10%]">
              <div className="flex flex-col gap-y-3">
              <div className="flex items-center justify-center">
              <div className="text-[20px] w-[23%] h-10 flex rounded-md   text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Bus Info </div>
              </div>

                <div className="flex items-center justify-between"> 
                    <div className="w-[270px] font-bold">
                      <Select variant="outlined" label="From" 
                    className="text-center flex items-center flex-nowrap pl-4 mt-[2%]"
                    onChange={(e)=>{setBusFrom(e)}}>
                    <Option value="1" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                      <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                        Coimbatore
                      </div>
                    </Option>
                    <Option value="2" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                      <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                      Chennai
                      </div>
                    </Option> 
                    
                    <Option value="3" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                      <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                      Bangalore
                      </div>
                    </Option>
                    <Option value="4" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                      <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                      Hyderabad
                      </div>
                    </Option> 
                    <Option value="5" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                      <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                      Mumbai
                      </div>
                    </Option> 
                    <Option value="6" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                      <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                      Kolkata
                      </div>
                    </Option> 
                      </Select>
                    </div>
                    <Button className="bg-blue-500 rounded-full text-[30px] p-1" onClick={handleToggle}><AiOutlineSwap/></Button>
                    <div className="w-[270px]">
                      <Select variant="outlined" label="To" 
                    className="text-center flex items-center flex-nowrap pl-4 mt-[2%]"
                    onChange={(e)=>{setBusTo(e)}}>
                    <Option value="1" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                      <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                        Coimbatore
                      </div>
                    </Option>
                    <Option value="2" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                      <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                      Chennai
                      </div>
                    </Option> 
                    
                    <Option value="3" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                      <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                      Bangalore
                      </div>
                    </Option>
                    <Option value="4" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                      <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                      Hyderabad
                      </div>
                    </Option> 
                    <Option value="5" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                      <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                      Mumbai
                      </div>
                    </Option> 
                    <Option value="6" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                      <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                      Kolkata
                      </div>
                    </Option> 
                      </Select>
                    </div>
                </div>
                <Input type="text" onChange={(e)=>{setBusName(e.target.value)}} label="Bus Name" className="border-2 border-gray-500 p-2 rounded-md"/>
                 
                <div className="flex justify-between mx-[15%]">
                  <div className="flex gap-x-2 border-2 border-gray-500 p-2 rounded-md bg-gray-200 text-[15px] font-bold">
                    <div className="">Non-AC</div>
                    <Switch defaultChecked color="green"
                     onChange={(e) => {
                      setBusAc(e.target.checked);
                      console.log(e.target.checked);
                    }}/>
                    <div className="">AC</div>
                  </div>
                  <div className="flex gap-x-2 border-2 border-gray-500 p-2 rounded-md bg-gray-200 text-[15px] font-bold">
                    <div className="">Sleeper</div>
                        <Switch defaultChecked color="red" onChange={(e) => {
                          setBusSleeper(!e.target.checked);
                           
                        }}
                   
                    />
                    <div className="">Semi-Sleeper</div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                <div className="text-[20px] w-[23%] h-10 flex rounded-md   text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Rates </div>
                </div>
                <div className="flex flex-col gap-y-5 max-w-[80%] justify-center ml-[10%]"> 
                    <div className="flex gap-x-5 ">
                      <div className="text-[15px] w-[40%] flex rounded-md  px-2 text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Bus Rate</div>
                      <Input onChange={(e)=>setBusPrice(e.target.value)} type="text" icon={<FaRupeeSign/>} variant="outlined" label="Rate" className="border-2   border-gray-500 p-2 rounded-md"/>
                    </div>
                     
                     
                </div>
               
                
              </div>
              <div className="flex justify-center">
                <Button onClick={(e)=>{handleBusClick()}} className="mt-[5%] text-[19px] w-[23%] h-15 flex rounded-md  text-black font-bold border-2 border-black  bg-[#4681f4] items-center justify-center">Submit</Button>
              </div>
            </div>
              : (selectedValue === "2" && selectedTrasport=="3")?
              <div className="mt-[10%]">
              <div className="flex flex-col gap-y-3">
              <div className="flex items-center justify-center">
              <div className="text-[20px] w-[23%] h-10 flex rounded-md   text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Hotel Info </div>
                </div>
                <Input type="text" onChange={(e)=>{setHotelName(e.target.value)}} label="Hotel Name" className="border-2 border-gray-500 p-2 rounded-md"/>
                 
                <Select variant="outlined" label="Select City" 
                  className="text-center flex items-center flex-nowrap pl-4 mt-[2%]"
                  onChange={(e)=>{setHotelCity(e)}}>
                  <Option value="1" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                    <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                      Coimbatore
                    </div>
                  </Option>
                  <Option value="2" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                    <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                    Chennai
                    </div>
                  </Option> 
                  
                  <Option value="3" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                    <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                    Bangalore
                    </div>
                  </Option>
                  <Option value="4" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                    <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                    Hyderabad
                    </div>
                  </Option> 
                  <Option value="5" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                    <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                    Mumbai
                    </div>
                  </Option> 
                  <Option value="6" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                    <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                    Kolkata
                    </div>
                  </Option> 
                </Select>
                <div className="mt-5 flex items-center flex-col">
                  <div className="text-[20px] w-[23%] mt-[2%] h-10 flex rounded-md text-black font-bold border-2 border-black bg-[#ffbd03] items-center justify-center">
                    Rating
                  </div>
                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        size={30}
                        key={star}
                        className={star <= hotelRating ? 'text-yellow-400 cursor-pointer' : 'text-gray-400 cursor-pointer'}
                        onClick={() => handleStarClick(star)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                <div className="text-[20px] w-[23%] mt-[2%] h-10 flex rounded-md   text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Rates </div>
                </div>
                
                <div className="flex flex-col gap-y-5 max-w-[80%] justify-center ml-[10%]"> 
                    <div className="flex gap-x-5 ">
                      <div className="text-[15px] w-[30%] flex rounded-md  px-2 text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Standard </div>
                      <Input type="text" onChange={(e)=>{setHotelStandard(e.target.value)}} icon={<FaRupeeSign/>} variant="outlined" label="Standard Rooms" className="border-2   border-gray-500 p-2 rounded-md"/>
                    </div>
                    <div className="flex gap-x-5">
                      <div className="text-[15px] w-[30%] flex rounded-md  px-2 text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Deluxe </div>
                      <Input type="text" onChange={(e)=>{setHotelDeluxe(e.target.value)}} icon={<FaRupeeSign/>} variant="outlined" label="Deluxe Rooms" className="border-2   border-gray-500 p-2 rounded-md"/>
                    </div>
                    <div className="flex gap-x-5">
                      <div className="text-[15px] w-[30%] flex rounded-md  px-2 text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Suite </div>
                      <Input type="text" onChange={(e)=>{setHotelSuite(e.target.value)}} icon={<FaRupeeSign/>} variant="outlined" label="Suite Rooms" className="border-2   border-gray-500 p-2 rounded-md"/>
                    </div>
                </div>
               
                
              </div>
              
              <div className="flex justify-center">
                <Button onClick={(e)=>{handleHotelClick()}} className="mt-[5%] text-[19px] w-[23%] h-15 flex rounded-md  text-black font-bold border-2 border-black  bg-[#4681f4] items-center justify-center">Submit</Button>
               </div>
            </div>:null
          }
          
        </div>
        

      </div>
    </div>
  )
}

export default Page
