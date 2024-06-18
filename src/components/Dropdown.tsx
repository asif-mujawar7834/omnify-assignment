// components/Dropdown.js

import { useState, useRef, useEffect } from "react";
import { DropDownProps } from "../../types";
import { FaCheck } from "react-icons/fa";

const Dropdown = ({ items, label, selected = null }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selected);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      {label && (
        <p className="text-xs font-medium text-[#334155] mb-2">
          Show orders for
        </p>
      )}
      <button
        onClick={toggleDropdown}
        className="w-full bg-white text-[#334155] text-sm font-medium border border-gray-300 rounded-md shadow-sm px-3 py-2 text-left cursor-pointer focus:outline focus:outline-[#64748B]"
      >
        {selectedItem ? selectedItem : label}
      </button>

      {isOpen && (
        <ul className="absolute text-sm font-normal mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[232px] overflow-y-auto z-10">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
            >
              <span>{item}</span>
              {item === selectedItem && <FaCheck />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
