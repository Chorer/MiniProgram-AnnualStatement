import create from '../../store/create'

create({
  data: {
    currentPercent:"0%",
    currentPage: 1,
    pageSum: 0
  },
  observers:{
    // 监听 pageSum，pageSum 改变，说明获取到了总页数，此时进度条可以初始化
    pageSum(val){
      this.setData({
        currentPercent: this.changeProgress()
      })
    },
    // 监听 currentPage,currentPage 改变，进度条跟着运动
    currentPage(val){
      this.setData({
        currentPercent: this.changeProgress()
      })
    }
  },
  options:{
    addGlobalClass: true
  },
  lifetimes:{
    ready(){
    }
  },
  methods:{
    changeProgress(){
      return (this.store.data.currentPage / this.store.data.pageSum).toFixed(2) * 100 + "%"
    }
  }
})
