"use client";
import React, { useState,useEffect, createElement } from "react";
import Image from "next/image";
import { createHash } from "crypto";

import { Avatar } from "primereact/avatar";


import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { FaUserAlt,FaPowerOff  } from "react-icons/fa";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";

const ProfileMenuItems = [
  {
    text: "Profile",
    icon: FaUserAlt,
    link : "/profile"
  },
  
  {
    text: "Sign Out",
    icon: FaPowerOff ,
    link : "/login"
  },
];
export default function ProfileCard({ email }) {
  //const hash = MD5(email + email);
  const [isArrowMenuOpen, setIsArrowMenuOpen] = useState(false);
  const handlearrowclick = () => {
    setIsArrowMenuOpen(!isArrowMenuOpen);
    console.log(isArrowMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (event) => {};

  const handleLogOut = () => {
    secureLocalStorage.clear();
    window.location.href = "/login";
  };

  const handleProfileClick = () => {
    window.location.href = "/profile";
  };


  
   

  return (
    <div>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom-end"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
        <Button
  variant="text"
  color="blue"
  onClick={handleClick}
  className="flex items-center justify-center w-[60px] h-[50px] rounded-full bg-blue-6   hover:bg-blue-800 bg-blue-800 hover:scale-105" // Adjust spacing as needed
>
  <div className="bg-blue-800 text-gray-200 border-2 border-black p-2 rounded-full flex items-center justify-center">
    <i className="pi pi-user text-2xl"></i>
  </div>
  <div className="cursor-pointer" onClick={handlearrowclick}>
    {isMenuOpen ? (
      <FaArrowUp size={10} color="white" />
    ) : (
      <FaArrowDown size={10} color="white" />
    )}
  </div>
</Button>

        </MenuHandler>
        <MenuList className="z-40 p-1 border-2 border-black">
          {ProfileMenuItems.map(({ text, icon,link }, index) => {
            const isLastItem = index === ProfileMenuItems.length - 1;
            const isFavourites = index === 1;
            return (
              <Link href={link} key={index}>
                <MenuItem
                  key={index}
                  className={`group flex items-center gap-3 mb-1 rounded ${
                    isLastItem
                      ? "hover:bg-red-200 focus:bg-red-400 active:bg-red-200"
                      : "hover:bg-blue-200 focus:bg-blue-400 active:bg-blue-200"
                  }`}
                  onClick={isLastItem ? handleLogOut : isFavourites ? handleFavouritesClick : handleProfileClick}
                >
                  {createElement(icon, {
                    strokeWidth: 2,
                    className: `h-4 w-4 mt-1 mx-1 ${
                      isLastItem
                        ? "text-red-700 group-hover:text-red-900 "
                        : "text-gray-900 group-hover:text-black"
                    } 
                      group-transition ease-in duration-300 flex items-center
                      `,
                  })}
                  <Typography
                    as="span"
                    variant="small"
                    color={isLastItem ? "red" : "gray"}
                    className={`group-transition ease-in flex items-center duration-300 font-bold text-[20px] mt-2 ${
                      isLastItem
                        ? "text-red-500 group-hover:text-red-700"
                        : "text-gray-900 group-hover:text-gray-900"
                    }`}
                  >
                    {text}
                  </Typography>
                </MenuItem>
              </Link>
            );
          })}
        </MenuList>
      </Menu>

       
    </div>
  );
}