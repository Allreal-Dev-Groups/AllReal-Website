"use client";

import React, { useState } from "react";
import MenuDrawer from "../MenuDrawer/MenuDrawer";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 md:px-20 py-3 md:py-5 h-[70px] backdrop-blur-md shadow-lg">
        {/* Logo Left */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-14 md:h-14 flex-shrink-0 overflow-hidden ">
            <img
              src="/assets/images/logo.webp"
              alt="Logo"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>

          {/* Text Right */}
          <div className="flex flex-col leading-tight">
            <h1 className="text-white text-xl md:text-3xl font-bold">
              ALLREAL
            </h1>
            <span className="text-xs md:text-sm text-gray-300">
              Machenn Innovations
            </span>
          </div>
        </div>

        {/* Menu Button */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-white text-xs md:text-xl">MENU</span>
          <button
            onClick={() => setMenuOpen(true)}
            className="cursor-hover  w-[25px] md:w-[40px] h-[25px] md:h-[40px] bg-[#4d13db] backdrop-blur-sm rounded-3xl flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 md:w-6 md:h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <MenuDrawer isOpen={menuOpen} onToggle={setMenuOpen} />
    </>
  );
};

export default Header;
