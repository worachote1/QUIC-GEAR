import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem'
import Swal from 'sweetalert2'

export default function Cart() {

  //  fetch Item that user add to basket (must be the same foodShop) 
  //  fetch Object from session
  const [currentItemInCart, setCurrentItemInCart] = useState(JSON.parse(sessionStorage.getItem("currrent_cartItem")))
  const navigate = useNavigate();
  const alert_EmptyCart = () => {
    Swal.fire({
      title: 'ไม่มีสินค้าอยู่ในรถเข็น',
      text: "เลือกสินค้าที่โดนใจมาใส่ไว้ในรถเข็นได้เลย",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform any necessary delete action here
        navigate("/")
      }
    })
}

  const calTotal = () => {
    if(currentItemInCart === null){
      return 0
    }
    let cnt = 0
    for (let i = 0; i < currentItemInCart.length; i++){
      cnt += currentItemInCart[i].itemPrice * currentItemInCart[i].quantity
    }
    return cnt
  }
  const upDateTotal = (NewTotal) => {
    setTotal(NewTotal)
  }
  const [Total,setTotal] = useState(calTotal())

  const handle_placeOrder = () => {
    // POST API : create new Order
    fetch(`http://localhost:5000/api/orders/`,{
      method : "POST",
      body : JSON.stringify({
        "user" : sessionStorage.getItem('current_user'),
        "date" : new Date().toLocaleString(),
        "productInCart" : sessionStorage.getItem('currrent_cartItem'),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      // alert(data)
      sessionStorage.removeItem('currrent_cartItem');
      navigate('/')
    })
    .catch((err) => {
      console.log(err)
    })
    
  }

  return (
    <div >

      <div class="p-4 min-h-screen ">
        {/* <div class="flex flex-col md:flex-row md:justify-center md:items-center">
          <p className='text-center text-4xl text-red-500' style={{ fontFamily: "Anton, sans-serif" }}>Shopping Cart</p>
        </div> */}
        {(currentItemInCart !== null)
          ? currentItemInCart.map((item) => {
            return <CartItem key={`menu-${item.id}`} menuObj = {item} callbackUpdate = {upDateTotal} cur_Total = {Total} /> 
          })

          : alert_EmptyCart()
        }
        {(currentItemInCart !== null) ?
          <>
            <div className="flex justify-end items-center mt-4 sm:mt-8">
              <span className="text-gray-600 mr-4">Total:</span>
              <span className="text-xl font-bold">{Total} Baht (QuicCoins)</span>
            </div>
            <div className="flex justify-end items-center mt-2">
              <button className="btn btn-success"
              onClick={handle_placeOrder}
              >place order</button>
            </div>
          </>
          : ""}
      </div>

    </div >
  )
}