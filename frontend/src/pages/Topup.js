import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Topup() {

  const [topupAmount, setTopupAmount] = useState('');
  const [qrPromtpayImgSrc, setqrPromtpayImgSrc] = useState("https://www.thaiichr.org/wp-content/uploads/2022/11/%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B9%80%E0%B8%9E%E0%B8%A2%E0%B9%8C-1.png");
  const amountFormHandler = (e) => {
    if (!isNaN(e.target.value)) {
      setTopupAmount(e.target.value)
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

  //fetch POST API to http://localhost:5000/genPromtpayQR
  const handleSubmitTopup = (event) => {
    event.preventDefault();
    if (topupAmount === '' || parseInt(topupAmount) < 100 || isNaN(topupAmount)) {
      alert("amonut top up must be number >= 100")
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
                <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full" value={topupAmount} onChange={(e) => amountFormHandler(e)} />
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