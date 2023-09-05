import React, { useEffect, useState } from 'react'
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { ImAddressBook } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Register() {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const validateName = () => {
    // regex patterns to  validate a name
    // that contain at least 4 characters and don't count any spaces
    if (!((/^\S{4,}$/).test(name))) {
      setNameError('Name must be at least 4 characters');
    } else {
      setNameError('');
    }
  }
  const validatePassword = () => {
    // regex patterns to validate a password
    // that contain at least 4 characters and don't count any spaces
    if (!((/^\S{4,}$/).test(password))) {
      setPasswordError("Password must be at least 4 characters");
    } else {
      setPasswordError('');
    }
  }
  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords don\'t match');
    } else {
      setConfirmPasswordError('');
    }
  }
  const validateEmail = () => {
    if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))) {
      setEmailError('This isn\'t email');
    } else {
      setEmailError('');
    }
  }

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    if (nameError === '' && passwordError === '' && confirmPasswordError === '' && emailError === '') {
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

  return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white shadow-xl p-8 rounded w-full max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-4">
              Register
            </h2>
            <form className="" onSubmit={handleSubmitRegister}>
              <div >
                <label className="block mb-1 font-bold text-gray-500"><HiOutlineUser className="inline-block mr-2 mb-1" />Username</label>
                <input type="username" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                  placeholder="Enter your username" value={name} onChange={(e) => setName(e.target.value)} onBlur={validateName} />
                <div className='name-error text-red-500/75 font-bold'>
                  {nameError}
                </div>
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-500"><HiOutlineLockClosed className="inline-block mr-2 mb-1" />Password</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                  placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={validatePassword} />
                <div className='name-error text-red-500/75 font-bold'>
                  {passwordError}
                </div>
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-500"><HiOutlineLockClosed className="inline-block mr-2 mb-1" />Confirm Password</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                  placeholder="Enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={validateConfirmPassword} />
                <div className='name-error text-red-500/75 font-bold'>
                  {confirmPasswordError}
                </div>
              </div>
              <div className='mb-1'>
                <label className="block mb-1 font-bold text-gray-500"><HiOutlineMail className="inline-block mr-2 mb-1" />Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                  placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} />
                <div className='name-error text-red-500/75 font-bold'>
                  {emailError}
                </div>
              </div>
              <button type="submit" className="w-full mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-300">Register</button>
            </form>
          </div>
        </div>
    )
  }
