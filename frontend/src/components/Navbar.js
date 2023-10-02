import React, { useEffect, useState } from "react";
import { Route, Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [userRole, setUserRole] = useState("admin"); {/*guest,user,admin*/ }
    const [profileMenuActive, setProfileMenuActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const clickProfileDropdown = () => {
        setProfileMenuActive(!profileMenuActive);
    };

    return (
        <div className="sticky top-0 z-40 bg-white">
            <nav className="flex flex-col md:flex-row items-center p-4 border-b-2 border-[#dbdbdb] shadow-md">
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
                            className="pl-10 px-4 py-2 rounded-lg w-full focus:outline-1 text-black-300 placeholder-gray-500 bg-[#ebebeb]"
                            placeholder="ค้นหาสินค้าที่ต้องการ"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const currentURL = window.location.pathname;
                                    const searchPath = currentURL === "/auction" ? "/auction" : "/product";
                                    navigate(`${searchPath}?search=${encodeURIComponent(searchQuery)}`);
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2 mt-4 md:mt-0 text-center md:text-right hidden lg:block">
                    <div className="md:ml-auto flex justify-center items-center md:justify-end">

                        <Link to="/auction" className="btn border-white text-black rounded-full hover:bg-[#d8d8d8] mr-2" id="auction_btn">
                            <i className="fa-solid fa-building-columns" style={{ fontSize: '1.25rem' }}></i>
                        </Link>
                        <Link to="/favorite" className="btn border-white text-black rounded-full hover:bg-[#d8d8d8] mr-2" id="fav_btn">
                            <i className="fas fa-heart" style={{ fontSize: '1.25rem' }}></i>
                        </Link>
                        <Link to="/cart" className="btn border-white text-black rounded-full hover:bg-[#d8d8d8] mr-2" id="cart_btn">
                            <i className="fas fa-cart-shopping" style={{ fontSize: '1.25rem' }}></i>
                        </Link>
                        {userRole === "admin" && (
                            <Link to="/admin" className="btn border-white text-black rounded-full hover:bg-[#d8d8d8] mr-2">
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
                                            // https://www.gzone-conan.com/wp-content/uploads/2019/05/25262960-6716-11e9-b3c5-246e963a41ed_03.jpg   
                                            src="https://media.istockphoto.com/id/1298261537/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%A2%E0%B8%B6%E0%B8%94%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B9%88%E0%B8%B2.jpg?s=612x612&w=0&k=20&c=YlnFFQuxqyOE9gfuj7eKaHl0bjRpn22p2PPlc91YA48="
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

                                                <span className="text-s font-medium bg-red-100 text-[#a51d2d] px-2 py-1 rounded-full">
                                                    {userRole}
                                                </span>

                                            </div>
                                            <div className="p-3 border-b flex items-center justify-between text-left">
                                                <p className="text-m text-gray-700 font-medium">QuicCoins <i className="fas fa-coins mr-1 text-l"></i></p>
                                                <p className="text-m text-gray-700 font-medium truncate overflow-hidden">Coins Value</p>
                                            </div>

                                            <Link to="/topup" className="block p-3 text-sm font-medium text-gray-600 hover:bg-gray-100 text-left">
                                                เติมเงิน
                                            </Link>
                                            <Link to="/my-orders" className="block p-3 text-sm font-medium text-gray-600 hover:bg-gray-100 text-left">
                                                การซื้อของฉัน
                                            </Link>
                                            <Link to="/edit-profile" className="block p-3 text-sm font-medium text-gray-600 hover:bg-gray-100 text-left">
                                                การตั้งค่า
                                            </Link>
                                            <div className="text-center mt-2">
                                                <button
                                                    className="p-2 text-sm text-white bg-[#e01b24] rounded-xl hover:bg-red-700  w-60"
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
                            <button className="btn bg-[#a51d2d] text-white hover:bg-red-600 hover:shadow-lg px-2 py-1 text-md lg:px-4 lg:py-2 lg:text-base" id="login_btn">
                                ลงชื่อเข้าใช้
                            </button>
                        )}



                    </div>
                </div>
            </nav>
        </div>
    );
}