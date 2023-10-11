import React from "react";
import { Link } from "react-router-dom";
import { formatNumberInput } from "../util/formatUtil";
import { AiOutlineDollarCircle } from 'react-icons/ai'

export default function OrderProduct({ item }) {

  return (
    <div className="py-4 rounded-lg mt-2">
      <div className="flex justify-between">
        <div className="flex">
          <div className="rounded-lg pl-4 mt-4 md:pl-8">
            <Link to={`/product/${item.productID._id}`}>
              <img
                // src={`uploads/${item.productID.imgPath[0]}`}
                src={`/uploads/${item.productID.imgPath[0]}`}
                alt={item.productID.name}
                className="w-16 h-16 sm:w-36 sm:h-36 object-cover rounded-lg"
              />
            </Link>
          </div>
          <div className="mt-4 mt-0 ml-6 flex">
            <div className="flex flex-col items-start">
              <div className="md:mt-5">
                <h2 className="font-bold text-l md:text-2xl">{item.productID.name} </h2>
              </div>
              <div>
                <div className="pt-2 text-sm md:text-lg">จำนวน : {item.quantity}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end text-lg md:text-2xl pr-2 md:pr-8">
          <span className="font-bold flex items-center text-red-700">
            <AiOutlineDollarCircle class=' text-2xl' />
            {formatNumberInput(item.productID.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
