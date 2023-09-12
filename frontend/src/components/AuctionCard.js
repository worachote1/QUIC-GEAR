import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImHammer2 } from 'react-icons/im';
import { formatNumberInput } from '../util/formatUtil'
import { calculateTimeRemaining } from '../util/auctionModule/countdown';
import { displayCountDownDate } from '../util/auctionModule/displayCountDownDate';

export default function AuctionCard({ AuctionItem }) {

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(AuctionItem.end_auction_date);
      setTimeRemaining(remaining);

      if (remaining.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, []);

  return (
    // lg:w-[210px] md:w-[210px] w-[170px]
    <div className='flex flex-col  bg-white w-96 rounded-md p-4 my-2 mx-2 md:mx-4 relative shadow-md transition duration-300'>
      <div className='relative w-full h-[360px]'>
        <img src={AuctionItem.product.imgPath} className='w-full h-full object-contain mb-2' />
      </div>

      <div className='flex flex-col'>
        <p className='text-xl font-semibold mb-1 overflow-hidden mt-2 h-20'>{AuctionItem.product.name}</p>
        <p className='text-lg font-medium  text-right mt-2'><span className='text-red-500'> {formatNumberInput(AuctionItem.startPrice)} </span>บาท</p>
        <p className='text-lg font-medium  text-right'><span className='text-gray-500'> {displayCountDownDate(timeRemaining.days, timeRemaining.hours, timeRemaining.minutes, timeRemaining.seconds)} </span></p>
      </div>
      <Link to={`/auction/${AuctionItem.id}`}>
        <div className='flex justify-center '>
          <button className='mt-3 w-full border border-red-500 bg-white text-red-500 font-bold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300 your-custom-class'>
            <div className='flex justify-center items-center p-1'>  <span className='mr-2'> {<ImHammer2 size={20} />} </span> ประมูลทันที </div>
          </button>
        </div>
      </Link>
    </div>
  )
}
