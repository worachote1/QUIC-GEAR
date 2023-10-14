import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { productData } from "../../constant/productData";
import ProductCard from "../../components/ProductCard";
import Sidebar from "../../components/Sidebar";
import { FaBusinessTime } from 'react-icons/fa';
import AuctionCard from "../../components/AuctionCard";
import { testAuctionsData } from "../../constant/testDataForAdmin";
import { Link } from 'react-router-dom';
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';

const Auction = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const testsearchType = searchParams.get("type");
  const testsearchSubType = searchParams.get("subType");
  const [priceExpanded, setpriceExpanded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("newArrival");
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [brands, setBrands] = useState(new Set());
  const [selectedBrands, setSelectedBrands] = useState(null);
  const [selectedRGB, setSelectedRGB] = useState("All");
  const [selectedWireless, setSelectedWireless] = useState("All");
  const [open, setOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // store Idx of auction which is expired
  const [idxToRemove, setIdxToRemove] = useState([])
  // this will be use as a call back function (props in AuctionCard)
  // in order to keep index of expired auction
  const updateListOfIdxToRemove = (auctionId) => {
    const auctionWithOutExpired = filteredProducts.filter((item) => item._id !== auctionId)
    setFilteredProducts([...auctionWithOutExpired])
    console.log("current IdxToRemove")
    console.log([...auctionWithOutExpired])
  }

  // store fecth result of those auctions with In Progress status
  const [auctionsAvailable, setAuctionsAvailable] = useState([])

  const toggleExpand = () => {
    setpriceExpanded(!priceExpanded);
  };
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };
  const getPriceValue = (price) => {
    return parseFloat(price.replace(/[^\d.]/g, ''));
  };

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

  const getAuctionsData = async () => {
    const allAuctionsData = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts`)
    const res_allAuctionsData = allAuctionsData.data;
    //get auction products which should be displayed
    const availableAuctions = res_allAuctionsData?.filter((item) => {
      // just test (it use to be in progess which is auction that confirm by admin)
      const startDate = new Date(item.start_auction_date);
      const endDate = new Date(item.end_auction_date);
      const currentDate = new Date();
      if ((endDate - currentDate >= 0) && item.auctionStatus === "in progress") {
        //update this auction that currentDate exceed endDate (with "in progress status")
        // to be "completed" and update startPrice + new userWinner(if there is some userBidder)
        
      }
      return startDate <= currentDate && (endDate - currentDate >= 0) && item.auctionStatus === "in progress"
    })
    console.log(availableAuctions)
    setAuctionsAvailable(availableAuctions)

  }

  useEffect(() => {
    window.scroll(0, 0)
    getAuctionsData()
  }, [])

  useEffect(() => {
    setFilteredProducts(auctionsAvailable)
  }, [auctionsAvailable])

  useEffect(() => {
    const brandsSet = new Set();
    const tempFilteredProducts = [];

    auctionsAvailable.forEach((item) => {

      const nameIncludesQuery = (searchQuery) ? item?.productItem.name.toLowerCase().includes(searchQuery.toLowerCase()) : "";
      const brandIncludesQuery = (searchQuery) ? item?.productItem.brand.toLowerCase().includes(searchQuery.toLowerCase()) : "";
      const typeIncludesQuery = (searchQuery) ? item?.productItem.type.toLowerCase().includes(searchQuery.toLowerCase()) : "";
      const subtypeIncludesQuery = (searchQuery) ? item?.productItem.subType.toLowerCase().includes(searchQuery.toLowerCase()) : "";
      if (searchQuery === null || nameIncludesQuery || brandIncludesQuery || typeIncludesQuery || subtypeIncludesQuery) {
        tempFilteredProducts.push(item);
        brandsSet.add(item.productItem.brand);
      }
    });

    setFilteredProducts(tempFilteredProducts);
    setBrands(brandsSet);
  }, [searchQuery]);

  useEffect(() => {
    let filteredByBrand = auctionsAvailable;
    if (selectedFilter === "newArrival") {
      // Sort products by createdAt in ascending order (newest first)
      filteredByBrand.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
    } else if (selectedFilter === "priceLowToHigh") {
      // Sort products by price in ascending order (low to high)
      filteredByBrand.sort((a, b) => a.startPrice - b.startPrice);
    } else if (selectedFilter === "priceHighToLow") {
      // Sort products by price in descending order (high to low)
      filteredByBrand.sort((a, b) => b.startPrice - a.startPrice);
    }

    if (selectedBrands !== null) {
      filteredByBrand = filteredByBrand.filter((item) =>
        selectedBrands.includes(item.productItem.brand)
      );
    }

    if (selectedRGB !== null) {
      filteredByBrand = filteredByBrand.filter((item) => {
        if (selectedRGB === "Yes") {
          return item.productItem.isRGB === true;
        } else if (selectedRGB === "No") {
          return item.productItem.isRGB === false;
        }
        return true;
      });
    }

    if (selectedWireless !== null) {
      filteredByBrand = filteredByBrand.filter((item) => {
        if (selectedWireless === "Yes") {
          return item.productItem.isWireless === true;
        } else if (selectedWireless === "No") {
          return item.productItem.isWireless === false;
        }
        return true;
      });
    }

    if (searchQuery !== null) {
      // Preprocess search words to replace '&' with 'and'
      const searchWords = searchQuery.toLowerCase().replace('&', 'and').split(' ');
      filteredByBrand = filteredByBrand.filter((item) => {
        // Preprocess product data to replace '&' with 'and'
        const typeSubtype = `${item.productItem.type.toLowerCase().replace('&', 'and')}/${item.productItem.subType.toLowerCase().replace('&', 'and')}`;
        return searchWords.every((word) => {
          const isExactMatch =
            item.productItem.name.toLowerCase().includes(word) ||
            item.productItem.brand.toLowerCase().includes(word) ||
            typeSubtype === word; // Exact match for "Type/Subtype"

          if (isExactMatch) {
            return true;
          }

          const typeAndSubtypeWords = typeSubtype.split('/'); // Split "Type/Subtype"
          return typeAndSubtypeWords.includes(word); // Check for individual type/subtype words
        });
      });
    }

    filteredByBrand = filteredByBrand.filter((item) => {
      const productPrice = item.startPrice;
      const minPriceValid = isNaN(minPrice) || minPrice === "" || productPrice >= parseFloat(minPrice);
      const maxPriceValid = isNaN(maxPrice) || maxPrice === "" || productPrice <= parseFloat(maxPrice);
      return minPriceValid && maxPriceValid;
    });

    setFilteredProducts(filteredByBrand);
  }, [selectedBrands, selectedRGB, selectedWireless, searchQuery, selectedFilter, minPrice, maxPrice]);


// 

  return (

    <div className="flex overflow-x-hidden">

      <div className='flex h-screen hidden lg:block shadow z-50'>
        <Sidebar />
      </div>

      <div className={`fixed right-0 w-72 bg-[#ebebeb] text-black z-50 h-screen pt-5 duration-300 ${open ? "opacity-100" : "opacity-0 invisible"
        }`}
      >
        <div className="relative">
          <i className="fa-solid fa-xmark absolute top-2 right-2 cursor-pointer text-2xl" onClick={() => setOpen(!open)}></i>
        </div>

        <div className="py-4 px-6">
          <p className="text-lg font-semibold mb-2">ตัวกรอง</p>
          <div className="flex items-center cursor-pointer" onClick={toggleExpand}>
            <p className="text-m font-medium mt-4">ช่วงราคา</p>
            <i
              className={`absolute right-2 mt-4 fas fa-chevron-${priceExpanded ? 'up' : 'down'}`}
            ></i>
          </div>
          {priceExpanded && (
            <div className="mt-4 flex space-x-2">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="ราคาต่ำสุด"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="border border-gray-400 rounded-md p-2 w-full"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="ราคาสูงสุด"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="border border-gray-400 rounded-md p-2 w-full"
                />
              </div>
            </div>
          )}

          <div className="mt-4">
            <p className="text-m font-medium mb-1">แบรนด์</p>
            <div className="space-y-2">
              <label htmlFor="brand-all" className="cursor-pointer flex items-center">
                <input
                  type="checkbox"
                  id="brand-all"
                  value="All"
                  checked={selectedBrands === null}
                  onChange={() =>
                    setSelectedBrands(selectedBrands === null ? [] : null)
                  }
                  className="mr-2 cursor-pointer hidden"
                />
                <div className={`w-6 h-6 border-2 border-${selectedBrands === null ? 'red-500' : 'transparent'} rounded-md flex items-center justify-center transition-colors duration-300 hover:border-red-600 focus-within:border-red-600 bg-${selectedBrands === null ? 'red-500' : 'white'}`}>
                  {selectedBrands === null && (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-${selectedBrands === null ? 'white' : 'red-500'} fill-current`} viewBox="0 0 24 24">
                      <path d="M9 16.17L5.83 13l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </div>
                <span className="text-black ml-2">ทั้งหมด</span>
              </label>

              {[...brands].map((brand, index) => (
                <div key={index} className="flex items-center">
                  <label htmlFor={`brand-${index}`} className="cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${index}`}
                      value={brand}
                      checked={selectedBrands === null ? false : selectedBrands.includes(brand)}
                      onChange={() => handleBrandCheckboxChange(brand)}
                      className="mr-2 cursor-pointer hidden"
                    />
                    <div className={`w-6 h-6 border-2 ${selectedBrands === null ? 'border-red-500' : 'border-transparent'} rounded-md flex items-center justify-center transition-colors duration-300 hover:border-red-600 focus-within:border-red-600 bg-${selectedBrands !== null && selectedBrands.includes(brand) ? 'red-500' : 'white'}`}>
                      {selectedBrands !== null && selectedBrands.includes(brand) && (
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-white fill-current`} viewBox="0 0 24 24">
                          <path d="M9 16.17L5.83 13l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-black ml-2">{brand}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">ไฟ RGB </p>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="rgb-all"
                  value="All"
                  checked={selectedRGB === "All" || selectedRGB === null}
                  onChange={() => setSelectedRGB("All")}
                  className="hidden"
                />
                <span className={`w-4 h-4 rounded-full border border-gray-400 ${selectedRGB === "All" ? 'bg-red-500' : 'bg-transparent'}`}></span>
                <span className="cursor-pointer">ทั้งหมด</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="rgb-yes"
                  value="Yes"
                  checked={selectedRGB === "Yes"}
                  onChange={() => setSelectedRGB("Yes")}
                  className="hidden"
                />
                <span className={`w-4 h-4 rounded-full border border-gray-400 ${selectedRGB === 'Yes' ? 'bg-red-500' : 'bg-transparent'}`}></span>
                <span className="cursor-pointer">มีไฟ</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="rgb-no"
                  value="No"
                  checked={selectedRGB === "No"}
                  onChange={() => setSelectedRGB("No")}
                  className="hidden"
                />
                <span className={`w-4 h-4 rounded-full border border-gray-400 ${selectedRGB === 'No' ? 'bg-red-500' : 'bg-transparent'}`}></span>
                <span className="cursor-pointer">ไม่มีไฟ</span>
              </label>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-m font-medium mb-1">มีสาย/ไร้สาย</p>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="wire-all"
                  value="All"
                  checked={selectedWireless === "All" || selectedWireless === null}
                  onChange={() => setSelectedWireless("All")}
                  className="hidden"
                />
                <span className={`w-4 h-4 rounded-full border border-gray-400 ${selectedWireless === "All" ? 'bg-red-500' : 'bg-transparent'}`}></span>
                <span className="cursor-pointer">ทั้งหมด</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="wire-no"
                  value="no"
                  checked={selectedWireless === "No"}
                  onChange={() => setSelectedWireless("No")}
                  className="hidden"
                />
                <span className={`w-4 h-4 rounded-full border border-gray-400 ${selectedWireless === 'No' ? 'bg-red-500' : 'bg-transparent'}`}></span>
                <span className="cursor-pointer">มีสาย</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="wire-yes"
                  value="yes"
                  checked={selectedWireless === "Yes"}
                  onChange={() => setSelectedWireless("Yes")}
                  className="hidden"
                />
                <span className={`w-4 h-4 rounded-full border border-gray-400 ${selectedWireless === 'Yes' ? 'bg-red-500' : 'bg-transparent'}`}></span>
                <span className="cursor-pointer">ไร้สาย</span>
              </label>
            </div>
          </div>

        </div>
      </div>

      <div className='flex flex-col flex-1'>

        <div className="md:flex lg:w-screen justify-center items-center mt-8 mr-[150px] md:mr-[500px] lg:mr-[150]px">
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-1 gap-4 md:gap-2">
            <div className="flex-col mt-6 mr-4 md:mr-24 lg:mr-16">
              ผลการค้นหา ({filteredProducts.length} รายการ)
              <div className="">
                <i class="fa-solid fa-sliders text-2xl block float-left  hover:cursor-pointer ml-1" onClick={() => setOpen(!open)}></i>
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

              <div className="mt-12 lg:mt-6">
                <Link to="/auction_create/">
                  <button className="border border-red-500 bg-white text-red-500 font-bold px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition duration-300">
                    <div className="flex justify-center items-center p-2 text-lg">
                      <span className="mr-2">
                        <FaBusinessTime size={20} />
                      </span>
                      สร้างการประมูล
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex justify-center lg:mr-[550px] items-center mt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-2">

            {filteredProducts.slice().reverse()?.map((item) => (
              <AuctionCard AuctionItem={item} callbackUpdate={updateListOfIdxToRemove}/>
            ))}
          </div>
        </div>


      </div>
    </div >


  );
};

export default Auction;