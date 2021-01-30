import create from '../../../store/create'
import  { getUserName,getUserIdentity,getEnterInfo } from '../../../utils/storage'

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
    userName: '',
    person: '',
    hasEntered: false,
    isAnimationOneStart: false
  },
  observers:{
    currentPage(val){
      if(val == this.properties.pageIndex){
        this.setData({
          isAnimationOneStart: true
        })
      }
    }
  },
  lifetimes:{
    ready(){
      this.initData()
    }
  },
  methods: {
    initData(){
      this.setData({
        person: getUserIdentity() == 'teacher'?'您':'你',
        hasEntered: getEnterInfo().hasEntered,
        userName: getUserName()
      })
    }
  }
})

