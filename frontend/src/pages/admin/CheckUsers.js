import React from 'react'
import { testUserData , testImgSrc } from '../../constant/testDataForAdmin'
export default function CheckUsers() {

  return (
    // <div>CheckUsers</div>
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
            Name
          </th>
          <th scope="col" class="px-6 py-3">
            Last Name
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
        {testUserData?.map((item, Idx) => (
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
              {item["name"]}
            </td>
            <td class="px-6 py-4">
              {item["lastname"]}
            </td>
            <td class="px-6 py-4">
              {item["createAt"]}
            </td>
            <td class="px-6 py-4">
              {item["coins"]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
