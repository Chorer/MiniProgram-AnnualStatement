/* 存取 openid */
export const setOpenid = openid => {
  wx.setStorageSync('openid', openid)
}
export const getOpenid = () => {
  return wx.getStorageSync('openid')
}

/* 存取小程序码图片地址 */
export const setQrCodeUrl = qrCodeUrl => {
  wx.setStorageSync('qrCodeUrl', qrCodeUrl)
}
export const getQrCodeUrl = () => {
  return wx.getStorageSync('qrCodeUrl')
}

/* 存取用户信息（包括姓名、学号/工号、身份）*/
export const setUserInfo = info => {
	wx.setStorageSync('userInfo',info)
}
export const getUserInfo = () => {
	return wx.getStorageSync('userInfo')
}

// 获取用户姓名
export const getUserName = () => {
  return getUserInfo().name
}

// 获取用户学号/工号
export const getUserSno = () => {
  return getUserInfo().sno
}

// 获取用户身份
export const getUserIdentity = () => {
  return getUserInfo().identity
}

// 获取用户类型
export const getUserType = () => {
  return getUserInfo().userType
}


/* 存取进馆数据 */
export const setEnterInfo = enterInfo => {
  wx.setStorageSync('enterInfo', enterInfo)
}
export const getEnterInfo = () => {
  return wx.getStorageSync('enterInfo')
}

/* 存取借阅数据 */
export const setBorrowInfo = borrowInfo => {
  wx.setStorageSync('borrowInfo', borrowInfo)
}
export const getBorrowInfo = () => {
  return wx.getStorageSync('borrowInfo')
}

/* 存取选课数据 */
export const setCourseInfo = courseInfo => {
  wx.setStorageSync('courseInfo', courseInfo)
}
export const getCourseInfo = () => {
  return wx.getStorageSync('courseInfo')
}

/* 存取绩点数据 */
export const setPointInfo = pointInfo => {
  wx.setStorageSync('pointInfo', pointInfo)
}
export const getPointInfo = () => {
  return wx.getStorageSync('pointInfo')         
}

/* 存取 flag 数据 */
export const setFlagInfo = flagInfo => {
	wx.setStorageSync('flagInfo',flagInfo)
}
export const getFlagInfo = () => {
	return wx.getStorageSync('flagInfo')
}

/* 存取是否提交过flag */
export const setHasFlagSubmit = hasSubmit => {
	wx.setStorageSync('hasSubmit',hasSubmit)
}
export const getHasFlagSubmit = () => {
	return wx.getStorageSync('hasSubmit')
}

/* 退出登录后清除部分缓存 */
export const clearAllStorage = () => {
	const storages = ["userInfo","enterInfo","borrowInfo","courseInfo","pointInfo","flagInfo"]
	storages.forEach(item => {
		wx.removeStorageSync(item)
	})
}
