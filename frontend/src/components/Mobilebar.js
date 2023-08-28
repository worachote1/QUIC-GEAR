import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "หูฟังเกมมิ่ง",
    submenu: true,
    submenuItem: [
      { title: "หูฟัง True Wireless" },
      { title: "หูฟังไร้สาย & หูฟังบลูทูธ" },
      { title: "หูฟังครอบหู & แนบหู" },
      { title: "หูฟัง In Ear" },
      { title: "หูฟัง EarBud" },
      { title: "SoundCard" },
    ],
  },
  {
    title: "เมาส์เกมมิ่ง",
    submenu: true,
    submenuItem: [
      { title: "เมาส์เกมมิ่ง" },
      { title: "แผ่นรองเมาส์" },
      { title: "อุปกรณ์เสริมเมาส์" },
    ],
  },
  {
    title: "คีย์บอร์ดเกมมิ่ง",
    submenu: true,
    submenuItem: [
      { title: "คีย์บอร์ดเกมมิ่ง" },
      { title: "ที่่รองข้อมือคีย์บอร์ดเกมมิ่ง" },
    ],
  },
  {
    title: "โต๊ะ & เก้าอี้เกมมิ่ง",
    submenu: true,
    submenuItem: [{ title: "โต๊ะเกมมิ่ง" }, { title: "เก้าอี้เกมมิ่ง" }],
  },
];
export default function Mobilebar() {
  const [open, setOpen] = useState(false);
  const [submenuStates, setSubmenuStates] = useState(
    categories.map((menu) => ({
      submenuOpen: false,
    }))
  );
  return (
    <div>
      <div>
        <div
          className={`fixed top-20 md:top-10 bg-red-800/90 h-screen pt-5 pt-8 w-72 duration-300 ${
            open ? "opacity-100" : "opacity-0 invisible"
          }`}
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
                    <i class="fa-solid fa-gamepad text-2xl block float-left"></i>
                  </span>
                  <span
                    className={`text-base font-medium flex-1 duration-200 ${
                      !open && "hidden"
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
                        {submenuItem.title}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white h-20 py-5 px-8 text-white border-2" >
        <div className="flex justify-between items-center">
          <button
            className="btn text-red-600 mr-2 hover:bg-red-700/30 rounded-full"
            id="catalogue_m_btn"  onClick={() => {
                setOpen(!open);
              }} 
          >
            <i className="fa-solid fa-bars" style={{ fontSize: "1.25rem" }}></i>
          </button>
          <button
            className="btn text-red-600 mr-2 hover:bg-red-700/30 rounded-full"
            id="fav_m_btn" 
          >
            <i className="fas fa-heart" style={{ fontSize: "1.25rem" }}></i>
          </button>
          <button
            className="btn text-red-600 mr-2  hover:bg-red-700/30 rounded-full"
            id="auction_m_btn"
          >
            <i
              className="fa-solid fa-building-columns"
              style={{ fontSize: "1.25rem" }}
            ></i>
          </button>
          <button
            className="btn text-red-600 mr-2  hover:bg-red-700/30 rounded-full"
            id="cart_m_btn"
          >
            <i
              className="fas fa-cart-shopping"
              style={{ fontSize: "1.25rem" }}
            ></i>
          </button>
          <button
            className="btn text-red-600 mr-2  hover:bg-red-700/30 rounded-full"
            id="profile_m_btn"
          >
            <i className="fa-solid fa-user" style={{ fontSize: "1.25rem" }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
