import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MyFavProductsCard from "../../components/MyFavProductsCard.js";
import Sidebar from "../../components/Sidebar.js";
import axios from "axios";
import { testProductData } from "../../constant/testDataForAdmin.js";
import '../../App.css'

const MyFavProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Number of items to display per page
    const totalPages = Math.ceil(testProductData.length / itemsPerPage);
  
    // Calculate the range of products to display for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToDisplay = testProductData.slice(startIndex, endIndex);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const goToNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };

    return (
        <div className="flex-col">
            <div className="flex justify-center p-4 text-xl">
                สินค้าที่ถูกใจ
            </div>

            {/* ProductCard */}
            <div className='flex flex-col flex-1 overflow-x-hidden'>
                <div className="md:flex justify-center items-center mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-2">
                        {productsToDisplay.map((item) => (
                            <MyFavProductsCard key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="mr-4 p-2 rounded-full hover:bg-[#d6d3d1]"
                    style={{
                        width: '30px', // Adjust the size as needed
                        height: '30px', // Adjust the size as needed
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <i className="fas fa-chevron-left"></i>
                </button>
                <ul className="flex space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <li
                    key={index}
                    className={`cursor-pointer ${
                        currentPage === index + 1 ? 'font-bold' : 'hover:text-red-300'
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                    style={{
                        background: currentPage === index + 1 ? '#fca5a5' : 'transparent',
                        color: currentPage === index + 1 ? '#b91c1c' : 'black',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                    {index + 1}
                    </li>
                ))}
                </ul>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="ml-4 p-2 rounded-full hover:bg-[#d6d3d1]"
                    style={{
                        width: '30px', // Adjust the size as needed
                        height: '30px', // Adjust the size as needed
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div >
    );
};

export default MyFavProducts;