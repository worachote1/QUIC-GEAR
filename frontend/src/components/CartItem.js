import React, { useState } from 'react'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { formatNumberInput } from '../util/formatUtil'

export default function CartItem({ menuObj, callbackUpdate, cur_Total }) {
    const [displayQuantity, setDisplayQuantity] = useState(menuObj.quantity)
    
    const handle_ClickVote = (id, voteVal) => {
        const cur_itemInCart = JSON.parse(sessionStorage.getItem("current_cartItem"))
        console.log(cur_itemInCart)
        cur_itemInCart.forEach(item => {
            if (item._id === id) {
                item.quantity += voteVal
                cur_Total += voteVal * item.price
                // if menu downvote to 0 -> remove that objecct from session from session
                const test = cur_itemInCart.filter(item => item._id !== id);
                console.log(test)
                if (item.quantity <= 0) {
                    const filterData = cur_itemInCart.filter(item => item._id !== id)
                    // if that object is the last menu in basket
                    // set session about foodshop and menu in basket to null (remove session)  
                    if (filterData.length === 0) {
                        sessionStorage.removeItem("current_cartItem")
                    }
                    //not the last menu -> update object with new quantity
                    else {
                        sessionStorage.setItem("current_cartItem", JSON.stringify(filterData))
                    }
                    window.location.reload()
                }
                else {
                    setDisplayQuantity(item.quantity)
                    // update that menu quantity after click vote to session
                    sessionStorage.setItem("current_cartItem", JSON.stringify(cur_itemInCart))
                    // display new sub total
                    console.log(cur_Total)
                    callbackUpdate(cur_Total)
                }
            }
        });
    }
    return (
        <div class="shadow-md py-4 rounded-lg mt-2">
            <div className="flex">
                <div class="rounded-lg">
                    <img
                        src={`/uploads/${menuObj.imgPath[0]}`}
                        alt="Product image"
                        class="w-44 h-36 object-cover rounded-lg"
                    />
                </div>
                <div class="mt-4 mt-0 ml-6">
                    <h2
                        class="font-bold text-2xl md:text-3xl"
                    >
                        {menuObj.name}
                    </h2>
                    <div class="mt-4 flex items-center text-2xl">
                        <div className=' flex items-center font-bold text-red-700'>
                            <AiOutlineDollarCircle class=' text-2xl' />
                            {formatNumberInput(menuObj.price * displayQuantity)}
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-end justify-end mr-6">
                <span class="flex rounded w-36 h-8 bg-[#F1F1F1] justify-between items-center">


                    <button
                        class="rounded w-6 h-8 bg-[#F1F1F1] hover:bg-[#DEDEDE] font-bold justify-center items-center"
                        onClick={() => handle_ClickVote(menuObj._id, -1)}
                    >
                        -
                    </button>
                    {displayQuantity}
                    <button
                        class="rounded w-6 h-8 bg-[#F1F1F1] hover:bg-[#DEDEDE] font-bold justify-center items-center"
                        onClick={() => handle_ClickVote(menuObj._id, 1)}
                    >
                        +
                    </button>

                </span>
            </div>
        </div>
    );
}