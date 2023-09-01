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

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [submenuStates, setSubmenuStates] = useState(
    categories.map((menu) => ({
      submenuOpen: false,
    }))
  );

  return (
    <div>
      <div
        className={`fixed bg-red-800/90 h-screen pt-5 pt-8 ${open ? "w-72" : "w-20"
          } duration-300`}
      >
        <i
          className={`fa-solid fa-caret-left bg-white text-red-500 text-3xl rounded-full absolute -right-5 top-1 w-10 border-2 border-red-500 text-center cursor-pointer ${!open ? "rotate-180" : ""
            }`}
          onClick={() => { setOpen(!open); }}

        ></i>
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
                          <i class="fa-solid fa-chair text-2xl block float-left"></i>
                        ) : (
                          <i class="fa-solid fa-question text-2xl block float-left"></i>
                        )}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"
                    } whitespace-nowrap`}
                >
                  {menu.title}
                </span>
                {menu.submenu && (
                  <i
                    class="fa-solid fa-chevron-down"
                  ></i>
                )}
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
  );
}
