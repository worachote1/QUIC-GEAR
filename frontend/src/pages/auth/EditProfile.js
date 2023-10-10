import React, { useEffect, useState } from 'react'
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { ImAddressBook } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function UserSettings() {

    const current_user = JSON.parse(sessionStorage.getItem('current_user'))
    const [updatedUserData, setUpdatedUserData] = useState({ ...current_user, confirmPassword: current_user.password });
    const [focusedData, setFocusedData] = useState({
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
        address: false,
        phone: false,
        bank: false,
        account_number: false,
        account_name: false,
    })
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedURLFile, setSelectedURLFile] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState('');

    const navigate = useNavigate();
    const inputType = showPassword ? 'text' : 'password';
    const inputConfirmType = showConfirmPassword ? 'text' : 'password';

    const alertEditProfieSuccess = () => {
        Swal.fire(
            'Success! ',
            'Profile updated successfully!',
            'success'
        )
        .then((res) => {
            if (res.isConfirmed)
              window.location.reload();
          })
    }

    const validator = () => {
        const checkEmail = ((/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(updatedUserData.email));
        const checkName = ((/^\S{4,}$/).test(updatedUserData.username));
        const checkPassword = ((/^\S{4,}$/).test(updatedUserData.password));
        const checkPhone = ((/^[0-9]{10}$/).test(updatedUserData.phone));
        const checkBankAccountNumber = ((/^[0-9]{10}$/).test(updatedUserData.account_number));

        if ((/^\s*$/gm).test(updatedUserData.email)) {
            setError('Email cannot be empty !')
        }
        else if (!checkEmail) {
            setError('Invalid Email Format !');
        }
        else if ((/^\s*$/gm).test(updatedUserData.username)) {
            setError('Username cannot be empty !');
        }
        else if (!checkName) {
            setError('Username must be at least 4 characters !');
        }
        else if ((/^\s*$/gm).test(updatedUserData.password)) {
            setError("Password can not be empty !");
        }
        else if (!checkPassword) {
            setError("Password must be at least 4 characters !");
        }
        else if (updatedUserData.password !== updatedUserData.confirmPassword) {
            setError('Passwords Do Not Match');
        }
        else if (!checkPhone && !updatedUserData) {
            setError("Invalid Phone Format !");
        }
        else {
            setError('');
            return true;
        }
        return false;
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
        setSelectedURLFile(fileURL);
        setSelectedFile(file);
    };

    const handleSubmitEditProfie = async (event) => {
        event.preventDefault();
        console.log(current_user)
        console.log(updatedUserData)
        if (!validator()) {
            return;
        }
        try {
            // POST upload profile img
            let uploadedFileName = "";
            if (selectedFile) {
                const singleFileData = new FormData();
                singleFileData.append('image', selectedFile);
                const uploadSingleFile_res = await axios.post(`${process.env.REACT_APP_QUIC_GEAR_API}/upload/single`, singleFileData);
                uploadedFileName = uploadSingleFile_res.data.filename;
            }
            // PUT update user data
            const updateUser = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/users/update/${updatedUserData._id}`,
                {
                    ...updatedUserData, imgPath: (selectedFile ? uploadedFileName : updatedUserData.imgPath)
                });
            const res_updateUser = updateUser.data;
            sessionStorage.setItem("current_user", JSON.stringify(res_updateUser))
            alertEditProfieSuccess();
        }
        catch (err) {
            console.log(err)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData({ ...updatedUserData, [name]: value })
    }

    const onChangeFocusedInput = (e, isFocused) => {
        const { name } = e.target;
        setFocusedData({ ...focusedData, [name]: isFocused })
    }

    return (
        <div className="min-h-screen flex flex-col items-center">
            <img
                className="mt-6 mb-4"
                src="https://media.discordapp.net/attachments/1008605866624303204/1146757863205769276/quicgear.png?width=1440&height=288"
                style={{ width: '375px', height: '76px' }}
            />
            <img
                src={selectedURLFile ? selectedURLFile : `/uploads/${updatedUserData.imgPath}`}
                alt="Profile"
                className="w-20 h-20 rounded-full bg-gray-300 object-cover"
            />
            <form className="space-y-4 mt-4" onSubmit={handleSubmitEditProfie} encType='multipart/form-data'>
                <div className=''>
                    <div className='flex flex-col'>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white self-start" for="file_input">Upload Profile</label>
                        <input class="w-96 mb-0.5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                            id="file_input"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white self-start">Email</label>
                        <div class="flex justify-end items-center relative">
                            <input type="email" name='email' className="w-96 mb-0.5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="อีเมล" value={updatedUserData.email}
                                onChange={onChangeInput}
                                onFocus={(e) => onChangeFocusedInput(e, true)}
                                onBlur={(e) => onChangeFocusedInput(e, false)}
                            />
                            {!focusedData.email && (
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
                    </div>
                    <div className='flex flex-col'>
                        <label class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white self-start">Username</label>
                        <div class="flex justify-end items-center relative">
                            <input type="name" name='username' className="w-96 mb-0.5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="ชื่อผู้ใช้" value={updatedUserData.username}
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
                    </div>
                    <div className='flex flex-col'>
                        <label class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white self-start">Password</label>
                        <div class="flex justify-end items-center relative">
                            <input type={inputType} name='password' className="w-96 mb-0.5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="รหัสผ่าน" value={updatedUserData.password}
                                onChange={onChangeInput}
                                onFocus={(e) => onChangeFocusedInput(e, true)}
                                onBlur={(e) => onChangeFocusedInput(e, false)}
                            />
                            {!focusedData.password && (
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
                    </div>
                    <div className='flex flex-col'>
                        <label class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white self-start">Confirm Password</label>
                        <div class="flex justify-end items-center relative">
                            <input type={inputConfirmType} name='confirmPassword' className="w-96 mb-0.5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="ยืนยันรหัสผ่าน" value={updatedUserData.confirmPassword}
                                onChange={onChangeInput}
                                onFocus={(e) => onChangeFocusedInput(e, true)}
                                onBlur={(e) => onChangeFocusedInput(e, false)}
                            />
                            {!focusedData.confirmPassword && (
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
                    </div>
                    <div className='flex flex-col'>
                        <label class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white self-start">Address</label>
                        <div class="flex justify-end items-center relative">
                            <textarea type="text" name='address' className="w-96 mb-0.5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="ที่อยู่" value={updatedUserData.address}
                                onChange={onChangeInput}
                                onFocus={(e) => onChangeFocusedInput(e, true)}
                                onBlur={(e) => onChangeFocusedInput(e, false)}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white self-start">Phone</label>
                        <div class="flex justify-end items-center relative">
                            <input type="text" name='phone' className="w-96 mb-0.5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="โทรศัพท์" value={updatedUserData.phone}
                                pattern="[0-9-]*"
                                onChange={onChangeInput}
                                onFocus={(e) => onChangeFocusedInput(e, true)}
                                onBlur={(e) => onChangeFocusedInput(e, false)}
                            />
                            {!focusedData.phone && (
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
                    </div>
                    <div className='flex flex-col'>
                        <label class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white self-start">Bank Name</label>
                        <div class="flex justify-end items-center relative">
                            <input type="text" name='bank' className="w-96 mb-0.5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="ธนาคาร" value={updatedUserData.bank}
                                onChange={onChangeInput}
                                onFocus={(e) => onChangeFocusedInput(e, true)}
                                onBlur={(e) => onChangeFocusedInput(e, false)}
                            />
                            {!focusedData.bank && (
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
                    </div>
                    <div className='flex flex-col'>
                        <label class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white self-start">Bank Account Number</label>
                        <div class="flex justify-end items-center relative">
                            <input type="text" name='account_number' className="w-96 mb-0.5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="เลขบัญชี" value={updatedUserData.account_number}
                                onChange={onChangeInput}
                                onFocus={(e) => onChangeFocusedInput(e, true)}
                                onBlur={(e) => onChangeFocusedInput(e, false)}
                            />
                            {!focusedData.account_number && (
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
                    </div>
                    <div className='flex flex-col'>
                        <label class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white self-start">Bank Account Name</label>
                        <div class="flex justify-end items-center relative">
                            <input type="text" name='account_name' className="w-96 mb-0.5 px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="ชื่อบัญชี" value={updatedUserData.account_name}
                                onChange={onChangeInput}
                                onFocus={(e) => onChangeFocusedInput(e, true)}
                                onBlur={(e) => onChangeFocusedInput(e, false)}
                            />
                            {!focusedData.account_name && (
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
                    </div>

                    <div className='name-error text-red-500/75 font-bold'>
                        {error}
                    </div>
                </div>

                <div class="flex justify-center py-4">
                    <button type="submit" className="text-sm items-center w-44 bg-[#a51d2d] text-white py-2 px-4 rounded-full hover:bg-[#910919]">
                        อัพเดตการตั้งค่าโปรไฟล์
                    </button>
                </div>
            </form>
        </div>
    )
}

