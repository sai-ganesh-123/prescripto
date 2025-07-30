import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* --------left-------------- */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Prescripo is a cutting-edge online platform designed to simplify the
            process of booking doctor appointments. Our service allows patients
            to easily find and schedule appointments with qualified healthcare
            professionals based on specialty, location, and availability.
          </p>
        </div>
        {/* --------center-------------- */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className=" flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Privacy Pollicy</li>
            <li className="cursor-pointer">Contact US</li>
          </ul>
        </div>
        {/* --------right-------------- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className=" flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer">+0-000-000-000</li>
            <li className="cursor-pointer">prescripto@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* -----------Copy Right------------- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          © Copyright {new Date().getFullYear()} Prescripto - All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
