import React from "react";
import { Link } from "react-router-dom";
import OrderProduct from "./OrderProduct";

export default function OrderCard({ order }) {
  const { id, orderItems, orderStatus, totalPrice, createAt } = order;

  const getStatusText = (orderStatus) => {
    switch (orderStatus) {
      case 'to recieve':
        return 'อยู่ระหว่างจัดส่ง';
      case 'completed':
        return 'สำเร็จ';
      default:
        return 'Unknown';
  }
};

return (
  <div className="pt-4 shadow-lg border rounded-lg">
    <div className="flex flex-col">
      <div className="flex justify-between pr-2 md:pr-8 items-center pb-4">
        <div className="pl-2 md:pl-8 text-sm font-bold md:text-xl">
          รายการคำสั่งซื้อ #{id}
        </div>
        <div className="md:flex">
          <div className="flex items-center pr-2 md:pr-8 text-sm md:text-lg pb-2 md:pt-2 hidden md:block">
            สถานะ: {getStatusText(orderStatus)}
          </div>
          <Link to={`/myorder/${id}`} className="border border-red-500 bg-white text-red-500 text-sm md:text-lg font-bold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300">
            ดูรายละเอียด
          </Link>
        </div>
      </div>
      <div className="flex justify-between pr-2 md:pr-8 items-center bg-gray-100 pt-4 pb-4">
        <div>
          <div className="pl-4 md:pl-8 text-sm md:text-lg">วันที่สั่งซื้อ</div>
          <div className="pl-4 md:pl-8 text-sm pt-2">{createAt}</div>
        </div>
        <div className="flex">
          <div className="pl-4 md:pl-8 text-m md:text-lg">ยอดสุทธิ</div>
          <div className="flex items-center pl-2 md:pl-8">฿{totalPrice}</div>
        </div>
      </div>
      <div>
        {orderItems.map((item) => (
          <OrderProduct key={item.productId} item={item} />
        ))}
      </div>
    </div>
  </div>
);
}