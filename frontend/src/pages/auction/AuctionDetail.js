import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { ImClock } from 'react-icons/im';
import { BsFillPeopleFill } from 'react-icons/bs';
import { AiOutlineDollarCircle } from 'react-icons/ai'

const AuctionDetail = () => {
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

    const prevSlide = () => {
        const newArrayIndex = arrayIndex.map((index) => {
            let newIndex = index - 1;
            if (newIndex < 0) {
                newIndex = slides.length-1;
            }
            return newIndex;
        });

        setArrayIndex(newArrayIndex);
    };

    const [arrayIndex, setArrayIndex] = useState([0, 1, 2]); // ให้ arrayIndex มีค่าเริ่มต้นเป็น [0, 1, 2]
    const [hoverIndex, setHoverIndex] = useState(0);

    const nextSlide = () => {
        const newArrayIndex = arrayIndex.map((index) => {
            let newIndex = index + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            return newIndex;
        });

        setArrayIndex(newArrayIndex);
        console.log(newArrayIndex);
    };

    const mobilePrevImg = () => {
        if(hoverIndex == 0) {
            setHoverIndex(slides.length-1);
        } else {
            setHoverIndex(hoverIndex-1);
        }
    }

    const mobileNextImg = () => {
        if(hoverIndex == slides.length-1) {
            setHoverIndex(0);
        } else {
            setHoverIndex(hoverIndex+1);
        }
    };

    return (
        <div class='bg-[#FAFAFA] w-full h-full'>
            <div class='flex flex-col justify-center'>
                <div class="flex lg:flex-row flex-col justify-center">
                    <div class='flex justify-center lg:justify-end h-full relative lg:w-3/6'>
                        <div class='h-full w-full lg:w-3/6 lg:mr-16'>
                            <img

                                src={slides[hoverIndex].url}
                                class=' w-full h-3/4 rounded-3xl duration-500 bg-center'
                            />
                        </div>
                        {/* Left Arrows */}
                        <button onClick={mobilePrevImg} class="md:hidden absolute top-[50%] -translate-x-0 translate-y-[-50]% left-5 text-xl rounded-full p-2 bg-gray-600 text-white cursor-pointer">
                            <BsChevronCompactLeft size={15}/>
                        </button>
                        {/* Right Arrows */}
                        <button onClick={mobileNextImg} class="md:hidden absolute top-[50%] -translate-x-0 translate-y-[-50]% right-5 text-xl rounded-full p-2 bg-gray-600 text-white cursor-pointer">
                            <BsChevronCompactRight size={15}/>
                        </button>
                    </div>
                    <div class='flex flex-col justify-start box-border h-full lg:w-3/6 pt-3 ml-3'>
                        <p class='flex font-Prompt text-3xl font-bold'>G Pro x Superlight</p>
                        <p class='flex py-4 font-Prompt text-sm'>Product ID: 123iihih3i123iu2</p>
                        <p class='flex font-Prompt text-lg text-[#a51d2d] items-center mt-5 mb-5'><ImClock class='font-bold text-2xl'></ImClock>&nbsp;0 วัน 0 ชั่วโมง 48 นาที 32 วินาที</p>
                        <p class='flex font-Prompt text-lg text-black items-center'><BsFillPeopleFill class='font-bold text-2xl'></BsFillPeopleFill>&nbsp;
                            <div class='underline'>3 ผู้ประมูล</div></p>
                    </div>
                </div>
                <div class="flex justify-center ">
                    <div class='lg:flex justify-end h-full w-3/6 hidden'>
                        <div class='flex h-full w-3/6 mr-16'>
                            <div class="w-2/12 flex items-center">
                                <div class="w-full text-center">
                                    <button onClick={prevSlide} class="p-3 rounded-full hover:bg-[#FAFAFA] bg-white border-gray-700 shadow-lg">
                                        <BsChevronCompactLeft/>
                                    </button> 
                                </div> 
                            </div>
                            <div id="sldierContainer" class="overflow-hidden">
                                <ul id="slider" class='flex w-full max-w-screen-xl mx-auto'>
                                    {arrayIndex.map((index) => (
                                        <li key={index} className="p-2 overflow-hidden">
                                            <div className="border rounded-2xl overflow-hidden">
                                                <img
                                                    className={`h-28 w-full rounded-md overflow-hidden ${hoverIndex === index ? 'border-2 rounded-2xl border-rose-600' : ''}`}
                                                    onMouseEnter={() => setHoverIndex(index)}
                                                    src={slides[index].url}
                                                    alt=""
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div class="w-2/12 flex items-center ">
                                <div class="w-full text-center">
                                    <button onClick={nextSlide} class="p-3 rounded-full hover:bg-[#FAFAFA] bg-white border-gray-700 shadow-lg">
                                        <BsChevronCompactRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='flex flex-col lg:flex-row box-border gap-x-3 py-3 justify-start items-center w-4/6 lg:w-3/6 h-full'>
                        <button class='flex flex-col rounded-full w-full lg:w-48 h-11 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center text-md font-Prompt lg:mb-0 mb-4'>
                            ประมูลตอนนี้
                            <div className="flex flex-row items-center">
                                ขั้นต่ำ <AiOutlineDollarCircle class=' text-xl' /> 330
                            </div>
                        </button>
                        <button class='flex rounded-full w-full lg:w-48 h-11 bg-[#A51D2D] hover:bg-[#841724] justify-center items-center text-white font-Prompt'>
                            <div className="flex flex-row items-center">
                                ซื้อทันที 688 <AiOutlineDollarCircle class=' text-xl' />
                            </div>
                        </button>
                    </div>
                </div>
                <div class='flex w-full h-full justify-center lg:p-1'>
                    <div class='flex h-full flex-col w-full lg:w-4/6 text-sm items-start font-Prompt mx-4'>
                        <p class='text-lg'>
                            Product Description
                        </p>
                        <p class='flex w-full lg:w-5/6 py-4 text-left'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore disputandum putant. Sed ut omittam pericula, labores, dolorem etiam, quem optimus quisque pro patria et pro suis suscipit, ut non dicas, quid non probes. Principio, inquam, in physicis.

                            Quod aptissimum est ad cognitionem omnium, regula, ad quam omnia iudicia rerum in sensibus ponit, quibus si semel aliquid falsi pro vero probatum sit, sublatum esse omne iudicium veri et falsi putat. Confirmat autem illud vel maxime, quod ipsa natura, ut ait ille, sciscat et probet, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et ab antiquis, ad arbitrium suum scribere?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AuctionDetail;