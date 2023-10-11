import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import { testOrderData } from "../constant/testDataForAdmin";
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';

export default function MyOrdersList() {
  const current_user = JSON.parse(sessionStorage.getItem("current_user"));
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Number of items to display per page
  const [orderList, setOrderList] = useState(null);

  const totalPages = Math.ceil((orderList?.length ? orderList?.length : 0) / itemsPerPage);

  // Calculate the range of products to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const orderToDisplay = orderList?.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getUserOrders = async () => {
    const allOrders = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/orders`)
    const currentUserOrders = allOrders.data.filter((item) => item.userID._id === current_user._id)
    // console.log(currentUserOrders.slice().reverse())
    setOrderList([...currentUserOrders].slice().reverse())

  }

  useEffect(() => {
    getUserOrders()
  }, [])

  if (!orderList) {
    return <div className='w-full h-screen flex justify-center items-center'>
      <ThreeDots type="Circles" color="#841724" height={100} width={100} />
    </div>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex-col ml-2 mr-2 w-full md:w-[750px] lg:w-[1000px]">
        <div className="text-xl pt-8 md:text-2xl font-bold pl-2 mb-4 md:pl-0">
          รายการคำสั่งซื้อ
        </div>
        {orderToDisplay.map((order) => (
          <div key={order.id} className="mb-4">
            <OrderCard order={order} />
          </div>
        ))}

        {/* Pagination */}
        {orderList.length ?
          <div className="flex justify-center mt-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="mr-4 p-2 rounded-full hover:bg-[#d6d3d1]"
              style={{
                width: '30px', // Adjust the size as needed
                height: '30px', // Adjust the size as needed
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <ul className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index}
                  className={`cursor-pointer ${currentPage === index + 1 ? 'font-bold' : 'hover:text-red-300'
                    }`}
                  onClick={() => handlePageChange(index + 1)}
                  style={{
                    background: currentPage === index + 1 ? '#fca5a5' : 'transparent',
                    color: currentPage === index + 1 ? '#b91c1c' : 'black',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="ml-4 p-2 rounded-full hover:bg-[#d6d3d1]"
              style={{
                width: '30px', // Adjust the size as needed
                height: '30px', // Adjust the size as needed
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          : <div></div>
        }
      </div>
    </div>
  );
}
