export const brand = ["Razer", "Nubwo", "Logitech", "Signo", "SteelSeries", "HyperX", "Corsair", "Neolution E-sport", "Keychron", "Zowie"];

export const type = ["Headphone", "Mouse", "Keyboard", "Streaming", "Table&Chair"];

export const status = ["completed", "waiting approved", "in progress", "declined"]

export const auctionSortType = ["Newest","Oldest","Bid: Hight-Low","Bid: Low-Hight"]

export const SidebarAuctionCategories = [
    {
      title: "หูฟังเกมมิ่ง",
      submenu: true,
      submenuItem: [
        { title: "หูฟัง True Wireless", path: "/auction?search=Headphone/TrueWireless" },
        { title: "หูฟังไร้สาย & หูฟังบลูทูธ", path: "/auction?search=Headphone/Wireless" },
        { title: "หูฟังครอบหู & แนบหู", path: "/auction?search=Headphone/Fullsize" },
        { title: "หูฟัง In Ear", path: "/auction?search=Headphone/InEar" },
        { title: "หูฟัง EarBud", path: "/auction?search=Headphone/Earbud" },
        { title: "SoundCard", path: "/auction?search=Headphone/SoundCard" },
        { title: "อุปกรณ์เสริมหูฟัง", path: "/auction?search=Headphone/Accessory" }
      ],
    },
    {
      title: "เมาส์เกมมิ่ง",
      submenu: true,
      submenuItem: [
        { title: "เมาส์เกมมิ่ง", path: "/auction?search=Mouse/Mouse" },
        { title: "แผ่นรองเมาส์", path: "/auction?search=Mouse/Pad" },
        { title: "อุปกรณ์เสริมเมาส์", path: "/auction?search=Mouse/Accessory" },
      ],
    },
    {
      title: "คีย์บอร์ดเกมมิ่ง",
      submenu: true,
      submenuItem: [
        { title: "คีย์บอร์ด RubberDome", path: "/auction?search=Keyboard/RubberDome" },
        { title: "คีย์บอร์ด Mechanical", path: "/auction?search=Keyboard/Mechanical" },
        { title: "ที่่รองข้อมือคีย์บอร์ดเกมมิ่ง", path: "/auction?search=Keyboard/WristRest" },
      ],
    },
    {
      title: "อุปกรณ์สตรีมเกม",
      submenu: true,
      submenuItem: [
        { title: "กล้อง Webcam", path: "/auction?search=Streaming/Webcam" },
        { title: "Microphone", path: "/auction?search=Streaming/Microphone" },
        { title: "Accessory", path: "/auction?search=Streaming/Accessory" }],
    },
    {
      title: "โต๊ะ & เก้าอี้เกมมิ่ง",
      submenu: true,
      submenuItem: [
        { title: "โต๊ะเกมมิ่ง", path: "/auction?search=Table&Chair/Table" },
        { title: "เก้าอี้เกมมิ่ง", path: "/auction?search=Table&Chair/Chair" }],
    },
  ]; 