import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import Swal from 'sweetalert2'

export default function Login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const validateName = () => {
    if ((/^\s*$/gm).test(userName)) {
      setNameError("Can't be empty");
    } else {
      setNameError('');
    }
  }
  const validatePassword = () => {
    if ((/^\s*$/gm).test(password)) {
      setPasswordError("Can't be empty");
    } else {
      setPasswordError('');
    }
  }

  const handleLogIn = (event) => {
    event.preventDefault();
    if(nameError !== '' || passwordError !== ''){
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-xl w-full max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-4">
            Login to your account
          </h2>
          <form className="space-y-4" onSubmit={handleLogIn}>
            <div>
              <input type="username" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300" placeholder="Username or Email address"
                onChange={(e) => setUserName(e.target.value)}
                onBlur={validateName}
              />
              <div className='name-error text-red-500/75 font-bold'>
                {nameError}
              </div>
            </div>
            <div>
              <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
              />
              <div className='name-error text-red-500/75 font-bold'>
                {passwordError}
              </div>
            </div>

            <div className="flex items-center justify-between ">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-500">
                  Remember me
                </label>
              </div>
              <div>
                <a href="#" className="text-blue-500 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Log In
            </button>
          </form>
          <div className="mt-4 flex items-center justify-center">
            <span className="text-gray-500 mr-2">Don't have an account?</span>
            <Link
              to={`/register`}>
              <a className="text-blue-500 hover:underline">
                Register
              </a>
            </Link>
          </div>
            
            
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-gray-100 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-3">
            </div>
            <div>
              <a href="#"
                class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                // onClick={hanleGoogleSignIn}
              >
                <img class="h-6 w-6" src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}