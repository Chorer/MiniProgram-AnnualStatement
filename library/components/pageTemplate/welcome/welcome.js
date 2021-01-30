import create from '../../../store/create'

create({
  options:{
    addGlobalClass: true
  },
  lifetimes:{
    ready(){
      this.setData({
        isAnimationOneStart: true
      })
    }
  },
  data:{
    prevList:[],
    nextList:[],
    currentPage: 1,
    isAnimationStart: false
  },
  methods: {

  }
})

