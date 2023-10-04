export const sortByType = (arrObj, sortOption) => {
    let res = [];
    let tempArrObj = [...arrObj];
    //  0 : Newst
    if (sortOption === 0) {
        res =  tempArrObj.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    // 1 : Oldest
    else if (sortOption === 1) {
        res = tempArrObj.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }
    // 2 : Best sales
    else if (sortOption === 2) {
        res = tempArrObj.sort((a, b) => b.totalOrder - a.totalOrder)
    }
    // 3 : Price: Hight-Low
    else if (sortOption === 3) {
        res = tempArrObj.sort((a, b) => b.price - a.price)
    }
    // 4 : Price: Low-Hight        
    else if (sortOption === 4) {
        res = tempArrObj.sort((a, b) => a.price - b.price)
    }
    
    return [...res];
}