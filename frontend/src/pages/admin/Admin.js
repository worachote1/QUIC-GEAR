import React, { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

export default function Admin() {
  const adminTaskType = ["Auctions", "Orders", "Transactions", "Users", "Create Products"]
const taskBGColor = {
  "Auctions" : "bg-red-500",
  "Orders" : "bg-orange-500",
  "Transactions" : "bg-green-500",
  "Users" : "bg-blue-500",
  "Create Products" : "bg-yellow-500"
}
  const testImgSrc = "https://lh3.googleusercontent.com/ogw/AGvuzYZRQF_a0tm1dHizZsXzhHZAkHUTosYtX7fd0AOoyQ=s32-c-mo";
  const [selectedTask, setSelectedTask] = useState(adminTaskType[3]);

  const handleClickSelectTask = (task) => {
    setSelectedTask(task);
  }

  return (
    <div className="min-h-screen max-w-[1640px] mx-auto mt-5" >
      <div class="shadow-md sm:rounded-lg ">
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className={`btn m-1 text-white ${taskBGColor[selectedTask]}`}>{selectedTask} <span className='ml-1'> {<AiFillCaretDown size={20}/>} </span></label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {adminTaskType.map((item , Idx) => {
                return <li key={Idx}> <button onClick={() => handleClickSelectTask(item)}>{item}</button></li>
               })}
          </ul>
        </div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Position
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <img class="w-10 h-10 rounded-full" src={testImgSrc} alt="Jese image" />
              <div class="pl-3">
                <div class="text-base font-semibold">Neil Sims</div>
                <div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
              </div>
            </th>
            <td class="px-6 py-4">
              React Developer
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
