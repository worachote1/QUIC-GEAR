import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { formatNumberInput } from "../util/formatUtil";

export default function Cart() {
  //  fetch Item that user add to basket (must be the same foodShop)
  //  fetch Object from session
  const current_user = JSON.parse(sessionStorage.getItem("current_user"));
  const currentItemInCart = JSON.parse(sessionStorage.getItem("current_cartItem"));
  const checkEmptyREGEX = /^\s*$/gm;
  const navigate = useNavigate();

  const alert_placeOrderSuccess = () => {
    sessionStorage.removeItem("current_cartItem");
    Swal.fire({
      title: "การสั่งซื้อเสร็จสมบูรณ์!",
      text: "คำสั่งซื้อของคุณได้รับการยืนยันเรียบร้อยแล้ว",
      icon: "success",
    }).then(() => {
      navigate("/myorder");
    });
  }

  const alert_NotEnoughCoins = () => {
    sessionStorage.removeItem("current_cartItem");
    Swal.fire({
      title: "เหรียญไม่เพียงพอ",
      text: "กรุณาเติมเหรียญก่อนดำเนินการต่อ",
      icon: "error",
    }).then(() => {
      navigate("/topup");
    });
  }

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

  const [Total, setTotal] = useState(calTotal());

  const upDateTotal = (NewTotal) => {
    setTotal(NewTotal);
  };

  const handlePayment = async () => {
    if (checkEmptyREGEX.test(current_user.address)) {
      Swal.fire({
        title: "ต้องการที่อยู่",
        text: `กรุณาระบุข้อมูลที่อยู่ในโปรไฟล์ของคุณก่อนทําการซื้อ!`,
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#a51d2d",
        cancelButtonColor: "#a51d2d",
        confirmButtonText: "<span class='text-white'>ยืนยัน</span>",
      }).then((result) => {
        if (result.isConfirmed) {
          // Perform any necessary delete action here
          navigate(`/edit-profile`);
        }
      })
      return;
    }

    Swal.fire({
      title: "ยืนยันการซื้อ",
      text: `คุณต้องการจะซื้อสินค้าหรือไม่?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ebebeb",
      cancelButtonColor: "#a51d2d",
      confirmButtonText: "<span class='text-black'>ชําระเงิน</span>",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //Create Order
        try {
          const productsObj = []
          currentItemInCart.forEach(item => {
            const itemObj = {
              productID: item._id,
              quantity: item.quantity
            }
            productsObj.push(itemObj)
          });
          const orderData = {
            userID: JSON.parse(sessionStorage.getItem("current_user"))._id,
            orderItems: [...productsObj],
            totalPrice: Total
          }
          if (current_user.coins < orderData.totalPrice) {
            alert_NotEnoughCoins()
            return;
          }
          const createOrder = await axios.post(`${process.env.REACT_APP_QUIC_GEAR_API}/orders/create`, orderData);
          const res_createOrder = createOrder.data;
          const getSingleOrder = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/orders/${res_createOrder._id}`);
          const res_getSingleOrder = getSingleOrder.data;
          console.log(res_getSingleOrder);
          //update products stock
          res_getSingleOrder.orderItems.forEach(async (item) => {
            const updateProduct = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/products/update/${item.productID._id}`, {
              ...item.productID,
              stock: item.productID.stock - item.quantity,
              totalOrder: item.productID.totalOrder + item.quantity
            })
          })
          //update user coin
          const updateUser = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/users/update/${res_getSingleOrder.userID._id}`, {
            ...res_getSingleOrder.userID,
            coins: res_getSingleOrder.userID.coins - res_getSingleOrder.totalPrice
          })
          sessionStorage.setItem("current_user", JSON.stringify(updateUser.data));
          alert_placeOrderSuccess();
        }
        catch (err) {
          console.log(err);
        }
      }
      else {

      }
    })

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
            <div className="fixed bottom-0 bg-gray-100 w-screen h-36 flex justify-between items-center text-red-600">
              <div></div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-4 text-xl">ราคาสุทธิ</span>
                <span className="flex items-center text-xl font-bold">
                  <AiOutlineDollarCircle class=' text-2xl' />
                  {formatNumberInput(Total)}
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