import React, { useEffect, useState } from 'react'
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { ImAddressBook } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error,setError] = useState('');

  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isNameFocused, setNameFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  
  const navigate = useNavigate();
  
  const [isCheckedPP, setIsCheckedPP] = useState(false);
  const [isCheckedTOU, setIsCheckedTOU] = useState(false);

  const validator = () => {
    const checkEmail = (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email));
    const checkName = ((/^\S{4,}$/).test(name));
    const checkPassword = ((/^\S{4,}$/).test(password));
    
    if(!checkEmail && !checkPassword){
      setError('Email and Password is\'t correct');
    } else if (!checkEmail) {
      setError('This isn\'t email');
    } else if (!checkName) {
      setError('Name must be at least 4 characters');
    } else if (!checkPassword) {
      setError("Password must be at least 4 characters");
    } else if (password !== confirmPassword) {
      setError('Passwords don\'t match');
    } else if (!isCheckedPP || !isCheckedTOU) {
      setError('Doesn\'t check checkbox');
    } else{
      setError('');
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const inputType = showPassword ? 'text' : 'password';
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const inputConfirmType = showConfirmPassword ? 'text' : 'password';

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };
  const handleEmailBlur = () => {
    setEmailFocused(false);
    validator();
  };
  const handleNameFocus = () => {
    setNameFocused(true);
  };
  const handleNameBlur = () => {
    setNameFocused(false);
    validator();
  };
  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };
  const handlePasswordBlur = () => {
    setPasswordFocused(false);
    validator();
  };
  const handleConfirmPasswordFocus = () => {
    setConfirmPasswordFocused(true);
  };
  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordFocused(false);
    validator();
  };
  


  const handleSubmitRegister = (event) => {
    validator();
    event.preventDefault();
    if (error !== '') {
      fetch(`http://test.techtransthai.org:5000/api/user/register`, {
        method: "POST",
        body: JSON.stringify({
          userName: name,
          password: password,
          email: email,
          state: ""
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then((res) => {
        if(res.ok){
          return res.json()
        }
        else{
          return res.json().then(data => {throw Error(`${data.registerStatus}`) });
        }
      })
      .then((data) => {
        console.log(data.registerStatus)
        navigate('/login')
      })
      .catch((err) =>{
        Swal.fire({
          icon: 'error',
          title: 'Warning...',
          text: `${err}`
        })
      })
    }
  }
  
  const handleCheckboxChangePP = () => {
    setIsCheckedPP(!isCheckedPP);
  };
  const handleCheckboxChangeTOU = () => {
    setIsCheckedTOU(!isCheckedTOU);
  };

  return (
        <div className="min-h-[75vh] flex flex-col items-center justify-center">
          {/* <div className="bg-white shadow-xl p-8 rounded w-full max-w-md"> */}
          <img 
            className="mt-6 mb-8"
            src="https://media.discordapp.net/attachments/1008605866624303204/1146757863205769276/quicgear.png?width=1440&height=288" 
            style={{ width: '375px', height: '76px' }} 
          />
            <form className="space-y-4" onSubmit={handleSubmitRegister}>
              <div className='mb-8'>
                <div class="flex justify-end items-center relative">
                  <input type="email" className="w-96 mb-0.5 px-4 py-2 border border-gray-300 rounded-t-lg focus:outline-none focus:ring focus:ring-indigo-300"
                    placeholder="อีเมล" value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    onFocus={handleEmailFocus}
                    onBlur={handleEmailBlur}
                  />
                  {!isEmailFocused&&(
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
                  <input type="username" className="w-96 mb-0.5 px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300"
                    placeholder="ชื่อผู้ใช้" value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    onFocus={handleNameFocus}
                    onBlur={handleNameBlur}
                  />
                  {!isNameFocused&&(
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
                  <input type={inputType} className="w-96 mb-0.5 px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300"
                    placeholder="รหัสผ่าน" value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                  />
                  {!isPasswordFocused&&(
                      <svg
                      class="absolute mr-9"
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
                    class="absolute mr-3" 
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
                <div class="flex justify-end items-center relative">
                <input type={inputConfirmType} className="w-96 mb-0.5 px-4 py-2 border border-gray-300 rounded-b-lg focus:outline-none focus:ring focus:ring-indigo-300"
                  placeholder="ยืนยันรหัสผ่าน" value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  onFocus={handleConfirmPasswordFocus}
                  onBlur={handleConfirmPasswordBlur}
                />
                {!isConfirmPasswordFocused&&(
                      <svg
                      class="absolute mr-9"
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
                    class="absolute mr-3" 
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    fill="none"
                    width="15"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ WebkitPrintColorAdjust: 'exact' }}
                    id="screenshot-8e07e746-003b-8095-8003-0e0d7d518976"
                    version="1.1"
                    viewBox="4609.393 263 23.215 18"
                    height="15"
                    onClick={toggleConfirmPasswordVisibility}
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
              
              {/* checkbox */}
              <div class="flex items-center mb-4 pt-4">
                <input id="default-checkbox" 
                  type="checkbox" 
                  value="" 
                  class="w-4 h-4 bg-[#a51d2d] text-blue-600 border-gray-300 rounded checked:bg-[#a51d2d]"
                  onChange={handleCheckboxChangePP}
                  ></input>
                <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">ฉันได้อ่านและยอมรับ</label>
                <a href='/' class="underline text-sm font-medium text-[#a51d2d]">นโยบายความเป็นส่วนตัว</a>
              </div>
              <div class="flex items-center mb-4">
                <input id="default-checkbox" 
                  type="checkbox" 
                  value="" 
                  class="w-4 h-4 bg-[#a51d2d] text-blue-600 border-gray-300 rounded checked:bg-[#a51d2d]"
                  onChange={handleCheckboxChangeTOU}
                  ></input>
                <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">ฉันได้อ่านและยอมรับ</label>
                <a href='/' class="underline text-sm font-medium text-[#a51d2d]">ข้อกำหนดการใช้งาน</a>
              </div>  

              <div class="flex justify-center py-4">
                <button type="submit" className="text-sm items-center w-44 bg-[#a51d2d] text-white py-2 px-4 rounded-full hover:bg-[#910919]">
                  สมัครสมาชิก
                </button>
              </div>
            </form>
          {/* </div> */}
        </div>
    )
  }
