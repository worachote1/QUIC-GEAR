import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import HotProductCard from '../components/HotProductCard';
import NewProductCard from '../components/NewProductCard';
import { productData } from '../constant/productData';
import axios from "axios";
import ProductCard from '../components/ProductCard';

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

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("bestSelling");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const updateFilteredProducts = (productData) => {
    if (selectedCategory === "bestSelling") {
      return [...productData]
        .sort((a, b) => b.totalOrder - a.totalOrder)
        .slice(0, 10);
    } else if (selectedCategory === "newArrivals") {
      return [...productData]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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

  const getAllProduts = async () => {
    const allProducts = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/products`)
    console.log(allProducts.data)
    const res_allProducts = allProducts.data
    setAllProducts([...res_allProducts])
}

useEffect(()=>{
    getAllProduts();
},[])

useEffect(()=>{
  const res_filteredProducts = updateFilteredProducts(allProducts)
  console.log(res_filteredProducts)
  setFilteredProducts(res_filteredProducts)
},[allProducts, selectedCategory])

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
          <Link to={'/auction'}>
            <a class='bg-gray-200 w-full max-w-[350px] h-[100px] rounded-md p-4 my-2 mx-5 flex items-center justify-center hover:bg-red-700/40 shadow-md transition duration-300'>
              <p class='text-2xl font-semibold mb-2 md:text-left'>ประมูลสินค้ามือสอง</p>
            </a>
          </Link>
        </div>


        {/* Product Card */}
        <div className='md:flex justify-center items-center mt-8'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-2'>
            {filteredProducts?.map((item) => (
              <ProductCardComponent key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}