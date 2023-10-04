import React from 'react';
import { Link } from 'react-router-dom';
import { formatNumberInput } from '../util/formatUtil';
const getStarRating = (rating) => {
  const roundedRating = Math.round(rating);
  return '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
};

const ProductCard = ({ product }) => {
  // const { id, name, brand, type, price, imgPath, rating } = product;

  return (
    <div className='bg-white lg:w-[210px] md:w-[210px] w-[170px] rounded-md p-4 my-2 mx-2 md:mx-4 relative shadow-md transition duration-300'>
      <div className='relative'>
        <img src={`/uploads/${product.imgPath[0]}`} alt={product.name} className='w-full h-[200px] object-cover mb-2' />

      </div>
      <p className='text-xl font-semibold mb-1 h-14 overflow-hidden'>{product.name}</p>
      <p className='text-lg font-medium mb-1'>{formatNumberInput(product.price)} บาท</p>

      <div className='flex items-center'>
        <div className='text-yellow-400 mr-1'>
          {getStarRating(product.rating)}
        </div>
      </div>
      <Link to={`/product/${product._id}`}>
        <button className="mt-3 border border-red-500 bg-white text-red-500 font-bold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300 your-custom-class">
          View Details
        </button>
      </Link>

    </div>
  );
};

export default ProductCard;
