import React, { useEffect, useState } from 'react';
import { testProductData, testImgSrc } from '../../../constant/testDataForAdmin';
import { brand, type, productSortType } from '../../../constant/productConstants';
import { sortByType } from '../../../util/adminModule/adminProduct';
import { AiFillCaretDown } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi'
import AdminPagination from '../AdminPagination';
import { formatNumberInput } from '../../../util/formatUtil';
import { Link, useNavigate } from 'react-router-dom';

export default function CheckProducts() {

    //for pagination
    const [ProductData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataRowPerPage, setDataRowPerPage] = useState(7);
    const lastRowIndexPage = currentPage * dataRowPerPage;
    const firstRowIndexPage = lastRowIndexPage - dataRowPerPage;
    const resDataPage = testProductData.slice(firstRowIndexPage, lastRowIndexPage);
    const [filteredProducts, setFilteredProducts] = useState([]);

    //for filter
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);

    const [sortOption, setsortOption] = useState(0);

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

    const handleFilterProducts = () => {
        const filtered = testProductData.filter((item) =>
        (selectedBrands.includes(item.brand) && selectedTypes.includes(item.type)
            || (selectedBrands.length === 0 && selectedTypes.includes(item.type))
            || (selectedBrands.includes(item.brand) && selectedTypes.length === 0))
        );
        setFilteredProducts(filtered);
        console.log(filtered)
        setCurrentPage(1);
    };

    const hanleDeleteProduct = (id) => {
        // DELETE api to remove later
    }

    useEffect(() => {
        setProductData(
            filteredProducts.length > 0
                ? sortByType(filteredProducts, sortOption).slice(firstRowIndexPage, lastRowIndexPage)
                : sortByType(testProductData, sortOption).slice(firstRowIndexPage, lastRowIndexPage));
    }, [filteredProducts, sortOption, currentPage, dataRowPerPage]);

    return (
        <div className='mx-2 mt-1'>
            <div className='sm:flex sm:justify-between'>
                <div className='flex items-center'>
                    <div>
                        <h2 class="text-2xl font-semibold leading-tight">Filter : </h2>
                    </div>
                    <div className="dropdown ml-2">
                        <label tabIndex={0} className={`btn m-1 text-white bg-blue-600 `} > {'Brand'} <span className='ml-1'> {<AiFillCaretDown size={20} />} </span></label>
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
                    <button className="btn btn-accent ml-2" onClick={handleFilterProducts}> {<BiSearch size={20} />} </button>
                </div>
                <div className='flex items-center'>
                    <div>
                        <h2 class="text-2xl font-semibold leading-tight">Sort : </h2>
                    </div>
                    <div className="dropdown ml-2">
                        <label tabIndex={0} className={`btn m-1 text-white bg-yellow-500 `} > {`${productSortType[sortOption]}`} <span className='ml-1'> {<AiFillCaretDown size={20} />} </span></label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            {productSortType.map((item, Idx) => {
                                return <li key={`sort-option-${Idx}`}> <button onClick={() => setsortOption(Idx)}> {productSortType[Idx]} </button> </li>
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
                            Total Orders
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
                            <td class="px-6 py-2">
                                {formatNumberInput(item["totalProductOrder"])}
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
            <AdminPagination totalDataRow={(!filteredProducts.length) ? testProductData.length : filteredProducts.length} dataRowPerPage={dataRowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}