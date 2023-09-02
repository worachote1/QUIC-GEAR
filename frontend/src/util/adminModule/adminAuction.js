export const sortByType = (arrObj, sortOption) => {
    let res = [];
    //  0 : Newst
    if (sortOption === 0) {
        res = arrObj
    }
    // 1 : Oldest
    if (sortOption === 1) {
        
    }
    // 2 : Opening Bid : Hight-Low
    if (sortOption === 2) {
        res = arrObj.sort((a, b) => b.startPrice - a.startPrice)
    }
    // 3 : Opening Bid: Low-Height
    if (sortOption === 3) {
        res = arrObj.sort((a, b) => a.startPrice - b.startPrice)
    }
    return [...res];
}