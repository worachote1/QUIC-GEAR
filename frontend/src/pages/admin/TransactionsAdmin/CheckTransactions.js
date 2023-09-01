import React, { useEffect, useState } from 'react';
import { testTransactionData, testImgSrc } from '../../../constant/testDataForAdmin';
import { formatNumberInput } from '../../../util/formatUtil';
import { Link, useNavigate } from 'react-router-dom';
import { status , type } from '../../../constant/transactionsConstant';
import { AiFillCaretDown } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi'
import AdminPagination from '../AdminPagination';

export default function CheckTransactions() {
  const [transactionsData, setTransactionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataRowPerPage, setDataRowPerPage] = useState(7);
  const lastRowIndexPage = currentPage * dataRowPerPage;
  const firstRowIndexPage = lastRowIndexPage - dataRowPerPage;
  const resDataPage = testTransactionData.slice(firstRowIndexPage, lastRowIndexPage);

  const [filteredTransactions, setFilteredTransactions] = useState([]);

  //for filter
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  
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
    const filtered = testTransactionData.filter((item) =>
    (selectedStatus.includes(item.transactionStatus) && selectedTypes.includes(item.transactionType)
      || (selectedStatus.length === 0 && selectedTypes.includes(item.transactionType))
      || (selectedStatus.includes(item.transactionStatus) && selectedTypes.length === 0))
    );
    setFilteredTransactions(filtered);
    console.log(filtered)
    setCurrentPage(1);
  };

  const hanleDeleteProduct = (id) => {
    // DELETE api to remove later
  }

  useEffect(() => {
    setTransactionsData(filteredTransactions.length > 0 ? filteredTransactions.slice(firstRowIndexPage, lastRowIndexPage) : resDataPage);
  }, [filteredTransactions, currentPage, dataRowPerPage]);

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
          {transactionsData?.map((item, Idx) => (
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
                {item["transactionType"]}
              </td>
              <td class="px-6 py-4">
                {formatNumberInput(item["amount"])}
              </td>
              <td class="px-6 py-4">
                {item["createAt"]}
              </td>
              <td class="px-6 py-4">
                {(item["transactionType"] === "topup" && item["transactionStatus"] !== "completed" ? <div> <button className="btn btn-outline btn-warning">Update coin</button> <button className="btn btn-outline btn-error">Decline</button><a className="link link-info ml-2">Check Proof of Payment</a> </div>
                  : (item["transactionType"] === "withdraw" && item["transactionStatus"] !== "completed") ? <button className="btn btn-outline btn-primary">Approve withdrawal</button> : <button className="btn btn-outline btn-success">Completed</button>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminPagination totalDataRow={(!filteredTransactions.length) ? testTransactionData.length : filteredTransactions.length} dataRowPerPage={dataRowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}
