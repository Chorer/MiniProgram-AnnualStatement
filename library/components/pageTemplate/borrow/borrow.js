import create from '../../../store/create'
import { getBorrowInfo,getUserIdentity,getEnterInfo } from '../../../utils/storage'


create({
  options:{
    addGlobalClass: true
  },
  lifetimes:{
    ready(){
      this.initData()
    }
  },
  observers:{
    currentPage(val){
      if(val == this.properties.pageIndex){   
        this.setData({
          isAnimationOneStart: true
        })
      } else if(val == this.properties.pageIndex + 1){   
        this.setData({
          isAnimationTwoStart: true
        })
      }
    }
  },
  properties:{
    pageIndex: Number
  },
  data:{
    prevList:[],
    nextList:[],
    person: '',
    borrowInfo: {},
    hasEntered: false,
    currentPage: 0,
    pageSum:0,
    isAnimationOneStart: false,
    isAnimationTwoStart: false
  },
  methods: {
    initData(){
      this.setData({
        person: getUserIdentity() == 'teacher'?'您':'你',
        borrowInfo: getBorrowInfo(),
        hasEntered: getEnterInfo().hasEntered
      })
    }
  }
})

