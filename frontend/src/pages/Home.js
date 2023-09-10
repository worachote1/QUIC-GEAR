import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import HotProductCard from '../components/HotProductCard';
import NewProductCard from '../components/NewProductCard';
import { productData } from '../constant/productData';

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
  const [selectedCategory, setSelectedCategory] = useState("bestSelling");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filterProducts = () => {
    if (selectedCategory === "bestSelling") {
      return productData
        .sort((a, b) => b.product.totalOrders - a.product.totalOrders)
        .slice(0, 10);
    } else if (selectedCategory === "newArrivals") {
      return productData
        .sort((a, b) => new Date(b.product.createAt) - new Date(a.product.createAt))
        .slice(0, 10);
    }
  };

  const ProductCardComponent = selectedCategory === "bestSelling" ? HotProductCard : NewProductCard;

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

        {/* Category Cards */}
        <div className='hidden md:flex justify-center flex-row md:items-center md:mt-[-30px]'>
          <div
            className={`bg-gray-200 w-full max-w-[350px] h-[100px] rounded-md p-4 my-2 mx-5 flex items-center justify-center hover:bg-red-700/40 shadow-md transition duration-300 ${selectedCategory === "bestSelling" ? "bg-red-700/40 cursor-pointer" : "cursor-pointer"
              }`}
            onClick={() => handleCategoryChange("bestSelling")}
          >
            <p className='text-2xl font-semibold mb-2 md:text-left'>สินค้าขายดี</p>
          </div>
          <div
            className={`bg-gray-200 w-full max-w-[350px] h-[100px] rounded-md p-4 my-2 mx-5 flex items-center justify-center hover:bg-red-700/40 shadow-md transition duration-300 ${selectedCategory === "newArrivals" ? "bg-red-700/40 cursor-pointer" : "cursor-pointer"
              }`}
            onClick={() => handleCategoryChange("newArrivals")}
          >
            <p className='text-2xl font-semibold mb-2 md:text-left'>สินค้าใหม่</p>
          </div>
          <a href="/auction" class='bg-gray-200 w-full max-w-[350px] h-[100px] rounded-md p-4 my-2 mx-5 flex items-center justify-center hover:bg-red-700/40 shadow-md transition duration-300'>
            <p class='text-2xl font-semibold mb-2 md:text-left'>ประมูลสินค้ามือสอง</p>
          </a>
        </div>


        {/* Product Card */}
        <div className='md:flex justify-center items-center mt-8'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-2'>
            {filterProducts().map((product) => (
              <ProductCardComponent key={product.id} product={product.product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}