import React from "react";


export default function AdminPagination({totalDataRow, dataRowPerPage, currentPage, setCurrentPage}) {
    let pages = [];
    console.log("total -> ",totalDataRow,"perpage -> ",dataRowPerPage)
    for (let i = 1 ; i <= Math.ceil(totalDataRow / dataRowPerPage); i++)
    {
        pages.push(i);
    }
    console.log(pages)
    return (
        <div className="join mt-3 w-full">
            <div className="mx-auto">
                {/* btn-active */}
                {pages.map((item , Idx) => {
                    return <button className={`join-item btn btn-md ${item === currentPage ? 'btn-active' : ''}`} onClick={() => setCurrentPage(item)} key={Idx}>{item}</button>
                })}
            </div>
        </div>
    );
}
