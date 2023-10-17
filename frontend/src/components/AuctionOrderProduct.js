import React from "react";
import { Link } from "react-router-dom";
import { formatNumberInput } from "../util/formatUtil";
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function AuctionOrderProduct({ item }) {

    const current_user = JSON.parse(sessionStorage.getItem('current_user'))

    const isMostBidAmount = (userBidder) => {
        let tempMostBidder = userBidder[0]
        for (let i = 1; i < userBidder.length; i++) {
            if (userBidder[i].bidAmount > tempMostBidder.bidAmount) {
                tempMostBidder = userBidder[i];
            }
        }
        return tempMostBidder.userId._id === current_user._id;
    }

    // render text auction base on auctionStatus + user type (winner,loser,seller)
    const renderTextAuction = (auction) => {
        //if auction end
        if (auction.auctionStatus === "completed") {
            //if current user is seller
            if (current_user._id === auction.user_seller._id) {
                return <h2 className="font-bold text-l md:text-2xl flex text-red-700">การประมูลจบลงแล้ว</h2>
            }
            //if current_user is winner
            else if (current_user._id === auction.userWinner.userId._id) {
                return (
                    <div className="flex pt-2 text-l md:text-2xl text-green-700">
                        <div className="flex justify-center items-center ">
                            <div>
                                <BsFillCheckCircleFill size={20} className="text-[#478d4e]" />
                            </div>
                            <div className="ml-1 text-[#478d4e]">คุณชนะประมูล</div>
                        </div>
                    </div>
                )
            }
            // if current_user is loser
            else {
                return (
                    <div className="flex pt-2 text-l md:text-2xl text-green-700">
                        <div className="flex justify-center items-center">
                            <div>
                                <BsFillCheckCircleFill size={21} className="text-[#4b98d8]" />
                            </div>
                            <div className="ml-1 text-[#4b98d8]">ได้รับเงินคืนแล้ว</div>
                        </div>
                    </div>
                )
            }
        }

        //if auction is in progress
        else if (auction.auctionStatus === "in progress") {
            //if current user is seller
            if (current_user._id === auction.user_seller._id) {
                return <h2 className="font-bold text-l md:text-2xl flex text-yellow-500">อยู่ระหว่างการประมูล</h2>
            }
            //if current_user is userBidder with most bid amount
            else if (isMostBidAmount(auction.userBidder)) {
                return (
                    <div className="flex justify-center items-center ">
                        <div>
                            <BsFillCheckCircleFill size={21} className="text-[#478d4e]" />
                        </div>
                        <div className="ml-1 text-[#478d4e]">คุณประมูลสูงสุด</div>
                    </div>
                )
            }
            // if current_user is loser
            else {
                return (
                    <div className="flex justify-center items-center ">
                        <div>
                            <ImCross size={21} className="text-[#ff950b]" />
                        </div>
                        <div className="ml-1 text-[#ff950b]">คนอื่นประมูลสูงกว่าคุณ</div>
                    </div>
                )
            }
        }
    }

    return (
        <div className="py-4 rounded-lg">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="rounded-lg pl-4 md:pl-8">
                        <Link to={``}>
                            <img
                                // src={`uploads/${item.productID.imgPath[0]}`}
                                src={`/uploads/${item.productItem.imgPath[0]}`}
                                alt={item.productItem.name}
                                className="w-16 h-16 sm:w-36 sm:h-36 object-cover rounded-lg"
                            />
                        </Link>
                    </div>
                    <div className="ml-6 flex">
                        <div className="flex flex-col items-start">
                            <div className="md:mt-5">
                                <h2 className="font-bold text-l md:text-2xl">{item.productItem.name} </h2>
                            </div>
                            <div>
                                <div className="pt-2 text-sm md:text-lg">จำนวน : 1 </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ml-6 flex mr-6">
                    <div className="flex flex-col items-start">
                        <div className="md:mt-5">
                            {renderTextAuction(item)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}