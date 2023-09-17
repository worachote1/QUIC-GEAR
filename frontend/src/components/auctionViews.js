import React, { useRef, useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import {ImClock} from 'react-icons/im';
import {BsFillPeopleFill} from 'react-icons/bs';
import {AiOutlineDollarCircle} from 'react-icons/ai'

const AuctionViews = () => {
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

  const divRef = useRef(null);

  useEffect(() => {
    const width = divRef.current.clientWidth;
    console.log(`Width of the div: ${width}px`);
  }, []);

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
      <div class='bg-[#E8E9EA] w-screen h-screen'>
        <div class='flex flex-col justify-center'>
            <div class="flex justify-center">
                <div class='flex justify-end h-full w-3/6'>
                    <div class='h-full w-3/6 mr-16'>
                        <img
                        src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/logitech-g-pro-x-superlight-wireless-gaming-mouse-white-icon.jpg"
                        class=' w-full h-3/4 rounded-lg bg-center'
                        />
                    </div>
                </div>
                <div class='flex flex-col justify-start box-border h-full w-3/6'>
                    <p class='flex font-Prompt text-3xl font-bold'>G Pro x Superlight</p>
                    <p class='flex py-4 font-Prompt text-sm'>Product ID: 123iihih3i123iu2</p>
                    <p class='flex font-Prompt text-lg text-[#a51d2d] items-center mt-5 mb-5'><ImClock class='font-bold text-2xl'></ImClock>&nbsp;0 วัน 0 ชั่วโมง 48 นาที 32 วินาที</p>
                    <p class='flex font-Prompt text-lg text-black items-center'><BsFillPeopleFill class='font-bold text-2xl'></BsFillPeopleFill>&nbsp;
                    <div class='underline'>3 ผู้ประมูล</div></p>
                </div>
            </div>
            <div class="flex justify-center ">
                <div class='flex justify-end h-full w-3/6 '>
                    <div class='flex h-full w-3/6 mr-16'>
                        <div class="w-2/12 flex items-center">
                            <div class="w-full text-center">
                                <button class="p-3 rounded-full bg-white border-gray-700 shadow-lg">
                                    <BsChevronCompactLeft/>
                                </button>
                            </div>
                        </div>
                        <div ref={divRef} id="sldierContainer" class="bg-red-700 overflow-hidden">
                            <ul id="slider" class='flex border border-red-600 w-[1000px]'>
                                <li class="p-2 overflow-hidden">
                                    <div class="border rounded-lg overflow-hidden">
                                        <img className='h-28 w-28 rounded-md overflow-hidden' src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/Logitech%20G%20Pro%20X%20Superlight%20Wireless%20Gaming%20Mouse.jpg" alt=""></img>
                                    </div>
                                </li>
                                <li class="p-2 overflow-hidden">
                                    <div class="border rounded-lg overflow-hidden">
                                        <img className='h-28 w-28 rounded-md overflow-hidden' src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/Logitech%20G%20Pro%20X%20Superlight%20Wireless%20Gaming%20Mouse.jpg" alt=""></img>
                                    </div>
                                </li>
                                <li class="p-2 overflow-hidden">
                                    <div class="border rounded-lg overflow-hidden">
                                        <img className='h-28 w-28 rounded-md overflow-hidden' src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/Logitech%20G%20Pro%20X%20Superlight%20Wireless%20Gaming%20Mouse.jpg" alt=""></img>
                                    </div>
                                </li>
                                <li class="p-2 overflow-hidden">
                                    <div class="border rounded-lg overflow-hidden">
                                        <img className='h-28 w-28 rounded-md overflow-hidden' src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/Logitech%20G%20Pro%20X%20Superlight%20Wireless%20Gaming%20Mouse.jpg" alt=""></img>
                                    </div>
                                </li>
                                <li class="p-2 overflow-hidden">
                                    <div class="border rounded-lg overflow-hidden">
                                        <img className='h-28 w-28 rounded-md overflow-hidden' src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/Logitech%20G%20Pro%20X%20Superlight%20Wireless%20Gaming%20Mouse.jpg" alt=""></img>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="w-2/12 flex items-center ">
                            <div class="w-full text-center">
                                <button class="p-3 rounded-full bg-white border-gray-700 shadow-lg">
                                    <BsChevronCompactRight/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='flex flex-row box-border gap-x-3 py-3 justify-start items-center w-3/6 h-full'>
                    <button class='flex flex-col rounded-full w-48 h-11 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center text-md font-Prompt align-top'>
                        ประมูลตอนนี้ 
                        <div className="flex flex-row items-center">
                            ขั้นต่ำ <AiOutlineDollarCircle class=' text-xl'/> 330
                        </div>
                    </button>

                    <button class='flex rounded-full w-48 h-11 bg-[#A51D2D] hover:bg-[#841724] justify-center items-center text-white font-Prompt'>
                        <div className="flex flex-row items-center">
                            ซื้อทันที 688 <AiOutlineDollarCircle class=' text-xl'/>
                        </div>
                    </button>
                </div>
            </div>
            <div class='flex w-full h-full justify-center p-16'>
                <div class='flex flex-col w-4/6 text-sm items-start font-Prompt'>
                    <p class='text-lg'>
                        Product Description
                    </p>
                    <p class='flex w-5/6 py-4 text-left'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore disputandum putant. Sed ut omittam pericula, labores, dolorem etiam, quem optimus quisque pro patria et pro suis suscipit, ut non dicas, quid non probes. Principio, inquam, in physicis.

                        Quod aptissimum est ad cognitionem omnium, regula, ad quam omnia iudicia rerum in sensibus ponit, quibus si semel aliquid falsi pro vero probatum sit, sublatum esse omne iudicium veri et falsi putat. Confirmat autem illud vel maxime, quod ipsa natura, ut ait ille, sciscat et probet, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et ab antiquis, ad arbitrium suum scribere?
                    </p>
                </div>
            </div>
        </div>
      </div>
    );
};
export default AuctionViews;