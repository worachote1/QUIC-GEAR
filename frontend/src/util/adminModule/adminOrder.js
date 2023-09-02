export const sortByType = (arrObj, sortOption) => {
    let res = [];
    //  0 : Newst
    if (sortOption === 0) {
        res = arrObj
    }
    // 1 : Oldest
    if (sortOption === 1) {
        
    }
    // 2 : Total Price: Hight-Low
    if (sortOption === 2) {
        res = arrObj.sort((a, b) => b.totalPrice - a.totalPrice)
    }
    // 3 : Total Price: Low-Height
    if (sortOption === 3) {
        res = arrObj.sort((a, b) => a.totalPrice - b.totalPrice)
    }
    return [...res];
}