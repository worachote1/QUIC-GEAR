import React from "react";
import { BsFillMouse2Fill, BsKeyboardFill, BsHeadset, BsFillCameraReelsFill } from "react-icons/bs";
import { GiOfficeChair } from "react-icons/gi";
import { BiSolidMicrophone } from "react-icons/bi";

const Menu = ({ open }) => {

    const Menus = [
        { title: "Mouse", icon: <BsFillMouse2Fill />},
        { title: "Keyboard", icon: <BsKeyboardFill />},
        { title: "Microphone", icon: <BiSolidMicrophone />},
        { title: "Headgear", icon: <BsHeadset />},
        { title: "Streaming Camera", icon: <BsFillCameraReelsFill />},
        { title: "Gaming Chair", icon: <GiOfficeChair />},
    ];

    return (
        <div>
            <ul className={`${open ? "pt-10" : "pt-0"}`}>
                {Menus.map((menu, index) => (
                    <>
                        <div className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-orange-700 rounded-md mb-2'>
                            <li key={index}>
                            <span className='text-2xl block float-left'>
                                {menu.icon}
                            </span>
                            <span className={`text-base font-medium flex-1 ${!open && "hidden"} ml-5`}>
                                {menu.title}
                            </span>
                            </li>
                        </div>
                    </>
                ))}
          </ul>
        </div>
    );
};

export default Menu;