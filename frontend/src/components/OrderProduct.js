import React from "react";
import { Link } from "react-router-dom";

export default function OrderProduct() {
  return (
    <div class=" py-4 rounded-lg mt-2 ">
      <div className="flex justify-between">
        <div className="flex">
        <div class="rounded-lg pl-4 mt-4 md:pl-8">
          <img
            src="https://ih1.redbubble.net/image.1059099685.8962/st,small,845x845-pad,1000x1000,f8f8f8.u1.jpg"
            alt="Product image"
            class="w-16 h-16 sm:w-36 sm:h-36 object-cover rounded-lg"
          />
        </div>
        <div className="mt-4 mt-0 ml-6 flex">
            <div className="flex flex-col">
          <div className="md:mt-5">
            <h2 class="font-bold text-l md:text-2xl">Kaooat's Port</h2>
          </div>
          <div>
            <div className="pt-2 text-sm md:text-lg">จำนวน : 1</div>
          </div>
          </div>
        </div>
        </div>
        <div className="flex items-center justify-end text-lg md:text-2xl pr-2 md:pr-8">
            <span className="font-bold text-red-700 ">฿{1}</span>
          </div>
      </div>
    </div>
  );
}
