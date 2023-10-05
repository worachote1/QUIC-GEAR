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
    // 2 : Opening Bid : Hight-Low
    if (sortOption === 2) {
        res = tempArrObj.sort((a, b) => b.startPrice - a.startPrice)
    }
    // 3 : Opening Bid: Low-Height
    if (sortOption === 3) {
        res = tempArrObj.sort((a, b) => a.startPrice - b.startPrice)
    }
    return [...res];
}