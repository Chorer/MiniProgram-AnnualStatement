import create from '../../store/create'
import { 
  getUserName,
  getUserSno,
  setFlagInfo
} from '../../utils/storage'
import {postFlag} from '../../network/request'
import { wait } from '../../utils/util'

create({
  properties: {
    person: String,
    styleVar: String
  },
  data: {
    isConfirm: false,
    flagLookList:[], 
    selectedFlagList: [],
    isWriten: false,
    writenContent: "",
    person: '',
    styleVar:'',
    showContent:'',

    isFront: true,
    isBeginning: true,
    isCurved: false,
    isHover: false,
    isFly_away_first:false,
    isFly_away:false,
    isShow:true
  },  
  options:{
    addGlobalClass: true
  },
  lifetimes:{
    ready() {
      this.initData()
    }
  },
  methods: {
    initData() {
    },
    confirmCancel() {
      this.store.data.isConfirm = false
      this.update()
    },
    async fly(flags) {
      // 步骤一：隐藏面板、显示飞机、完成折叠效果
      await wait(200)
      this.setData({
        isFront: false,
        isBeginning: false,
        isCurved: true,
        isShow:false
      })
      // 步骤二：平放飞机
      await wait(2800)
      this.setData({
        isHover:true
      })
      // 步骤三：飞机后退助跑
      await wait(1500)
      this.setData({
        isFly_away_first:true
      })
      // 步骤四：飞机向前飞翔至消失
      await wait(600)
      this.setData({
        isFly_away:true
      })
      // 步骤五：跳往flag展示页面
      await wait(2000)
      this.store.data.hasSubmit = true
      this.store.data.flagLookList = flags
      this.update().then(() => {
        this.store.data.isConfirm = false
        this.update()
      })
    },
    // 存储并发送flag
    decidedFlag() {
      let flags = this.store.data.selectedFlagList
      let isWriten = this.store.data.isWriten
      let content = this.store.data.writenContent
      if(isWriten) {
        flags.push({"word":content, index:-1})
      }
      flags = flags.map((item)=>{
        return item.word
      })
      setFlagInfo(flags)

      //开启飞机动画
      this.fly(flags)
      // 发送 flag 给后端
      this._postFlag(flags)       
    },
    _postFlag(flags){  
      console.log({
        sno: getUserSno(),
        name: getUserName(),
        identity: getUserSno() == 'tourist'?'tourist':'no-tourist',
        flag: JSON.stringify(flags)
      })
      postFlag({
        sno: getUserSno(),
        name: getUserName(),
        identity: getUserSno() == 'tourist'?'tourist':'no-tourist',
        flag: JSON.stringify(flags)
      }).then(res => {
        if(res.data.status == 1){
          console.log("后端成功收到flag")
        }
      })
    },
  }
})