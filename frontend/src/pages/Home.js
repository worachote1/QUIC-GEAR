import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faDotCircle } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const slides = [
    {
      url: 'https://www.gump.in.th/uploaded_files/images/Logitech/G%20Pro%20Wrieless%20-%2001.jpg',
    },
    {
      url: 'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/09/Product/Glorious%20GMMK%20Pro%20Barebones%20ANSI%20Layout%203.jpg',
    },
    {
      url: 'https://media.flixfacts.com/inpage/logitech/g-pro/g-pro-x/banner.jpg',
    },

    {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(slideInterval);
    };
  }, [currentIndex]);

  return (
    <body className='flex h-screen'>
      <div className='flex hidden lg:block'>
        <Sidebar />
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex'>
          <div className='mx-auto max-w-[1400px] h-[500px] w-full py-16 px-10 relative group hidden md:block'>
            <div
              style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
              className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
            ></div>
            {/* Left Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-12 text-1xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
              <FontAwesomeIcon icon={faChevronLeft} onClick={prevSlide} size='2x' />
            </div>
            {/* Right Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-12 text-1xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
              <FontAwesomeIcon icon={faChevronRight} onClick={nextSlide} size='2x' />
            </div>
          </div>
        </div>

        <div className='hidden md:flex justify-center flex-row md:items-center md:mt-[-30px]'>
          <div className='bg-gray-200 w-full max-w-[410px] h-[100px] rounded-md p-4 my-2 mx-5 flex items-center justify-center hover:bg-red-700/40 shadow-md transition duration-300'>
            <p className='text-2xl font-semibold mb-2 md:text-left'>สินค้าขายดี</p>
          </div>
          <div className='bg-gray-200 w-full max-w-[410px] h-[100px] rounded-md p-4 my-2 mx-5 flex items-center justify-center hover:bg-red-700/40 shadow-md transition duration-300'>
            <p className='text-2xl font-semibold mb-2 md:text-left'>สินค้าใหม่</p>
          </div>
          <div className='bg-gray-200 w-full max-w-[410px] h-[100px] rounded-md p-4 my-2 mx-5 flex items-center justify-center hover:bg-red-700/40 shadow-md transition duration-300'>
            <p className='text-2xl font-semibold mb-2 md:text-left'>ประมูลสินค้ามือสอง</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
      
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">name</h2>
        <p className="text-gray-700 mb-2">$</p>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">
            ★ 
          </span>
          <span className="text-gray-500">Rating</span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          View Details
        </button>
      </div>
    </div>
 

    
    </body>
  );
}