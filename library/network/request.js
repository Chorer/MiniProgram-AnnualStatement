const baseUrl = ''
/**
 * @description 公用请求函数
 * @method request
 * @param {Object} options 包含请求参数的对象
 * @return {Object} 返回一个 Promise
 */

const request = options => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: baseUrl + options.url,
      data: options.data || {},
      header: {
        'content-type':options.method == 'POST'?'application/x-www-form-urlencoded':'application/json'
      },
      method: options.method || 'GET',
      dataType: 'json',
      responseType: 'text',
      success: resolve,
      fail: reject
    })
  })
}

/**
 * @description 获取 openid
 * @method requestOpenid
 * @return {Object} 返回一个 Promise
 */

export const requestOpenid = async () => {
  const res = await new Promise((resolve,reject) => {
    wx.login({
      timeout:10000,
      success: resolve,
      fail: reject
    })
  })
  return request({
    url:'/openid',
    data:{
      code: res.code
    }
  })
  
}

/**
 * @description 登录并获取用户数据
 * @method login
 * @param {Object} options 包含请求参数的对象
 * @return {Object} 返回一个 Promise
 * @example 
 * login({
 *    sno: "18251106124",
 *    pwd: "123456",
 *    openid: "123456789"
 * })
 */

export const login = options => {
  return request({
    url:'/user/CasLogin',
    method: 'POST',
    data:{
      ...options
    }
  })
}

/**
 * @description 记录小程序传播路径
 * @method postPath
 * @param {Object} options 包含请求参数的对象
 * @return {Object} 返回一个 Promise
 * @example 
 * postPath({
 *    scene: "4001",
 *    userA: "123456",
 *    userB: "234567"
 * })
 */

export const postPath = options => {
  return request({
    url: '/user/scanLog',
    method: 'POST',
    data: {
      ...options
    }
  })
}

/**
 * @description 提交 flag
 * @method submitFlag
 * @param {Object} options 包含请求参数的对象
 * @return {Object} 返回一个 Promise
 * @example 
 * postFlag({
 *    sno: "18251106124",
 *    name: "张三",
 *    identity: "tourist"
 *    flag: ["xxx","yyy","zzz"]
 * })
 */

export const postFlag = options => {
  return request({
    url:'/user/flag',
    method: 'POST',
    data:{
      ...options
    }
  })
}

/**
 * @description 换取小程序码图片网络地址
 * @method requestQrCodeUrl
 * @param {String} qrCodeQuery 小程序码的参数，即自己的 openid
 * @return {Object} 返回一个 Promise
 * @example requestQrCodeUrl("123456789")
 */

export const requestQrCodeUrl = qrCodeQuery => {
  return request({
    url:'/user/getQRCode',
    data:{
      page: '',
      scene: qrCodeQuery      
    },
    method: 'POST'
  })
}


