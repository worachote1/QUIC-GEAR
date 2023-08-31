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
    <div className='flex'>
      <div className='flex h-screen hidden lg:block shadow z-50'>
        <Sidebar />
      </div>

      <div className='flex flex-col flex-1 lg:ml-[70px]'>
        <div className='flex'>
          <div className='mx-auto max-w-[1350px] h-[500px] w-full py-16 px-10 relative group hidden md:block'>
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
          <div className='bg-gray-200 w-full max-w-[350px] h-[100px] rounded-md p-4 my-2 mx-5 flex items-center justify-center hover:bg-red-700/40 shadow-md transition duration-300'>
            <p className='text-2xl font-semibold mb-2 md:text-left'>สินค้าขายดี</p>
          </div>
          <div className='bg-gray-200 w-full max-w-[350px] h-[100px] rounded-md p-4 my-2 mx-5 flex items-center justify-center hover:bg-red-700/40 shadow-md transition duration-300'>
            <p className='text-2xl font-semibold mb-2 md:text-left'>สินค้าใหม่</p>
          </div>
          <div className='bg-gray-200 w-full max-w-[350px] h-[100px] rounded-md p-4 my-2 mx-5 flex items-center justify-center hover:bg-red-700/40 shadow-md transition duration-300'>
            <p className='text-2xl font-semibold mb-2 md:text-left'>ประมูลสินค้ามือสอง</p>
          </div>
        </div>


        {/* Product Card */}
        <div className='md:flex justify-center items-center mt-8'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-2'>
            {/* Product Card 1 */}
            <div className='bg-white lg:w-[210px] md:w-[210px] w-[170px] rounded-md p-4 my-2 mx-2 md:mx-4 lg:mx-4 relative shadow-md transition duration-300'>
              <div className='relative'>
                <img src='https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/logitech-g-pro-x-superlight-wireless-gaming-mouse-white-icon.jpg' alt='Product 1' className='w-full h-[200px] object-cover mb-2' />

                {/* Hot Badge */}
                <div className='bg-red-500 text-white absolute top-0 left-0 mt-1 ml-2 px-2 py-1 rounded-full text-xs text-center'>
                  สินค้าขายดี
                </div>
              </div>
              <p className='text-xl font-semibold mb-1'>G Pro X Superlight</p>
              <p className='text-lg font-medium mb-1'>4,990 บาท</p>

              <div className='flex items-center'>
                <div className='text-yellow-400 mr-1'>
                  ★★★★☆
                </div>
                <p className='text-sm text-gray-500'>(245)</p>
              </div>
              <button className='mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300'>
                View Details
              </button>
            </div>

            {/* Product Card 1 2row */}
            <div className='bg-white lg:w-[210px] md:w-[210px] w-[170px] rounded-md p-4 my-2 mx-2 md:mx-4 lg:mx-4 relative shadow-md transition duration-300'>
              <div className='relative'>
                <img src='https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/logitech-g-pro-x-superlight-wireless-gaming-mouse-white-icon.jpg' alt='Product 1' className='w-full h-[200px] object-cover mb-2' />

                {/* Hot Badge */}
                <div className='bg-red-500 text-white absolute top-0 left-0 mt-1 ml-2 px-2 py-1 rounded-full text-xs text-center'>
                  สินค้าขายดี
                </div>
              </div>
              <p className='text-xl font-semibold mb-1'>G Pro X Superlight</p>
              <p className='text-lg font-medium mb-1'>4,990 บาท</p>

              <div className='flex items-center'>
                <div className='text-yellow-400 mr-1'>
                  ★★★★☆
                </div>
                <p className='text-sm text-gray-500'>(245)</p>
              </div>
              <button className='mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300'>
                View Details
              </button>
            </div>


            {/* Product Card 2 */}
            <div className='bg-white lg:w-[210px] md:w-[210px] w-[170px] rounded-md p-4 my-2 mx-2 md:mx-4 lg:mx-4 relative shadow-md transition duration-300'>
              <div className='relative'>
                <img src='https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/logitech-g-pro-x-superlight-wireless-gaming-mouse-white-icon.jpg' alt='Product 1' className='w-full h-[200px] object-cover mb-2' />

                {/* Hot Badge */}
                <div className='bg-red-500 text-white absolute top-0 left-0 mt-1 ml-2 px-2 py-1 rounded-full text-xs text-center'>
                  สินค้าขายดี
                </div>
              </div>
              <p className='text-xl font-semibold mb-1'>G Pro X Superlight</p>
              <p className='text-lg font-medium mb-1'>4,990 บาท</p>

              <div className='flex items-center'>
                <div className='text-yellow-400 mr-1'>
                  ★★★★☆
                </div>
                <p className='text-sm text-gray-500'>(245)</p>
              </div>
              <button className='mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300'>
                View Details
              </button>
            </div>



            {/* Product Card 3 */}
            <div className='bg-white lg:w-[210px] md:w-[210px] w-[170px] rounded-md p-4 my-2 mx-2 md:mx-4 lg:mx-4 relative shadow-md transition duration-300'>
              <div className='relative'>
                <img src='https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/logitech-g-pro-x-superlight-wireless-gaming-mouse-white-icon.jpg' alt='Product 1' className='w-full h-[200px] object-cover mb-2' />

                {/* Hot Badge */}
                <div className='bg-red-500 text-white absolute top-0 left-0 mt-1 ml-2 px-2 py-1 rounded-full text-xs text-center'>
                  สินค้าขายดี
                </div>
              </div>
              <p className='text-xl font-semibold mb-1'>G Pro X Superlight</p>
              <p className='text-lg font-medium mb-1'>4,990 บาท</p>

              <div className='flex items-center'>
                <div className='text-yellow-400 mr-1'>
                  ★★★★☆
                </div>
                <p className='text-sm text-gray-500'>(245)</p>
              </div>
              <button className='mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300'>
                View Details
              </button>
            </div>



            {/* Product Card 4 */}
            <div className='bg-white lg:w-[210px] md:w-[210px] w-[170px] rounded-md p-4 my-2 mx-2 md:mx-4 lg:mx-4 relative shadow-md transition duration-300'>
              <div className='relative'>
                <img src='https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/logitech-g-pro-x-superlight-wireless-gaming-mouse-white-icon.jpg' alt='Product 1' className='w-full h-[200px] object-cover mb-2' />

                {/* Hot Badge */}
                <div className='bg-red-500 text-white absolute top-0 left-0 mt-1 ml-2 px-2 py-1 rounded-full text-xs text-center'>
                  สินค้าขายดี
                </div>
              </div>
              <p className='text-xl font-semibold mb-1'>G Pro X Superlight</p>
              <p className='text-lg font-medium mb-1'>4,990 บาท</p>

              <div className='flex items-center'>
                <div className='text-yellow-400 mr-1'>
                  ★★★★☆
                </div>
                <p className='text-sm text-gray-500'>(245)</p>
              </div>
              <button className='mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300'>
                View Details
              </button>
            </div>



            {/* Product Card 5 */}
            <div className='bg-white lg:w-[210px] md:w-[210px] w-[170px] rounded-md p-4 my-2 mx-2 md:mx-4 lg:mx-4 relative shadow-md transition duration-300'>
              <div className='relative'>
                <img src='https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/logitech-g-pro-x-superlight-wireless-gaming-mouse-white-icon.jpg' alt='Product 1' className='w-full h-[200px] object-cover mb-2' />

                {/* Hot Badge */}
                <div className='bg-red-500 text-white absolute top-0 left-0 mt-1 ml-2 px-2 py-1 rounded-full text-xs text-center'>
                  สินค้าขายดี
                </div>
              </div>
              <p className='text-xl font-semibold mb-1'>G Pro X Superlight</p>
              <p className='text-lg font-medium mb-1'>4,990 บาท</p>

              <div className='flex items-center'>
                <div className='text-yellow-400 mr-1'>
                  ★★★★☆
                </div>
                <p className='text-sm text-gray-500'>(245)</p>
              </div>
              <button className='mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300'>
                View Details
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}