import create from '../../store/create'

create({
  options:{
    addGlobalClass: true
  },
  properties:{
  },
  data:{
    prevList:[],
    nextList:[],
    pageSum: 0,
    currentPage:1,
    hasSubmit: false,

    isStart: false
  },
  observers: {
    currentPage(val) {
      if(val == this.store.data.pageSum && this.store.data.hasSubmit) {
        this.setData({
          isStart: true
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
      
    }
  }
})

