import create from '../../../store/create'
import store from '../../../store/store'
import { getCourseInfo } from '../../../utils/storage'

create({
  options:{
    addGlobalClass: true
  },
  lifetimes:{
    ready(){
      this.initData()
    }
  },
  data: {
    pageIndexs:{},
    pageSum: 0
  },
  methods: {
    initData(){
      let pageSum = 0
      let [courseIndex,paperIndex] = [0,0,0]
      const { course,paper } = getCourseInfo().courseAchievement
      // 判断页数和 index
      if(!course && !paper){
        pageSum = 5
      } else {
        if(course){
          courseIndex = 4
          if(paper){
            paperIndex = 5
            pageSum = 6
          } else {
            pageSum = 5
          }
        } else {
          paperIndex = 4
          pageSum = 5
        }
      }
      this.store.data.pageSum = pageSum
      this.update()
      this.setData({
        pageIndexs:{
          courseIndex,          
          paperIndex
        }
      })
    }
  }
})
