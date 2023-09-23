import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { ImClock } from 'react-icons/im';
import { BsFillPeopleFill } from 'react-icons/bs';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { calculateTimeRemaining } from '../../util/auctionModule/countdown';
import { useParams, Link } from 'react-router-dom';
import {ThreeDots} from 'react-loader-spinner';
import axios from "axios";

const AuctionDetail = () => {

    const { id } = useParams();
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [singleAuctionData, setSingleAuctionData] = useState(null);
    const [arrayIndex, setArrayIndex] = useState([0, 1, 2]); // ให้ arrayIndex(ที่ใช้ใน small img-carousel section) มีค่าเริ่มต้นเป็น [0, 1, 2]
    const [hoverIndex, setHoverIndex] = useState(0);
    const [slides, setSlides] = useState([]);
    // const slides = [
    //     'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/logitech-g-pro-x-superlight-wireless-gaming-mouse-white-icon.jpg',
    //     'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/Logitech%20G%20Pro%20X%20Superlight%20Wireless%20Gaming%20Mouse.jpg',
    //     'https://cdn.discordapp.com/attachments/696053498739163146/1147254999613722654/Logitech-G-Pro-X-Superlight-21.png',
    //     'https://cdn.discordapp.com/attachments/696053498739163146/1147255092014223510/Logitech-G-Pro-X-Superlight-31.png',
    //     'https://cdn.discordapp.com/attachments/696053498739163146/1147255223186882681/Logitech-G-Pro-X-Superlight-41.png',
    //     'https://cdn.discordapp.com/attachments/696053498739163146/1147255245752246363/logitech-g-pro-x-superlight-wireless-gaming-mouse-white-lifestyle.png'
    // ];

    const prevSlide = () => {
        const newArrayIndex = arrayIndex.map((index) => {
            let newIndex = index - 1;
            if (newIndex < 0) {
                newIndex = slides.length - 1;
            }
            return newIndex;
        });

        setArrayIndex(newArrayIndex);
    };

    const nextSlide = () => {
        const newArrayIndex = arrayIndex.map((index) => {
            let newIndex = index + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            return newIndex;
        });

        setArrayIndex(newArrayIndex);
    };

    const mobilePrevImg = () => {
        if (hoverIndex == 0) {
            setHoverIndex(slides.length - 1);
        } else {
            setHoverIndex(hoverIndex - 1);
        }
    }

    const mobileNextImg = () => {
        if (hoverIndex == slides.length - 1) {
            setHoverIndex(0);
        } else {
            setHoverIndex(hoverIndex + 1);
        }
    };

    const getSingleAuctionData = async () => {
        const singleAuctionData = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/${id}`);
        const res_singleAuctionData = singleAuctionData.data;
        setSingleAuctionData(res_singleAuctionData)
        const imgSlides = [...res_singleAuctionData.productItem.imgPath];
        setSlides(imgSlides)
        if (imgSlides.length < arrayIndex.length) {
            let updatedArrayIndex = [];
            for (let i = 0; i < imgSlides.length; i++)
                updatedArrayIndex.push(i)
            setArrayIndex([...updatedArrayIndex])
            console.log([...updatedArrayIndex])
        }
    }

    useEffect(() => {
        getSingleAuctionData();
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = calculateTimeRemaining(singleAuctionData?.end_auction_date);
            setTimeRemaining(remaining);

            if (remaining.total <= 0) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer); // Cleanup the timer on unmount
    }, [singleAuctionData]);


    return (
        <div class='bg-[#FAFAFA] w-full h-full'>
            {singleAuctionData && timeRemaining ? (
                // <div class='bg-[#FAFAFA] w-full h-full'>
                <div class='flex flex-col justify-center'>
                    <div class="flex lg:flex-row flex-col justify-center">
                        <div class='flex justify-center lg:justify-end h-full relative lg:w-3/6 '>
                            <div class='h-full w-full lg:w-3/6 lg:mr-16'>
                                <img

                                    src={`/uploads/${slides[hoverIndex]}`}
                                    class=' w-full h-full rounded-3xl duration-500 bg-center object-cover'
                                />
                            </div>
                            {/* Left Arrows */}
                            <button onClick={mobilePrevImg} class={`${ (singleAuctionData?.productItem.imgPath.length<=3) ? 'hidden' : ''} md:hidden absolute top-[50%] -translate-x-0 translate-y-[-50]% left-5 text-xl rounded-full p-2 bg-gray-600 text-white cursor-pointer`}>
                                <BsChevronCompactLeft size={15} />
                            </button>
                            {/* Right Arrows */}
                            <button onClick={mobileNextImg} class={`${ (singleAuctionData?.productItem.imgPath.length<=3) ? 'hidden' : ''} md:hidden absolute top-[50%] -translate-x-0 translate-y-[-50]% right-5 text-xl rounded-full p-2 bg-gray-600 text-white cursor-pointer`}>
                                <BsChevronCompactRight size={15} />
                            </button>
                        </div>
                        <div class='flex flex-col justify-start box-border h-full lg:w-3/6 pt-3 ml-3'>
                            <p class='flex font-Prompt text-3xl font-bold'>{singleAuctionData?.productItem.name}</p>
                            <p class='flex py-4 font-Prompt text-sm'>Product ID: {singleAuctionData?._id}</p>
                            <p class='flex font-Prompt text-lg text-[#a51d2d] items-center mt-5 mb-5'><ImClock class='font-bold text-2xl'></ImClock>&nbsp;
                                {`${timeRemaining?.days} วัน ${timeRemaining?.hours} ชั่วโมง ${timeRemaining?.minutes} นาที ${timeRemaining?.seconds} วินาที`}
                            </p>
                            <p class='flex font-Prompt text-lg text-black items-center'><BsFillPeopleFill class='font-bold text-2xl'></BsFillPeopleFill>&nbsp;
                                <div class='underline'>{singleAuctionData?.userBidder.length} ผู้ประมูล</div></p>
                        </div>
                    </div>
                    {/* small img-carousel section */}
                    <div class="flex justify-center ">
                        <div class='lg:flex justify-end h-full w-3/6 hidden'>
                            <div class='flex h-full w-3/6 mr-16'>
                                <div class="w-2/12 flex items-center">
                                    <div class="w-full text-center">
                                        <button onClick={prevSlide} class={`${ (singleAuctionData?.productItem.imgPath.length<=3) ? 'hidden' : ''} p-3 rounded-full hover:bg-[#FAFAFA] bg-white border-gray-700 shadow-lg`}>
                                            <BsChevronCompactLeft />
                                        </button>
                                    </div>
                                </div>
                                <div id="sldierContainer" class="overflow-hidden">
                                    <ul id="slider" class='flex w-full max-w-screen-xl mx-auto '>
                                        {arrayIndex?.map((index) => (
                                            <li key={index} className="p-2 overflow-hidden">
                                                <div className="border rounded-2xl overflow-hidden">
                                                    <img
                                                        className={`h-28 w-44 rounded-md overflow-hidden object-cover ${hoverIndex === index ? 'border-2 rounded-2xl border-rose-600' : ''}`}
                                                        onMouseEnter={() => setHoverIndex(index)}
                                                        src={`/uploads/${slides[index]}`}
                                                        alt=""
                                                    />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div class="w-2/12 flex items-center ">
                                    <div class="w-full text-center">
                                        <button onClick={nextSlide} class={`${ (singleAuctionData?.productItem.imgPath.length<=3) ? 'hidden' : ''} p-3 rounded-full hover:bg-[#FAFAFA] bg-white border-gray-700 shadow-lg`}>
                                            <BsChevronCompactRight />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='flex flex-col lg:flex-row box-border gap-x-3 py-3 justify-start items-center w-4/6 lg:w-3/6 h-full '>
                            <button class='flex  rounded-full w-full lg:w-48 h-11 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center text-md font-Prompt lg:mb-0 mb-4'>
                                ประมูลขั้นต่ำ <span> <AiOutlineDollarCircle class='text-xl ml-1' /> </span> {singleAuctionData?.startPrice}
                            </button>
                            <button class='flex rounded-full w-full lg:w-48 h-11 bg-[#A51D2D] hover:bg-[#841724] justify-center items-center text-white font-Prompt'>
                                ซื้อทันที <span> <AiOutlineDollarCircle class='text-xl ml-1' /> </span> {singleAuctionData?.buyOutPrice}
                            </button>
                        </div>
                    </div>
                    {/* Product Description section */}
                    <div class='flex w-full h-full justify-center lg:p-1 mt-2'>
                        <div class='flex h-full flex-col w-full lg:w-4/6 text-sm items-start font-Prompt mx-4'>
                            <p class='text-lg'>
                                Product Description
                            </p>
                            <p class='flex w-full lg:w-5/6 py-4 text-left'>
                                {singleAuctionData?.productItem.description}
                            </p>
                        </div>
                    </div>
                </div>
            
            )
                : <div className='w-full h-screen flex justify-center items-center'> 
                    <ThreeDots type="Circles" color="#841724" height={100} width={100}/>
                </div>
            }
        </div>
    );
};
export default AuctionDetail;