export const formatDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp));
    let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds();
    if(hour <=9 && hour>=0){
        hour = '0' + hour;
    }
    if(minute <=9 && minute>=0){
        minute = '0' + minute;
    }
    if(second <=9 && second>=0){
        second = '0' + second;
    }
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
