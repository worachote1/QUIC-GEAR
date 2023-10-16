import React, { useEffect, useState } from 'react';
import AuctionOrderProduct from '../../components/AuctionOrderProduct';
import { useParams, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import { formatNumberInput } from '../../util/formatUtil';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';

const MyAuction = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [auctionOrder, setAuctionOrder] = useState(null);
    const statusAuctionOrder = ['auction received', 'dispatched', 'completed'];

    const getStatusIcon = (auctionOrderStatus) => {
        switch (auctionOrderStatus) {
            case 'auction received':
                return 'fa-clipboard';
            case 'dispatched':
                return 'fa-shipping-fast';
            case 'completed':
                return 'fa-check-circle';
            default:
                return 'fa-question-circle';
        }
    };

    const getStatusText = (auctionOrderStatus) => {
        console.log(auctionOrderStatus)
        switch (auctionOrderStatus) {
            case 'auction received':
                return 'ได้รับคำสั่งซื้อ';
            case 'dispatched':
                return 'อยู่ระหว่างการจัดส่ง';
            case 'completed':
                return 'สำเร็จ';
            default:
                return 'Unknown';
        }
    };


    const getSingleAuctionOrder = async () => {
        const singleAuctionOrder = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionOrder/${id}`)
        console.log({ ...singleAuctionOrder.data })
        setAuctionOrder({ ...singleAuctionOrder.data })
    }

    useEffect(() => {
        getSingleAuctionOrder()
    }, [])

    if (!auctionOrder) {
        return <div className='w-full h-screen flex justify-center items-center'>
            <ThreeDots type="Circles" color="#841724" height={100} width={100} />
        </div>;
    }

    const currentStatus = auctionOrder?.auctionOrderStatus;

    const openRatingDialog = () => {
        Swal.fire({
            title: "ยืนยันการได้รับสินค้า",
            text: `คุณได้รับสินค้าแล้วหรือไม่?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#ebebeb",
            cancelButtonColor: "#a51d2d",
            confirmButtonText: "<span class='text-black'>ยืนยัน</span>",
            cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionOrder/update/${id}`, {
                    auctionOrderStatus: "completed"
                })
                navigate('/myauction')
            }
        })
    };


    return (
        <div className="container mx-auto p-4 max-w-[1000px]"> 
            <div className="bg-white p-6 shadow-lg rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">รายละเอียดการประมูล</h1>
                    <div className="text-right">
                        <p className="font-bold text-gray-700 mt-4 lg:mt-0">วันที่ประมูล {new Date(auctionOrder?.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="mb-4 lg:mb-0 flex flex-col items-start">
                        <p className="text-l md:text-xl font-semibold mb-2">ที่อยู่จัดส่ง
                            <i className="fas fa-map-marker-alt text-gray-500 ml-2"></i></p>
                        <p className="text-gray-700">{auctionOrder?.userID.address}</p>
                    </div>
                    {(auctionOrder?.orderStatus !== "order received") &&
                        <div className='flex flex-col items-start'>
                            <p className="text-l text-left md:text-xl md:text-right font-semibold mb-2">เลขติดตามพัสดุ
                                <i className="fas fa-box text-gray-500 ml-2"></i></p>
                            <p className="text-left md:text-right text-gray-700">{auctionOrder?.trackingNumber}</p>
                        </div>}
                </div>
                <h1 className="text-l md:text-xl font-semibold mt-8 mb-2 md:mt-0 mb-4">สถานะคำสั่งซื้อสินค้า</h1>
                <div className="flex flex-col md:flex-row items-left md:items-center md:justify-between mb-4">
                    {statusAuctionOrder.map((status, index) => (
                        <div
                            key={index}
                            className={`flex items-center ${auctionOrder?.auctionOrderStatus === status
                                ? 'text-red-500'
                                : statusAuctionOrder.indexOf(auctionOrder?.auctionOrderStatus) >= index
                                    ? 'text-red-500'
                                    : 'text-gray-400'
                                } mb-2 lg:mb-0 lg:mr-4`}
                        >
                            <i className={`fas ${getStatusIcon(status)} text-xl md:text-3xl mr-2`}></i>
                            <span className='font-bold'>{getStatusText(status)}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col mb-2">
                    {auctionOrder.auctionID.productItem.map((item) => (
                        <AuctionOrderProduct item={item.auctionID} />
                    ))}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 flex flex-row lg:flex-row justify-between items-center">
                    <p className="text-l md:text-xl font-semibold">ราคาสุทธิ</p>
                    <p className="text-l md:text-xl font-semibold flex items-center">
                        <AiOutlineDollarCircle class=' text-2xl' />
                        {formatNumberInput(auctionOrder?.auctionID.startPrice)}</p>
                </div>

                {currentStatus === 'dispatched' && (
                    <div
                        className="border border-red-500 bg-white text-red-500 text-sm md:text-lg font-bold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
                        onClick={openRatingDialog}
                    >
                        ยืนยันการได้รับสินค้า
                    </div>
                )}

            </div>
        </div>
    );
};
   
export default MyAuction;
