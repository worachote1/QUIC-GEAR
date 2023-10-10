import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import Swal from "sweetalert2";

export default function Cart() {
  //  fetch Item that user add to basket (must be the same foodShop)
  //  fetch Object from session
  const [currentItemInCart, setCurrentItemInCart] = useState(
    JSON.parse(sessionStorage.getItem("currrent_cartItem"))
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

  const handle_placeOrder = () => {
    // POST API : create new Order
    fetch(`http://localhost:5000/api/orders/`, {
      method: "POST",
      body: JSON.stringify({
        user: sessionStorage.getItem("current_user"),
        date: new Date().toLocaleString(),
        productInCart: sessionStorage.getItem("currrent_cartItem"),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // alert(data)
        sessionStorage.removeItem("currrent_cartItem");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
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
                <button className="flex rounded-full w-48 h-11 bg-[#A51D2D] hover:bg-[#841724] justify-center items-center text-white text-xl">
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