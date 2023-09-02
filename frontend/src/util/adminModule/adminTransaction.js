export const sortByType = (arrObj, sortOption) => {
    let res = [];
    //  0 : Newst
    if (sortOption === 0) {
        res = arrObj
    }
    // 1 : Oldest
    if (sortOption === 1) {
        
    }
    // 2 : Amount : Hight-Low
    if (sortOption === 2) {
        res = arrObj.sort((a, b) => b.amount - a.amount)
    }
    // 3 : Amount: Low-Height
    if (sortOption === 3) {
        res = arrObj.sort((a, b) => a.amount - b.amount)
    }
    return [...res];
}