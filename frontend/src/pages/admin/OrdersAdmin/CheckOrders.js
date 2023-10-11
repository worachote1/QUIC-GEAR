import React, { useEffect, useState } from 'react'
import { testOrderData, testImgSrc } from '../../../constant/testDataForAdmin';
import { formatNumberInput } from '../../../util/formatUtil';
import { Link, useNavigate } from 'react-router-dom';
import { status, orderSortType } from '../../../constant/ordersConstants';
import { sortByType } from '../../../util/adminModule/adminOrder';
import { AiFillCaretDown } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import AdminPagination from '../AdminPagination';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import isEqual from 'lodash.isequal';

export default function CheckOrders() {
  const [ordersData, setOrdersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataRowPerPage, setDataRowPerPage] = useState(7);
  const lastRowIndexPage = currentPage * dataRowPerPage;
  const firstRowIndexPage = lastRowIndexPage - dataRowPerPage;
  // const resDataPage = testOrderData.slice(firstRowIndexPage, lastRowIndexPage);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const [sortOption, setsortOption] = useState(0);

  const handleStatusCheckboxChange = (status) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((item) => item !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  const handleFilterOrders = () => {
    const filtered = ordersData?.filter((item) =>
      selectedStatus.includes(item.orderStatus)
    );
    setFilteredOrders(filtered);
    console.log(filtered)
    setCurrentPage(1);
  };

  const getOrdersData = async () => {
    const allOrdersData = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/orders`)
    const res_allOrdersData = allOrdersData.data;
    console.log(res_allOrdersData)
    setOrdersData(res_allOrdersData.slice().reverse())
  }

  const updateOrderToDispatched = async (orderId) => {
    const updateOrder = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/orders/update/${orderId}`,{
      orderStatus : "dispatched"
    })
    window.location.reload()
  }

  useEffect(() => {
    getOrdersData();
  }, [])

  useEffect(() => {
    const sortedOrder = filteredOrders.length > 0 ?
      sortByType(filteredOrders, sortOption)
      : sortByType(ordersData, sortOption);

      if (!isEqual(sortedOrder, filteredOrders)) {
        setFilteredOrders(sortedOrder);
    }
  }, [filteredOrders, sortOption, ordersData]);

  return (
    <div className='mx-2 mt-1'>
      <div className='sm:flex sm:justify-between '>
        <div className='flex items-center'>
          <div>
            <h2 class="text-2xl font-semibold leading-tight">Filter : </h2>
          </div>
          <div className="dropdown ml-2">
            <label tabIndex={0} className={`btn m-1 text-white bg-blue-600 `} > {'Status'} <span className='ml-1'> {<AiFillCaretDown size={20} />} </span></label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {
                status.map((item, Idx) => {
                  return (
                    <li key={Idx}>
                      <label>
                        <input
                          type="checkbox"
                          // checked={selectedBrands.includes(item)}
                          onChange={() => handleStatusCheckboxChange(item)}
                        />
                        {item}
                      </label>
                    </li>)
                })
              }

            </ul>
          </div>
          <div>
            <button className="btn btn-accent ml-2" onClick={handleFilterOrders}> {<BiSearch size={20} />} </button>
          </div>
        </div>
        <div className='flex items-center'>
          <div>
            <h2 class="text-2xl font-semibold leading-tight">Sort : </h2>
          </div>
          <div className="dropdown ml-2">
            <label tabIndex={0} className={`btn m-1 text-white bg-yellow-500 `} > {`${orderSortType[sortOption]}`} <span className='ml-1'> {<AiFillCaretDown size={20} />} </span></label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {orderSortType.map((item, Idx) => {
                return <li key={`sort-option-${Idx}`}> <button onClick={() => setsortOption(Idx)}> {orderSortType[Idx]} </button> </li>
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
              User
            </th>
            <th scope="col" class="px-6 py-3">
              Total price
            </th>
            <th scope="col" class="px-6 py-3">
              Create At
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders?.slice(firstRowIndexPage, lastRowIndexPage).map((item, Idx) => (
            <tr key={Idx} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-2">
                {item?._id}
              </td>
              <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img class="w-10 h-10 rounded-full" src={`/uploads/${item?.userID.imgPath}`} alt="Jese image" />
                <div class="pl-3">
                  <div class="text-base font-semibold">{item?.userID.username}</div>
                  <div class="font-normal text-gray-500">{item?.userID.email}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                {formatNumberInput(item.totalPrice)}
              </td>
              <td class="px-6 py-4">
                {new Date(item?.createdAt).toLocaleString()}
              </td>
              <td class="px-6 py-4">
                {(item?.orderStatus === "completed") 
                  ? 
                  <div> 
                    <button className="btn btn-outline btn-success">Completed</button> 
                  </div>
                  : (item?.orderStatus === "dispatched")
                      ? 
                      <div>
                        <button className="btn btn-outline btn-warning">Dispatched</button> 
                      </div>
                      :
                      <div >
                        <button className="btn btn-outline btn-error">Order Received</button> 
                        <br/>
                        {/* <a className="link link-info">Detail</a> 
                        <br/> */}
                        <a className="link link-info " onClick={() => updateOrderToDispatched(item._id)}>Update to Dispatched</a> 
                      </div>
                    }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminPagination totalDataRow={filteredOrders.length} dataRowPerPage={dataRowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}
