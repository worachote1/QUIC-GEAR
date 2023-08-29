import React from "react";
import { BsCart4 } from "react-icons/bs";

const Navbar = () => {
    return (
        <div className="flex sticky top-0 bg-[#1B2852] justify-between items-center h-16 px-4 mx-auto text-white">
            <h1 className="text-3xl font-bold text-[#3BDFEB]">QUIC GEAR</h1>
            <ul className="flex">
                <li className="text-3xl float-left flex items-center cursor-pointer hover:text-slate-600"> <BsCart4/> </li>
                <li className='text-sm items-center pb-2 gap-x-4 w-32 pt-2 rounded-full bg-[#D43665] hover:bg-[#BA1D4C] cursor-pointer ml-5 mr-5'>ลงชื่อเข้าใช้</li>
            </ul>
        </div>
    );
};

export default Navbar;