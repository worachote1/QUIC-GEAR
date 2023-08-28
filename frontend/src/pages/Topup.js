import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Topup() {

  const defaultPrompayImg = "https://www.thaiichr.org/wp-content/uploads/2022/11/%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B9%80%E0%B8%9E%E0%B8%A2%E0%B9%8C-1.png";
  const [topupAmount, setTopupAmount] = useState('');
  const [qrPromtpayImgSrc, setqrPromtpayImgSrc] = useState(defaultPrompayImg);

  const formatTopup = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const alertTopupInvalid = () => {
    Swal.fire({
      icon: 'error',
      title: 'Invalid top-up amount',
      text: 'Please make sure to top up at least 100 baht.',
    })
  }

  const amountFormHandler = (e) => {
    const amount = e.target.value.replace(/,/g, '');
    if (!isNaN(amount)) {
      setTopupAmount(amount)
    }
  }

  const clickPlusAmount = (amount) => {

    if (topupAmount === '') {
      setTopupAmount(amount.toString());
    }
    else {
      let cur_val = parseInt(topupAmount);
      let res = cur_val + amount;
      setTopupAmount(res.toString());
    }
  }

  const handleSubmitTopup = (event) => {
    event.preventDefault();
    if (topupAmount === '' || parseInt(topupAmount) < 100 || isNaN(topupAmount)) {
      alertTopupInvalid();
    }
    else { 
      axios.post('http://localhost:5000/genPromtpayQR', {
        amount: parseFloat(topupAmount)
      })
        .then(function (response) {
          setqrPromtpayImgSrc(response.data.res_url)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <div class="min-h-screen flex items-center justify-center">
      <div className='mt-2'>
        {/* sm:mx-auto sm:w-full sm:max-w-md */}
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure><img src={qrPromtpayImgSrc} alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">กรอกจํานวนเงิน (บาท)</h2>
            <div>
              <form className="" onSubmit={handleSubmitTopup}>
                <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full" value={formatTopup(topupAmount)} onChange={(e) => amountFormHandler(e)} />
                {/* <button className="btn bg-green-500 w-full mt-2" type='submit'></button> */}
                <button className="btn bg-green-500 w-full mt-2" type='submit'>ยืนยัน</button>
              </form>
            </div>
            <p className='text-red-500'>ยอดขั้นตํ่า : 100 THB</p>
            <div className="card-actions justify-around mt-3">
              <button className="btn btn-primary" onClick={() => clickPlusAmount(100)}>+ 100</button>
              <button className="btn btn-primary" onClick={() => clickPlusAmount(500)}>+ 500</button>
              <button className="btn btn-primary" onClick={() => clickPlusAmount(900)}>+ 900</button>
              <button className="btn btn-primary" onClick={() => clickPlusAmount(1000)}>+ 1000</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}