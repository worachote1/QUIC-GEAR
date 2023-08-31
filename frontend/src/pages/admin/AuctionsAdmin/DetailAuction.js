import React, { useState } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import { testAuctionsData } from '../../../constant/testDataForAdmin';
import { formatNumberInput } from '../../../util/formatUtil';
import Swal from 'sweetalert2';

export default function DetailAuction() {
  const prnData = testAuctionsData[2]
  console.log(prnData)
  const testImgAuction = "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS6fTP_F-x1knwvCaE2MUvApIas8TAPn7C5rmVgK4Ffi95cutI5W8rouGQW3R5f4FfXJ0PTd59WFicZiGPtufW1WlGm9kIBoJrhzcCMrm1lixikUEnh_dVI0g&usqp=CAc";
  const navigate = useNavigate();
  const alertApporveAuction = () => {
    Swal.fire(
      '',
      'Approve Auction!',
      'success'
    ).then(() => {
      navigate('/admin/check_auctions');
    })
  }

  const handleClickApprove = () => {
    // PUT API to update auction status later
    alertApporveAuction()
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=''>

        <div className="card w-96 bg-base-100 shadow-xl mr-4 mt-4">
          {/* use orderState in data base to check in order_status_imgPath*/}
          <figure><img src={testImgAuction} className='object-cover'  alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">
              Auction ID : {prnData.id}
            </h2>
            <p><span className='font-bold'>Product : </span>{prnData.product.name}</p>
            <p><span className='font-bold'>Brand : </span>{prnData.product.brand}</p>
            <p><span className='font-bold'>Type : </span>{prnData.product.type}</p>
            <p><span className='font-bold'>Seller : </span>{prnData.user_seller.username}</p>
            <p><span className='font-bold'>Start Price : </span>{formatNumberInput(prnData.startPrice)}</p>
            <p><span className='font-bold'>Duration : </span>{prnData.start_auction_date} - {prnData.end_auction_date}</p>
            
            <button className="btn btn-success" onClick={handleClickApprove}>Approve</button>
          </div>
        </div>
      </div>

    </div>
  )
}

