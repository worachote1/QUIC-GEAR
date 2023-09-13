import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import Swal from 'sweetalert2'
// import quicgearImage from '../quicgear.png'

export default function Login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isNameFocused, setNameFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const navigate = useNavigate();

  const validateNamePassword = () => {
    const testName = (/^\s*$/gm).test(userName);
    const testPassword =(/^\s*$/gm).test(password);
    if(testName&&testPassword){
      setError("Name and Password can't be empty");
    }
    else if (testName) {
      setError("Name can't be empty");
    }
    else if (testPassword) {
      setError("Password can't be empty");
    } else {
      setError('');
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const inputType = showPassword ? 'text' : 'password';

  const handleNameFocus = () => {
    setNameFocused(true);
  };
  const handleNameBlur = () => {
    setNameFocused(false);
    validateNamePassword();
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };
  const handlePasswordBlur = () => {
    setPasswordFocused(false);
    validateNamePassword();
  };

  const handleLogIn = (event) => {
    event.preventDefault();
    if(error !== ''){
      return
    }
    // if login success redirecct to main page
    // and create current user login in session
    fetch(`http://test.techtransthai.org:5000/api/user/login/?username=${userName}&password=${password}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          return res.json().then(data => { throw Error(`${data.loginStatus}`) });
        }
      })
      .then((data) => {
        console.log(data.loginStatus);
        sessionStorage.setItem('current_user', userName);
        navigate("/");
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Warning...',
          text: `${err}`
        })

      })
  }

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center ">
        {/* <div className="bg-white p-8 rounded shadow-xl w-full max-w-md"> */}
        <img 
          className="mt-6 mb-4"
          src="https://media.discordapp.net/attachments/1008605866624303204/1146757863205769276/quicgear.png?width=1440&height=288" 
          style={{ width: '375px', height: '76px' }} 
        />
          {/* <h2 className="mt-6 mb-4 text-center text-3xl font-extrabold text-gray-900 ">
            Login to your account
          </h2> */}
          <form className="space-y-4" onSubmit={handleLogIn}>
            <div>
              <div class="flex justify-end items-center relative">
                <input type="username" className="w-96 mb-0.5 px-4 py-2 border border-gray-300 rounded-t-lg focus:outline-none focus:ring focus:ring-[#a51d2d]" placeholder="อีเมล"
                  onChange={(e) => setUserName(e.target.value)}
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
                  <input type={inputType} className="w-full px-4 py-2 border border-gray-300 rounded-b-lg focus:outline-none focus:ring focus:ring-[#a51d2d]" placeholder="รหัสผ่าน"
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

              <div className='name-error text-red-500/75 font-bold'>
                {error}
              </div>
            </div>
            <div class="flex justify-center pt-7">
                <button type="submit" className="text-sm items-center w-44 bg-[#a51d2d] text-white py-2 px-4 rounded-full hover:bg-[#910919] "
              >
                ลงชื่อเข้าใช้
              </button>
            </div>
            
          </form>

          <div class="flex justify-center py-4">
                <button href="/register" className="text-sm items-center w-44 bg-[#00000014] text-black py-2 px-4 rounded-full hover:bg-[#00000029] "
              >
                ลงชื่อเข้าใช้ด้วย Google
              </button>
          </div>   

          <div class="flex justify-center">
                <button href="/register" className="text-sm items-center w-44 bg-[#00000014] text-black py-2 px-4 rounded-full hover:bg-[#00000029] "
              >
                ฉันต้องการสมัครสมาชิก
              </button>
          </div>    
        {/* </div> */}
      </div>
    </div>
  )
}