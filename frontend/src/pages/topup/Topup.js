import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { formatNumberInput } from '../../util/formatUtil';
import { defaultPrompayImg } from '../../constant/transactionsConstant';
import { Link, useNavigate } from 'react-router-dom';

export default function Topup() {

  const navigate = useNavigate();
  const validExtensions = ['jpg', 'jpeg', 'png'];
  const [selectedFile, setSelectedFile] = useState(null);
  const [topupAmount, setTopupAmount] = useState('');
  const [qrPromtpayImgSrc, setqrPromtpayImgSrc] = useState(defaultPrompayImg);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const alertTopupSuccess = () => {
    Swal.fire(
      'Congratulations!',
      'Your top-up was successful. Please wait for the admin to update your coin balance.',
      'success'
    )
    .then((res) => {
      if (res.isConfirmed)
        navigate('/');
    })
  }

  const alertTopupInvalid = (err_status) => {
    //Topup invalid : amount < 100
    if (err_status === "invalid_amount")
      Swal.fire({
        icon: 'error',
        title: 'Invalid top-up amount',
        text: 'Please make sure to top up at least 100 baht.',
      })

    //Topup invalid : empty file input
    else if (err_status === "invalid_file_empty") {
      Swal.fire({
        icon: 'error',
        title: 'File empty',
        text: 'Please select a file',
      })
    }

    //Topup invalid : invalid file extension
    else if (err_status === "invalid_file_extension") {
      Swal.fire({
        icon: 'error',
        title: 'Invalid file extension',
        text: 'Please select a file with the allowed extensions: ' + validExtensions.join(', ')
      })
    }
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

  // POST api to create promtpay qr
  const handleGenQrpromtpay = async () => {
    if (topupAmount === '' || parseInt(topupAmount) < 100 || isNaN(topupAmount)) {
      alertTopupInvalid("invalid_amount");
    }
    else {
      try {
        const topup_res = await axios.post(`${process.env.REACT_APP_QUIC_GEAR_API}/topup`, {
          amount: parseFloat(topupAmount)
        })
        setqrPromtpayImgSrc(topup_res.data.res_url)
      } catch (err) {
        console.error(err)
      }
    }
  }
 
  // POST api to create new transaction 
  const handleSubmitTopup = async (event) => {
    event.preventDefault();
    if (topupAmount === '' || parseInt(topupAmount) < 100 || isNaN(topupAmount)) {
      alertTopupInvalid("invalid_amount");
      return;
    }
    if (!selectedFile) {
      alertTopupInvalid("invalid_file_empty");
      return;
    }
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      alertTopupInvalid("invalid_file_extension");
      return;
    }

    try {
      // POST upload
      const singleFileData = new FormData();
      singleFileData.append('image', selectedFile);
      const uploadSingleFile_res = await axios.post(`${process.env.REACT_APP_QUIC_GEAR_API}/upload/single`, singleFileData);
      console.log("ab")
      console.log(uploadSingleFile_res);
      // then POST transaction
      // process.env.REACT_APP_QUIC_GEAR_API}/transactions/create
      const createTransactions = await axios.post(`${process.env.REACT_APP_QUIC_GEAR_API}/transactions/create`, {
        transactionType: "topup",
        imgPath: uploadSingleFile_res.data.path,
        userID: 6,
        amount: parseInt(topupAmount)
      });
      alertTopupSuccess();
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <div class="min-h-screen flex items-center justify-center">
      <div className='mt-2'>
        <div className="card card-compact w-96 bg-base-100">
          <figure><img src={qrPromtpayImgSrc} alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">กรอกจํานวนเงิน </h2>
            <div className='flex flex-col'>
              <input type="text" placeholder="Type here" className="input input-bordered w-full" value={formatNumberInput(topupAmount)} onChange={(e) => amountFormHandler(e)} />
              <button className="btn btn-[#e6e6e6] w-2/4 mt-2 mx-auto" onClick={handleGenQrpromtpay}>สร้าง QR Code</button>
              <p className='text-red-500 mt-2'>*ยอดขั้นตํ่า : 100 THB</p>
              <div className="card-actions justify-around mt-2">
                <button className="btn btn-[#e6e6e6]" onClick={() => clickPlusAmount(100)}>+ 100</button>
                <button className="btn btn-[#e6e6e6]" onClick={() => clickPlusAmount(300)}>+ 300</button>
                <button className="btn btn-[#e6e6e6]" onClick={() => clickPlusAmount(500)}>+ 500</button>
                <button className="btn btn-[#e6e6e6]" onClick={() => clickPlusAmount(1000)}>+ 1000</button>
              </div>
            </div>
            <form className="" onSubmit={handleSubmitTopup} encType='multipart/form-data'>
              <div class="proof-of-payment mt-2">
                <label
                  for="formFile"
                  class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                > <p className='text-red-500'>*กรุณาแนบหลักฐานการชําระเงิน</p></label>
                <input
                  class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
              </div>
              <button className="btn bg-[#a51d2d] w-full mt-2 text-white rounded-full" type='submit'>ยืนยัน</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}