import React from "react";
import { Link } from "react-router-dom";
import AuctionOrderProduct from "./AuctionOrderProduct";
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { formatNumberInput } from "../util/formatUtil";
import { auctionOrder } from "../constant/auctionOrderConstants";

export default function AuctionOrderCard({ auction }) {

    const current_user = JSON.parse(sessionStorage.getItem('current_user'))
   
    const getStatusText = (orderStatus) => {
        switch (orderStatus) {
          case 'completed':
            return 'จัดส่งสำเร็จ';
          case 'dispatched':
            return 'อยู่ระหว่างการจัดส่ง'
          case 'order received':
            return 'ได้รับคำสั่งซื้อ';
          default:
            return 'Unknown';
      }
    };

    const renderOrderStatus = (auction) => {
        //if auction is end
        //and this current user is either winner or seller(that his auction have some participants or have userWinner)
        //link -> go to see auction
        if (auction.auctionStatus === 'completed') {
            if (current_user._id === auction.user_seller._id && ((auction.userBidder.length !== 0) || (auction.userWinner))) {
                return (
                    <div>
                        <div className="flex justify-center tems-center pr-2 md:pr-8 text-sm md:text-lg ">
                           สถานะ: {getStatusText(auction.orderStatus)}
                        </div>
                    </div>
                )
            }
            else if (auction.userWinner) {
                if (current_user._id === auction.userWinner.userId._id) {
                    return (
                        <div>
                            <div className="flex justify-center tems-center pr-2 md:pr-8 text-sm md:text-lg ">
                                สถานะ: {getStatusText(auction.orderStatus)}
                            </div>
                        </div>
                    )
                }
            }
        }
    }

    const renderLink = (auction) => {
        //if auction is in progress ->link go to auctionDetail page
        if (auction.auctionStatus === 'in progress')
            return (
                <Link to={`/auction/${auction._id}`} className="border border-red-500 bg-white text-red-500 text-sm md:text-lg font-bold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300" >
                    ดูรายละเอียด
                </Link>
            )
        //if auction is end
        //and this current user is either winner or seller(that his auction have some participants or have userWinner)
        //link -> go to see auction
        else if (auction.auctionStatus === 'completed') {
            if (current_user._id === auction.user_seller._id && ((auction.userBidder.length !== 0) || (auction.userWinner))) {
                return (
                    <Link to={`/myauction/${auction._id}`} className="border border-red-500 bg-white text-red-500 text-sm md:text-lg font-bold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300" >
                        ดูรายละเอียด
                    </Link>
                )
            }
            else if (auction.userWinner) {
                if (current_user._id === auction.userWinner.userId._id) {
                    return (
                        <Link to={`/myauction/${auction._id}`} className="border border-red-500 bg-white text-red-500 text-sm md:text-lg font-bold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300" >
                            ดูรายละเอียด
                        </Link>
                    )
                }
            }
        }
    }

    return (
        <div className="pt-4 shadow-lg border rounded-lg">
            <div className="flex flex-col">
                <div className="flex justify-between pr-2 md:pr-8 items-center pb-4 ">
                    <div className=" pl-2 md:pl-8 text-sm font-bold md:text-xl">
                        รายการประมูล #{auction._id}
                    </div>
                    <div className="flex justify-center items-center ">
                        {renderOrderStatus(auction)}
                        {renderLink(auction)}
                    </div>
                </div>
                <div className="flex justify-between pr-2 md:pr-8 items-center bg-gray-100 pt-4 pb-4">
                    <div className="flex flex-col items-start">
                        <div className="pl-4 md:pl-8 text-sm md:text-lg">วันที่เริ่มการประมูล</div>
                        <div className="pl-4 md:pl-8 text-sm pt-2">{new Date(auction.start_auction_date).toLocaleString()}</div>
                    </div>
                    <div className="flex items-center">
                        <div className="pl-4 md:pl-8 text-m md:text-lg">ราคาปัจจุบัน</div>
                        <div className="flex items-center pl-2 md:pl-8">
                            <AiOutlineDollarCircle class=' text-2xl' />
                            {formatNumberInput(auction.startPrice)}
                        </div>
                    </div>
                </div>
                <div>
                    <AuctionOrderProduct item={auction} />
                </div>
            </div>
        </div>
    )
}