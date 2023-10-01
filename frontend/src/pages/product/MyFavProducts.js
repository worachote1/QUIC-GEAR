import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MyFavProductsCard from "../../components/MyFavProductsCard.js";
import Sidebar from "../../components/Sidebar.js";
import axios from "axios";
import { testProductData } from "../../constant/testDataForAdmin.js";

const MyFavProducts = () => {
    return (
        <div className="flex-col">
            <div className="flex justify-center p-4 text-xl">
                สินค้าที่ถูกใจ
            </div>
            <div className='flex flex-col flex-1 overflow-x-hidden'>
                <div className="md:flex justify-center items-center mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-2">
                        {testProductData.map((item) => (
                            <MyFavProductsCard key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MyFavProducts;