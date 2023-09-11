// auction,product use the same navBar categories
export const genNavBarCategories = (firstPathComponent) => {
  const NavBarCtegories = [
    {
      title: "หูฟังเกมมิ่ง",
      submenu: true,
      submenuItem: [
        { title: "หูฟัง True Wireless", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Headphone/TrueWireless` },
        { title: "หูฟังไร้สาย & หูฟังบลูทูธ", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Headphone/Wireless` },
        { title: "หูฟังครอบหู & แนบหู", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Headphone/Fullsize` },
        { title: "หูฟัง In Ear", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Headphone/InEar` },
        { title: "หูฟัง EarBud", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Headphone/Earbud` },
        { title: "SoundCard", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Headphone/SoundCard` },
        { title: "อุปกรณ์เสริมหูฟัง", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Headphone/Accessory` }
      ],
    },
    {
      title: "เมาส์เกมมิ่ง",
      submenu: true,
      submenuItem: [
        { title: "เมาส์เกมมิ่ง", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Mouse/Mouse` },
        { title: "แผ่นรองเมาส์", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Mouse/Pad` },
        { title: "อุปกรณ์เสริมเมาส์", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Mouse/Accessory` },
      ],
    },
    {
      title: "คีย์บอร์ดเกมมิ่ง",
      submenu: true,
      submenuItem: [
        { title: "คีย์บอร์ด RubberDome", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Keyboard/RubberDome` },
        { title: "คีย์บอร์ด Mechanical", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Keyboard/Mechanical` },
        { title: "ที่่รองข้อมือคีย์บอร์ดเกมมิ่ง", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Keyboard/WristRest` },
      ],
    },
    {
      title: "อุปกรณ์สตรีมเกม",
      submenu: true,
      submenuItem: [
        { title: "กล้อง Webcam", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Streaming/Webcam` },
        { title: "Microphone", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Streaming/Microphone` },
        { title: "Accessory", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Streaming/Accessory` }],
    },
    {
      title: "โต๊ะ & เก้าอี้เกมมิ่ง",
      submenu: true,
      submenuItem: [
        { title: "โต๊ะเกมมิ่ง", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Table&Chair/Table` },
        { title: "เก้าอี้เกมมิ่ง", path: `/${(firstPathComponent) ? firstPathComponent : "product"}?search=Table&Chair/Chair` }],
    },
  ];
  return [...NavBarCtegories]
}

