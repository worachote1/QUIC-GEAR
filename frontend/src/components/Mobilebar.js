import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
    {
        title: "หูฟังเกมมิ่ง",
        submenu: true,
        submenuItem: [
            { title: "หูฟัง True Wireless", path: "/product?search=Headphone/TrueWireless" },
            { title: "หูฟังไร้สาย & หูฟังบลูทูธ", path: "/product?search=Headphone/Wireless" },
            { title: "หูฟังครอบหู & แนบหู", path: "/product?search=Headphone/Fullsize" },
            { title: "หูฟัง In Ear", path: "/product?search=Headphone/InEar" },
            { title: "หูฟัง EarBud", path: "/product?search=Headphone/Earbud" },
            { title: "SoundCard", path: "/product?search=Headphone/SoundCard" },
            { title: "อุปกรณ์เสริมหูฟัง", path: "/product?search=Headphone/Accessory" }
        ],
    },
    {
        title: "เมาส์เกมมิ่ง",
        submenu: true,
        submenuItem: [
            { title: "เมาส์เกมมิ่ง", path: "/product?search=Mouse/Mouse" },
            { title: "แผ่นรองเมาส์", path: "/product?search=Mouse/Pad" },
            { title: "อุปกรณ์เสริมเมาส์", path: "/product?search=Mouse/Accessory" },
        ],
    },
    {
        title: "คีย์บอร์ดเกมมิ่ง",
        submenu: true,
        submenuItem: [
            { title: "คีย์บอร์ด RubberDome", path: "/product?search=Keyboard/RubberDome" },
            { title: "คีย์บอร์ด Mechanical", path: "/product?search=Keyboard/Mechanical" },
            { title: "ที่่รองข้อมือคีย์บอร์ดเกมมิ่ง", path: "/product?search=Keyboard/WristRest" },
        ],
    },
    {
        title: "อุปกรณ์สตรีมเกม",
        submenu: true,
        submenuItem: [
            { title: "กล้อง Webcam", path: "/product?search=Streaming/Webcam" },
            { title: "Microphone", path: "/product?search=Streaming/Microphone" },
            { title: "Accessory", path: "/product?search=Streaming/Accessory" }],
    },
    {
        title: "โต๊ะ & เก้าอี้เกมมิ่ง",
        submenu: true,
        submenuItem: [
            { title: "โต๊ะเกมมิ่ง", path: "/product?search=Table&Chair/Table" },
            { title: "เก้าอี้เกมมิ่ง", path: "/product?search=Table&Chair/Chair" }],
    },
];

export default function Mobilebar() {
    const [open, setOpen] = useState(false);
    const [userRole, setUserRole] = useState("admin"); {/*guest,user,admin*/ }
    const [profileMenuActive, setProfileMenuActive] = useState(false);
    const [submenuStates, setSubmenuStates] = useState(
        categories.map((menu) => ({
            submenuOpen: false,
        }))
    );
    const clickProfileDropdown = () => {
        setProfileMenuActive(!profileMenuActive);
    };
    return (
        <div>
            <div>
                <div
                    className={`fixed top-20 md:top-10 mt-6 bg-red-800/90 h-screen pt-5 pt-8 w-72 duration-300 ${open ? "opacity-100 lg:hidden" : "opacity-0 invisible lg:hidden"}`}
                >
                    <ul className="pt-2">
                        {categories.map((menu, index) => (
                            <>
                                <li
                                    key={index}
                                    className="text-white text-md flex items-center gap-x-4 cursor-pointer p-2 hover:bg-red-700 rounded-md mt-2"
                                    onClick={() => {
                                        const updatedSubmenuStates = [...submenuStates];
                                        updatedSubmenuStates[index].submenuOpen =
                                            !updatedSubmenuStates[index].submenuOpen;
                                        setSubmenuStates(updatedSubmenuStates);
                                    }}
                                >
                                    <span>
                                        {menu.title === "หูฟังเกมมิ่ง" ? (
                                            <i class="fa-solid fa-headset text-2xl block float-left"></i>
                                        ) : menu.title === "เมาส์เกมมิ่ง" ? (
                                            <i class="fa-solid fa-computer-mouse text-2xl block float-left"></i>
                                        ) :
                                            menu.title === "คีย์บอร์ดเกมมิ่ง" ? (
                                                <i class="fa-solid fa-keyboard text-2xl block float-left"></i>
                                            ) :
                                            menu.title === "อุปกรณ์สตรีมเกม" ? (
                                                <i class="fa-solid fa-video text-2xl block float-left"></i>
                                              ) :
                                                menu.title === "โต๊ะ & เก้าอี้เกมมิ่ง" ? (
                                                    <i class="fa-solid fa-gamepad text-2xl block float-left"></i>
                                                ) :
                                                    (
                                                        <i class="fa-solid fa-question text-2xl block float-left"></i>
                                                    )}
                                    </span>
                                    <span
                                        className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"
                                            } whitespace-nowrap`}
                                    >
                                        {menu.title}
                                    </span>
                                    {menu.submenu && <i class="fa-solid fa-chevron-down"></i>}
                                </li>
                                {menu.submenu && submenuStates[index].submenuOpen && open && (
                                    <ul>
                                        {menu.submenuItem.map((submenuItem, subIndex) => (
                                            <li
                                                key={subIndex}
                                                className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-red-700 rounded-md mt-2 px-5"
                                            >
                                                <Link to={submenuItem.path}>{submenuItem.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-28">
                <div className="fixed bottom-0 left-0 w-full bg-white h-20 py-5 px-8 text-white border-2 lg:hidden">
                    <div className="flex justify-center md:justify-between items-center">
                        <button
                            className="btn text-red-600 mr-2 hover:bg-red-700/30 rounded-full"
                            id="catalogue_m_btn" onClick={() => {
                                setOpen(!open);
                            }}
                        >
                            <i className="fa-solid fa-bars" style={{ fontSize: "1.25rem" }}></i>
                        </button>
                        <Link to="/favorite"
                            className="btn text-red-600 mr-2 hover:bg-red-700/30 rounded-full"
                            id="fav_m_btn"
                        >
                            <i className="fas fa-heart" style={{ fontSize: "1.25rem" }}></i>
                        </Link>
                        <Link to="/auction"
                            className="btn text-red-600 mr-2  hover:bg-red-700/30 rounded-full"
                            id="auction_m_btn"
                        >
                            <i
                                className="fa-solid fa-building-columns"
                                style={{ fontSize: "1.25rem" }}
                            ></i>
                        </Link>
                        <Link to="/cart"
                            className="btn text-red-600 mr-2  hover:bg-red-700/30 rounded-full"
                            id="cart_m_btn"
                        >
                            <i
                                className="fas fa-cart-shopping"
                                style={{ fontSize: "1.25rem" }}
                            ></i>
                        </Link>
                        {userRole === "admin" && (
                            <Link to="/admin" className="btn text-red-600 mr-2  hover:bg-red-700/30 rounded-full" id="admin_btn">
                                <i className="fa-solid fa-screwdriver-wrench " style={{ fontSize: "1.25rem" }}></i>
                            </Link>
                        )}
                        {userRole === "user" || userRole === "admin" ? (
                            <div className="relative group">
                                <div
                                    className="flex items-center cursor-pointer relative"
                                    onClick={clickProfileDropdown}
                                >
                                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                                        <img
                                            src="https://www.gzone-conan.com/wp-content/uploads/2019/05/25262960-6716-11e9-b3c5-246e963a41ed_03.jpg"
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                </div>
                                {profileMenuActive && (
                                    <div
                                        className="absolute right-0 bottom-16 w-64 bg-white rounded-md shadow-lg"
                                    >
                                        <div className="py-2">
                                            <div className="p-3 flex items-center justify-between">
                                                <div className="text-left">
                                                    <p className="text-m text-gray-700 font-medium truncate overflow-hidden w-44">Username</p>
                                                </div>

                                                <span className="text-s bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                                    {userRole}
                                                </span>

                                            </div>
                                            <div className="p-3 border-b flex items-center justify-between text-left">
                                                <p className="text-m text-gray-700 font-medium">QuicCoins <i className="fas fa-coins mr-1 text-l"></i></p>
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
                            <Link to="/login"
                                className="btn text-red-600 mr-2  hover:bg-red-700/30 rounded-full"
                                id="profile_m_btn"
                            >
                                <i className="fa-solid fa-user" style={{ fontSize: "1.25rem" }}></i>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}