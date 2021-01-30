import create from '../../../store/create'
import store from '../../../store/store'

create({
  options:{
    addGlobalClass: true
  },
  lifetimes:{
    ready(){
      this.initData()
    }
  },
  data:{
    pageSum: 0,
    userIdentity: '',
    hasPoint: true
  },
  methods: {
    initData(){
      let pageSum = 0
      // 判断页数
      if(this.store.data.userIdentity == "graduator"){
        pageSum = 6
      } else {
        if(!this.store.data.hasPoint){
          pageSum = 7
        } else {
          pageSum = 8
        }
      }
      this.store.data.pageSum = pageSum
      this.update()
    }
  }
})

