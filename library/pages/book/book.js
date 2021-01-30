import store from '../../store/store'
import create from '../../store/create'
import { getUserType,getUserIdentity,getPointInfo,getCourseInfo } from '../../utils/storage'
import {value} from '../../components/fly/value'

let [startX,endX] = [0,0]
let [prevClass,nextClass] = ['prevAnimation','nextAnimation']
let hasMoved = true 

create(store,{
  data: {
    userType: 0,
    currentPage: 1,
    pageSum: 0,
    isLoaderShow: false,

    person:'',
    styleVar:''
  },
  onLoad(){
    this.showLoader()
    this.initData()
    this.openFeature()
  },
  showLoader(){
    this.store.data.isLoaderShow = true
    this.update()
    setTimeout(() => {
      this.store.data.isLoaderShow = false
      this.update()
    },1800)   // 1800
  },
  /* 相关数据初始化 */
  initData(){
    // 初始化用户类型及flag遮罩层的数据
    let styleVar = value(wx.getSystemInfoSync().windowWidth)
    this.setData({
      styleVar,
      userType: getUserType(),
      person: getUserIdentity() == 'teacher'?'您':'你',
    })
    // 初始化学生类型和绩点情况
    this.store.data.userIdentity = getUserIdentity()
    this.store.data.hasPoint = getPointInfo().hasPoint
    this.store.data.courseAchievement = getCourseInfo().courseAchievement
    this.update()
  },
  /* 页面控制 */
  touchStart(e){
    startX = e.touches[0].pageX
    hasMoved = true
  },
  touchMove(e){
    endX = e.touches[0].pageX
    if(hasMoved){
      if(startX - endX > 50){
        this.next()
        hasMoved = false
      } else if (endX - startX > 50){
        this.prev()
        hasMoved = false
      }      
    }
  },
  prev(){
    if(this.store.data.currentPage > 1){
      const currentPage = this.store.data.currentPage - 1
      this.store.data.nextList[currentPage] = ''
      this.store.data.prevList[currentPage] = prevClass
      this.store.data.currentPage = currentPage 
      this.update() 
    }
  },
  next(){
    const currentPage = this.store.data.currentPage
    const pageSum = this.store.data.pageSum
    if(currentPage < pageSum){
      this.store.data.prevList[currentPage] = ''
      this.store.data.nextList[currentPage] = nextClass
      this.store.data.currentPage = currentPage + 1
      this.update()     
    } else {
      wx.showToast({
        title: '已经到达尽头啦~',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      })
    }
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