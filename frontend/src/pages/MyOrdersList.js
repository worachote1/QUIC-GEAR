import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderCard from "../components/OrderCard";

export default function MyOrdersList() {
  return (
    <div className="flex justify-center">
        <div className="flex-col ml-2 mr-2 w-full md:w-[750px] lg:w-[1000px]">
        <div className="text-xl pt-8 md:text-2xl font-bold pl-2 md:pl-0">
            รายการคำสั่งซื้อ
        </div>
      <div className="pt-4">
        <OrderCard />
      </div>
    </div>
    </div>
  );
}
