"use client";

import { useState } from "react";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";

function Chip({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-[#130326] bg-[#dfcce2] rounded-3xl hover:text-gray-200 transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
    >
      {name}
    </button>
  );
}

export default function TagDropDown({ onChange, chipData = ["UI", "Workflow", "Test3", "Test4", "Test5"] }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (tag) => {
    onChange(tag);
    setIsOpen(false); // close dropdown after selection
  };

  return (
    <div className="relative pointer-events-auto flex justify-center">



        <div className="top-full flex flex-col  w-[500px] z-[1000] pointer-events-auto">
          <div className="w-full p-4  shadow-md rounded-md grid grid-cols-5 gap-3">
            {chipData.map((name, idx) => (
              <Chip key={idx} name={name} onClick={() => handleSelect(name)} />
            ))}
          </div>
        </div>
      
    </div>
  );
}
