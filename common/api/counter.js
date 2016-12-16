function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}
//使用 setTimeout() 来模拟非同步的产生资料让 server 端在每次接收 request 时读取随机产生的值
export function fetchCounter(callback) {
    setTimeout( () => {
        callback(getRandomInt(1, 100))
    }, 500);
}