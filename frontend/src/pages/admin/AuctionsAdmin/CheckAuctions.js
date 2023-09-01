import React, { useEffect, useState } from 'react';
import { testAuctionsData, testImgSrc } from '../../../constant/testDataForAdmin';
import { Link, useNavigate } from 'react-router-dom';
import { formatNumberInput } from '../../../util/formatUtil';
import { brand, type, status } from '../../../constant/auctionsConstants';
import { AiFillCaretDown } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import AdminPagination from '../AdminPagination';

export default function CheckAuctions() {

  const [AuctionData, setAuctionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataRowPerPage, setDataRowPerPage] = useState(7);
  const lastRowIndexPage = currentPage * dataRowPerPage;
  const firstRowIndexPage = lastRowIndexPage - dataRowPerPage;
  const resDataPage = testAuctionsData.slice(firstRowIndexPage, lastRowIndexPage);

  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleBrandCheckboxChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleTypeCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleStatusCheckboxChange = (status) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((item) => item !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  const handleFilterAuctions = () => {
    const filtered = testAuctionsData.filter((item) => {
      const foundBrand = selectedBrands.includes(item.product.brand);
      const foundType = selectedTypes.includes(item.product.type);
      const foundStatus = selectedStatus.includes(item.auctionStatus);
      //prn logic filter : 001 -> 111
      return ((!foundBrand && !foundType && foundStatus)
        || (!foundBrand && foundType && !foundStatus)
        || (!foundBrand && foundType && foundStatus)
        || (foundBrand && !foundType && !foundStatus)
        || (foundBrand && !foundType && foundStatus)
        || (!foundBrand && foundType && !foundStatus)
        || foundBrand && foundType && foundStatus)
    }
    );
    setFilteredAuctions(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    setAuctionData(filteredAuctions.length > 0 ? filteredAuctions.slice(firstRowIndexPage, lastRowIndexPage) : resDataPage);
  }, [filteredAuctions, currentPage, dataRowPerPage]);

  return (
    <div className='mx-2 mt-1'>
      <div className='sm:flex sm:justify-between '>
        <div className='flex items-center'>
          <div>
            <h2 class="text-2xl font-semibold leading-tight">Filter : </h2>
          </div>
          <div className="dropdown ml-2">
            <label tabIndex={0} className={`btn m-1 text-white bg-yellow-500 `} > {'Brand'} <span className='ml-1'> {<AiFillCaretDown size={20} />} </span></label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {
                brand.map((item, Idx) => {
                  return (
                    <li key={Idx}>
                      <label>
                        <input
                          type="checkbox"
                          // checked={selectedBrands.includes(item)}
                          onChange={() => handleBrandCheckboxChange(item)}
                        />
                        {item}
                      </label>
                    </li>)
                })
              }

            </ul>
          </div>
          <div className="dropdown ml-2">
            <label tabIndex={0} className={`btn m-1 text-white bg-green-500 `} > {'Type'} <span className='ml-1'> {<AiFillCaretDown size={20} />} </span></label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {
                type.map((item, Idx) => {
                  return (
                    <li key={Idx}>
                      <label>
                        <input
                          type="checkbox"
                          // checked={selectedBrands.includes(item)}
                          onChange={() => handleTypeCheckboxChange(item)}
                        />
                        {item}
                      </label>
                    </li>)
                })
              }

            </ul>
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
            <button className="btn btn-accent ml-2" onClick={handleFilterAuctions}> {<BiSearch size={20} />} </button>
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
      <AdminPagination totalDataRow={(!filteredAuctions.length) ? testAuctionsData.length : filteredAuctions.length} dataRowPerPage={dataRowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}
