"use client";

import React, { useState } from "react";
import MenuDrawer from "./MenuDrawer";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-100 flex max-w-svw overflow-x-hidden items-center justify-between px-5 md:px-[6%] py-3 md:py-5 h-[100px] bg-transparent">
        {/* Logo Left */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 overflow-hidden ">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </div>

        {/* Menu Button */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-white text-xs md:text-xl">MENU</span>
          <button
            onClick={() => setMenuOpen(true)}
            className="cursor-hover  w-[25px] md:w-10 h-[22px] md:h-10 bg-[#acacac]  rounded-3xl flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <img
              src="/images/menu.png"
              alt="Logo"
              className="w-[70%] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </button>
        </div>
      </header>

      <MenuDrawer isOpen={menuOpen} onToggle={setMenuOpen} />
    </>
  );
};

export default Header;
