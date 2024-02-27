"use client"
import React,{useState,useEffect} from 'react'
import { FaDatabase } from "react-icons/fa";
import { Select, Option,Button,Input } from "@material-tailwind/react";
import { HiBuildingOffice } from "react-icons/hi2";
import { FaHotel } from "react-icons/fa";
import { FaMapMarkedAlt,FaRupeeSign,FaBusAlt } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";
import { MdFlight } from "react-icons/md";
import { Switch } from "@material-tailwind/react";
import { AiOutlineSwap } from "react-icons/ai";
const page = () => {

  const [selectedValue, setSelectedValue] = useState("0");
  const [selectedTrasport,setSelectedTransport] = useState("0");
  const [toggle, setToggle] = useState("0");
  const [from,setFrom] = useState("0");
  const [to,setTo] = useState("0");

  const [ac,setAc] = useState(true);
  const [sleeper,setSleeper] = useState(false);
  const handleToggle = () => {
    setToggle(true); // Set toggle to true to trigger useEffect
  };

  useEffect(() => {
    if (toggle) {
      // Sequential state updates
      setFrom((prevFrom) => to);
      setTo((prevTo) => from);
      setToggle(false); // Reset toggle
    }
  }, [toggle]);
  


  return (
    <div className="w-full min-h-[100vh] bg-[rgb(10,17,58)]">
      <div className="font-poppins text-black mx-auto pt-[2%]">
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
                <Input type="text" label="Hotel Name" className="border-2 border-gray-500 p-2 rounded-md"/>
                <Input type="text" label="Hotel Address" className="border-2 border-gray-500 p-2 rounded-md"/>
                <Input type="text" label="Hotel City" className="border-2 border-gray-500 p-2 rounded-md"/>
                <div className="flex items-center justify-center">
                <div className="text-[20px] w-[23%] h-10 flex rounded-md   text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Rates </div>
                </div>
                <div className="flex flex-col gap-y-5 max-w-[80%] justify-center ml-[10%]"> 
                    <div className="flex gap-x-5 ">
                      <div className="text-[15px] w-[30%] flex rounded-md  px-2 text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Standard </div>
                      <Input type="text" icon={<FaRupeeSign/>} variant="outlined" label="Standard Rooms" className="border-2   border-gray-500 p-2 rounded-md"/>
                    </div>
                    <div className="flex gap-x-5">
                      <div className="text-[15px] w-[30%] flex rounded-md  px-2 text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Deluxe </div>
                      <Input type="text" icon={<FaRupeeSign/>} variant="outlined" label="Deluxe Rooms" className="border-2   border-gray-500 p-2 rounded-md"/>
                    </div>
                    <div className="flex gap-x-5">
                      <div className="text-[15px] w-[30%] flex rounded-md  px-2 text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Suite </div>
                      <Input type="text" icon={<FaRupeeSign/>} variant="outlined" label="Suite Rooms" className="border-2   border-gray-500 p-2 rounded-md"/>
                    </div>
                </div>
               
                
              </div>
            </div>
             :selectedValue === "0"  ? 
             <div className="mt-[10%]">
              <div className="flex flex-col gap-y-3">
              <div className="flex items-center justify-center">
              <div className="text-[20px] w-[23%] h-10 flex rounded-md   text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">Bus Info </div>
              </div>

                <div className="flex items-center justify-between"> 
                    <div className="w-[270px] font-bold">
                      <Select variant="outlined" 
                      onChange={(e)=>setFrom(e)}
                      value={from}
                      label="From" 
                      className=" text-center flex flex-nowrap pl-4 mt-[2%]  "
                       >
                      <Option value="1" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                        <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                          Delhi
                        </div>
                      </Option>
                      <Option value="2" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                        <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                        Mumbai
                        </div>
                      </Option> 
                      
                      <Option value="3" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                        <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                        Chennai
                        </div>
                      </Option> 
                      </Select>
                    </div>
                    <Button className="bg-blue-500 rounded-full text-[30px] p-1" onClick={handleToggle}><AiOutlineSwap/></Button>
                    <div className="w-[270px]">
                      <Select variant="outlined" label="To" 
                      className=" text-center flex flex-nowrap pl-4 mt-[2%] "
                      value={to}
                      onChange={(e)=>{setTo(e)}}>
                      <Option value="1" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                        <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                          Delhi
                        </div>
                      </Option>
                      <Option value="2" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                        <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                        Mumbai
                        </div>
                      </Option> 
                      
                      <Option value="3" className=' text-gray-900 hover:bg-gray-700 hover:ring-2 hover:ring-black'>
                        <div className='flex gap-x-5 text-[20px] text-gray-900 tems-center'>
                        Chennai
                        </div>
                      </Option> 
                      </Select>
                    </div>
                </div>
                <Input type="text" label="Bus Name" className="border-2 border-gray-500 p-2 rounded-md"/>
                 
                <div className="flex justify-between mx-[15%]">
                  <div className="flex gap-x-2 border-2 border-gray-500 p-2 rounded-md bg-gray-200 text-[15px] font-bold">
                    <div className="">Non-AC</div>
                    <Switch defaultChecked color="green"
                     onChange={(e) => {
                      setAc(e.target.checked);
                      console.log(e.target.checked);
                    }}/>
                    <div className="">AC</div>
                  </div>
                  <div className="flex gap-x-2 border-2 border-gray-500 p-2 rounded-md bg-gray-200 text-[15px] font-bold">
                    <div className="">Sleeper</div>
                        <Switch defaultChecked color="red" onChange={(e) => {
                          setSleeper(!e.target.checked);
                           
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
                      <div className="text-[15px] w-[40%] flex rounded-md  px-2 text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">{ac ? "AC" : "Non AC"} </div>
                      <Input type="text" icon={<FaRupeeSign/>} variant="outlined" label="Standard Rooms" className="border-2   border-gray-500 p-2 rounded-md"/>
                    </div>
                    <div className="flex gap-x-5">
                      <div className="text-[15px] w-[40%] flex rounded-md  px-2 text-black font-bold border-2 border-black  bg-[#ffbd03] items-center justify-center">{sleeper ? "Sleeper" : "Semi-Sleeper"} </div>
                      <Input type="text" icon={<FaRupeeSign/>} variant="outlined" label="Deluxe Rooms" className="border-2   border-gray-500 p-2 rounded-md"/>
                    </div>
                     
                </div>
               
                
              </div>
            </div>
              :null
          }
          <div className="flex justify-center">
            <Button className="mt-[5%] text-[19px] w-[23%] h-15 flex rounded-md  text-black font-bold border-2 border-black  bg-[#4681f4] items-center justify-center">Submit</Button>
            </div>
        </div>
        

      </div>
    </div>
  )
}

export default page
