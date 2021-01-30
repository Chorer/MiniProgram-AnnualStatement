import create from '../../../store/create'
import {getCourseInfo,getPointInfo,getUserType,getUserIdentity} from '../../../utils/storage'
import { toDecimal } from '../../../utils/util'

create({
  options:{
    addGlobalClass: true
  },
  properties:{
    pageIndex: Number
  },
  data:{
    prevList:[],
    nextList:[],
    pageSum: 0,
    currentPage:1,
    hasCoursePoint:false,
    hasScore:false
  },
  observers: {
    currentPage(val) {
      if(val == this.properties.pageIndex) {
        this.setData({
          hasCoursePoint: true
        })
      } else if(val == this.properties.pageIndex + 1) {
        this.setData({
          hasScore: true
        })
      }
    }
  },
  lifetimes:{
    attached() {
      this.initData()
    }
  },
  methods:{
    initData(){ 
      // 课程
      let courseScore = getCourseInfo().courseScore
      for(let i in courseScore) {
        if(courseScore[i].courseName.length > 16) {
          courseScore[i].courseName = courseScore[i].courseName.slice(0,16) + "..."
        }
      }
      //绩点
      let pointInfo = getPointInfo()
      let compareWord = ''
      if(pointInfo.compare == "后退的") {
        compareWord = "路上风景虽好，也别一步三回头哦"
      }else if(pointInfo.compare == "平稳的"){
        compareWord = "风格不漂移，始终如一"
      } else {
        compareWord = "油门踩到底，一路狂奔"
      }
      this.setData({
        compareWord,
        courseList: courseScore,
        point: toDecimal(pointInfo.point),
        rank: pointInfo.rank,
        compare: pointInfo.compare
      })      
    }
  }
})

