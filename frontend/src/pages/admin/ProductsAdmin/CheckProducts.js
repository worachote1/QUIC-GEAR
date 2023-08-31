import React, { useEffect, useState } from 'react';
import { testProductData, testImgSrc } from '../../../constant/testDataForAdmin';
import AdminPagination from '../AdminPagination';
import { formatNumberInput } from '../../../util/formatUtil';
import { Link, useNavigate } from 'react-router-dom';

export default function CheckProducts() {

    const [ProductData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataRowPerPage, setDataRowPerPage] = useState(7);
    const lastRowIndexPage = currentPage * dataRowPerPage;
    const firstRowIndexPage = lastRowIndexPage - dataRowPerPage;
    const resDataPage = testProductData.slice(firstRowIndexPage, lastRowIndexPage);

    useEffect(() => {
        // Update the user data with the sliced data for the current page
        setProductData(resDataPage);
    }, [currentPage, dataRowPerPage]);

    const hanleDeleteProduct = (id) => {
        // DELETE api to remove later
    }

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
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Stock
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
                    {ProductData?.map((item, Idx) => (
                        <tr key={Idx} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-2">
                                {item["id"]}
                            </td>
                            <td class="px-6 py-2">
                                {item["name"]}
                            </td>
                            <td class="px-6 py-2">
                                {item["brand"]}
                            </td>
                            <td class="px-6 py-2">
                                {item["type"]}
                            </td>
                            <td class="px-6 py-2">
                                {formatNumberInput(item["price"])}
                            </td>
                            <td class="px-6 py-2">
                                {formatNumberInput(item["stock"])}
                            </td>
                            <td class="px-6 py-4">
                                {item["createAt"]}
                            </td>
                            <td class="px-6 py-4">
                                <Link to={`/admin/update_products/${item["id"]}`}>
                                        <button className="btn btn-outline btn-warning">Update</button>
                                </Link>
                                 <button className="btn btn-outline btn-error ml-1" onClick={hanleDeleteProduct(item["id"])}>Delete</button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AdminPagination totalDataRow={testProductData.length} dataRowPerPage={dataRowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}