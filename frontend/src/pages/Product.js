import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { productData } from "../constant/productData.js";
import ProductCard from "../components/ProductCard.js";
import Sidebar from "../components/Sidebar.js";

const Product = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    const [selectedFilter, setSelectedFilter] = useState("newArrival");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [brands, setBrands] = useState(new Set());
    const [selectedBrands, setSelectedBrands] = useState(null);
    const [selectedRGB, setSelectedRGB] = useState(null);
    const [selectedWireless, setSelectedWireless] = useState(null);
    const [open, setOpen] = useState(false);
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };
    const getPriceValue = (price) => {
        return parseFloat(price.replace(/[^\d.]/g, ''));
    };
    useEffect(() => {
        const brandsSet = new Set();
        const tempFilteredProducts = [];

        productData.forEach((item) => {
            const nameIncludesQuery = item.product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const brandIncludesQuery = item.product.brand.toLowerCase().includes(searchQuery.toLowerCase());
            const typeIncludesQuery = item.product.type.toLowerCase().includes(searchQuery.toLowerCase());
            const subtypeIncludesQuery = item.product.subtype.toLowerCase().includes(searchQuery.toLowerCase());

            if (searchQuery === null || nameIncludesQuery || brandIncludesQuery || typeIncludesQuery || subtypeIncludesQuery) {
                tempFilteredProducts.push(item);
                brandsSet.add(item.product.brand);
            }
        });

        setFilteredProducts(tempFilteredProducts);
        setBrands(brandsSet);
    }, [searchQuery]);

    useEffect(() => {
        let filteredByBrand = productData;

        if (selectedFilter === "newArrival") {
            // Sort products by createdAt in ascending order (newest first)
            filteredByBrand.sort((a, b) => new Date(b.product.createAt) - new Date(a.product.createAt));
        } else if (selectedFilter === "bestSelling") {
            // Sort products by totalOrder in descending order (highest first)
            filteredByBrand.sort((a, b) => b.product.totalOrders - a.product.totalOrders);
        } else if (selectedFilter === "priceLowToHigh") {
            // Sort products by price in ascending order (low to high)
            filteredByBrand.sort((a, b) => getPriceValue(a.product.price) - getPriceValue(b.product.price));
        } else if (selectedFilter === "priceHighToLow") {
            // Sort products by price in descending order (high to low)
            filteredByBrand.sort((a, b) => getPriceValue(b.product.price) - getPriceValue(a.product.price));
        }

        if (selectedBrands !== null) {
            filteredByBrand = filteredByBrand.filter((item) =>
                selectedBrands.includes(item.product.brand)
            );
        }

        if (selectedRGB !== null) {
            filteredByBrand = filteredByBrand.filter((item) => {
                if (selectedRGB === "Yes") {
                    return item.product.isRGB === true;
                } else if (selectedRGB === "No") {
                    return item.product.isRGB === false;
                }
                return true;
            });
        }

        if (selectedWireless !== null) {
            filteredByBrand = filteredByBrand.filter((item) => {
                if (selectedWireless === "Yes") {
                    return item.product.isWireless === true;
                } else if (selectedWireless === "No") {
                    return item.product.isWireless === false;
                }
                return true;
            });
        }

        if (searchQuery !== null) {
            const searchWords = searchQuery.toLowerCase().split(' ');
            filteredByBrand = filteredByBrand.filter((item) =>
                searchWords.every((word) =>
                    item.product.name.toLowerCase().includes(word) ||
                    item.product.type.toLowerCase().includes(word) ||
                    item.product.brand.toLowerCase().includes(word) ||
                    item.product.subtype.toLowerCase().includes(word) ||
                    `${item.product.type.toLowerCase()}/${item.product.subtype.toLowerCase()}`.includes(word)
                )
            );
        }

        setFilteredProducts(filteredByBrand);
    }, [selectedBrands, selectedRGB, selectedWireless, searchQuery, selectedFilter]);


    const handleBrandCheckboxChange = (brand) => {
        if (selectedBrands === null) {
            setSelectedBrands([brand]);
        } else if (selectedBrands.includes(brand)) {
            setSelectedBrands(
                selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
            );
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    return (

        <div className="flex">
            <div className='flex h-screen hidden lg:block shadow z-50'>
                <Sidebar />
            </div>


            <div className={`fixed right-0 w-72 bg-red-800/90 text-white z-50 h-screen pt-5 duration-300 ${open ? "opacity-100" : "opacity-0 invisible"
                }`}
            >
                <div className="relative">
                    <i className="fa-solid fa-xmark absolute top-2 right-2 cursor-pointer text-2xl" onClick={() => setOpen(!open)}></i>
                </div>
                <div className="py-4 px-6">
                    <p className="text-lg font-semibold mb-2">Filter Options</p>
                    <div>
                        <p className="text-sm font-medium mb-1">Filter by Brand:</p>
                        <div className="space-y-2">
                            <input
                                type="checkbox"
                                id="brand-all"
                                value="All"
                                checked={selectedBrands === null}
                                onChange={() =>
                                    setSelectedBrands(selectedBrands === null ? [] : null)
                                }
                                className="mr-2 cursor-pointer"
                            />
                            <label htmlFor="brand-all" className="cursor-pointer">All</label>
                            {[...brands].map((brand, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`brand-${index}`}
                                        value={brand}
                                        checked={
                                            selectedBrands === null
                                                ? false
                                                : selectedBrands.includes(brand)
                                        }
                                        onChange={() => handleBrandCheckboxChange(brand)}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <label htmlFor={`brand-${index}`} className="cursor-pointer">{brand}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm font-medium mb-1">Filter by RGB:</p>
                        <div className="space-y-2">
                            <input
                                type="radio"
                                id="rgb-all"
                                value="All"
                                checked={selectedRGB === null}
                                onChange={() =>
                                    setSelectedRGB(selectedRGB === null ? "All" : null)
                                }
                                className="mr-2 cursor-pointer"
                            />
                            <label htmlFor="rgb-all" className="cursor-pointer">All </label>
                            <input
                                type="radio"
                                id="rgb-yes"
                                value="Yes"
                                checked={selectedRGB === "Yes"}
                                onChange={() =>
                                    setSelectedRGB(selectedRGB === "Yes" ? null : "Yes")
                                }
                                className="mr-2 cursor-pointer"
                            />
                            <label htmlFor="rgb-yes" className="cursor-pointer">Yes </label>
                            <input
                                type="radio"
                                id="rgb-no"
                                value="No"
                                checked={selectedRGB === "No"}
                                onChange={() =>
                                    setSelectedRGB(selectedRGB === "No" ? null : "No")
                                }
                                className="mr-2 cursor-pointer"
                            />
                            <label htmlFor="rgb-no" className="cursor-pointer">No</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm font-medium mb-1">Filter by Wire/Wireless:</p>
                        <div className="space-y-2">
                            <input
                                type="radio"
                                id="wire-all"
                                name="wire-filter"
                                value="All"
                                checked={selectedWireless === null}
                                onChange={() => setSelectedWireless(null)}
                                className="mr-2 cursor-pointer"
                            />
                            <label htmlFor="wire-all" className="cursor-pointer">All </label>
                            <input
                                type="radio"
                                id="wire-yes"
                                name="wire-filter"
                                value="Yes"
                                checked={selectedWireless === "Yes"}
                                onChange={() => setSelectedWireless("Yes")}
                                className="mr-2 cursor-pointer"
                            />
                            <label htmlFor="wire-yes" className="cursor-pointer">Yes </label>
                            <input
                                type="radio"
                                id="wire-no"
                                name="wire-filter"
                                value="No"
                                checked={selectedWireless === "No"}
                                onChange={() => setSelectedWireless("No")}
                                className="mr-2 cursor-pointer"
                            />
                            <label htmlFor="wire-no" className="cursor-pointer">No</label>
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex flex-col flex-1'>
                <div className="md:flex md:w-1/2 lg:w-screen justify-center items-center mt-8 mr-[150px] md:mr-[500px] lg:mr-[150px]">
                    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-1 gap-4 md:gap-2">
                        <div className="flex-col mt-6 md:mr-32 lg:mr-16">
                            
                            ผลการค้นหา ({filteredProducts.length} รายการ)
                            <div className="">
                                <i class="fa-solid fa-sliders text-2xl block float-left hover:cursor-pointer" onClick={() => setOpen(!open)}></i>
                            </div>
                            
                            {/* Dropdown filter */}
                            <div className="col-span-1 absolute lg:relative right-0 md:right-8 lg:left-[850px] mt-1">
                                <div className="space-y-2">
                                    <select
                                        value={selectedFilter}
                                        onChange={(e) => handleFilterChange(e.target.value)} // Add an onChange event handler
                                        className="cursor-pointer"
                                    >
                                        <option value="newArrival">New Arrival</option>
                                        <option value="bestSelling">Best Selling</option>
                                        <option value="priceLowToHigh">Price Low to High</option>
                                        <option value="priceHighToLow">Price High to Low</option>
                                    </select>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>



                <div className="md:flex justify-center items-center mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-2">

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