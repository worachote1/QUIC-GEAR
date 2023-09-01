import React, { useEffect, useState } from 'react'
import { testOrderData, testImgSrc } from '../../../constant/testDataForAdmin';
import { formatNumberInput } from '../../../util/formatUtil';
import { Link, useNavigate } from 'react-router-dom';
import { status } from '../../../constant/ordersConstants';
import { AiFillCaretDown } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi'
import AdminPagination from '../AdminPagination';

export default function CheckOrders() {
  const [ordersData, setOrdersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataRowPerPage, setDataRowPerPage] = useState(7);
  const lastRowIndexPage = currentPage * dataRowPerPage;
  const firstRowIndexPage = lastRowIndexPage - dataRowPerPage;
  const resDataPage = testOrderData.slice(firstRowIndexPage, lastRowIndexPage);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleStatusCheckboxChange = (status) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((item) => item !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  const handleFilterOrders = () => {
    const filtered = testOrderData.filter((item) =>
      selectedStatus.includes(item.orderStatus)
    );
    setFilteredOrders(filtered);
    console.log(filtered)
    setCurrentPage(1);
  };

  useEffect(() => {
    setOrdersData(filteredOrders.length > 0 ? filteredOrders.slice(firstRowIndexPage, lastRowIndexPage) : resDataPage);
  }, [filteredOrders, currentPage, dataRowPerPage]);

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
          {ordersData?.map((item, Idx) => (
            <tr key={Idx} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-2">
                {item["id"]}
              </td>
              <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img class="w-10 h-10 rounded-full" src={testImgSrc} alt="Jese image" />
                <div class="pl-3">
                  <div class="text-base font-semibold">test</div>
                  <div class="font-normal text-gray-500">test user email ให้</div>
                </div>
              </td>
              <td class="px-6 py-4">
                {formatNumberInput(item["totalPrice"])}
              </td>
              <td class="px-6 py-4">
                {item["createAt"]}
              </td>
              <td class="px-6 py-4">
                {(item["orderStatus"] === "completed") ? <div> <button className="btn btn-outline btn-success">Completed</button> </div>
                  : <div><button className="btn btn-outline btn-warning">To Recieve</button> <a className="link link-info ml-2">update order</a> </div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminPagination totalDataRow={(!filteredOrders.length) ? testOrderData.length : filteredOrders.length} dataRowPerPage={dataRowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}
