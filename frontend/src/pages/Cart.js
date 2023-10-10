import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import Swal from "sweetalert2";
import axios from "axios";

export default function Cart() {
  //  fetch Item that user add to basket (must be the same foodShop)
  //  fetch Object from session
  const [currentItemInCart, setCurrentItemInCart] = useState(
    JSON.parse(sessionStorage.getItem("current_cartItem"))
  );
  const navigate = useNavigate();
  const alert_EmptyCart = () => {
    Swal.fire({
      title: "ไม่มีสินค้าอยู่ในรถเข็น",
      text: "เลือกสินค้าที่โดนใจมาใส่ไว้ในรถเข็นได้เลย",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#a51d2d",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform any necessary delete action here
        navigate("/");
      }
    });
  };

  const calTotal = () => {
    if (currentItemInCart === null) {
      return 0;
    }
    let cnt = 0;
    for (let i = 0; i < currentItemInCart.length; i++) {
      cnt += currentItemInCart[i].price * currentItemInCart[i].quantity;
    }
    return cnt;
  };
  const upDateTotal = (NewTotal) => {
    setTotal(NewTotal);
  };
  const [Total, setTotal] = useState(calTotal());

  const handlePayment = () => {
    console.log("handlePayment function called");
    // Create an order object
    const order = {
      userID: "651cccc8e42f544df3654512",
      orderItems: currentItemInCart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        productID: "651cccc8e42f544df3654512",
        imgPath: item.imgPath,
        brand: item.brand,
        type: item.type,
        subType: item.subType,
      })),
      orderStatus: "Processing",
      shippingInfo: "Your shipping information", // Replace with actual shipping information
      totalPrice: Total, // Replace with the actual total price
    };
    // Make a POST request using Axios
    axios
      .post(`${process.env.REACT_APP_QUIC_GEAR_API}/orders/create`, order, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        console.log("POST request successful"); 
        // Handle the response or show a success message
        sessionStorage.removeItem("current_cartItem");
        Swal.fire({
          title: "Place Order Complete!",
          text: "Your order has been placed successfully.",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("POST request error:", error);
        console.error(error);
        // Handle the error, e.g., show an error message
      });
  };

  return (
    <div className="">
      <div className="flex justify-center ">
        <div className="flex flex-col w-2/3 mt-4 text-xl">
          
        {currentItemInCart !== null
          ? currentItemInCart.map((item) => {
              return (
                <CartItem
                  key={`menu-${item.id}`}
                  menuObj={item}
                  callbackUpdate={upDateTotal}
                  cur_Total={Total}
                />
              );
            })
          : alert_EmptyCart()}
          </div>
          
        {currentItemInCart !== null ? (
          <>
            <div className="fixed bottom-0 bg-gray-100 w-screen h-36 flex justify-between text-red-600">
              <div></div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-4 text-xl">ราคาสุทธิ</span>
                <span className="text-xl font-bold">
                  {Total} Baht (QuicCoins)
                </span>
              </div>
              <div className="flex items-center ">
                <button 
                  className="flex rounded-full w-48 h-11 bg-[#A51D2D] hover:bg-[#841724] justify-center items-center text-white text-xl"
                  onClick={handlePayment}
                >
                  ชำระเงิน
                </button>
              </div>
              <div></div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="flex h-40"></div>
    </div>
  );
}