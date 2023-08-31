import React from "react";
import Sidebar from '../components/Sidebar';
import { useLocation } from "react-router-dom";
import { productData } from "../constant/productData.js";
import ProductCard from "../components/ProductCard";

const Product = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    console.log(searchQuery);

    let filteredProducts = productData;

    if (searchQuery !== null) {
        filteredProducts = productData.filter(item =>
            item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.product.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return (
        <div className='flex'>
            <div className='flex h-screen hidden lg:block shadow z-50'>
                <Sidebar />
            </div>
            <div className='flex flex-col flex-1 lg:ml-[350px]'>
            <div className="mt-6 ml-6">ผลการค้นหาสำหรับ {searchQuery} ({filteredProducts.length} รายการ)</div>
                <div className='md:flex justify-center items-center mt-8'>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-2'>
                        {filteredProducts.map((item) => (
                            <ProductCard key={item.id} product={item.product} />
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;