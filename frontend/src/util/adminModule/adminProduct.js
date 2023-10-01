export const sortByType = (arrObj, sortOption) => {
    let res = [];
    //  0 : Newst
    if (sortOption === 0) {
        res = arrObj.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    // 1 : Oldest
    if (sortOption === 1) {
        res = arrObj.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }
    // 2 : Best sales
    if (sortOption === 2) {
        res = arrObj.sort((a, b) => b.totalOrder - a.totalOrder)
    }
    // 3 : Price: Hight-Low
    if (sortOption === 3) {
        res = arrObj.sort((a, b) => b.price - a.price)
    }
    // 4 : Price: Low-Hight        
    if (sortOption === 4) {
        res = arrObj.sort((a, b) => a.price - b.price)
    }
    return [...res];
}