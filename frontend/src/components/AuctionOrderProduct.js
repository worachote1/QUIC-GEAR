import React from "react";
import { Link } from "react-router-dom";
import { formatNumberInput } from "../util/formatUtil";
import { AiOutlineDollarCircle } from 'react-icons/ai'

export default function AuctionOrderProduct({ item }) {
    return (
        <div className="py-4 rounded-lg">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="rounded-lg pl-4 md:pl-8">
                        <Link to={``}>
                            <img
                                // src={`uploads/${item.productID.imgPath[0]}`}
                                src={`${item.productItem.imgPath[0]}`}
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
                                <div className="pt-2 text-sm md:text-lg">จำนวน : 1</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ml-6 flex mr-6">
                    <div className="flex flex-col items-start">
                        {item.auctionStatus === 'in progress' && (
                            <div className="md:mt-5">
                                <h2 className="font-bold text-l md:text-2xl flex text-red-700">สถานะ : กำลังประมูล</h2>
                            </div>
                        )}
                        <div>
                            <div className="flex pt-2 text-l md:text-2xl text-green-700">คุณประมูลสูงสุด</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}