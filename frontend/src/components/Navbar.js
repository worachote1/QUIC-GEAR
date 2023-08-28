import React, { useEffect, useState } from "react";
import { Route, Link } from 'react-router-dom';

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
        <div className="sticky top-0 z-50 bg-white">
            <nav className="flex flex-col md:flex-row items-center p-4 shadow-md">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                        <Link to="">QUICGEAR</Link>
                    </h1>
                </div>

                <div className="w-full md:w-1/2 mt-4 md:mt-0">
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

                <div className="w-full md:w-1/2 mt-4 md:mt-0 text-center md:text-right hidden lg:block">
                    <div className="md:ml-auto flex justify-center md:justify-end">
                        <button className="btn border-white text-black rounded-full hover:bg-red-700/30 mr-2" id="auction_btn">
                            <i className="fa-solid fa-building-columns" style={{ fontSize: '1.25rem' }}></i>
                        </button>
                        <button className="btn border-white text-black rounded-full hover:bg-red-700/30 mr-2" id="fav_btn">
                            <i className="fas fa-heart" style={{ fontSize: '1.25rem' }}></i>
                        </button>
                        <button className="btn border-white text-black rounded-full hover:bg-red-700/30 mr-2" id="cart_btn">
                            <i className="fas fa-cart-shopping" style={{ fontSize: '1.25rem' }}></i>
                        </button>
                        <button className="btn bg-red-700/90 text-white hover:bg-red-600 hover:shadow-lg px-2 py-1 text-md lg:px-4 lg:py-2 lg:text-base" id="login_btn">
                            ลงชื่อเข้าใช้
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}