// import baseColor from '../../styles/global'
import { requestOpenid,requestQrCodeUrl,postPath,login } from '../../network/request'
import {
  getOpenid,
  getUserInfo,
  setOpenid,
  setQrCodeUrl,
  setUserInfo,
  setEnterInfo,
  setBorrowInfo,
  setPointInfo,
  setCourseInfo,
  setFlagInfo,
  clearAllStorage,
  getFlagInfo
} from '../../utils/storage'
import create from '../../store/create'
import store from '../../store/store'

const app =  getApp()

create(store,{
  data: {
    loginOptions: ["学生/教师登录","游客登录"],
    currentLoginIndex: 0,
    currentInputIndex: 0,
    numberValue: '',
    passwordValue: '',
    hasLogin: false,
    hasProtocolCheck: true,
    selectedFlagList:[],
    isWriten:false,
    writenContent:'',
    showContent:''
  },
  onLoad() {
    this.getLoginState()
    this.openFeature()
  },  
  _changeProtocolState(val){
    this.setData({
      hasProtocolCheck: val.detail
    })
  },
  /*  登录状态判断 */
  getLoginState(){
    let userInfo = getUserInfo()
    // 如果之前登录过，则展示已登录界面
    if(userInfo){
      this.setData({
        hasLogin: true
      })
    } 
    // 如果是首次登录，则展示登录界面
    else {
      // 如果之前没有获取过 openid，则获取 openid 并保存
      let openid = getOpenid()
      if(!openid){
        requestOpenid().then(res => {
          const openid = res.data.openid
          setOpenid(openid)
          return openid
        }).then(openid => {
          // 1.拿到自己的 openid 后，请求拿到小程序码图片地址
          requestQrCodeUrl(openid).then(res => {
            if(res.data.status == 1){
              setQrCodeUrl(res.data.Img)
            }
          })
          // 2.拿到自己的 openid 后，发送传播路径给后端
          postPath({
            scene: app.globalData.scene,            // 场景值
            userA: openid,                         // 自己的 openid
            userB: app.globalData.qrCodeQuery     // 小程序码归属者的 openid（没有则为"none"）
          }).then(res => {
            if(res.data.status == 1){
              console.log("分享路径发送成功")
            }
          })
        })
      }
    }
  },
  /* 切换登录方式 */
  changeLoginOption(e){
    this.setData({
      currentLoginIndex: e.currentTarget.dataset.index
    })
  },
  /* 用户登录 */
  userLogin(){
    let numberValue = this.data.numberValue.trim()
    let passwordValue = this.data.passwordValue
    // 如果账号或密码为空
    if((!numberValue || !passwordValue) && this.data.currentLoginIndex == 0){
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 1500,
        mask: false
      })
    }
    // 否则
    else {
      wx.showLoading({
        title: "登录中",
        mask: true
      })
      // 判断是用户（学生/教师）还是游客
      const sno = this.data.currentLoginIndex == 0 ? numberValue : 'tourist'
      const pwd = this.data.currentLoginIndex == 0 ? passwordValue : 'tourist'
      const openid = getOpenid()
      login({
        sno,
        pwd,
        openid
      }).then(res => {
        console.log(res)
        // 如果账号或者密码错误，status 为 0
        if (res.data.status == 0){
          wx.showToast({
            title: '账号或密码错误',
            icon: 'none',
            duration: 1500,
            mask: false
          })
        } 
        // 如果账号密码正确，status 为 1
        else if (res.data.status == 1){
          console.log('登录成功')
          const userInfo = res.data.userInfo
          // 获取用户类型
          const userType = this.getUserType(userInfo)
          // 保存用户姓名、学号/工号、身份、类型到本地
          setUserInfo({
            userType,
            name: userInfo.name,
            sno: userInfo.sno,
            identity: userInfo.identity
          })
          // 保存展示数据到本地
          setEnterInfo(userInfo.enterInfo)
          setBorrowInfo(userInfo.borrowInfo)
          setPointInfo(userInfo.pointInfo)
          setCourseInfo(userInfo.courseInfo)
          setFlagInfo(userInfo.flagInfo)
          // 切换登录面板为已登录
          this.setData({
            hasLogin: true
          })
          wx.hideLoading()
          // 跳转到主页
          this.navigateToBook()
        }
        // 如果服务器错误，status 为其它
        else {
         this.showErrorToast()
        }
      }).catch(() => {
       this.showErrorToast()
      })      
    }
  },
  showErrorToast(){
    wx.showToast({
      title: '服务器开小差,请稍后重试~',
      icon: 'none',
      duration: 1500,
      mask: false
    })
  },
  /* 判断并保存用户类型 */
  getUserType(userInfo){
    /*
    类型1:进馆 + 借阅 + 非教师    | 类型2:进馆 + 不借阅 + 非教师     | 类型3:不进馆 + 不借阅 + 非教师
    类型4:进馆 + 借阅 + 教师     | 类型5:进馆 + 不借阅 + 教师       | 类型6:不进馆 + 不借阅 + 教师
    类型7:不进馆 + 借阅 + 学生     | 类型8:不进馆 + 借阅 + 教师
    */
    const [hasEntered,hasBorrowed,identity] = [
      userInfo.enterInfo.hasEntered,
      userInfo.borrowInfo.hasBorrowed,
      userInfo.identity
    ]
    let userType = 0
    if(identity!="teacher"){
      if(hasEntered && hasBorrowed){
        userType = 1
      } else if (hasEntered && !hasBorrowed){
        userType = 2
      } else if (!hasEntered && !hasBorrowed){
        userType = 3
      } else if (!hasEntered && hasBorrowed){
        userType = 7
      }
    } 
    else {
      if(hasEntered && hasBorrowed){
        userType = 4
      } else if (hasEntered && !hasBorrowed){
        userType = 5
      } else if (!hasEntered && !hasBorrowed){
        userType = 6
      } else if (!hasEntered && hasBorrowed){
        userType = 8
      }
    }
    return userType
  },
  onFocus(e){
    const index = e.currentTarget.dataset.index
    this.setData({
      currentInputIndex: index
    })
  },
  onBlur(e){
    this.setData({
      currentInputIndex: 0,
    })
  },
  onInput(e){
    const index = e.currentTarget.dataset.index
    // 如果输入学号
    if(index == 1){
      this.setData({
        numberValue: e.detail.value
      })
    } 
    // 如果输入密码
    else if(index == 2){
      this.setData({
        passwordValue: e.detail.value
      })
    }
  },
  resetValue(e){
    const index = e.currentTarget.dataset.index
    if(index == 1){
      this.setData({
        numberValue: ''
      })
    } else if (index == 2){
      this.setData({
        passwordValue: ''
      })
    }
  },  
  resetBookView(){
    this.store.data.currentPage = 1
    this.store.data.prevList = ['']
    this.store.data.nextList = ['']
  },
  resetFlagView(){
    this.store.data.selectedFlagList = []
    this.store.data.isWriten = false
    this.store.data.writenContent = ''
    this.store.data.showContent = ''
  },
  navigateToBook(){
    // 重置 book 页和 flag 页状态
    this.resetBookView()
    this.resetFlagView()
    this.update()
    wx.navigateTo({
      url: '../book/book',
    })
  },
  /*  退出登录 */
  logout(){
    wx.showModal({
      title: '你确定要退出登录吗？',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#729CF8',
      success: res => {
        if(res.confirm){
          // 清除本地数据
          clearAllStorage()
          // 重置 book 页和 flag 页状态
          this.resetBookView()
          this.resetFlagView()
          this.update()
          this.setData({
            numberValue: '',
            passwordValue: '',
            hasLogin: false
          })
        }
      }
    })
  },
  /*  转发 */
  onShareAppMessage() {
    return {
      title: 'gcer，最懂你的年度账单来了！',
      path: '/pages/login/login',
      imageUrl: '/images/share.jpg'
    }
  },
  openFeature(){
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage']
    })
  }  
})