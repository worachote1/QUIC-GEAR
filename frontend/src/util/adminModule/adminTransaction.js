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