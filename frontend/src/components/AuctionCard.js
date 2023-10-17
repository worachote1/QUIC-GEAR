import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ImHammer2 } from 'react-icons/im';
import { formatNumberInput } from '../util/formatUtil'
import { calculateTimeRemaining } from '../util/auctionModule/countdown';
import { displayCountDownDate } from '../util/auctionModule/displayCountDownDate';

export default function AuctionCard({ AuctionItem,callbackUpdate }) {

  const isMountedRef = useRef(true);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(AuctionItem.end_auction_date));
  
  // prn this one it work (expired not display but the next one is wired time for a seeconds)
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const remaining = calculateTimeRemaining(AuctionItem.end_auction_date);
  //     setTimeRemaining(remaining);

  //     if (remaining.total <= 0) {
  //       clearInterval(timer);
  //       callbackUpdate(AuctionItem._id);
      
  //     }
  //   }, 1000);
  
  //   return () => {
  //     clearInterval(timer);

  //   };
  // }, [callbackUpdate]);

    useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(AuctionItem.end_auction_date);
      const nonNegativeRemaining = {
        days: Math.max(0, remaining.days),
        hours: Math.max(0, remaining.hours),
        minutes: Math.max(0, remaining.minutes),
        seconds: Math.max(0, remaining.seconds),
        total: Math.max(0, remaining.total),
      };

      setTimeRemaining(nonNegativeRemaining);

      if (nonNegativeRemaining.total <= 0) {
        clearInterval(timer);
        callbackUpdate(AuctionItem._id);
      
      }
    }, 1000);
  
    return () => {
      clearInterval(timer);

    };
  }, [callbackUpdate]);

  return (
    // lg:w-[210px] md:w-[210px] w-[170px]
    <div className='bg-white lg:w-[210px] md:w-[210px] w-[170px] rounded-md p-4 my-2 mx-2 md:mx-4 relative shadow-md transition duration-300 '>
      <div className='relative'>
        <img src={`/uploads/${AuctionItem.productItem.imgPath[0]}`} alt={AuctionItem.productItem.name} className='w-full h-[200px] object-cover mb-2' />

      </div>

      <div className='flex flex-col'>
        <p className='text-xl font-semibold mb-1 overflow-hidden mt-2 h-20'>{AuctionItem.productItem.name}</p>
        <p className='text-lg font-medium  text-right mt-2'><span className='text-red-500'> {formatNumberInput(AuctionItem.startPrice)} </span>บาท</p>
        <p className='text-lg font-medium  text-right'><span className='text-gray-500'> {displayCountDownDate(timeRemaining.days, timeRemaining.hours, timeRemaining.minutes, timeRemaining.seconds)} </span></p>
      </div>

      <Link to={`/auction/${AuctionItem._id}`}>
        <button className='mt-3 w-full border border-red-500 bg-white text-red-500 font-bold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300 your-custom-class'>
          <div className='flex justify-center items-center p-1'>  <span className='mr-2'> {<ImHammer2 size={20} />} </span> ประมูลทันที </div>
        </button>
      </Link>

    </div>
  )
}