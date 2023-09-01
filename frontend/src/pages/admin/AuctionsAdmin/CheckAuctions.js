import React, { useEffect, useState } from 'react';
import { testAuctionsData, testImgSrc } from '../../../constant/testDataForAdmin';
import { Link, useNavigate } from 'react-router-dom';
import { formatNumberInput } from '../../../util/formatUtil';
import AdminPagination from '../AdminPagination';

export default function CheckAuctions() {

  const [AuctionData, setAuctionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataRowPerPage, setDataRowPerPage] = useState(7);
  const lastRowIndexPage = currentPage * dataRowPerPage;
  const firstRowIndexPage = lastRowIndexPage - dataRowPerPage;
  const resDataPage = testAuctionsData.slice(firstRowIndexPage, lastRowIndexPage);

  useEffect(() => {
    // Update the user data with the sliced data for the current page
    setAuctionData(resDataPage);
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
              Product
            </th>
            <th scope="col" class="px-6 py-3">
              Brand
            </th>
            <th scope="col" class="px-6 py-3">
              Type
            </th>
            <th scope="col" class="px-6 py-3">
              Opening Bid
            </th>
            <th scope="col" class="px-6 py-3">
              Seller
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
          {AuctionData?.map((item, Idx) => (
            <tr key={Idx} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-2">
                {item["id"]}
              </td>
              <td class="px-6 py-2">
                {item["product"]["name"]}
              </td>
              <td class="px-6 py-2">
                {item["product"]["brand"]}
              </td>
              <td class="px-6 py-2">
                {item["product"]["type"]}
              </td>
              <td class="px-6 py-2">
                {formatNumberInput(item["startPrice"])}
              </td>
              <td scope='row' class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img class="w-10 h-10 rounded-full" src={testImgSrc} alt="Jese image" />
                <div class="pl-3">
                  <div class="text-base font-semibold">{item["user_seller"]["username"]}</div>
                  <div class="font-normal text-gray-500">{item["user_seller"]["email"]}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                {item["createAt"]}
              </td>
              <td class="px-6 py-4">
                {
                  (item["auctionStatus"] === "completed") ? <div> <button className="btn btn-outline btn-success">Completed</button></div>
                    : (item["auctionStatus"] === "waiting approved") ? <div className=''> <button className="btn btn-outline btn-primary">Waiting for approval</button> <Link to={`/admin/check_auctions/${item["id"]}`}><a className="link link-info ml-2">detail</a> </Link>  </div>
                      : <div> <button className="btn btn-outline btn-warning">In progress</button> <a className="link link-info ml-2">link to auction</a> </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminPagination totalDataRow={testAuctionsData.length} dataRowPerPage={dataRowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}
