import { useState } from "react";
import { Link } from "react-router-dom";
import { genNavBarCategories } from "../util/navBarModule";

export default function Sidebar() {

  const path = window.location.pathname;
  const pathSegments = path.split('/');
  // Get the first non-empty path segment
  const firstPathComponent = pathSegments.find(segment => segment.length > 0);
  const categories = genNavBarCategories(firstPathComponent);

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
                    <Link to={submenuItem.path}>
                      <li
                        key={subIndex}
                        className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-red-700 rounded-md mt-2 px-5"
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
