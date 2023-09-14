import React, {useState} from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
export default function useProductView() {
  const slides = [
    {
      url: 'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/logitech-g-pro-x-superlight-wireless-gaming-mouse-white-icon.jpg'
    },
    {
      url: 'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/Logitech%20G%20Pro%20X%20Superlight%20Wireless%20Gaming%20Mouse.jpg'
    },
    {
      url: 'https://cdn.discordapp.com/attachments/696053498739163146/1147254999613722654/Logitech-G-Pro-X-Superlight-21.png'
    },
    {
      url: 'https://cdn.discordapp.com/attachments/696053498739163146/1147255092014223510/Logitech-G-Pro-X-Superlight-31.png'
    },
    {
      url: 'https://cdn.discordapp.com/attachments/696053498739163146/1147255223186882681/Logitech-G-Pro-X-Superlight-41.png'
    },
    {
      url: 'https://cdn.discordapp.com/attachments/696053498739163146/1147255245752246363/logitech-g-pro-x-superlight-wireless-gaming-mouse-white-lifestyle.png'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [amount, setAmount] = useState(1);

  const plusAmount = () => {
    setAmount(amount + 1);
  };

  const minusAmount = () => {
    if(amount > 1)
      setAmount(amount - 1);
  };
  
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length-1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div class='bg-[#fafafa] w-screen h-screen'>
      <div class='flex flex-col justify-center'>
        <div class='flex p-8'>
          <p class='font-Prompt text-sm px-11'>หน้าแรก > เมาส์และคีย์บอร์ด > เมาส์ > Logitech G Pro x Superlight</p>
        </div>
        <div class='flex justify-center gap-x-8 h-96'>
          <div class='flex justify-center h-full w-3/6 m-auto relative'>
            <div class='h-full w-3/6 relative group'>
              <div
                style={{backgroundImage: `url(${slides[currentIndex].url})`}} 
                className='w-full h-full rounded-lg bg-center bg-cover duration-500'
              >
              </div>
              {/* Left Arrow */}
              <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30}/>
              </div>
              {/* Right Arrow */}
              <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30}/>
              </div>
            </div>
          </div>
          <div class='flex flex-col justify-start box-border h-full w-3/6'>
            <p class='flex font-Prompt text-3xl font-bold'>G Pro x Superlight</p>
            <p class='flex py-4 font-Prompt text-sm'>Product ID: 123iihih3i123iu2</p>
            <p class='flex font-Prompt text-3xl text-[#a51d2d] font-bold'>฿4390</p>
            <div class='flex flex-row gap-x-3 py-3'>
              <p class='flex w-24 h-6'>สี</p>
              <button class='flex rounded w-24 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center'>ดำ</button>
              <button class='flex rounded w-24 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center'>เทา</button>
              <button class='flex rounded w-24 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center'>ขาว</button>
            </div>
            <div class='flex flex-row gap-x-3 py-3'>
              <p class='flex w-24 h-6'>Option</p>
              <button class='flex rounded w-24 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center'>A</button>
              <button class='flex rounded w-24 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center'>B</button>
            </div>
            <div class='flex flex-row gap-x-3 py-3'>
              <p class='flex w-24 h-6'>จำนวน</p>
              <p class='flex rounded w-28 h-6 bg-[#F1F1F1] justify-between items-center'>{amount}
                <div class='flex'>
                  <button class='flex rounded w-6 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center' onClick={minusAmount}>-</button>
                  <button class='flex rounded w-6 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center' onClick={plusAmount}>+</button>
                </div>
              </p>
              <p class='flex text-xs justify-center items-center'>มีสินค้าทั้งหมด 27 ชิ้น </p>
            </div>
            <div class='flex flex-row gap-x-3 py-3'>
              <img src='https://cdn.discordapp.com/attachments/1151803377659936778/1151803426443907112/heart-outline-thin-symbolic.png' alt='img'></img>
              <button class='flex rounded-full w-48 h-11 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center'>เพิ่มไปยังรถเข็น</button>
              <button class='flex rounded-full w-48 h-11 bg-[#A51D2D] hover:bg-[#841724] justify-center items-center text-white'>ซื้อสินค้า</button>
            </div>
          </div>
        </div>
        <div class='flex w-full h-full justify-center p-16'>
          <div class='flex flex-col w-3/4 text-sm items-start'>
            Product Description
            <p class='flex w-3/4 py-4 text-left'>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}