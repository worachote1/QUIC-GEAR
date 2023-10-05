import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import { productData } from '../constant/productData';
import Swal from 'sweetalert2';
import { useCart } from '../components/CartContext';
import ProductMobilebar from '../components/ProductMobilebar';
export default function ProductView() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  const slides = [
    {
      url: 'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/logitech-g-pro-x-superlight-wireless-gaming-mouse-white-icon.jpg'
    },
    {
      url: 'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/01/Logitech%20G%20Pro%20X%20Superlight%20Wireless%20Gaming%20Mouse.jpg'
    },
    {
      url: 'https://cdn.discordapp.com/attachments/696053498739163146/1147254999613722654/Logitech-G-Pro-X-Superlight-21.png'
    },
    {
      url: 'https://cdn.discordapp.com/attachments/696053498739163146/1147255092014223510/Logitech-G-Pro-X-Superlight-31.png'
    },
    {
      url: 'https://cdn.discordapp.com/attachments/696053498739163146/1147255223186882681/Logitech-G-Pro-X-Superlight-41.png'
    },
    {
      url: 'https://cdn.discordapp.com/attachments/696053498739163146/1147255245752246363/logitech-g-pro-x-superlight-wireless-gaming-mouse-white-lifestyle.png'
    }
  ];

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

  const mobilePrevImg = () => {
    if(hoverIndex == 0) {
        setHoverIndex(slides.length-1);
    } else {
        setHoverIndex(hoverIndex-1);
    }
}

const mobileNextImg = () => {
    if(hoverIndex == slides.length-1) {
        setHoverIndex(0);
    } else {
        setHoverIndex(hoverIndex+1);
    }
};

  const [arrayIndex, setArrayIndex] = useState([0, 1, 2]); // ให้ arrayIndex มีค่าเริ่มต้นเป็น [0, 1, 2]
  const [hoverIndex, setHoverIndex] = useState(0);

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

  useEffect(() => {
    const idAsNumber = parseInt(id);

    const fetchedProduct = productData.find((entry) => entry.product.id === idAsNumber);

    if (fetchedProduct) {
      setProduct(fetchedProduct.product);
    } else {
      setProduct(null);
    }
  }, [id]);

  const productImages = product ? [{ url: product.imgPath }, /* Add more images if needed */] : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [amount, setAmount] = useState(1);

  const plusAmount = () => {
    setAmount(amount + 1);
  };

  const minusAmount = () => {
    if (amount > 1)
      setAmount(amount - 1);
  };

  const hanldeClickAdd_ForCart = (id, itemName, itemPrice, imgPath, amount) => {
    itemPrice = parseFloat(String(itemPrice).replace(/,/g, ''));
    amount = parseFloat(String(amount).replace(/,/g, ''));

    let temp_obj = {
      "id": id,
      "itemName": itemName,
      "itemPrice": itemPrice,
      "imgPath": imgPath,
      "quantity": amount
    }
    // not have any menu in basket create session : currrent_cartItem
    if (sessionStorage.getItem("currrent_cartItem") === null) {
      sessionStorage.setItem("currrent_cartItem", JSON.stringify([temp_obj]))
      // window.location.reload()
    }
    // add property of that menu to array of JSON (currrent_menuInBasket Session)
    // find if that menu not in basket  
    else {
      const cur_CartData = JSON.parse((sessionStorage.getItem("currrent_cartItem")))
      const itemIndex = cur_CartData.findIndex(item => item.id === id);
      // 
      if (cur_CartData.find(obj => obj.id === id) === undefined) {
        cur_CartData.push(temp_obj)

      }
      else {
        cur_CartData[itemIndex].quantity += amount;
      }
      sessionStorage.setItem("currrent_cartItem", JSON.stringify(cur_CartData))
      // window.location.reload()
    }
    addToCart(temp_obj);
    Swal.fire({
      title: "เพิ่มสินค้าลงรถเข็น",
      text: `${itemName} จำนวน ${amount} ชิ้น`,
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#ebebeb",
      cancelButtonColor: "#a51d2d",
      confirmButtonText: "<span class='text-black'>ไปที่รถเข็น</span>",
      cancelButtonText: "เลือกสินค้าเพิ่มเติม",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/cart"; // ไปหน้าตะกร้า
      } else {
        // ช้อปปิ้งต่อ - ไม่ต้องทำอะไร
      }
    });
  }



  if (!product) {
    // Handle the case where the product with the given id is not found
    return <div>Product not found</div>;
  }

  return (
    <div className='flex flex-col flex-1 lg:ml-[200px]'>
      <div class='flex flex-col justify-center'>
        <div class='flex h-full relative p-8 hidden lg:block'>
          <p className='font-Prompt text-sm text-black'>
            <Link to="/" >หน้าแรก</Link> {'>'}
            <Link to={`/product?search=${product.subtype}`} > {product.subtype}</Link> {'>'}
            <Link to={`/product?search=${product.name}`} className='font-bold'> {product.name}</Link>
          </p>
        </div>
        <div class='flex flex-col sm:flex-row'>
          <div class='relative group'>
            <div class='flex justify-center items-center h-full w-full lg:mr-16'>
              <img

                src={slides[hoverIndex].url}
                class='w-2/4 rounded-3xl duration-500 bg-center'
              />
              {/* Left Arrows */}
              <button onClick={mobilePrevImg} class="md:hidden absolute top-[50%] -translate-x-0 translate-y-[-50]% left-5 text-xl rounded-full p-2 bg-gray-600 text-white cursor-pointer">
                <BsChevronCompactLeft size={15} />
              </button>
              {/* Right Arrows */}
              <button onClick={mobileNextImg} class="md:hidden absolute top-[50%] -translate-x-0 translate-y-[-50]% right-5 text-xl rounded-full p-2 bg-gray-600 text-white cursor-pointer">
                <BsChevronCompactRight size={15} />
              </button>
            </div>
          </div>
          <div class='flex flex-col justify-start mt-4 sm:w-3/6 md:w-[450px] lg:w-3/6 ml-3'>
            <p class='flex font-Prompt text-3xl font-bold'>{product.name}</p>
            <p class='flex py-4 font-Prompt text-sm'>Product ID: {product.id}</p>
            <p class='flex font-Prompt text-3xl text-[#a51d2d] font-bold'>{product.price} บาท</p>
            <div class='flex flex-row gap-x-3 py-3'>
              <p class='flex w-24 h-6'>สี</p>
              <button class='flex rounded w-24 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center'>ดำ</button>
              <button class='flex rounded w-24 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center'>เทา</button>
              <button class='flex rounded w-24 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center'>ขาว</button>
            </div>
            <div class='flex flex-row gap-x-3 py-3'>
              <p class='flex w-24 h-6'>Option</p>
              <button class='flex rounded w-24 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center'>A</button>
              <button class='flex rounded w-24 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center'>B</button>
            </div>
            <div class='flex flex-row gap-x-3 py-3'>
              <p class='flex w-24 h-6'>จำนวน</p>
              <p class='flex rounded w-28 h-6 bg-[#F1F1F1] justify-between items-center'>{amount}
                <div class='flex'>
                  <button class='flex rounded w-6 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] font-bold justify-center items-center' onClick={plusAmount}>+</button>
                  <button class='flex rounded w-6 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] font-bold justify-center items-center' onClick={minusAmount}>-</button>
                </div>
              </p>
              <p class='flex text-xs justify-center items-center'>มีสินค้าทั้งหมด 27 ชิ้น </p>
            </div>
            <div class='md:flex flex-row gap-x-3 py-3 hidden'>
              <button className="hover:text-red-500"><i className="fas fa-heart" style={{ fontSize: '2.3rem' }}></i></button>
              <button class='flex rounded-full w-48 h-11 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center'
                onClick={() => hanldeClickAdd_ForCart(product.id, product.name, product.price, product.imgPath, amount)}>เพิ่มไปยังรถเข็น</button>
              <button class='flex rounded-full w-48 h-11 bg-[#A51D2D] hover:bg-[#841724] justify-center items-center text-white'>ซื้อสินค้า</button>
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <div class='lg:flex justify-start h-full w-full hidden'>
            <div class='flex h-full w-3/6 ml-20'>
              <div class="w-2/12 flex items-center">
                <div class="w-full text-end mr-4">
                  <button onClick={prevSlide} class="p-3 rounded-full hover:bg-[#FAFAFA] bg-white border-gray-700 shadow-lg">
                    <BsChevronCompactLeft />
                  </button>
                </div>
              </div>
              <div id="sldierContainer" class="overflow-hidden">
                <ul id="slider" class='flex w-full max-w-screen-xl mx-auto'>
                  {arrayIndex.map((index) => (
                    <li key={index} className="p-2 overflow-hidden">
                      <div className={`border-2 rounded-2xl overflow-hidden ${hoverIndex === index ? 'border-2 rounded-2xl border-rose-600' : ''}`}>
                        <img
                          className={`h-28 w-full rounded-md overflow-hidden`}
                          onMouseEnter={() => setHoverIndex(index)}
                          src={slides[index].url}
                          alt=""
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div class="w-2/12 flex items-center ">
                <div class="w-full text-start ml-4">
                  <button onClick={nextSlide} class="p-3 rounded-full hover:bg-[#FAFAFA] bg-white border-gray-700 shadow-lg">
                    <BsChevronCompactRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class='flex w-full h-full justify-center p-8 mb-10'>
          <div class='flex flex-col w-full sm:w-3/4 text-sm items-start'>
            Product Description
            <p class='flex w-full py-4 text-left'>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            </p>
          </div>
        </div>
      </div>
      <div class='sm:flex md:hidden'>
          <ProductMobilebar />
      </div>
    </div>
  )
}