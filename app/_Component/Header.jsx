"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
// import ProfileCard from "@/app/components/Profile/ProfileCard";
import Hamburger from "hamburger-react";

import Image from "next/image";
import secureLocalStorage from "react-secure-storage";
// import { useAuth } from "@/app/_auth/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

const navLinks = [
  {
    title: "About",
    path: "/#about",
  },
  {
    title: "Events",
    path: "/events",
  },
  {
    title: "Eventide",
    path: "/comingSoon",
  },
  {
    title: "Hackathon",
    path: "/hackathon",
  },
  {
    title: "TechFair",
    path: "/techfair",
  },
  {
    title: "Contact Us",
    path: "/",
  },
];

const optNavLink = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Sign Up",
    path: "/register",
  },
];

const Navigationbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    parseInt(secureLocalStorage.getItem("isLoggedIn"))
  );
  const [isAmritaCBE, setIsAmritaCBE] = useState(
    parseInt(secureLocalStorage.getItem("isAmritaCBE"))
  );
  const [hasActivePassport, setHasActivePassport] = useState(
    parseInt(secureLocalStorage.getItem("hasActivePassport"))
  );
  const [email, setEmail] = useState(secureLocalStorage.getItem("email"));

  useEffect(() => {
    setIsLoggedIn(parseInt(secureLocalStorage.getItem("isLoggedIn")));
    setIsAmritaCBE(parseInt(secureLocalStorage.getItem("isAmritaCBE")));
    setHasActivePassport(
      parseInt(secureLocalStorage.getItem("hasActivePassport"))
    );
    setEmail(secureLocalStorage.getItem("registerEmail"));
  }, []);

  useEffect(() => {
    console.log("Updated Email", email);
  }, [email]);

//   const { SignOut } = useAuth();

  const handleSignOut = () => {
    setIsLoggedIn(0);
    SignOut();
  };
  const router = useRouter();
  const handleForgetPassword = () => {
    router.push("/login");
  };
  return (
    <nav className="fixed z-20 h-[200px] rounded-md inset-1  bg-opacity-50 backdrop-blur-xl mb-3 border-b-1 border-t-3 border-none bg-[#121212]">
      <div className="flex items-center justify-between mx-auto px-4 py-2  ">
        <div className="mobile-menu lg:hidden">
          <Button variant="text" className="rounded-full p-1">
            <Hamburger
              toggled={navbarOpen}
              toggle={setNavbarOpen}
              size={24}
              color="#ffffff"
            />
          </Button>
        </div>

        <div>
          <Link
            href={"/"}
            className="text-2xl md:text-5xl text-gray-300 font-normal"
          >
            <Image
              src="/images/anokha2024_logo.png"
              alt="logo"
              width={250}
              height={250}
              className="w-40 lg:h-full float-left "
            />
          </Link>
        </div>

        <div
          className="menu hidden lg:block justify-end  lg:w-auto w-2/5"
          id="navbar"
        >
          <ul className="flex p-2 md:p-0 md:flex-row lg:space-x-2 mt-0 ">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.path}>
                  <Button
                    variant="text"
                    className=" h-[40px] hover:bg-gray-700"
                  >
                    <div className="my-auto   text-gray-300   text-[13px]  rounded md:p-0 hover:text-white">
                      {link.title}
                    </div>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="flex flex-row justify-center items-start">
          <div className="mr-5">
            {isLoggedIn === 1 ? (
            //   <ProfileCard email={email} />
            ""
            ) : (
              <div className=" relative inline-flex  group md:block sm:hidden">
                <Button
                  className="relative border-[#1a4d76] border-0 inline-flex items-center w-[100px] md:w-[200px] justify-center px-2  md:px-2 md:py-2 md:text-lg font-bold text-white transition-all duration-100 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-900 sm:before:content-['Login'] md:before:content-['Login_\/_Sign_Up'] hover:scale-[1.02] hover:border-[#1a4d76] hover:border-2"
                  onClick={handleForgetPassword}
                ></Button>
              </div>
            )}
          </div>
        </div> */}
      </div>
      {navbarOpen ? <MenuOverlay links={[...navLinks, ...optNavLink]} /> : null}
    </nav>
  );
};

export default Navigationbar;