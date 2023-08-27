import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [profileMenuActive, setProfileMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const clickProfileDropdown = () => {
    setProfileMenuActive(!profileMenuActive);
  };
  const clickMobileMenuDropdown = () => {
    setMobileMenuActive(!mobileMenuActive);
  };
  return (
    <nav className="flex flex-col md:flex-row items-center bg-white-50 p-4 shadow-md">
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">QUICGEAR</h1>
            </div>

            <div className="w-full md:w-1/2 mt-4 md:mt-0 relative">
                <div className="relative">
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                    <input
                        type="text"
                        id="search_field"
                        className="pl-10 px-4 py-2 rounded-lg w-full focus:outline-1 text-black-300 placeholder-gray-500 bg-gray-200"
                        placeholder="ค้นหาสินค้าที่ต้องการ"
                    />
                </div>
            </div>

            <div className="w-full md:w-1/2 mt-4 md:mt-0 text-center md:text-right">
                <div className="md:ml-auto">
                    <button className="btn bg-white border-white rounded-full hover:bg-red-700/30" id="fav_btn">
                        <i className="fas fa-heart"></i>
                    </button>
                    <button className="btn bg-white border-white rounded-full hover:bg-red-700/30" id="cart_btn">
                        <i className="fas fa-cart-shopping"></i>
                    </button>
                    <button className="btn bg-red-800/90 text-white hover:bg-red-700" id="login_btn">
                        ลงชื่อเข้าใช้
                    </button>
                </div>
            </div>
        </nav>
  );
}
