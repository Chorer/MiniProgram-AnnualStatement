import create from '../../../store/create'
import { getUserName,getUserIdentity } from '../../../utils/storage'

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
    person:"",
    userName:"",
    currentPage:1,
    enterNone:false
  },
  observers:{
    currentPage(val){
      if(val==2) {
        this.setData({
          enterNone: true
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
      this.setData({
        person: getUserIdentity() == 'teacher'?'您':'你',
        userName: getUserName()
      })
    }
  }
})

