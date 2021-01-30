import create from '../../../store/create'
import { getEnterInfo,getUserName,getUserIdentity } from '../../../utils/storage'
import { formatTime } from '../../../utils/util'

create({
  options:{
    addGlobalClass: true
  },
  data:{
    prevList:[],
    nextList:[],
    currentPage:1,
    enterOne:false,
    enterTwo: false,
    enterThree:false,
    pic: '',
    person:'',
    isJan: true,
    firstEnter: '',
    enterWord1:'',
    enterWord2:'',
    timeWord: '',
    morningWidth: 0,
    afternoonWidth: 0,
    nightWidth: 0,    
    userName:'',
    enterDays: '',
    enterRate:'',
    morning: '',
    afternoon: '',
    night: '' 
  },
  observers:{
    currentPage(val){
      this.startAnimation(val)
    }
  },  
  lifetimes:{
    attached(){
     this.initData()
    }
  },
  methods: {
    startAnimation(val){
      if(val >=2 && val <=4){
        let enters = ['enterOne','enterTwo','enterThree']
        enters.forEach((item,index) => {
          if(index + 2 == val){
            this.setData({
              [item]: true
            })
          }
        })
      }
    },
    initData(){
      let enterInfo = getEnterInfo()
      let person = getUserIdentity() == 'teacher'?'您':'你'
      // 1.进馆日期
      let isJan = true,year,month,day
      if(enterInfo.firstEnter !== "0") {
        isJan = false;
        [year, month, day]= formatTime(enterInfo.firstEnter)
      }
      let firstEnter = `${month}月${day}日`

      // 2.进馆排名
      let enterWord1
      let EnterRank = enterInfo.EnterRank
      if(EnterRank == "first") {
        enterWord1 = `${person}真是时间馆理大师!~`
      }else if(EnterRank == "last") {
        enterWord1 = "所以爱会消失对不对？"
      } else {
        enterWord1 = `${person}真是平平无奇小馆霸!`
      }

      // 3.进馆时段
      const EnterWord = [
        `当早晨第一缕阳光悄悄撒落大地，透过天窗照亮了图书馆，也照亮了${person}`,
        `安静的午后，一条条小路延伸至森林深处，而${person}，在图书馆里思考人生深度`,
        `夜深了，花睡了，星星都困得眨眼睛了，而${person}依然在图书馆奋斗~`
      ]
      let enterTime = enterInfo.EnterTime
      let timeWord,wordIndex
      let sum = enterTime.morning + enterTime.afternoon + enterTime.night
      let morningWidth = enterTime.morning / sum * 480
      let afternoonWidth = enterTime.afternoon / sum * 480
      let nightWidth = enterTime.night / sum * 480
      let pic = '../../../images/enter-3-day.jpg'
      if(enterTime.afternoon > enterTime.morning && (enterTime.afternoon >= enterTime.night)) {
        timeWord = "下午"
        wordIndex = 1
      } else if(enterTime.night > enterTime.morning && (enterTime.night > enterTime.afternoon)) {
        timeWord = "晚上"
        wordIndex = 2
        pic = '../../../images/enter-3-night.jpg'
      } else {
        timeWord = "上午"
        wordIndex= 0
      }
      this.setData({
        pic,
        person,
        isJan,
        firstEnter,
        enterWord1,
        morningWidth,
        afternoonWidth,
        nightWidth,
        timeWord,
        userName: getUserName(),
        enterDays: enterInfo.EnterDays,
        enterRate:enterInfo.EnterRate,
        morning: enterTime.morning,
        afternoon: enterTime.afternoon,
        night: enterTime.night,
        enterWord2: EnterWord[wordIndex]
      })      
    }
  }
})

