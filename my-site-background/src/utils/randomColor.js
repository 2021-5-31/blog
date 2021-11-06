export const randomColor = ()=>{
    const str = Math.random().toString(16).substr(2,6);
    return '#' + str;
}