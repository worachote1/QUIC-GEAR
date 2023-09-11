import { useState } from "react";
import { Link , useLocation} from "react-router-dom";

const categories = [
  {
    title: "หูฟังเกมมิ่ง",
    submenu: true,
    submenuItem: [
      { title: "หูฟัง True Wireless", path: "?search=Headphone/TrueWireless" },
      { title: "หูฟังไร้สาย & หูฟังบลูทูธ", path: "?search=Headphone/Wireless" },
      { title: "หูฟังครอบหู & แนบหู", path: "?search=Headphone/Fullsize" },
      { title: "หูฟัง In Ear", path: "?search=Headphone/InEar" },
      { title: "หูฟัง EarBud", path: "?search=Headphone/Earbud" },
      { title: "SoundCard", path: "?search=Headphone/SoundCard" },
      { title: "อุปกรณ์เสริมหูฟัง", path: "?search=Headphone/Accessory" }
    ],
  },
  {
    title: "เมาส์เกมมิ่ง",
    submenu: true,
    submenuItem: [
      { title: "เมาส์เกมมิ่ง", path: "?search=Mouse/Mouse" },
      { title: "แผ่นรองเมาส์", path: "?search=Mouse/Mousepad" },
      { title: "อุปกรณ์เสริมเมาส์", path: "?search=Mouse/Accessory" },
    ],
  },
  {
    title: "คีย์บอร์ดเกมมิ่ง",
    submenu: true,
    submenuItem: [
      { title: "คีย์บอร์ด RubberDome", path: "?search=Keyboard/RubberDome" },
      { title: "คีย์บอร์ด Mechanical", path: "?search=Keyboard/Mechanical" },
      { title: "ที่่รองข้อมือคีย์บอร์ดเกมมิ่ง", path: "?search=Keyboard/WristRest" },
    ],
  },
  {
    title: "อุปกรณ์สตรีมเกม",
    submenu: true,
    submenuItem: [
      { title: "กล้อง Webcam", path: "?search=Streaming/Webcam" },
      { title: "Microphone", path: "?search=Streaming/Microphone" },
      { title: "Accessory", path: "?search=Streaming/Accessory" }],
  },
  {
    title: "โต๊ะ & เก้าอี้เกมมิ่ง",
    submenu: true,
    submenuItem: [
      { title: "โต๊ะเกมมิ่ง", path: "?search=TableAndChair/Table" },
      { title: "เก้าอี้เกมมิ่ง", path: "?search=TableAndChair/Chair" }],
  },
];

export default function Sidebar() {
  const currentPath = useLocation().pathname;
  const [open, setOpen] = useState(true);
  const [submenuStates, setSubmenuStates] = useState(
    categories.map((menu) => ({
      submenuOpen: false,
    }))
  );

  return (
    <div>
      <div
        className={`fixed bg-[#ebebeb] border-r-4 border-[dbdbdb] h-screen pt-5 pt-8 ${open ? "w-72" : "w-20"
          } duration-300`}
      >
        <i
          className={`fa-solid fa-caret-left bg-white text-black-500 text-3xl rounded-full absolute -right-5 top-1 w-10 border-2 border-slate-500 text-center cursor-pointer ${!open ? "rotate-180" : ""
            }`}
          onClick={() => { setOpen(!open); }}

        ></i>
        <ul className="pt-2">
          {categories.map((menu, index) => (
            <>
              <li
                key={index}
                className="text-black text-md flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#d8d8d8] rounded-md mt-2"
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
                    <Link to={currentPath === "/auction" ? `/auction${submenuItem.path}` : `/product${submenuItem.path}`}>
                    <li
                      key={subIndex}
                      className="text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#d8d8d8] rounded-md mt-2 px-5"
                    >
                      {submenuItem.title}
                    </li>
                    </Link>
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
