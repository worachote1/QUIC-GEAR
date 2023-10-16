import React from "react";
import { Link } from "react-router-dom";
import AuctionOrderProduct from "./AuctionOrderProduct";
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { formatNumberInput } from "../util/formatUtil";

export default function AuctionOrderCard({ auction }) {

    const getStatusText = (auctionStatus) => {
        switch (auctionStatus) {
            case 'completed':
                return 'สำเร็จ'; // ไปหน้าคล้ายๆ หน้าMyOrder
            case 'dispatched':
                return 'อยู่ระหว่างการจัดส่ง' // ไปหน้าคล้ายๆ หน้าMyOrder
            case 'in progress':
                return 'การประมูลยังไม่เสร็จสิ้น'; // ไปหน้า ประมูลต่อ
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="pt-4 shadow-lg border rounded-lg">
            <div className="flex flex-col">
                <div className="flex justify-between pr-2 md:pr-8 items-center pb-4">
                    <div className="pl-2 md:pl-8 text-sm font-bold md:text-xl">
                        รายการประมูล #1
                    </div>
                    <div className="md:flex">
                        {auction.auctionID.auctionStatus !== 'in progress' && (
                            <div className="flex items-center pr-2 md:pr-8 text-sm md:text-lg pb-2 md:pt-2 hidden md:block">
                                สถานะ : {getStatusText(auction.auctionOrderStatus)}
                            </div>
                        )}
                        <Link to={``} className="border border-red-500 bg-white text-red-500 text-sm md:text-lg font-bold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300">
                            ดูรายละเอียด
                        </Link>
                    </div>
                </div>
                <div className="flex justify-between pr-2 md:pr-8 items-center bg-gray-100 pt-4 pb-4">
                    <div className="flex flex-col items-start">
                        <div className="pl-4 md:pl-8 text-sm md:text-lg">วันที่เริ่มการประมูล</div>
                        <div className="pl-4 md:pl-8 text-sm pt-2">{auction.auctionID.start_auction_date}</div>
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="pl-4 md:pl-8 text-sm md:text-lg">สถานะการประมูล</div>
                        <div className="pl-4 md:pl-8 text-sm pt-2">{auction.auctionID.auctionStatus}</div>
                    </div>
                    <div className="flex items-center">
                        <div className="pl-4 md:pl-8 text-m md:text-lg">ราคาเริ่มประมูล</div>
                        <div className="flex items-center pl-2 md:pl-8">
                            <AiOutlineDollarCircle class=' text-2xl' />
                            {formatNumberInput(auction.auctionID.startPrice)}
                        </div>
                    </div>
                </div>
                <div>
                    <AuctionOrderProduct item={auction.auctionID} />
                </div>
            </div>
        </div>
    )
}