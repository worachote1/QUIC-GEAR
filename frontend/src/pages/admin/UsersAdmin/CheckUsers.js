import React, { useState, useEffect } from 'react';
import { testUserData, testImgSrc } from '../../../constant/testDataForAdmin';
import { formatNumberInput } from '../../../util/formatUtil';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';
import { userSortType } from '../../../constant/usersConstants';
import { sortByType } from '../../../util/adminModule/adminUser';
import AdminPagination from '../AdminPagination';
import axios from 'axios'

export default function CheckUsers() {

  const [userData, setUserData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataRowPerPage, setDataRowPerPage] = useState(7);
  const lastRowIndexPage = currentPage * dataRowPerPage;
  const firstRowIndexPage = lastRowIndexPage - dataRowPerPage;
  const resDataPage = testUserData.slice(firstRowIndexPage, lastRowIndexPage);

  const [sortOption, setsortOption] = useState(0);

  const getUsersData = async () => {
    const allUsersData = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/users`)
    const res_allUsersData = allUsersData.data.filter((item) => item.role === "user");
    setUserData(res_allUsersData.slice().reverse())
}

  useEffect(() => {
    getUsersData();
}, [])

  useEffect(() => {
    // Update the user data with the sliced data for the current page
    // setUserData(resDataPage)
    setFilteredUsers(sortByType(userData, sortOption).slice(firstRowIndexPage, lastRowIndexPage));
  }, [sortOption, currentPage, dataRowPerPage, userData]);
  return (
    <div className='mx-2 mt-1'>
      <div className='sm:flex sm:justify-between'>
        <div></div>
        <div className='flex items-center'>
          <div>
            <h2 class="text-2xl font-semibold leading-tight">Sort : </h2>
          </div>
          <div className="dropdown ml-2">
            <label tabIndex={0} className={`btn m-1 text-white bg-yellow-500 `} > {`${userSortType[sortOption]}`} <span className='ml-1'> {<AiFillCaretDown size={20} />} </span></label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {userSortType.map((item, Idx) => {
                return <li key={`sort-option-${Idx}`}> <button onClick={() => setsortOption(Idx)}> {userSortType[Idx]} </button> </li>
              })}
            </ul>
          </div>
        </div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              ID
            </th>
            <th scope="col" class="px-6 py-3">
              Username
            </th>
            <th scope="col" class="px-6 py-3">
              Create At
            </th>
            <th scope="col" class="px-6 py-3">
              Coins
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((item, Idx) => (
            <tr key={Idx} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-2">
                {item?._id}
              </td>
              <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img class="w-10 h-10 rounded-full" src={`/uploads/${item.imgPath}`} alt="profie image" />
                <div class="pl-3">
                  <div class="text-base font-semibold">{item?.username}</div>
                  <div class="font-normal text-gray-500">{item?.email}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                {new Date(item?.createdAt).toLocaleString()}
              </td>
              <td class="px-6 py-4">
                {formatNumberInput(item["coins"])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminPagination totalDataRow={userData.length} dataRowPerPage={dataRowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}
