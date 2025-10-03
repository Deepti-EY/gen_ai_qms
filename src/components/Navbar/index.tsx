"use client";
import React from "react";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";
import { CURRENT_SUB_DOMAIN } from "@/app/lib/config";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="bg-black/90 border-b-6 border-[#FFE600] flex h-16 items-center justify-between px-8 text-white fixed w-full z-50">
      <div className="flex items-center">
        <a className="cursor-pointer" href="/home">
          <Image
            src={`${CURRENT_SUB_DOMAIN}/EYLogo.svg`}
            width="40"
            height="40"
            alt=""
            className="size-8 -mt-4"
            style={{ background: "transparent", border: "none" }}
          />
        </a>
        <div className="border-r-2 border-white text-[22px] font-bold px-3 ml-6 text-[#FFE600]">
          GENOME
        </div>
        <div className="text-xl text-white px-3 font-normal">
        Gen AI QMS
        </div>
        <Image
          src={`${CURRENT_SUB_DOMAIN}/genomeLogo.svg`}
          alt="Logo"
          width={20}
          height={20}
          className="object-contain mx-2"
        />
      </div>

      <div className="flex items-center space-x-6 relative group">
        <h1>Welcome User</h1>
        <div className="border border-[#ffe600] rounded-full hover:cursor-pointer">
          <FaUserAlt className="h-4 w-4 text-[#ffe600] m-1.5" />
        </div>

        <button
          onClick={handleLogout}
          className="absolute top-8 right-0 bg-white text-black border border-gray-300 text-sm px-3 py-1 w-20 h-10 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:cursor-pointer hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
