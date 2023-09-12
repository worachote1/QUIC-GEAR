export const displayCountDownDate = (d,h,m,s) => {
    return `${d} days ${h < 10 ? '0'+ h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
    // return `${d} days`
}