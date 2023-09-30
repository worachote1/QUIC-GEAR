import React from "react";
import { Link } from "react-router-dom";
import OrderProduct from "./OrderProduct";

export default function OrderCard() {
  return (
    <div className="pt-4 shadow-lg border rounded-lg">
      <div className="flex flex-col">
        <div className="flex justify-between pr-2 md:pr-8 items-center pb-4">
          <div className="pl-2 md:pl-8 text-sm md:text-lg">รายการคำสั่งซื้อ #99999</div>
          <div className="md:flex">
            <div className="flex items-center pr-2 md:pr-8 text-sm md:text-lg pb-2 md:pt-2">กำลัง To the Moon</div>
            <button className=" border border-red-500 bg-white text-red-500 text-sm md:text-lg font-bold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300">
              ดูรายละเอียด
            </button>
          </div>
        </div>
        <div className="flex justify-between pr-2 md:pr-8 items-center bg-gray-100 pt-4 pb-4">
          <div>
            <div className="pl-4 md:pl-8 text-m md:text-lg">วันที่สั่งซื้อ</div>
            <div className="pl-4 md:pl-8 text-sm pt-2">วันที่หุ้นไม่ลง</div>
          </div>
          <div className="flex">
            <div className="pl-4 md:pl-8 text-m md:text-lg">ยอดสุทธิ</div>
            <div className="flex items-center pl-2 md:pl-8">เท่า AOT</div>
          </div>
        </div>
        <div>
          <OrderProduct />
        </div>
      </div>
    </div>
  );
}
