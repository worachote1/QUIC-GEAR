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
      <div class='flex-col justify-center'>
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
          <div class='flex-col justify-start box-border h-full w-3/6'>
            <p class='flex font-Prompt text-3xl font-bold'>G Pro x Superlight</p>
            <p class='flex py-4 font-Prompt text-sm'>Product ID: 123iihih3i123iu2</p>
            <p class='flex font-Prompt text-3xl text-[#a51d2d] font-bold'>฿4390</p>
          </div>
        </div>
      </div>
    </div>
  )
}

//<img class='box-border h-full w-3/6 drop-shadow-xl rounded-lg' src='https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/Logitech-G-Pro-X-Superlight-2(1).jpg'></img>