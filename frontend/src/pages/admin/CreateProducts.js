import React, { useState } from 'react';
import { brand, type } from '../../constant/productConstants';
import Swal from 'sweetalert2';

export default function CreateProducts() {
  const checkEmptyREGEX = /^\s*$/gm;
  const checkDigitREGEX = /^\d+$/;
  const [product, setProduct] = useState({
    name: "", price: "", stock: "", brand: brand[0], type: type[0], isWired: "", isRGB: "", description: "", imgPath: ""
  });

  const alertFormError = (err_msg) => {
    Swal.fire({
      icon: 'error',
      text: err_msg,
    })
  }

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    setProduct({ ...product, imgPath: fileName })
  };

  const validateForm = (product) => {
    if (checkEmptyREGEX.test(product.name))
      return "Product name must not be empty !";
    else if (checkEmptyREGEX.test(product.price) || !checkDigitREGEX.test(product.price))
      return "Price must be only number !";
    else if (checkEmptyREGEX.test(product.stock) || !checkDigitREGEX.test(product.stock))
      return "Stock of product must be only number !";
    else if (!product.isWired)
      return "Please select Wired/Wireless !";
    else if (!product.isRGB)
      return "Please select RGB/Non-RGB !";
    else if (checkEmptyREGEX.test(product.description))
      return "Description must not be empty !";
    else if (!product.imgPath)
      return "Please select a file !";
    return "";
  }

  const handleSubmitCreateProduct = (e) => {
    e.preventDefault();
    const checkFormError = validateForm(product);
    if (checkFormError)
      alertFormError(checkFormError);
    else {
      // POST api to product later
      console.log("create product success")
    }
    console.log(product)
  }
  return (
    <diV class=''>
      <div class="w-7/12 mt-3 mx-auto">
        <form>
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">JPG, JEPG, PNG</p>
            </div>
            <input id="dropzone-file" accept=".jpg,.jpeg,.png" type="file" class="hidden" onChange={handleFileChange} />
            {(product.imgPath) ? <p className='text-green-500'> {`${product.imgPath}`} </p> : <p className='text-red-500'>No file chosen</p>}
          </label>
        </form>
      </div>

      <div className="flex items-center justify-center w-full">
        <div className="p-8 rounded w-7/12">
          <form className="" onSubmit={handleSubmitCreateProduct} >
            <div>
              <label className="block mb-1 font-bold text-gray-500">Product Name</label>
              <input type="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300" name='name'
                onChange={onChangeInput} />
            </div>
            <div className='mt-2'>
              <label className="block mb-1 font-bold text-gray-500">Price</label>
              <input name="price" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                onChange={onChangeInput} />
            </div>
            <div className='mt-2'>
              <label className="block mb-1 font-bold text-gray-500">Stock</label>
              <input name="stock" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
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
            {/* radio input */}
            <div className='mt-2'>
              <label className="block mb-1 font-bold text-gray-500">Wired/Wireless</label>
              <div className='flex mt-2'>
                <div class="flex items-center mr-4">
                  <input type="radio" value="wired" name="isWired" onChange={onChangeInput} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Wired</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" value="wireless" name="isWired" onChange={onChangeInput} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Wireless</label>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <label className="block mb-1 font-bold text-gray-500">RGB</label>
              <div className='flex mt-2'>
                <div class="flex items-center mr-4">
                  <input type="radio" value="isRGB" name="isRGB" onChange={onChangeInput} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" value="isNotRGB" name="isRGB" onChange={onChangeInput} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <label className="block mb-1 font-bold text-gray-500">Description</label>
              <textarea type="text" name="description" value={product['description']} onChange={onChangeInput} className="w-full h-44 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"></textarea>
            </div>
            <button type="submit" className="w-full mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-300">Submit</button>
          </form>
        </div>
      </div>


    </diV>
  )
}
