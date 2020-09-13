import md5 from 'js-md5'

// 对对象按照对象元素名正序排序
function objKeySort(obj) {
    // 排序的函数
    const newkey = Object.keys(obj).sort()
    // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    const newObj = {} // 创建一个新的对象，用于存放排好序的键值对
    for (let i = 0; i < newkey.length; i++) {
        // 遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]] // 向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj // 返回排好序的新对象
}

// 获取签名
function getSign(params) {
    params = objKeySort(params)
    let signString = ''
    Object.keys(params).forEach(function (key) {
        signString += key + params[key]
    })
    return md5(signString)
}

export function handleData(data) {
    //获取当前时间戳
    data.timestamp = Date.parse(new Date().toString())
    //获取随机数
    data.nonce = Math.floor(Math.random() * 100000000)
    //获取请求的签名
    data.singe = getSign(data)
    return data
}
