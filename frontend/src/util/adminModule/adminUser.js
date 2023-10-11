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
    // 2 : Coins: Hight-Low
    if (sortOption === 2) {
        res = arrObj.sort((a, b) => b.coins - a.coins)
    }
    // 3 : Coins: Low-Height
    if (sortOption === 3) {
        res = arrObj.sort((a, b) => a.coins - b.coins)
    }
    return [...res];
}