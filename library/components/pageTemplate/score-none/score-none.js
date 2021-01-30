import create from '../../../store/create'
import { getUserName } from '../../../utils/storage'

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
    isStart: false,
    word1:'',
    word2:''
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
    attached() {
      this.initData()
    }
  },
  methods: {
    initData(){
      let name = getUserName()
      if(name == '打工人') {
        this.setData({
          word1: "打工人 打工魂",
          word2: "打工都是人上人!"
        })
      } else {
        let wordList = [
          ['想成为什么样的人','是自己决定的呀'],
          ['想要的终会到来','但是要努力呀'],
          ['慢慢变好','才是给自己最好的礼物'],
          ['心里藏着小星星','生活才能亮晶晶'],
          ['愿你保持善良','从此拥有远方']
        ]
        let index = Math.floor(Math.random() * 5)
        this.setData({
          word1: wordList[index][0],
          word2: wordList[index][1]
        })
      }
    }
  }
})

