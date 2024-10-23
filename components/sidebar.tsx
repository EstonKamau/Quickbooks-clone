"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X, Settings } from "lucide-react";

const menuItems = [
  { name: "BOOKMARKS", href: "/bookmarks", hasEdit: true },
  { name: "MENU", href: "/menu", hasEdit: true },
];

const dropdownItems = {
  Customers: [
    { name: "Invoice", href: "/invoice" },
    { name: "Receive payment", href: "/receive-payment" },
    { name: "Statement", href: "/statement" },
    { name: "Estimate", href: "/estimate" },
    { name: "Credit note", href: "/credit-note" },
    { name: "Sales receipt", href: "/sales-receipt" },
    { name: "Refund receipt", href: "/refund-receipt" },
    { name: "Delayed credit", href: "/delayed-credit" },
    { name: "Delayed charge", href: "/delayed-charge" },
    { name: "Add customer", href: "/add-customer" },
  ],
  Suppliers: [
    { name: "Expense", href: "/expense" },
    { name: "Cheque", href: "/cheque" },
    { name: "Bill", href: "/bill" },
    { name: "Pay bills", href: "/pay-bills" },
    { name: "Purchase order", href: "/purchase-order" },
    { name: "Supplier credit", href: "/supplier-credit" },
    { name: "Credit card credit", href: "/credit-card-credit" },
    { name: "Add supplier", href: "/add-supplier" },
  ],
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.style.marginLeft = isOpen ? "240px" : "50px";
    }

    // Handle click outside
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  return (
    <div className="flex">
      <aside
        className={`fixed top-0 left-0 h-full bg-[#1a1a1a] text-white transition-all duration-300 ease-in-out ${
          isOpen ? "w-60" : "w-0"
        } overflow-hidden z-20`}
      >
        <nav className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-4 flex items-center">
            <span className="ml-2 text-lg font-normal">QuickBooks Clone</span>
          </div>

          {/* New Button with Dropdown */}
          <div className="px-4 mb-4 relative">
            <button
              ref={buttonRef}
              onClick={toggleDropdown}
              className="w-full bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-md flex items-center justify-between"
            >
              <span className="font-medium text-gray-600">+ New</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownVisible && (
              <div
                ref={dropdownRef}
                className="fixed left-3 top-[125px] w-[600px] bg-white rounded-lg shadow-lg z-50 text-gray-800 p-6"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(0,0,0,0.1))"
                }}
              >
                <div 
                  className="absolute -top-2 left-8 w-4 h-4 bg-white transform rotate-45"
                  style={{
                    boxShadow: "-1px -1px 0 rgba(0,0,0,0.05)"
                  }}
                ></div>
                <div className="grid grid-cols-2 gap-8">
                  {/* Customers Column */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Customers</h3>
                    <ul className="space-y-3">
                      {dropdownItems.Customers.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => setDropdownVisible(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suppliers Column */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Suppliers</h3>
                    <ul className="space-y-3">
                      {dropdownItems.Suppliers.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => setDropdownVisible(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <ul className="space-y-1 px-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <div className="flex items-center justify-between group">
                  <Link
                    href={item.href}
                    className={`flex items-center py-2 text-gray-300 hover:text-white ${
                      pathname === item.href ? "text-white" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.hasEdit && (
                    <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Settings at bottom */}
          <div className="mt-auto p-4">
            <button className="flex items-center text-gray-300 hover:text-white">
              <Settings size={20} className="mr-2" />
              Menu settings
            </button>
          </div>
        </nav>
      </aside>

        {/* Toggle Button */}
        <div
        className={`fixed top-2 transition-all duration-300 ease-in-out z-30`}
        style={{
            left: isOpen ? "200px" : "10px",
        }}
        >
        <button
            onClick={toggleSidebar}
            className={isOpen ? "text-white" : "text-black"}
        >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        </div>
    </div>
  );
}