import React from 'react'
import { FaDatabase } from "react-icons/fa";
import { HiBuildingOffice } from "react-icons/hi2";
const page = () => {
  return (
    <div className='flex flex-col'>
        <div className=' flex justify-center pt-[5%]'>
            <div className='flex bg-[#2FA8FF] w-fit gap-5 p-2 rounded-xl px-4 justify-center items-center'>
                <div className='text-[30px] font-semibold text-gray-200'>DATA ENTRY</div>
                <div><FaDatabase size={40} className='text-gray-200'/></div>
            </div>
        </div>
        <div>
            <div className='border-blue-600 bg-white rounded-xl mx-[7%] mt-[5%] p-[7%] flex justify-between '>
                <div >
                    <div className='flex bg-[#177cc4] w-fit gap-5 p-1 rounded-xl px-3 justify-center items-center'>
                        <div className='text-[23px] font-semibold text-gray-200'>From:</div>
                    </div>
                    
                    <div className='flex border-2 border-black bg-gray-400  cursor-no-drop rounded-md p-2 mt-[9%] text-blue-600 text-[20px] font-bold gap-x-5 justify-between text-center'>
                        <HiBuildingOffice size={30} color='black'/>
                        <input type="text" name="" id="" value={"HQ[Coimbatore]"} className='bg-gray-400' />
                    </div>
                </div>
                <div className='text-center' >
                    
                <div className='flex bg-[#2FA8FF] w-fit gap-5 p-2 rounded-xl px-4 justify-center text-center'>
                <div className='text-[30px] font-semibold text-gray-200'>DATA ENTRY</div>
                <div><FaDatabase size={40} className='text-gray-200'/></div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page
