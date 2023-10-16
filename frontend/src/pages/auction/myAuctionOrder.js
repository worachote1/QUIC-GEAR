import { auctionOrder } from "../../constant/auctionOrderConstants";
import { ThreeDots } from 'react-loader-spinner';
import AuctionOrderCard from "../../components/AuctionOrderCard";
import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from 'react-icons/ai';

export default function MyAuctionOrder() {
    const auctionType = ["การประมูลที่คุณสร้าง", "ชนะการประมูล", "แพ้การประมูล", "กำลังประมูล"]
    const taskAuctionBGColor = {
        "การประมูลที่คุณสร้าง": "bg-yellow-500",
        "ชนะการประมูล": "bg-green-500",
        "แพ้การประมูล": "bg-red-500",
        "กำลังประมูล": "bg-orange-500",
    }
    const [selectedTask, setSelectedTask] = useState(auctionType[0]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const [auctionList, setAuctionList] = useState(null);

    useEffect(() => {
        setAuctionList(auctionOrder);
    }, [])

    const totalPages = Math.ceil((auctionList?.length ? auctionList?.length : 0) / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const auctionToDisplay = auctionList?.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleClickSelectTask = (task) => {
        setSelectedTask(task);
    }

    if (!auctionList) {
        return <div className='w-full h-screen flex justify-center items-center'>
            <ThreeDots type="Circles" color="#841724" height={100} width={100} />
        </div>;
    }

    return (
        <div className="flex justify-center">
            <div className="flex-col ml-2 mr-2 w-full md:w-[750px] lg:w-[1000px]">
                <div className="text-xl pt-8 md:text-2xl font-bold pl-2 mb-4 md:pl-0">
                    รายการประมูล
                </div>
                <div className="dropdown flex">
                    <label tabIndex={0} className={`btn m-1 text-white ${taskAuctionBGColor[selectedTask]}`}> {selectedTask} <span className='ml-1'> {<AiFillCaretDown size={20} />} </span></label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        {auctionType.map((item, Idx) => {
                            return <li key={Idx}> <button onClick={() => handleClickSelectTask(item)}>{item}</button></li>
                        })}
                    </ul>
                </div>
                {auctionToDisplay.map((auction) => (
                    <div key={auction.id} className="mb-4">
                        <AuctionOrderCard auction={auction} />
                    </div>
                ))}

                {/* Pagination */}
                {auctionList.length ?
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className="mr-4 p-2 rounded-full hover:bg-[#d6d3d1]"
                            style={{
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <ul className="flex space-x-2">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <li
                                    key={index}
                                    className={`cursor-pointer ${currentPage === index + 1 ? 'font-bold' : 'hover:text-red-300'
                                        }`}
                                    onClick={() => handlePageChange(index + 1)}
                                    style={{
                                        background: currentPage === index + 1 ? '#fca5a5' : 'transparent',
                                        color: currentPage === index + 1 ? '#b91c1c' : 'black',
                                        borderRadius: '50%',
                                        width: '30px',
                                        height: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index + 1}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="ml-4 p-2 rounded-full hover:bg-[#d6d3d1]"
                            style={{
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    : <div></div>
                }
            </div>
        </div>
    )
}