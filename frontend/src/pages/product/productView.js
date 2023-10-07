import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import { productData } from "../../constant/productData"
import Swal from 'sweetalert2';
import { useCart } from '../../components/CartContext';
import ProductMobilebar from '../../components/ProductMobilebar';
import { useParams } from 'react-router-dom';
import { AiOutlineDollarCircle } from 'react-icons/ai'
import axios from "axios";

export default function ProductView() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //const id = searchParams.get('id');
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [productImg, setProductImg] = useState([]);
  const [isFav,setIsFav] = useState(false);

  const { id } = useParams();

  const prevSlide = () => {
    const newArrayIndex = arrayIndex.map((index) => {
      let newIndex = index - 1;
      if (newIndex < 0) {
        newIndex = productImg.length - 1;
      }
      return newIndex;
    });

    setArrayIndex(newArrayIndex);
  };

  const mobilePrevImg = () => {
    if(hoverIndex == 0) {
        setHoverIndex(productImg.length-1);
    } else {
        setHoverIndex(hoverIndex-1);
    }
}

const mobileNextImg = () => {
    if(hoverIndex == productImg.length-1) {
        setHoverIndex(0);
    } else {
        setHoverIndex(hoverIndex+1);
    }
};

const getProductData = async () => {
  const Product = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/products/${id}`)
  //console.log(Product.data)
  const res_Product = Product.data
  setProduct(res_Product);
  setProductImg(res_Product.imgPath);
  //console.log(res_Product.imgPath)

}

  const [arrayIndex, setArrayIndex] = useState([0, 1, 2]); // ให้ arrayIndex มีค่าเริ่มต้นเป็น [0, 1, 2]
  const [hoverIndex, setHoverIndex] = useState(0);

  const nextSlide = () => {
    const newArrayIndex = arrayIndex.map((index) => {
      let newIndex = index + 1;
      if (newIndex >= productImg.length) {
        newIndex = 0;
      }
      return newIndex;
    });

    setArrayIndex(newArrayIndex);
  };

  /*useEffect(() => {
    const idAsNumber = parseInt(id);

    const fetchedProduct = productData.find((entry) => entry.product.id === idAsNumber);

    if (fetchedProduct) {
      setProduct(fetchedProduct.product);
    } else {
      setProduct(null);
    }
  }, [id]);*/

  const checkIsFav = async () => {

    if(sessionStorage.getItem('current_user') !== null) {
      const data = JSON.parse(sessionStorage.getItem('current_user'));
      const userData = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/users/`+data._id)
      const favData = [...userData.data.favList];
      if(favData.some(item => item._id === id)) {
          setIsFav(true);
      } else {
          setIsFav(false);
      }
    }
  }

  useEffect(()=>{
    getProductData();
    checkIsFav();
  },[])

  const productImages = product ? [{ url: product.imgPath }, /* Add more images if needed */] : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [amount, setAmount] = useState(1);

  const plusAmount = () => {
    if(amount < product.stock) {
      setAmount(amount + 1);
    }
  };

  const minusAmount = () => {
    if (amount > 1)
      setAmount(amount - 1);
  };

  const clickFavIcon = async () => {
    if(sessionStorage.getItem('current_user') !== null) {
      //const userData = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/users/`)
      const data = JSON.parse(sessionStorage.getItem('current_user'));
      //console.log(data._id);

      const userData = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/users/${data._id}`)
      const favData = [...userData.data.favList];
      //const favData = [];
      //console.log(favData);
      //console.log(id);

      if(favData.some(item => item._id === id)) {
        //console.log("Contain key Do something...");
        const newArray = favData.filter(item => item._id !== id);
        axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/users/update/${data._id}`,{ favList: newArray });
        //console.log(newArray);
        setIsFav(false);
        Swal.fire({
          title: "ลบสินค้าออกจากรายการโปรด",
          text: `ทำการลบ ${product.name} เรียบร้อยแล้ว`,
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#a51d2d",
          cancelButtonColor: "#a51d2d",
          confirmButtonText: "<span class='text-white'>ยืนยัน</span>",
        })
      } else {
        //console.log("Not Contain Added");
        favData.push(id);
        //console.log(favData);
        axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/users/update/${data._id}`,{ favList: favData });
        setIsFav(true);

        Swal.fire({
          title: "เพิ่มสินค้าลงรายการโปรด",
          text: `ทำการเพิ่ม ${product.name} เรียบร้อยแล้ว`,
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#a51d2d",
          cancelButtonColor: "#a51d2d",
          confirmButtonText: "<span class='text-white'>ยืนยัน</span>",
        })
      }
    }

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
          <p className='font-Prompt text-sm text-black text-start'>
            <Link to="/" >หน้าแรก</Link> {'>'}
            <Link to={`/product?search=${product.subtype}`} > {product.subtype}</Link> {'>'}
            <Link to={`/product?search=${product.name}`} className='font-bold'> {product.name}</Link>
          </p>
        </div>
        <div class='flex flex-col sm:flex-row'>
          <div class='flex justify-center h-full w-5/12 backdrop:relative '>
            <div class='h-[300px] w-full lg:w-8/12 lg:ml-16'>
              <img

                src={`/uploads/${productImg[hoverIndex]}`}
                class='w-full h-full rounded-3xl duration-500 bg-center object-contain'
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
            <p class='flex py-4 font-Prompt text-sm'>Product ID: {product._id}</p>
            <p class='flex font-Prompt text-3xl text-[#a51d2d] font-bold'>
              <div className="flex flex-row items-center">
               <AiOutlineDollarCircle class=' text-3xl' /> {product.price}
              </div>
            </p>
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
              <p class='flex rounded w-24 h-6 bg-[#F1F1F1] justify-between items-center'>
                <div class='flex'>
                  <button class='flex rounded w-6 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] font-bold justify-center items-center' onClick={minusAmount}>-</button>
                </div>
                {amount}
                <div class='flex'>
                  <button class='flex rounded w-6 h-6 bg-[#F1F1F1] hover:bg-[#DEDEDE] font-bold justify-center items-center' onClick={plusAmount}>+</button>
                </div>
              </p>
              <p class='flex text-xs justify-center items-center'>มีสินค้าทั้งหมด {product.stock} ชิ้น </p>
            </div>
            <div class='md:flex flex-row gap-x-3 py-3 hidden'>
              <button className="hover:text-red-500" onClick={clickFavIcon}>
                <i className={`${isFav === true ? 'fas fa-heart text-red-500' : 'fa-regular fa-heart'}`} style={{ fontSize: '2.3rem' }}></i>
              </button>
              <button class='flex rounded-full w-48 h-11 bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center'
                onClick={() => hanldeClickAdd_ForCart(product.id, product.name, product.price, product.imgPath, amount)}>เพิ่มไปยังรถเข็น</button>
              <button class='flex rounded-full w-48 h-11 bg-[#A51D2D] hover:bg-[#841724] justify-center items-center text-white'>ซื้อสินค้า</button>
            </div>
          </div>
        </div>
        <div class="flex lg:ml-28">
          <div class='lg:flex justify-center h-full hidden'>
            <div class='flex h-full'>
              <div class="w-2/12 flex items-center">
                <div class="w-full text-center">
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
                          className={`h-28 w-32 rounded-md overflow-hidden object-contain`}
                          onMouseEnter={() => setHoverIndex(index)}
                          src={`/uploads/${productImg[index]}`}
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