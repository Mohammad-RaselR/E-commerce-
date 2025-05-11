import React, { useState } from 'react';
import img from "../Images/ami.jpg";
import {Link} from "react-router"

const AccountHeroSection = () => {
  const [activeLink, setActiveLink] = useState("Dashboard"); // Default active

  const menuItems = [
    "Dashboard",
    "Order",
    "Download",
    "Address",
    "Account Details",
    "Log out",
  ];

  return (
    <section className="py-12 px-4 md:px-28 bg-[#f4f4f4]">
      <h1 className="text-3xl font-bold text-center mb-10">My account</h1>

      <div className="px-20 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        {/* Sidebar */}
        <div className="box-border h-113 w-100 border-1 border-gray-300 rounded-md p-6 bg-white">
          <div className="flex items-center border-b pb-5 mb-5">
            <img
              src={img}
              alt="User"
              className="rounded-full w-28 h-29"
            />
            <div className="flex flex-col ml-12">
              <h2 className="text-xl font-bold">Hello!</h2>
              <p className="text-sm font-semibold">Md. Shahdat Hossain</p>
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-sm">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveLink(item)}
                className={`text-left px-4 py-2 rounded-md transition 
                  ${activeLink === item ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"} 
                  ${item === "Log out" ? "text-red-600" : "text-black"}`}
              >
            {item}
            </button>
            ))}
          </div>

        </div>

        {/* Main Content */}
        <div className="border border-gray-300 rounded-md p-6 bg-gray-100">
          <div className='mt-10 ml-25'>
            <h2 className="text-lg font-semibold mb-3">Account overview</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800">
              <li>From your account dashboard you view your Recent orders.</li>
              <li>Manage your Shipping and Billing addresses.</li>
              <li>Edit your Password and Account details.</li>
            </ul>
          </div>

          <div className="box-border h-30 w-150 border-1 mt-20 ml-25 rounded p-4 bg-white">
            <Link to = "/dashboard" className="font-semibold underline block mb-1 mt-3">Become a Vendor</Link>
            <p className="text-sm text-gray-700">
              Vendors can sell products and manage a store with a vendor dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountHeroSection;
