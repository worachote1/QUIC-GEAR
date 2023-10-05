import axios from 'axios';
import Swal from 'sweetalert2';

export const sortByType = (arrObj, sortOption) => {
    let res = [];
    let tempArrObj = [...arrObj];
    //  0 : Newst
    if (sortOption === 0) {
        res = tempArrObj.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    // 1 : Oldest
    if (sortOption === 1) {
        res = tempArrObj.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }
    // 2 : Amount : Hight-Low
    if (sortOption === 2) {
        res = tempArrObj.sort((a, b) => b.amount - a.amount)
    }
    // 3 : Amount: Low-Height
    if (sortOption === 3) {
        res = tempArrObj.sort((a, b) => a.amount - b.amount)
    }
    return [...res];
}

const alertUpdateTransactionSuccess = () => {
    Swal.fire(
      'Success! ',
      'Transaction has been updated.',
      'success'
    )
    .then((res) => {
      if (res.isConfirmed)
        window.location.reload();
    })
  }

const updateTransaction = async (transactionData, userData, option, amount) => {
    try {
      if (option === "updateCoin") {
        const updateTransactionStatus = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/transactions/update/${transactionData._id}`, {
          transactionStatus: "completed"
        })
        const updateUserCoin = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/users/update/${userData._id}`, {
          coins: userData.coins + amount
        })
      }
      if (option === "decline") {
        const updateTransactionStatus = await axios.put(`${process.env.REACT_APP_QUIC_GEAR_API}/transactions/update/${transactionData._id}`, {
            transactionStatus: "declined"
          })
      }
      alertUpdateTransactionSuccess()
    }
    catch (err) {

    }
  }

export const renderTransactionButtons = (item) => {
    if (item.transactionType === "topup") {
        if (item.transactionStatus === "waiting approved") {
            return (
                <div>
                    <button className="btn btn-outline btn-warning" onClick={() => updateTransaction(item, item.userAccount, "updateCoin", item.amount)}>Update coin</button>
                    <button className="btn btn-outline btn-error ml-2" onClick={() => updateTransaction(item, item.userAccount, "decline", item.amount)}>Decline</button>
                    <a className="link link-info lg:ml-2">Check Proof of Payment</a>
                </div>
            );
        } 
        else if (item.transactionStatus === "declined") {
            return <button className="btn btn-outline btn-error">Declined</button>;
        }
        else {
            return <button className="btn btn-outline btn-success">Completed</button>;
        }
    } 
    else if (item.transactionType === "withdraw" && item.transactionStatus === "waiting approved") {
        return <button className="btn btn-outline btn-primary">Approve withdrawal</button>;
    }
    else {
        return <button className="btn btn-outline btn-success">Completed</button>;
    } 
}