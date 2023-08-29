import React, { useEffect, useState } from 'react'
import { testTransactionData ,testImgSrc } from '../../constant/testDataForAdmin'
import AdminPagination from './AdminPagination';

export default function CheckTransactions() {
  const [transactionsData, setTransactionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataRowPerPage, setDataRowPerPage] = useState(7);
  const lastRowIndexPage = currentPage * dataRowPerPage;
  const firstRowIndexPage = lastRowIndexPage - dataRowPerPage;
  const resDataPage = testTransactionData.slice(firstRowIndexPage, lastRowIndexPage);

  useEffect(() => {
    // Update the user data with the sliced data for the current page
    setTransactionsData(resDataPage);
  }, [currentPage, dataRowPerPage]);
  return (
    <div>
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
              Option
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
                  <div class="text-base font-semibold">{item["username"]}</div>
                  <div class="font-normal text-gray-500">{item["email"]}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                {item["transactionType"]}
              </td>
              <td class="px-6 py-4">
                {item["amount"]}
              </td>
              <td class="px-6 py-4">
                {item["createAt"]} 
              </td>
              <td class="px-6 py-4">
                {(item["transactionType"] === "topup" ? <a className="link link-success">Check prove of payment</a> : <a className="link link-info">Approve Withdraw</a>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminPagination totalDataRow={testTransactionData.length} dataRowPerPage={dataRowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}
