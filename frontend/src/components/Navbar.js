import React from "react";

const Navbar = () => {
    return (
        <nav className="flex bg-[#ffffff] border-2 border-[#ffffff] border-b-[#e5e5e5] justify-between items-center h-16 px-4 mx-auto text-white">
            
            <div className="w-full md:w-1/2 text-center md:text-left">
                <div style={{ display: "inline-block", cursor: "pointer" }}>
                    <img
                        src="https://media.discordapp.net/attachments/1008605866624303204/1146757863205769276/quicgear.png?width=1440&height=288"
                        alt="QUICGEAR Logo"
                        style={{ maxWidth: "280px", maxHeight: "100px" }}
                    />
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
                    />
                </div>
            </div>

            <div className="w-full md:w-1/2 mt-4 md:mt-0 text-center md:text-right hidden lg:block">
                <div className="md:ml-auto flex justify-center md:justify-end">
                    <i className="fas fa-cart-shopping" style={{ fontSize: '1.25rem' }}></i>
                </div>
            </div>
    
        </nav>
    );
};

export default Navbar;