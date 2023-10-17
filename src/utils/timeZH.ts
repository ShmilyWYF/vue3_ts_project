// 转换数字为中文
export function timeZh(timestamp: number) {
    let date = new Date(timestamp);
    let Y = date.getFullYear();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    return toChineseNum(M) + '月' + ' ' + D + ', ' + Y
}

function toChineseNum(num: string | number) {
    if (!['number', 'string'].includes(typeof num)) return console.error('类型错误：应为number类型或者string类型');

    let newnum: string = String(num).concat()
    if (newnum.length > 10) return console.error('位数过大，无法计算');

    let tmpnewchar: string = '';
    for (let i = 0; i < newnum.length; i++) {
        switch (newnum[i]) {
            case "0":
                break;
            case "1":
                tmpnewchar += "一";
                break;
            case "2":
                tmpnewchar += "二";
                break;
            case "3":
                tmpnewchar += "三";
                break;
            case "4":
                tmpnewchar += "四";
                break;
            case "5":
                tmpnewchar += "五";
                break;
            case "6":
                tmpnewchar += "六";
                break;
            case "7":
                tmpnewchar += "七";
                break;
            case "8":
                tmpnewchar += "八";
                break;
            case "9":
                tmpnewchar += "九";
                break;
            case "10":
                tmpnewchar += "十";
                break;
            case '11':
                tmpnewchar += "十一";
                break;
            case "12":
                tmpnewchar += "十二";
                break;
        }
    }
    return tmpnewchar
}

// 获得时间函数
function formatDate(){
    //三目运算符
    const Dates = new Date();

    //年份
    const Year : number = Dates.getFullYear();

    //月份下标是0-11
    const Months : any = ( Dates.getMonth() + 1 ) < 10  ?  '0' + (Dates.getMonth() + 1) : ( Dates.getMonth() + 1);

    //具体的天数
    const Day : any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();

    //小时
    const Hours = Dates.getHours() < 10 ? '0' + Dates.getHours() : Dates.getHours();

    //分钟
    const Minutes = Dates.getMinutes() < 10 ? '0' + Dates.getMinutes() : Dates.getMinutes();

    //秒
    const Seconds = Dates.getSeconds() < 10 ? '0' + Dates.getSeconds() : Dates.getSeconds();

    //返回数据格式
    return Year + '-' + Months + '-' + Day + '-' + Hours + ':' + Minutes + ':' + Seconds;
}


// 计时器
// const runTime = () => {
//     let timeold = new Date().getTime() - new Date(store.websiteConfig.websiteCreateTime).getTime()
//     let msPerDay = 24 * 60 * 60 * 1000
//     let daysold = Math.floor(timeold / msPerDay)
//     let str = ''
//     let day = new Date()
//     str += daysold + '天'
//     str += day.getHours() + '时'
//     str += day.getMinutes() + '分'
//     str += day.getSeconds() + '秒'
//     websiteCreateTime.value = str
//     viewCount.value = appStore.viewCount
// }
