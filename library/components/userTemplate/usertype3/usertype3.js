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
        pageSum = 4
      } else {
        if(!this.store.data.hasPoint){
          pageSum = 5
        } else {
          pageSum = 6
        }
      }
      this.store.data.pageSum = pageSum
      this.update()
    }
  }
})
