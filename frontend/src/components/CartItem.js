import React, { useState } from 'react'

export default function CartItem({ menuObj, callbackUpdate, cur_Total }) {

    const [displayQuantity, setDisplayQuantity] = useState(menuObj.quantity)
    const handle_ClickVote = (id, voteVal) => {
        const cur_itemInCart = JSON.parse(sessionStorage.getItem("currrent_cartItem"))
        cur_itemInCart.forEach(item => {
            if (item.id === id) {
                item.quantity += voteVal
                cur_Total += voteVal * item.itemPrice
                // if menu downvote to 0 -> remove that objecct from session from session
                if (item.quantity <= 0) {
                    const filterData = cur_itemInCart.filter(item => item.id !== id)
                    // if that object is the last menu in basket
                    // set session about foodshop and menu in basket to null (remove session)  
                    if (filterData.length === 0) {
                        sessionStorage.removeItem("currrent_cartItem")
                    }
                    //not the last menu -> update object with new quantity
                    else {
                        sessionStorage.setItem("currrent_cartItem", JSON.stringify(filterData))
                    }
                    // alert(filterData.length)
                    window.location.reload()
                }
                else {
                    setDisplayQuantity(item.quantity)
                    // update that menu quantity after click vote to session
                    sessionStorage.setItem("currrent_cartItem", JSON.stringify(cur_itemInCart))
                    // display new sub total
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
                        src={menuObj.imgPath}
                        alt="Product image"
                        class="w-44 h-36 object-cover rounded-lg"
                    />
                </div>
                <div class="mt-4 mt-0 ml-6">
                    <h2
                        class="font-bold text-2xl md:text-3xl"
                    >
                        {menuObj.itemName}
                    </h2>
                    <div class="mt-4 flex items-center text-2xl">
                        <div>
                            <span class="font-bold text-red-700">
                                ฿
                                {menuObj.itemPrice * displayQuantity}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-end justify-end mr-6">
                <span class="flex rounded w-36 h-8 bg-[#F1F1F1] justify-between items-center">
                    {displayQuantity}
                    <div class="flex">
                        <button
                            class="rounded w-6 h-8 bg-[#F1F1F1] hover:bg-[#DEDEDE] font-bold justify-center items-center"
                            onClick={() => handle_ClickVote(menuObj.id, -1)}
                        >
                            -
                        </button>
                        <button
                            class="rounded w-6 h-8 bg-[#F1F1F1] hover:bg-[#DEDEDE] font-bold justify-center items-center"
                            onClick={() => handle_ClickVote(menuObj.id, 1)}
                        >
                            +
                        </button>
                    </div>
                </span>
            </div>
        </div>
    );
}