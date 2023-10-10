import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import { testOrderData } from "../constant/testDataForAdmin"; 

export default function MyOrdersList() {
  return (
    <div className="flex justify-center">
        <div className="flex-col ml-2 mr-2 w-full md:w-[750px] lg:w-[1000px]">
        <div className="text-xl pt-8 md:text-2xl font-bold pl-2 mb-4 md:pl-0">
            รายการคำสั่งซื้อ
        </div>
        {testOrderData.map((order) => (
          <div key={order.id} className="mb-4">
            <OrderCard order={order} />
          </div>
          ))}
    </div>
    </div>
  );
}
