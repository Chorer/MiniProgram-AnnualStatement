import create from '../../../store/create'
import {getUserType} from '../../../utils/storage'
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
    isStart:false
  },
  observers: {
    currentPage(val) {
      if(val == this.properties.pageIndex) {
        this.setData({
          isStart:true
        })
      }
    }
  },
  lifetimes:{
    
  },
  methods: {

  }
})

