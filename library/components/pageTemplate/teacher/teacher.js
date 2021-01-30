import create from '../../../store/create'
import {getCourseInfo,getUserType} from '../../../utils/storage'
create({
  options:{
    addGlobalClass: true
  },
  properties:{
    pageIndexs: Object
  },
  data:{
    prevList:[],
    nextList:[],
    pageSum: 0,
    courseAchievement: {},
    sections:"",
    hours:"",
    paperSum:"",
    wordOne: "",
    wordTwo:"",
    currentPage:1,
    hasCourse:false,
    hasPaper:false
  },
  observers: {
    currentPage(val) {
      if(val == this.properties.pageIndexs.courseIndex) {
        this.setData({
          hasCourse: true
        })
      } else if(val == this.properties.pageIndexs.paperIndex) {
        this.setData({
          hasPaper: true
        })
      }
    }
  },
  lifetimes:{
    attached() {
      this.initData()
    }
  },
  methods: {
    initData(){
      let course = getCourseInfo().courseAchievement.course
      let paper = getCourseInfo().courseAchievement.paper
      let [wordOne,wordTwo] = ["",""]
      let [sections,hours,paperSum] = [0,0,0]
      // 如果有课程
      if(course){
        sections = course.sections
        hours = course.hours
        wordOne = course.comment
      }
      // 如果有论文
      if(paper){
        paperSum = paper.sum
        if(paperSum <= 2) {
          wordTwo = "厚积薄发ING！继续加油!"
        } else if(paperSum < 5) {
          wordTwo = "您是一名写作能手!"
        } else {
          wordTwo = "Wow~\n您简直就是论文机器，科研奇才!"
        }
      }
      this.setData({
        sections,
        hours,
        wordOne,
        paperSum,
        wordTwo
      })      
    }
  } 
})

