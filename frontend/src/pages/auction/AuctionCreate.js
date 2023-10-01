import React, { useState } from 'react';
import { brand, type, subType } from '../../constant/productsConstants';
import { formatNumberInput } from '../../util/formatUtil';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

export default function AuctionCreate() {

  const navigate = useNavigate();
  const checkEmptyREGEX = /^\s*$/gm;
  const checkDigitREGEX = /^\d+$/;
  const [selectedMultipleFiles, setSelectedMultipleFiles] = useState([]);
  const [auctionData, setAuctionData] = useState({
    user_seller: {
      id: "1",
      email: "test1@gmail.com",
      username: "time_worachote",
    },
    startPrice: "",
    buyOutPrice: "",
    start_auction_date: "",
    end_auction_date: "",
    productItem: {}
  })
  const [product, setProduct] = useState({
    name: "", brand: brand[0], type: type[0], subType: subType[type[0]][0], isWireless: null, isRGB: null, description: "", imgPath: []
  });

  const alertCreatedProductSuccess = () => {
    Swal.fire(
      'Success! ',
      'Your auction has been successfully submitted. Our admins will review it shortly.',
      'success'
    )
      .then((res) => {
        if (res.isConfirmed)
          window.location.reload();
      })
  }

  const alertFormError = (err_msg) => {
    Swal.fire({
      icon: 'error',
      text: err_msg,
    })
  }

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    const productObjectKeys = Object.keys(product)
    if (productObjectKeys.includes(name))
      setProduct({ ...product, [name]: value })
    else if (name !== "start_auction_date" && name !== "end_auction_date")
      setAuctionData({ ...auctionData, [name]: value })
  }

  const handleFilesChange = (e) => {
    console.log(e.target.files)
    setSelectedMultipleFiles([...e.target.files])
  };

  const validateForm = (product, auctionData) => {
    console.log(auctionData)
    console.log(product)
    if (checkEmptyREGEX.test(product.name))
      return "Product name must not be empty !";
    else if (checkEmptyREGEX.test(auctionData.startPrice) || !checkDigitREGEX.test(auctionData.startPrice))
      return "Start Price must be only number !";
    else if (checkEmptyREGEX.test(auctionData.buyOutPrice) || !checkDigitREGEX.test(auctionData.buyOutPrice))
      return "Buyout Price must be only number !";
    else if (!product.isWireless)
      return "Please select Wired/Wireless !";
    else if (!product.isRGB)
      return "Please select RGB/Non-RGB !";
    else if (checkEmptyREGEX.test(auctionData.start_auction_date))
      return "Start date must not be empty !";
    else if (checkEmptyREGEX.test(auctionData.end_auction_date))
      return "End Date must not be empty !";
    else if (checkEmptyREGEX.test(product.description))
      return "Description must not be empty !";
    else if (!selectedMultipleFiles.length)
      return "Please select a file!";
    else if (selectedMultipleFiles.length > 5)
      return "Cannot upload more than five files !";
    return "";
  }

  const handleSubmitCreateProduct = async (e) => {
    e.preventDefault();
    const checkFormError = validateForm(product, auctionData);
    if (checkFormError)
      alertFormError(checkFormError);
    else {
      try {
        // POST /upload
        const multipleFileData = new FormData();
        for (let i = 0; i < selectedMultipleFiles.length; i++)
          multipleFileData.append('images', selectedMultipleFiles[i])
        const uploadMultiple_res = await axios.post(`${process.env.REACT_APP_QUIC_GEAR_API}/upload/multiple`, multipleFileData)
        // console.log(uploadMultiple_res.data)
        const imgNameData = uploadMultiple_res.data.map((item) => item.filename)
        const updatedProduct = { ...product, imgPath: [...imgNameData] };
        setProduct(updatedProduct)
        const updatedAuctionData = {
          ...auctionData, 
          startPrice: parseInt(auctionData.startPrice),
          buyOutPrice: parseInt(auctionData.buyOutPrice),
          productItem: { ...updatedProduct }
        }
        // POST api to create auction          
        console.log("lasted updated auction data : ")
        console.log(updatedAuctionData)
        const createAuction = await axios.post(`${process.env.REACT_APP_QUIC_GEAR_API}/auctionProducts/create`, updatedAuctionData)
        alertCreatedProductSuccess();
      }
      catch (err) {
        console.error(err)
      }
    }
  }

  const testDateTimePicker = (e) => {
    console.log("testprn")
    // console.log(e)
    const selectedDate = e.$d.toString()
    console.log(selectedDate)
  }

  // console.log(dayjs())
  // console.log(dayjs().$d)
  // console.log(new Date())
  return (
    <diV class=''>
      <form className="" onSubmit={handleSubmitCreateProduct} encType='multipart/form-data'>
        <div class="w-7/12 mt-3 mx-auto">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">JPG, JEPG, PNG</p>
            </div>
            <input id="dropzone-file" accept=".jpg,.jpeg,.png" type="file" class="hidden" onChange={handleFilesChange} name='images' multiple />
            {(selectedMultipleFiles.length) ? <p className='text-green-500'> {`${selectedMultipleFiles.map((item) => item.name)}`} </p> : <p className='text-red-500'>No file chosen</p>}
          </label>
        </div>

        <div className="flex items-center justify-center w-full">
          <div className="p-8 rounded w-7/12">

            <div>
              <label className="block mb-1 font-bold text-gray-500">Product Name</label>
              <input type="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300" name='name'
                onChange={onChangeInput} />
            </div>
            <div className='mt-2'>
              <label className="block mb-1 font-bold text-gray-500">Start Price</label>
              <input name="startPrice" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                onChange={onChangeInput} />
            </div>
            <div className='mt-2'>
              <label className="block mb-1 font-bold text-gray-500">Buyout Price</label>
              <input name="buyOutPrice" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                onChange={onChangeInput} />
            </div>
            {/* Select input */}
            <div className='mt-2'>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Brand</label>
              <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
               overflow-y-auto max-h-44"
                name='brand'
                onChange={onChangeInput}
              >
                {brand.map((item, Idx) => {
                  return <option value={item}>{item}</option>
                })}
              </select>
            </div>
            <div className='mt-2'>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Type</label>
              <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
               overflow-y-auto max-h-44"
                name='type'
                onChange={onChangeInput}
              >
                {type.map((item, Idx) => {
                  return <option value={item}>{item}</option>
                })}
              </select>
            </div>
            <div className='mt-2'>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Subtype</label>
              <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
               overflow-y-auto max-h-44"
                name='subType'
                onChange={onChangeInput}
              >
                {subType[product.type].map((item, Idx) => {
                  return <option value={item}>{item}</option>
                })}
              </select>
            </div>
            {/* radio input */}
            <div className='mt-2'>
              <label className="block mb-1 font-bold text-gray-500">Wired/Wireless</label>
              <div className='flex mt-2'>
                <div class="flex items-center mr-4">
                  <input type="radio" value={false} name="isWireless" onChange={onChangeInput} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Wired</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" value={true} name="isWireless" onChange={onChangeInput} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Wireless</label>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <label className="block mb-1 font-bold text-gray-500">RGB</label>
              <div className='flex mt-2'>
                <div class="flex items-center mr-4">
                  <input type="radio" value={true} name="isRGB" onChange={onChangeInput} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" value={false} name="isRGB" onChange={onChangeInput} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>
              </div>
            </div>
            {/* find some thing like date picker later... */}
            <div className='mt-2'>
              <label className="block mb-1 font-bold text-gray-500">Start Auction Date</label>
              <DateTimePicker
                views={['year', 'month', 'day', 'hours', 'minutes']}
                name="start_auction_date"
                onChange={(e) => setAuctionData({...auctionData , start_auction_date: e.$d.toString()})}
              />
            </div>
            <div className='mt-2'>
              <label className="block mb-1 font-bold text-gray-500">End Auction Date</label>
              <DateTimePicker
                views={['year', 'month', 'day', 'hours', 'minutes']}
                name="end_auction_date"
                onChange={(e) => setAuctionData({...auctionData , end_auction_date: e.$d.toString()})}
              />
            </div>

            <div className='mt-2'>
              <label className="block mb-1 font-bold text-gray-500">Description</label>
              <textarea type="text" name="description" value={product['description']} onChange={onChangeInput} className="w-full h-44 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"></textarea>
            </div>
            <button type="submit" className="w-full mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-300">Submit</button>

          </div>

        </div>
      </form>
    </diV>
  )
}