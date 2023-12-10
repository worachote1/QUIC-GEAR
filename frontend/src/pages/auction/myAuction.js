import React, { useEffect, useState } from 'react';
import AuctionOrderProduct from '../../components/AuctionOrderProduct';
import { useParams, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import { formatNumberInput } from '../../util/formatUtil';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';

const MyAuction = () => {
    const current_user = JSON.parse(sessionStorage.getItem('current_user'));
    const { id } = useParams();
    const navigate = useNavigate();
    const [auction, setAuction] = useState(null);
    const statusAuctionOrder = ['order received', 'dispatched', 'completed'];

    const getStatusIcon = (auctionOrderStatus) => {
        switch (auctionOrderStatus) {
            case 'order received':
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
        switch (auctionOrderStatus) {
            case 'order received':
                return 'ได้รับคำสั่งซื้อ';
            case 'dispatched':
                return 'อยู่ระหว่างการจัดส่ง';
            case 'completed':
                return 'สำเร็จ';
        }
    };

    const getSingleAuctionOrder = async () => {
        const singleAuction = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/${id}`)
        setAuction({ ...singleAuction.data })
    }

    useEffect(() => {
        getSingleAuctionOrder()
    }, [])

    if (!auction) {
        return <div className='w-full h-screen flex justify-center items-center'>
            <ThreeDots type="Circles" color="#841724" height={100} width={100} />
        </div>;
    }

    const currentStatus = auction?.orderStatus;

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
                await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/update/${id}`, {
                    orderStatus: "completed"
                })
                navigate('/myauction')
            }
        })
    };

    const openSellerDispatchDialog = async () => {
        const { value: trackingNumber } = await Swal.fire({
            title: 'ใส่หมายเลข Tracking',
            input: 'text',
            inputLabel: '',
            inputPlaceholder: 'ใส่เลข tracking',
            showCancelButton: true,
            confirmButtonText: "<span class='text-black'>ยืนยัน</span>",
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: "#ebebeb",
            cancelButtonColor: "#a51d2d",
            inputValidator: (value) => {
                if (/^\s*$/gm.test(value)) {
                    return 'กรุณาใส่หมายเลข Tracking';
                }
            }
        });
    
        if (trackingNumber) {
            // User entered a valid tracking number
            Swal.fire({
                title: 'จัดส่งสําเร็จ!',
                text: `ผลิตภัณฑ์ที่มีหมายเลข Tracking ${trackingNumber} ได้ถูกจัดส่งแล้ว`,
                icon: 'success',
                confirmButtonText: 'ตกลง',
            });
            
            // You can perform further actions with the entered trackingNumber if needed
            console.log('Tracking Number:', trackingNumber);
            await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/update/${id}`, {
                orderStatus: "dispatched",
                trackingNumber: trackingNumber
            })
            navigate('/myauction')
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-[1000px]"> 
            <div className="bg-white p-6 shadow-lg rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">รายการประมูล #{auction._id}</h1>
                    <div className="text-right">
                        <p className="font-bold text-gray-700 mt-4 lg:mt-0">วันที่ประมูล {new Date(auction?.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="mb-4 lg:mb-0 flex flex-col items-start">
                        <p className="text-l md:text-xl font-semibold mb-2">ที่อยู่จัดส่ง
                            <i className="fas fa-map-marker-alt text-gray-500 ml-2"></i></p>
                        <p className="text-gray-700">{auction?.userWinner.userId.address}</p>
                    </div>
                    {(auction?.orderStatus !== "order received") &&
                        <div className='flex flex-col items-start'>
                            <p className="text-l text-left md:text-xl md:text-right font-semibold mb-2">เลขติดตามพัสดุ
                                <i className="fas fa-box text-gray-500 ml-2"></i></p>
                            <p className="text-left md:text-right text-gray-700">{auction?.trackingNumber}</p>
                        </div>}
                </div>
                <h1 className="text-l md:text-xl font-semibold mt-8 mb-2 md:mt-0 mb-4">สถานะคำสั่งซื้อสินค้า</h1>
                <div className="flex flex-col md:flex-row items-left md:items-center md:justify-between mb-4">
                    {statusAuctionOrder.map((status, index) => (
                        <div
                            key={index}
                            className={`flex items-center ${auction?.orderStatus === status
                                ? 'text-red-500'
                                : statusAuctionOrder.indexOf(auction?.orderStatus) >= index
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
                    <AuctionOrderProduct item={auction} />
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 flex flex-row lg:flex-row justify-between items-center">
                    <p className="text-l md:text-xl font-semibold">ราคาสุทธิ</p>
                    <p className="text-l md:text-xl font-semibold flex items-center">
                        <AiOutlineDollarCircle class=' text-2xl' />
                        {formatNumberInput(auction.startPrice)}</p>
                </div>


                {currentStatus === 'order received' && current_user._id === auction.user_seller._id && (
                    <div
                        className="border border-red-500 bg-white text-red-500 text-sm md:text-lg font-bold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
                        onClick={openSellerDispatchDialog}
                    >
                        จัดส่งสินค้าเรียบร้อย
                    </div>
                )}


                {currentStatus === 'dispatched' && current_user._id === auction.userWinner.userId._id && (
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
