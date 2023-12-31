import React from 'react';
import { Link } from 'react-router-dom';
import { formatNumberInput } from '../util/formatUtil';
import { AiOutlineDollarCircle } from 'react-icons/ai'

const getStarRating = (rating) => {
  const roundedRating = Math.round(rating);
  return '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
};

const HotProductCard = ({ product }) => {
  const { _id, name, brand, type, price, imgPath, rating } = product;

  return (
    <div className='bg-white lg:w-[210px] md:w-[210px] w-[170px] rounded-md p-4 my-2 mx-2 md:mx-4 lg:mx-4 relative shadow-md transition duration-300'>
      <div className='relative'>
        <img src={`/uploads/${imgPath[0]}`} alt={name} className='w-full h-[200px] object-cover mb-2' />

        {/* Hot Badge */}
        <div className='bg-red-500 text-white absolute top-0 left-0 mt-1 ml-2 px-2 py-1 rounded-full text-xs text-center'>
          สินค้าขายดี
        </div>
      </div>
      <p className='text-xl font-semibold mb-1 h-14 overflow-hidden'>{name}</p>
      <div className='text-lg font-medium mb-1 flex justify-between'>
        <div className='flex items-center'>
          <div className='text-yellow-400 mr-1 '>
            {getStarRating(product?.rating)}
          </div>
        </div>
        <div className="flex flex-row items-center text-[#a51d2d]">
          <AiOutlineDollarCircle class=' text-2xl' /> {formatNumberInput(product.price)}
        </div>
      </div>
      
      <div className='flex justify-end'>
        <Link to={`/product/${product?._id}`}>
          <button className="mt-3 border border-red-500 bg-white text-red-500 font-bold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300 your-custom-class">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HotProductCard;

