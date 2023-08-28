import React, { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import CheckAuctions from './CheckAuctions';
import CheckOrders from './CheckOrders';
import CheckTransactions from './CheckTransactions';
import CheckUsers from './CheckUsers';
import CreateProducts from './CreateProducts';

export default function Admin() {
  const adminTaskType = ["Auctions", "Orders", "Transactions", "Users", "Create Products"]
  const taskBGColor = {
    "Auctions": "bg-red-500",
    "Orders": "bg-orange-500",
    "Transactions": "bg-green-500",
    "Users": "bg-blue-500",
    "Create Products": "bg-yellow-500"
  }
  const testImgSrc = "https://lh3.googleusercontent.com/ogw/AGvuzYZRQF_a0tm1dHizZsXzhHZAkHUTosYtX7fd0AOoyQ=s32-c-mo";
  const [selectedTask, setSelectedTask] = useState(adminTaskType[3]);
  const [selectedTasktCompoent, setSelectedTasktCompoent] = useState(<CheckUsers />);

  const handleClickSelectTask = (task) => {
    setSelectedTask(task);
  }

  const updateSelectedTaskComponent = (task) => {
    switch (task) {
      case "Auctions":
        setSelectedTasktCompoent(<CheckAuctions />);
        break;
      case "Orders":
        setSelectedTasktCompoent(<CheckOrders />);
        break;
      case "Transactions":
        setSelectedTasktCompoent(<CheckTransactions />);
        break;
      case "Users":
        setSelectedTasktCompoent(<CheckUsers />);
        break;
      case "Create Products":
        setSelectedTasktCompoent(<CreateProducts />);
        break;
    }
  }

  useEffect(() => {
    updateSelectedTaskComponent(selectedTask);
  }, [selectedTask])

  return (
    <div className="min-h-screen max-w-[1640px] mx-auto mt-5" >
      <div>
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className={`btn m-1 text-white ${taskBGColor[selectedTask]}`}> {selectedTask} <span className='ml-1'> {<AiFillCaretDown size={20} />} </span></label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            {adminTaskType.map((item, Idx) => {
              return <li key={Idx}> <button onClick={() => handleClickSelectTask(item)}>{item}</button></li>
            })}
          </ul>
        </div>
        {selectedTasktCompoent}
      </div>

    </div>
  )
}
