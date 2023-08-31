import React, { useEffect, useState } from "react";
import { Route, Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [userRole, setUserRole] = useState("admin"); {/*guest,user,admin*/}
    const [profileMenuActive, setProfileMenuActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const clickProfileDropdown = () => {
        setProfileMenuActive(!profileMenuActive);
    };

    return (
        <div className="sticky top-0 z-40 bg-white">
            <nav className="flex flex-col md:flex-row items-center p-4 shadow-md">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <div style={{ display: "inline-block", cursor: "pointer" }}>
                        <Link to="">
                            <img
                                src="https://media.discordapp.net/attachments/1008605866624303204/1146757863205769276/quicgear.png?width=1440&height=288"
                                alt="QUICGEAR Logo"
                                style={{ maxWidth: "280px", maxHeight: "100px" }}
                            />
                        </Link>
                    </div>
                </div>

                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                    <div className="relative">
                        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                        <input
                            type="text"
                            id="search_field"
                            className="pl-10 px-4 py-2 rounded-lg w-full focus:outline-1 text-black-300 placeholder-gray-500 bg-gray-200"
                            placeholder="ค้นหาสินค้าที่ต้องการ"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    navigate(`/product?search=${encodeURIComponent(searchQuery)}`);
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2 mt-4 md:mt-0 text-center md:text-right hidden lg:block">
                    <div className="md:ml-auto flex justify-center md:justify-end">

                        <Link to="/auction" className="btn border-white text-black rounded-full hover:bg-red-700/30 mr-2" id="auction_btn">
                            <i className="fa-solid fa-building-columns" style={{ fontSize: '1.25rem' }}></i>
                        </Link>
                        <Link to="/favorite" className="btn border-white text-black rounded-full hover:bg-red-700/30 mr-2" id="fav_btn">
                            <i className="fas fa-heart" style={{ fontSize: '1.25rem' }}></i>
                        </Link>
                        <Link to="/cart" className="btn border-white text-black rounded-full hover:bg-red-700/30 mr-2" id="cart_btn">
                            <i className="fas fa-cart-shopping" style={{ fontSize: '1.25rem' }}></i>
                        </Link>
                        {userRole === "admin" && (
                            <Link to="/admin" className="btn border-white text-black rounded-full hover:bg-red-700/30 mr-2">
                                <i className="fa-solid fa-screwdriver-wrench " style={{ fontSize: '1.25rem' }}></i>
                            </Link>
                        )}
                        {userRole === "user" || userRole === "admin" ? (
                            <div className="relative group">
                                <div
                                    className="flex items-center cursor-pointer relative"
                                    onMouseEnter={() => setProfileMenuActive(true)}
                                    onMouseLeave={() => setProfileMenuActive(false)}
                                >
                                    <Link to="/edit-profile" className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                                        <img
                                            src="https://www.gzone-conan.com/wp-content/uploads/2019/05/25262960-6716-11e9-b3c5-246e963a41ed_03.jpg"
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </Link>

                                </div>
                                {profileMenuActive && (
                                    <div
                                        className="absolute right-0 top-10 w-64 bg-white rounded-md shadow-lg"
                                        onMouseEnter={() => setProfileMenuActive(true)}
                                        onMouseLeave={() => setProfileMenuActive(false)}
                                    >
                                        <div className="py-2">
                                            <div className="p-3 flex items-center justify-between">
                                                <div className="text-left">
                                                    <p className="text-m font-medium truncate overflow-hidden w-44">Username</p>
                                                </div>

                                                <span className="text-s bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                                    {userRole}
                                                </span>

                                            </div>
                                            <div className="p-3 border-b flex items-center justify-between text-left">
                                                <p className="text-m font-medium">QuicCoins <i className="fas fa-coins mr-1 text-l"></i></p>
                                                <p className="text-m text-gray-700 font-medium truncate overflow-hidden">Coins Value</p>
                                            </div>

                                            <Link to="/topup" className="block p-3 text-sm font-medium text-gray-600 hover:bg-gray-100 text-left">
                                                Topup
                                            </Link>
                                            <Link to="/my-orders" className="block p-3 text-sm font-medium text-gray-600 hover:bg-gray-100 text-left">
                                                My Orders
                                            </Link>
                                            <Link to="/edit-profile" className="block p-3 text-sm font-medium text-gray-600 hover:bg-gray-100 text-left">
                                                Edit Profile
                                            </Link>
                                            <div className="text-center mt-2">
                                                <button
                                                    className="p-2 text-sm text-white bg-red-500 rounded-xl hover:bg-red-600 w-60"
                                                    onClick={() => setUserRole("guest")}
                                                >
                                                    ลงชื่อออก
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                        ) : (
                            <button className="btn bg-red-700/90 text-white hover:bg-red-600 hover:shadow-lg px-2 py-1 text-md lg:px-4 lg:py-2 lg:text-base" id="login_btn">
                                ลงชื่อเข้าใช้
                            </button>
                        )}



                    </div>
                </div>
            </nav>
        </div>
    );
}