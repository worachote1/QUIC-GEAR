import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Login() {

  const [userData, setUserData] = useState({
    username: "",
    password: ""
  })
  const [focusedData, setFocusedData] = useState({
    username: false,
    password: false
  })

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const inputType = showPassword ? 'text' : 'password';
  const navigate = useNavigate();

  const alertLogInSuccess = () => {
    Swal.fire(
      'Success! ',
      'You have successfully logged in.',
      'success'
    )
      .then((res) => {
        if (res.isConfirmed)
          navigate('/');
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
    setUserData({ ...userData, [name]: value })
  }

  const onChangeFocusedInput = (e, isFocused) => {
    const { name } = e.target;
    setFocusedData({ ...focusedData, [name]: isFocused })
  }

  const validateNamePassword = () => {
    const testName = (/^\s*$/gm).test(userData.username);
    const testPassword = (/^\s*$/gm).test(userData.password);
    if (testName) {
      setError("Username can't be empty");
    }
    else if (testPassword) {
      setError("Password can't be empty");
    } else {
      setError('');
      return true;
    }
    return false;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    if (!validateNamePassword())
    {
      return;
    }
    try{
      const logInUser = await axios.post(`${process.env.REACT_APP_QUIC_GEAR_API}/users/login`, {...userData});
      const res_LogInUser = logInUser.data;
      sessionStorage.setItem('current_user',JSON.stringify(res_LogInUser));
      alertLogInSuccess();
    }
    catch(err){
      const res_err = err.response.data
      alertFormError(res_err.message)
    }
  }

  return (
    <div>
      <div className="min-h-[75vh] flex flex-col items-center justify-center">
        {/* <div className="bg-white p-8 rounded shadow-xl w-full max-w-md"> */}
        <img
          className="mb-16"
          src="https://media.discordapp.net/attachments/1008605866624303204/1146757863205769276/quicgear.png?width=1440&height=288"
          style={{ width: '375px', height: '76px' }}
        />
        {/* <h2 className="mt-6 mb-4 text-center text-3xl font-extrabold text-gray-900 ">
            Login to your account
          </h2> */}
        <form className="space-y-4" onSubmit={handleLogIn}>
          <div className='mb-16'>
            <div class="flex justify-end items-center relative">
              <input type="name" name="username" className="w-96 mb-0.5 px-4 py-2 border border-gray-300 rounded-t-lg focus:outline-none focus:ring focus:ring-[#a51d2d]" placeholder="ชื่อผู้ใช้"
                onChange={onChangeInput}
                onFocus={(e) => onChangeFocusedInput(e, true)}
                onBlur={(e) => onChangeFocusedInput(e, false)}
              />
              {!focusedData.username && (
                <svg
                  class="absolute mr-3"
                  fill="none"
                  width="15"
                  height="15"
                  xmlns="http://www.w3.org/2000/svg"
                  id="screenshot-8e07e746-003b-8095-8003-0e0d7d517558"
                  version="1.1"
                  viewBox="4610.5 191.248 21.251 21.252"
                >
                  <g id="shape-8e07e746-003b-8095-8003-0e0d7d517558">
                    <g className="fills" id="fills-8e07e746-003b-8095-8003-0e0d7d517558">
                      <path
                        rx="0"
                        ry="0"
                        fill="#2e3436"
                        d="M4627.416,191.248C4626.549,191.260,4625.664,191.594,4624.879,192.379L4611.379,205.879C4610.816,206.441,4610.500,207.203,4610.500,208.000L4610.500,212.500L4615.000,212.500C4615.797,212.500,4616.559,212.184,4617.121,211.621L4630.621,198.121C4633.305,195.438,4630.744,191.535,4627.785,191.266C4627.662,191.248,4627.539,191.248,4627.416,191.248ZM4624.750,196.656L4626.344,198.250L4615.750,208.844L4614.156,207.250ZM4624.750,196.656"
                      ></path>
                    </g>
                  </g>
                </svg>
              )}

            </div>

            <div class="flex justify-end items-center relative">
              <input type={inputType} name="password" className="w-full px-4 py-2 border border-gray-300 rounded-b-lg focus:outline-none focus:ring focus:ring-[#a51d2d]" placeholder="รหัสผ่าน"
                onChange={onChangeInput}
                onFocus={(e) => onChangeFocusedInput(e, true)}
                onBlur={(e) => onChangeFocusedInput(e, false)}
              />
              {!focusedData.password && (
                <svg
                  class="absolute mr-9 "
                  fill="none"
                  width="15"
                  height="15"
                  xmlns="http://www.w3.org/2000/svg"
                  id="screenshot-8e07e746-003b-8095-8003-0e0d7d517558"
                  version="1.1"
                  viewBox="4610.5 191.248 21.251 21.252"
                >
                  <g id="shape-8e07e746-003b-8095-8003-0e0d7d517558">
                    <g className="fills" id="fills-8e07e746-003b-8095-8003-0e0d7d517558">
                      <path
                        rx="0"
                        ry="0"
                        fill="#2e3436"
                        d="M4627.416,191.248C4626.549,191.260,4625.664,191.594,4624.879,192.379L4611.379,205.879C4610.816,206.441,4610.500,207.203,4610.500,208.000L4610.500,212.500L4615.000,212.500C4615.797,212.500,4616.559,212.184,4617.121,211.621L4630.621,198.121C4633.305,195.438,4630.744,191.535,4627.785,191.266C4627.662,191.248,4627.539,191.248,4627.416,191.248ZM4624.750,196.656L4626.344,198.250L4615.750,208.844L4614.156,207.250ZM4624.750,196.656"
                      ></path>
                    </g>
                  </g>
                </svg>
              )}
              <svg
                class="absolute mr-3 cursor-pointer "
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="none"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
                style={{ WebkitPrintColorAdjust: 'exact' }}
                id="screenshot-8e07e746-003b-8095-8003-0e0d7d518976"
                version="1.1"
                viewBox="4609.393 263 23.215 18"
                height="15"
                onClick={togglePasswordVisibility}
              >
                <g id="shape-8e07e746-003b-8095-8003-0e0d7d518976">
                  <g className="fills" id="fills-8e07e746-003b-8095-8003-0e0d7d518976">
                    <path
                      rx="0"
                      ry="0"
                      style={{ fill: '#2e3436', fillOpacity: 1 }}
                      d="M4621.000,263.000C4615.527,263.006,4610.752,266.715,4609.393,272.012C4610.764,277.303,4615.539,280.994,4621.000,281.000C4626.473,280.994,4631.248,277.285,4632.607,271.982C4631.236,266.697,4626.461,263.006,4621.000,263.000ZZM4621.000,266.000C4624.316,266.000,4627.000,268.684,4627.000,272.000C4627.000,275.316,4624.316,278.000,4621.000,278.000C4617.684,278.000,4615.000,275.316,4615.000,272.000C4615.000,268.684,4617.684,266.000,4621.000,266.000ZZM4621.000,266.000"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>

            <div className='name-error text-red-500/75 font-bold'>
              {error}
            </div>
          </div>
          <div class="flex justify-center pt-7 ">
            <button type="submit" className="text-sm items-center w-44 bg-[#a51d2d] text-white py-2 px-4 rounded-full hover:bg-[#910919] "
            >
              ลงชื่อเข้าใช้
            </button>
          </div>

        </form>

        <div class="flex justify-center py-8">
          <button href="/register" className="text-sm items-center w-44 bg-[#00000014] text-black py-2 px-4 rounded-full hover:bg-[#00000029] "
          >
            ลงชื่อเข้าใช้ด้วย Google
          </button>
        </div>

        <div class="flex justify-center">
          <button href="/register" className="text-sm items-center w-44 bg-[#00000014] text-black py-2 px-4 rounded-full hover:bg-[#00000029] ">
            ฉันต้องการสมัครสมาชิก
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}