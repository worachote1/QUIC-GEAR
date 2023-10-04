import React, { useEffect, useState } from 'react';
import { testTransactionData, testImgSrc } from '../../../constant/testDataForAdmin';
import { formatNumberInput } from '../../../util/formatUtil';
import { Link, useNavigate } from 'react-router-dom';
import { status, type, transactionSortType } from '../../../constant/transactionsConstant';
import { renderTransactionButtons, sortByType } from '../../../util/adminModule/adminTransaction';
import { AiFillCaretDown } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi'
import AdminPagination from '../AdminPagination';
import isEqual from 'lodash.isequal';
import axios from 'axios';

export default function CheckTransactions() {
  const [transactionsData, setTransactionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataRowPerPage, setDataRowPerPage] = useState(7);
  const lastRowIndexPage = currentPage * dataRowPerPage;
  const firstRowIndexPage = lastRowIndexPage - dataRowPerPage;
  // const resDataPage = testTransactionData.slice(firstRowIndexPage, lastRowIndexPage);

  const [filteredTransactions, setFilteredTransactions] = useState([]);

  //for filter
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [sortOption, setsortOption] = useState(0);

  const handleStatusCheckboxChange = (status) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((item) => item !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  const handleTypeCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleFilterTranactions = () => {
    const filtered = transactionsData.filter((item) =>
    (selectedStatus.includes(item.transactionStatus) && selectedTypes.includes(item.transactionType)
      || (selectedStatus.length === 0 && selectedTypes.includes(item.transactionType))
      || (selectedStatus.includes(item.transactionStatus) && selectedTypes.length === 0))
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const getTransactionsData = async () => {
    const allTransactionsData = await axios.get(`${process.env.REACT_APP_QUIC_GEAR_API}/transactions`)
    const res_allTransactionsData = allTransactionsData.data;
    console.log(res_allTransactionsData)
    setTransactionsData(res_allTransactionsData.slice().reverse())
  }

  useEffect(() => {
    getTransactionsData();
  }, [])

  useEffect(() => {
 /*
    setFilteredTransactions(filteredTransactions.length > 0
      ? sortByType(filteredTransactions, sortOption)
      : sortByType(transactionsData, sortOption));
      */

      const sortedTransactions = filteredTransactions.length > 0
      ? sortByType(filteredTransactions, sortOption)
      : sortByType(transactionsData, sortOption);
  // Only update the state if the new array is different from the previous one
  if (!isEqual(sortedTransactions, filteredTransactions)) {
      setFilteredTransactions(sortedTransactions);
  }
  }, [sortOption, transactionsData, transactionsData]);

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
          <div className="dropdown">
            <label tabIndex={0} className={`btn m-1 text-white bg-yellow-500 `} > {'Type'} <span className='ml-1'> {<AiFillCaretDown size={20} />} </span></label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {
                type.map((item, Idx) => {
                  return (
                    <li key={Idx}>
                      <label>
                        <input
                          type="checkbox"
                          // checked={selectedTypes.includes(item)}
                          onChange={() => handleTypeCheckboxChange(item)}
                        />
                        {item}
                      </label>
                    </li>)
                })
              }
            </ul>
          </div>
          <div>
            <button className="btn btn-accent ml-2" onClick={handleFilterTranactions}> {<BiSearch size={20} />} </button>
          </div>
        </div>
        <div className='flex items-center'>
          <div>
            <h2 class="text-2xl font-semibold leading-tight">Sort : </h2>
          </div>
          <div className="dropdown ml-2">
            <label tabIndex={0} className={`btn m-1 text-white bg-yellow-500 `} > {`${transactionSortType[sortOption]}`} <span className='ml-1'> {<AiFillCaretDown size={20} />} </span></label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {transactionSortType.map((item, Idx) => {
                return <li key={`sort-option-${Idx}`}> <button onClick={() => setsortOption(Idx)}> {transactionSortType[Idx]} </button> </li>
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
              Type
            </th>
            <th scope="col" class="px-6 py-3">
              amount
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
          {filteredTransactions?.slice(firstRowIndexPage, lastRowIndexPage).map((item, Idx) => (
            <tr key={Idx} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-2">
                {item._id}
              </td>
              <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img class="w-10 h-10 rounded-full" src={`uploads/${item.userAccount.imgPath}`} alt="Jese image" />
                <div class="pl-3">
                  <div class="text-base font-semibold">{item.userAccount.username}</div>
                  <div class="font-normal text-gray-500">{item.userAccount.email}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                {item["transactionType"]}
              </td>
              <td class="px-6 py-4">
                {formatNumberInput(item?.amount)}
              </td>
              <td class="px-6 py-4">
                {new Date(item?.createdAt).toLocaleString()}
              </td>
              <td class="px-6 py-4">
                {renderTransactionButtons(item)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminPagination totalDataRow={filteredTransactions.length} dataRowPerPage={dataRowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}
