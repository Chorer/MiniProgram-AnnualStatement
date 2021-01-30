import store from '../../../store/store'
import create from '../../../store/create'

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
        pageSum = 5
      } else {
        if(!this.store.data.hasPoint){
          pageSum = 6
        } else {
          pageSum = 7
        }
      }
      this.store.data.pageSum = pageSum
      this.update()
    }
  }
})

