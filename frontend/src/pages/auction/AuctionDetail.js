import React, { useEffect, useState, useRef } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { ImClock } from 'react-icons/im';
import { BsFillPeopleFill } from 'react-icons/bs';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { calculateTimeRemaining } from '../../util/auctionModule/countdown';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from "axios";
import { formatNumberInput } from "../../util/formatUtil";
import Swal from 'sweetalert2';

const AuctionDetail = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const current_user = JSON.parse(sessionStorage.getItem("current_user"));
    const checkEmptyREGEX = /^\s*$/gm;
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [singleAuctionData, setSingleAuctionData] = useState(null);
    const [arrayIndex, setArrayIndex] = useState([0, 1, 2]); // ให้ arrayIndex(ที่ใช้ใน small img-carousel section) มีค่าเริ่มต้นเป็น [0, 1, 2]
    const [hoverIndex, setHoverIndex] = useState(0);
    const [slides, setSlides] = useState([]);
    const hasAlertedAuctionEnd = useRef(false);

    const prevSlide = () => {
        const newArrayIndex = arrayIndex.map((index) => {
            let newIndex = index - 1;
            if (newIndex < 0) {
                newIndex = slides.length - 1;
            }
            return newIndex;
        });

        setArrayIndex(newArrayIndex);
    };

    const nextSlide = () => {
        const newArrayIndex = arrayIndex.map((index) => {
            let newIndex = index + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            return newIndex;
        });

        setArrayIndex(newArrayIndex);
    };

    const mobilePrevImg = () => {
        if (hoverIndex == 0) {
            setHoverIndex(slides.length - 1);
        } else {
            setHoverIndex(hoverIndex - 1);
        }
    }

    const mobileNextImg = () => {
        if (hoverIndex == slides.length - 1) {
            setHoverIndex(0);
        } else {
            setHoverIndex(hoverIndex + 1);
        }
    };

    const alert_NotEnoughCoins = () => {
        Swal.fire({
            title: "เหรียญไม่เพียงพอ",
            text: "กรุณาเติมเหรียญก่อนดำเนินการต่อ",
            icon: "error",
        }).then(() => {
            navigate("/topup");
        });
    }

    const alert_NotAddress = () => {
        Swal.fire({
            title: "ต้องการที่อยู่",
            text: `กรุณาระบุข้อมูลที่อยู่ในโปรไฟล์ของคุณก่อนทําการซื้อ!`,
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#a51d2d",
            cancelButtonColor: "#a51d2d",
            confirmButtonText: "<span class='text-white'>ยืนยัน</span>",
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform any necessary delete action here
                navigate(`/edit-profile`);
            }
        })
    }

    const alertAuctionEnd = (userWinner) => {
        if (!hasAlertedAuctionEnd.current) {
            Swal.fire({
                title: `${userWinner?.userId._id === current_user._id ? 'ยินดีด้วยคุณชนะการประมูล' : 'การประมูลนี้จบลงแล้ว'}`,
                html:
                    `${(userWinner) ?
                        `ปิดการประมูลที่ราคา ${formatNumberInput(userWinner?.bidAmount)} coins </span>`
                        : `ไม่มีผู้เข้าร่วมการประมูล`}`,
                icon: `${userWinner?.userId._id === current_user._id ? 'success' : 'warning'}`,
                showCancelButton: false,
                confirmButtonColor: "#a51d2d",
                cancelButtonColor: "#a51d2d",
                confirmButtonText: "<span class='text-white'>ยืนยัน</span>",
            }).then((result) => {
                if (result.isConfirmed) {
                    // Perform any necessary delete action here
                    navigate(`/auction`);
                }
            })
        }
        hasAlertedAuctionEnd.current = true;
    }

    const getSingleAuctionData = async () => {
        const singleAuctionData = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/${id}`);
        const res_singleAuctionData = singleAuctionData.data;
        setSingleAuctionData(res_singleAuctionData)
        console.log(res_singleAuctionData)
        const imgSlides = [...res_singleAuctionData.productItem.imgPath];
        setSlides(imgSlides)
        if (imgSlides.length < arrayIndex.length) {
            let updatedArrayIndex = [];
            for (let i = 0; i < imgSlides.length; i++)
                updatedArrayIndex.push(i)
            setArrayIndex([...updatedArrayIndex])
            console.log([...updatedArrayIndex])
        }
    }

    // use this function when time's up
    // get lasted auctionData -> set to singleAuctionData
    // if there are userBidder find the winner (the onw with most bidAmount)
    // after that -> update userWinner,auctionStatus 
    // -> refund to other userBidder (except the userWinner)
    // -> update user_seller's coins (unless there is no userBidder)
    // **don't need to update userWinner'coins (the one with most bidAmount) because every userBidder was subtracted coins when they bid amount of coins
    const handleAuctionEndByBidder = async () => {

        const getLastedSingleAuctionData = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/${id}`);
        const res_getLastedSingleAuctionData = getLastedSingleAuctionData.data;

        // If auction end(time's up) but there is someone buyout before
        if (res_getLastedSingleAuctionData.userWinner) {
            alertAuctionEnd(res_getLastedSingleAuctionData.userWinner);
            setSingleAuctionData({ ...res_getLastedSingleAuctionData })
            // if the current user is winner -> update coins in session 
            // so current user don't need to refresh to check his updated coin
            if (res_getLastedSingleAuctionData.userWinner.userId._id === current_user._id) {
                sessionStorage.setItem('current_user', JSON.stringify(res_getLastedSingleAuctionData.userWinner.userId));
            }
            return;
        }

        // If auction end(time's up) without any participants
        if (res_getLastedSingleAuctionData.userBidder.length === 0) {
            const updateSingleAuction = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/update/${id}`, {
                auctionStatus: "completed"
            })
            const res_updateSingleAuction = updateSingleAuction.data
            alertAuctionEnd(res_updateSingleAuction.userWinner)
            setSingleAuctionData({ ...res_updateSingleAuction })
            return;
        }

        // If auction end(time's up) and with some participants
        let tempMostBidder = res_getLastedSingleAuctionData.userBidder[0]
        for (let i = 1; i < res_getLastedSingleAuctionData.userBidder.length; i++) {
            if (res_getLastedSingleAuctionData.userBidder[i].bidAmount > tempMostBidder.bidAmount) {
                tempMostBidder = res_getLastedSingleAuctionData.userBidder[i];
            }
        }

        // check if this function handleAuctionEndByBidder() not invoked by the user with most bidAmount(the one that will be userWinner)
        if (tempMostBidder.userId?._id !== current_user._id && res_getLastedSingleAuctionData.userBidder.length > 1) {
            alertAuctionEnd(tempMostBidder)
            return ;
        }
        // update coins to user_seller
        const increaseUserSellerCoins = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/users/update/${res_getLastedSingleAuctionData.user_seller._id}`, {
            coins: res_getLastedSingleAuctionData.user_seller.coins + tempMostBidder.bidAmount
        });
        console.log("add coin to seller prn")

        // refund all userBidder except for winner 
        // Use Promise.all to wait for all asynchronous operations inside the map function
        await Promise.all(res_getLastedSingleAuctionData.userBidder.map(async (item) => {
            if (item.userId._id !== tempMostBidder.userId._id) {
                const refundTo = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/users/update/${item.userId._id}`, {
                    coins: item.bidAmount + item.userId.coins
                })

                // if current user is one participants (which not a winner) -> update coin in session
                // so current user don't need to refresh to check his updated coin
                if (item.userId._id === current_user._id) {
                    const res_refundTo = refundTo.data;
                    sessionStorage.setItem('current_user', JSON.stringify(res_refundTo));
                    console.log("refund to current user(a bidder) prn")
                }
            }
        }))

        //update auction
        const updateSingleAuction = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/update/${id}`, {
            auctionStatus: "completed",
            userWinner: {
                userId: tempMostBidder.userId._id,
                bidAmount: tempMostBidder.bidAmount
            },
            startPrice: tempMostBidder.bidAmount
        });
        console.log("update auction with winner prn")
        const res_updateSingleAuction = updateSingleAuction.data

        // if the current user is winner(with most bidAmount) -> update coins in session 
        // so current user don't need to refresh to check his updated coin
        if (res_updateSingleAuction.userWinner.userId._id === current_user._id) {
            sessionStorage.setItem('current_user', JSON.stringify(res_updateSingleAuction.userWinner.userId));
        }
        setSingleAuctionData({ ...res_updateSingleAuction })
        alertAuctionEnd(res_updateSingleAuction.userWinner)
    }

    const handleUserBid = async () => {
        //validate
        if (!current_user) {
            navigate('/login')
            return;
        }
        if (checkEmptyREGEX.test(current_user.address)) {
            alert_NotAddress();
            return;
        }

        // Get lasted auctionData 
        let getLastedSingleAuctionData = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/${id}`);
        let res_getLastedSingleAuctionData = getLastedSingleAuctionData.data;
        setSingleAuctionData({ ...res_getLastedSingleAuctionData })
        let findCurrentUserBidder = res_getLastedSingleAuctionData.userBidder.find(user => user.userId._id === current_user._id);
        let previousBidAmount = (findCurrentUserBidder) ? findCurrentUserBidder?.bidAmount : 0;
        //if there is winner before you bid and you're one of userBidder 
        //-> update session,so coins is refunded in real-time
        if (res_getLastedSingleAuctionData.userWinner) {
            alertAuctionEnd(res_getLastedSingleAuctionData.userWinner);
            if (findCurrentUserBidder)
                sessionStorage.setItem('current_user', JSON.stringify(findCurrentUserBidder.userId));
            return;
        }

        // Showing the modal with an input form
        Swal.fire({
            title: `เพิ่มยอดที่ต้องการประมูล<br><span style="font-size: 0.8em;color:#aaa;">ยอดประมูลก่อนหน้า: ${formatNumberInput(previousBidAmount)} coins</span>`,
            input: 'number',
            inputAttributes: {
                autocapitalize: 'off',
                step: 'any', // Use this if you want decimal values. Remove it if only integers are allowed.
            },
            showCancelButton: true,
            confirmButtonColor: '#ebebeb',
            cancelButtonColor: '#a51d2d',
            confirmButtonText: "<span class='text-black'>ยืนยัน</span>",
            cancelButtonText: "ยกเลิก",
            showLoaderOnConfirm: true,
            preConfirm: async (inputValue) => {

                // Get lasted auctionData (กันคนเหลี่ยม เข้าหน้า pop up ค้าง)
                getLastedSingleAuctionData = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/${id}`);
                res_getLastedSingleAuctionData = getLastedSingleAuctionData.data;
                setSingleAuctionData({ ...res_getLastedSingleAuctionData })
                findCurrentUserBidder = res_getLastedSingleAuctionData.userBidder.find(user => user.userId._id === current_user._id);
                previousBidAmount = (findCurrentUserBidder) ? findCurrentUserBidder?.bidAmount : 0;
                //if there is winner before you bid and you're one of userBidder 
                //-> update session,so coins is refunded in real-time
                if (res_getLastedSingleAuctionData.userWinner) {
                    alertAuctionEnd(res_getLastedSingleAuctionData.userWinner);

                    if (findCurrentUserBidder)
                        sessionStorage.setItem('current_user', JSON.stringify(findCurrentUserBidder.userId));
                    return;
                }

                const bidAmount = parseFloat(inputValue);
                if (isNaN(bidAmount)) {

                    Swal.showValidationMessage('Please enter a valid number');
                    return;
                }

                else if (current_user.coins < bidAmount) {
                    Swal.showValidationMessage('เหรียญไม่เพียงพอ');
                    return;
                }
                else if (bidAmount + previousBidAmount <= res_getLastedSingleAuctionData?.startPrice) {
                    Swal.showValidationMessage('กรุณาประมูลด้วยยอดที่เกินราคาปัจจุบัน');
                    return;
                }
                //just test if bidAmount + previousBidAmount exceed buyOutPrice
                // then this user buyOut this auction
                else if (bidAmount + previousBidAmount >= res_getLastedSingleAuctionData?.buyOutPrice) {
                    handleUserBuyOut();
                    return;
                }
                const currentBidAmount = bidAmount + previousBidAmount;
                // Continue with Bid logic
                // Update userBidder (auction api)
                const userBidderWitoutCurrent = res_getLastedSingleAuctionData.userBidder.filter((item) => item.userId._id !== current_user._id)
                const updatedUserBidder = [...userBidderWitoutCurrent, { userId: current_user._id, bidAmount: currentBidAmount }]
                const updateSingleAuction = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/update/${id}`, {
                    startPrice: currentBidAmount,
                    userBidder: [...updatedUserBidder]
                })
                console.log(updateSingleAuction.data)
                setSingleAuctionData({ ...updateSingleAuction.data })
                // And user's coin (user api) and current_user session
                const subTractUserCoins = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/users/update/${current_user._id}`, {
                    coins: current_user.coins - bidAmount
                })
                sessionStorage.setItem('current_user', JSON.stringify(subTractUserCoins.data))

                //create auctionOrder later...


            },
            allowOutsideClick: () => !Swal.isLoading(),
        });
    }

    const handleUserBuyOut = async () => {
        //validate
        if (!current_user) {
            navigate('/login')
            return;
        }
        if (checkEmptyREGEX.test(current_user.address)) {
            alert_NotAddress();
            return;
        }
        if (current_user.coins < singleAuctionData?.buyOutPrice) {
            alert_NotEnoughCoins();
            return;
        }

        // confirm popup
        Swal.fire({
            title: "ยืนยันการซื้อ",
            text: `คุณต้องการจะซื้อสินค้านี้หรือไม่?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#ebebeb",
            cancelButtonColor: "#a51d2d",
            confirmButtonText: "<span class='text-black'>ชําระเงิน</span>",
            cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // get lasted auctionData -> set to singleAuctionData 
                    const getLastedSingleAuctionData = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/${id}`);
                    const res_getLastedSingleAuctionData = getLastedSingleAuctionData.data;

                    if (res_getLastedSingleAuctionData.userWinner) {
                        const findCurrentUserBidder = res_getLastedSingleAuctionData.userBidder.find(user => user.userId._id === current_user._id);
                        if (findCurrentUserBidder)
                            sessionStorage.setItem('current_user', JSON.stringify(findCurrentUserBidder.userId));
                        alertAuctionEnd(res_getLastedSingleAuctionData.userWinner);
                        return;
                    }

                    // update coins to user_seller
                    const increaseUserSellerCoins = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/users/update/${res_getLastedSingleAuctionData.user_seller._id}`, {
                        coins: res_getLastedSingleAuctionData.user_seller.coins + res_getLastedSingleAuctionData.buyOutPrice
                    });

                    // refund other userBidder (include userWinner if participate as userBidder) + subtract winner coin (subtract with buyOutPrice) 
                    let currentUserBidAmount = 0;

                    // Use Promise.all to wait for all asynchronous operations inside the map function
                    await Promise.all(res_getLastedSingleAuctionData.userBidder.map(async (item) => {
                        if (item.userId._id === current_user._id) {
                            currentUserBidAmount = item.bidAmount;
                        }

                        await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/users/update/${item.userId._id}`, {
                            coins: item.bidAmount + item.userId.coins
                        });
                    }));

                    const subTractWinnerCoins = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/users/update/${current_user._id}`, {
                        coins: (current_user.coins + currentUserBidAmount) - res_getLastedSingleAuctionData.buyOutPrice
                    });

                    //update auction
                    const updateSingleAuction = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/update/${id}`, {
                        auctionStatus: "completed",
                        userWinner: {
                            userId: current_user._id,
                            bidAmount: res_getLastedSingleAuctionData.buyOutPrice
                        },
                        startPrice: res_getLastedSingleAuctionData.buyOutPrice
                    });

                    const res_updateSingleAuction = updateSingleAuction.data;
                    setSingleAuctionData({ ...res_updateSingleAuction });
                    alertAuctionEnd(res_updateSingleAuction.userWinner);

                    // window.location.reload()
                    sessionStorage.setItem('current_user', JSON.stringify(res_updateSingleAuction.userWinner.userId));

                    // create auctionOrder later...
                } catch (err) {
                    console.log(err);
                }
            }
        })
    }

    useEffect(() => {
        getSingleAuctionData();
    }, [])

    useEffect(() => {
        if (!hasAlertedAuctionEnd.current) {
            if (!singleAuctionData?.userWinner) {
                const timer = setInterval(() => {
                    const remaining = calculateTimeRemaining(singleAuctionData?.end_auction_date);
                    const nonNegativeRemaining = {
                        days: Math.max(0, remaining.days),
                        hours: Math.max(0, remaining.hours),
                        minutes: Math.max(0, remaining.minutes),
                        seconds: Math.max(0, remaining.seconds),
                        total: Math.max(0, remaining.total),
                    };

                    setTimeRemaining(nonNegativeRemaining);

                    if (nonNegativeRemaining.total <= 0) {

                        handleAuctionEndByBidder();
                        clearInterval(timer);
                    }
                }, 1000);
                return () => clearInterval(timer); // Cleanup the timer on unmount
            }
            else {
                console.log(singleAuctionData?.userWinner)
                alertAuctionEnd(singleAuctionData?.userWinner);
            }
        }
    }, [singleAuctionData]);



    if (!singleAuctionData) {
        return <div className='w-full h-screen flex justify-center items-center'>
            <ThreeDots type="Circles" color="#841724" height={100} width={100} />
        </div>;
    }

    if (singleAuctionData?.userWinner || singleAuctionData?.auctionStatus === "completed") {
        return <div className="flex-col">
            <div className="flex justify-center p-4 text-xl">
                การประมูลนี้จบลงแล้ว
            </div>
        </div>
    }
    return (
        <div class=''>
            {singleAuctionData && timeRemaining ? (
                // <div class='bg-[#FAFAFA] w-full h-full'>
                <div class='flex flex-col justify-center'>
                    <div class="flex lg:flex-row flex-col justify-center">
                        <div class='flex justify-center lg:justify-end h-full relative lg:w-3/6 '>
                            <div class='h-[300px] w-full lg:w-3/6 lg:mr-16 '>
                                <img
                                    src={`/uploads/${slides[hoverIndex]}`}
                                    class='w-full h-full rounded-3xl duration-500 bg-center object-contain'
                                />
                            </div>
                            {/* Left Arrows */}
                            <button onClick={mobilePrevImg} class={`${(singleAuctionData?.productItem.imgPath.length <= 3) ? 'hidden' : ''} md:hidden absolute top-[50%] -translate-x-0 translate-y-[-50]% left-5 text-xl rounded-full p-2 bg-gray-600 text-white cursor-pointer`}>
                                <BsChevronCompactLeft size={15} />
                            </button>
                            {/* Right Arrows */}
                            <button onClick={mobileNextImg} class={`${(singleAuctionData?.productItem.imgPath.length <= 3) ? 'hidden' : ''} md:hidden absolute top-[50%] -translate-x-0 translate-y-[-50]% right-5 text-xl rounded-full p-2 bg-gray-600 text-white cursor-pointer`}>
                                <BsChevronCompactRight size={15} />
                            </button>
                        </div>
                        <div class='flex flex-col justify-start box-border h-full lg:w-3/6 pt-3 ml-3'>
                            <p class='flex font-Prompt text-3xl font-bold'>{singleAuctionData?.productItem.name}</p>
                            <p class='flex py-4 font-Prompt text-sm'>Product ID: {singleAuctionData?._id}</p>
                            <p class='flex font-Prompt text-lg text-[#a51d2d] items-center mt-5 mb-5'><ImClock class='font-bold text-2xl'></ImClock>&nbsp;
                                {`${timeRemaining?.days} วัน ${timeRemaining?.hours} ชั่วโมง ${timeRemaining?.minutes} นาที ${timeRemaining?.seconds} วินาที`}
                            </p>
                            <p class='flex font-Prompt text-lg text-black items-center'><BsFillPeopleFill class='font-bold text-2xl'></BsFillPeopleFill>&nbsp;
                                <div class='underline'>{singleAuctionData?.userBidder.length} ผู้ประมูล</div></p>
                        </div>
                    </div>
                    {/* small img-carousel section */}
                    <div class="flex justify-center ">
                        <div class='lg:flex justify-end h-full w-3/6 hidden'>
                            <div class='flex h-full w-3/6 mr-16'>
                                <div class="w-2/12 flex items-center">
                                    <div class="w-full text-center">
                                        <button onClick={prevSlide} class={`${(singleAuctionData?.productItem.imgPath.length <= 3) ? 'hidden' : ''} p-3 rounded-full hover:bg-[#FAFAFA] bg-white border-gray-700 shadow-lg`}>
                                            <BsChevronCompactLeft />
                                        </button>
                                    </div>
                                </div>
                                <div id="sldierContainer" class="overflow-hidden">
                                    <ul id="slider" class='flex w-full max-w-screen-xl mx-auto '>
                                        {arrayIndex?.map((index) => (
                                            <li key={index} className="p-2 overflow-hidden">
                                                <div className="border rounded-2xl overflow-hidden">
                                                    <img
                                                        className={`h-28 w-28 rounded-md overflow-hidden object-contain ${hoverIndex === index ? 'border-2 rounded-2xl border-rose-600' : ''}`}
                                                        onMouseEnter={() => setHoverIndex(index)}
                                                        src={`/uploads/${slides[index]}`}
                                                        alt=""
                                                    />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div class="w-2/12 flex items-center ">
                                    <div class="w-full text-center">
                                        <button onClick={nextSlide} class={`${(singleAuctionData?.productItem.imgPath.length <= 3) ? 'hidden' : ''} p-3 rounded-full hover:bg-[#FAFAFA] bg-white border-gray-700 shadow-lg`}>
                                            <BsChevronCompactRight />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='flex flex-col lg:flex-row box-border gap-x-3 py-3 justify-start items-center w-4/6 lg:w-3/6 h-full '>
                            <button class='flex  rounded-full w-full lg:w-48 h-11 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center text-md font-Prompt lg:mb-0 mb-4'
                                onClick={() => handleUserBid()}
                            >
                                ประมูลขั้นต่ำ <span> <AiOutlineDollarCircle class='text-xl ml-1' /> </span> {formatNumberInput(singleAuctionData?.startPrice)}
                            </button>
                            <button class='flex rounded-full w-full lg:w-48 h-11 bg-[#A51D2D] hover:bg-[#841724] justify-center items-center text-white font-Prompt'
                                onClick={() => handleUserBuyOut()}
                            >
                                ซื้อทันที <span> <AiOutlineDollarCircle class='text-xl ml-1' /> </span> {formatNumberInput(singleAuctionData?.buyOutPrice)}
                            </button>
                        </div>
                    </div>
                    {/* Product Description section */}
                    <div class='flex w-full h-full justify-center lg:p-1 mt-2'>
                        <div class='flex h-full flex-col w-full lg:w-4/6 text-sm items-start font-Prompt mx-4'>
                            <p class='text-lg'>
                                รายละเอียด
                            </p>
                            <p class='flex w-full lg:w-5/6 py-4 text-left'>
                                {singleAuctionData?.productItem.description}
                            </p>
                        </div>
                    </div>
                </div>

            )
                : <div className='w-full h-screen flex justify-center items-center'>
                    <ThreeDots type="Circles" color="#841724" height={100} width={100} />
                </div>
            }
        </div>
    );
};
export default AuctionDetail;