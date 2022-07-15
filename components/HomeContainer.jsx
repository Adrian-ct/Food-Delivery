import Image from "next/image";
import React from "react";
import Delivery from "../public/img/delivery.png";
import HeroBg from "../public/img/heroBg.png";

import { heroData } from "../utils/data";
const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div className="py-2 gap-6 flex-1 flex flex-col items-start justify-start">
        <div
          className="flex items-center justify-center gap-2 
        bg-orange-100 px-2 py-1 rounded-full"
        >
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-6 h-6 overflow-y-visible drop-shadow-md rounded-full bg-white">
            <Image
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>

        <p className="text-[2rem] lg:text-[4.2rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in
          <span className="text-orange-600 text-[4rem] lg:text-[5rem]">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <button
          type="button"
          className="bg-gradient-to-br
           from-orange-400 to-orange-500 w-full md:w-auto
            px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 focus:outline-none"
        >
          Order Now!
        </button>
      </div>
      <div className="py-2 flex-1 flex relative items-center justify-center md:justify-end">
        <Image
          src={HeroBg}
          className="h-[420px] w-full lg:w-auto lg:h-[650px] ml-auto"
          alt="hero-bg"
        />
        <div
          className=" w-auto flex-wrap  absolute top-0  gap-x-10 gap-y-20  lg:gap-y-32 md:-left-[7rem] flex  items-center justify-center
          lg:px-32  py-20  "
        >
          {heroData.map((item, index) => (
            <div
              key={item.id}
              className="p-4 w-48 md:w-32 lg:w-190  rounded-3xl flex flex-col items-center justify-center  bg-cardOverlay backdrop-blur-xl
               drop-shadow-md "
            >
              <div className="-mt-20">
                <Image src={item.imageSrc} alt="i1" />
              </div>
              <p className="text-base lg:text-xl  font-semibold text-textColor mt-2 lg:mt-4">
                {item.name}
              </p>
              <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                {item.desc}
              </p>
              <p className="text-sm font-semibold text-headingColor">
                <span className="text-xs text-red-500">$</span> {item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
