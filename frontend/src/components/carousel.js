import React, { useState, useEffect, useRef, useCallback  } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const slides = [
  "/img/slide-1.jpg",
  "/img/slide-2.jpeg",
  "/img/slide-3.jpeg"
];

const Carousel = () => {

    const [currIndex, setCurrIndex] = useState(0);
    const slideIntervalRef = useRef();

    const onNextSlide = useCallback(() => {
        setCurrIndex(prevIndex =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
        resetSlideInterval();
    }, []);

    useEffect(() => {
        slideIntervalRef.current = setInterval(onNextSlide, 5000);
        return () => clearInterval(slideIntervalRef.current);
    }, [onNextSlide]);

    const resetSlideInterval = () => {
        clearInterval(slideIntervalRef.current);
        slideIntervalRef.current = setInterval(onNextSlide, 5000);
    };

    const onPrevSlide = () => {
        setCurrIndex(currIndex => currIndex === 0 ? slides.length-1 : currIndex-1);
        resetSlideInterval();
    }

    return (
        <div className="w-full select-none relative overflow-hidden rounded-3xl">
            <div className="flex transition-transform ease-in-out duration-700 max-w-7xl max-h-96"
                 style={{transform: `translateX(-${currIndex * 100}%)`}}>
                {slides.map((slide, index) => (
                    <img key={index} src={slide} alt="" />
                ))}
            </div>
            <div className="text-5xl lg:text-7xl absolute w-full flex justify-between top-0 bottom-0 items-center">
                <button onClick={onPrevSlide}>
                    <MdNavigateBefore className="text-white opacity-50 hover:opacity-90 cursor-pointer" />
                </button>
                <button onClick={onNextSlide}>
                    <MdNavigateNext className="text-white opacity-50 hover:opacity-90 cursor-pointer" />
                </button>
            </div>


            <div className=" absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_,i) => (
                        <button onClick={() => { 
                            setCurrIndex(i)
                            resetSlideInterval()
                        }} className={`transition-all w-3 h-3 bg-white rounded-full
                        ${currIndex === i ? "p-2" : "bg-opacity-50"}`
                        }/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
