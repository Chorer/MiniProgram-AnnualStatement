import create from '../../../store/create'
import store from '../../../store/store'
import { 
  getFlagInfo,
  getHasFlagSubmit,
  getUserIdentity
} from '../../../utils/storage'

create({
  options:{
    addGlobalClass: true
  },
  lifetimes:{
    ready() {
      this.initData()
    }
  },
  data:{
    prevList:[],
    nextList:[],
    pageSum: 0,
    flagList: [],
    showflagList: [],
    flagIndex:1,
    selectedFlagList:[],
    isWriten:false,   //记录自己有没有写
    isConfirm:false,
    writenContent:"",
    showContent: "",
    flags:[],
    flagImg:"",
    isTextFill:false,
    currentPage:1,
    person:'',
    flagLookList:[],
    hasSubmit:false
  },
  methods: {
    initData() {
      // 如果当前账号已经选过flags
      if(getFlagInfo().length > 0) {
        let flags = getFlagInfo()
        // console.log(flags)
        this.store.data.hasSubmit = true
        this.store.data.flagLookList = flags
        this.update()
      }
      // 否则
      else {
        let flagList = [
          '绩点4.0','到图书馆对边的阿里巴巴工作','暴瘦',
          '不挂科','一周一杯奶茶','早睡早起',
          'offer滚滚来','看一百本书','顺利脱单',
          '考研成功上岸','拿奖学金','学做菜',
          '平平安安','不做打工人','保持发量浓密',
          '健身','做一个有趣的人','多陪伴家人',
          '好好学习', '学新舞种', '每天背50个单词',
          '学门新语言','存钱','来一场说走就走的旅行'
        ]
        let showflagList = ['绩点4.0','到图书馆对边的阿里巴巴工作','暴瘦']
        if(getUserIdentity() == 'teacher') {
          flagList = [
            '买车买房实现人生赢家','坚持早睡','健身',
            '学做菜','论文质量数量双up','平平安安',
            '工作越来越顺利','多陪伴家人','存钱',
            '保持发量浓密','不做打工人','学门新语言',
            '保持情绪稳定','来一场说走就走的旅行','看一百本书',
            '顺利脱单','瘦10斤','家人朋友身体健康'
          ]
          showflagList = ['买车买房实现人生赢家','坚持早睡','健身']
        }
        this.store.data.hasSubmit = false
        this.update()
        this.setData({
          flagList,
          showflagList,
          person: getUserIdentity() == 'teacher'?'您':'你',
        })
      }
    },
    changeFlag() {
      let flagList = this.data.flagList;
      let showflagList = this.data.showflagList;
      let flagIndex = this.data.flagIndex;
      if((flagIndex+1)*3<=flagList.length) {
        for(let i=0;i<3;i++) {
          showflagList[i] = flagList[flagIndex*3+i];
        }
        flagIndex++;
      }else {
        for(let i=0;i<3;i++) {
          showflagList[i]=flagList[i];
        }
        flagIndex=1;
      }
      this.setData({
        flagIndex,
        showflagList
      })
    },
    selectedFlag(e) {
      // console.log(e.currentTarget.dataset.index)
      let index = e.currentTarget.dataset.index;
      let flagList = this.data.flagList;
      let selectedFlagList = this.store.data.selectedFlagList;
      let isWriten = this.store.data.isWriten;
      let isSelected = false;
  
      //将重复的先移除
      for(let i=0;i<selectedFlagList.length;i++) {
        if(selectedFlagList[i].word==flagList[index]) {
          selectedFlagList.splice(i,1)
          isSelected = true;
          break;
        }
      }
      if(!isSelected) {
        let len = 3;
        if(isWriten) {
          len = 2;
        }
        if(selectedFlagList.length<len) {
          selectedFlagList.push({"word":flagList[index],"index":index})
        }else {
          selectedFlagList.shift();
          selectedFlagList.push({"word":flagList[index],"index":index});
        }
      }
      this.setData({
        selectedFlagList
      })
      this.store.data.selectedFlagList = selectedFlagList
      this.update()
    },
    inputFlag(e) {
      let selectedFlagList = this.store.data.selectedFlagList;
      let len = e.detail.value.length
      let isTextFill = false
        if(len>0) {
          if(selectedFlagList.length>=3) {
            selectedFlagList.shift();
          }
          if(len>25) {
            isTextFill = true
          }
          this.setData({
            isTextFill
          })
          this.store.data.isWriten = true
          this.store.data.selectedFlagList = selectedFlagList
          this.update()
        }else {
          this.store.data.isWriten = false
          this.update()
        }
    },
    submitFlag(e) {
      // console.log(e.detail.value.flag)
      let content = e.detail.value.flag
      if(content.length>25) {
        wx.showModal({
          title: '提示' ,
          content: '自己写的flag超出字数啦！' 
        })
        return;
      }
      this.store.data.writenContent = content
      this.store.data.showContent = content.length>15? content.slice(0,15)+"..." : content
      this.store.data.isConfirm = true
      this.update()
    },
    // 重置 book 页状态
    resetBookView(){
      this.store.data.isLoaderShow = true
      this.store.data.currentPage = 1
      this.store.data.prevList = ['']
      this.store.data.nextList = ['']
    },
    // 重置 flag 页状态
    resetFlagView(){
      this.store.data.selectedFlagList = []
      this.store.data.isWriten = false
      this.store.data.writenContent = ''
      this.store.data.showContent = ''
    },
    // 点击再次回忆
    tofirstPage() {
      this.resetBookView()
      this.resetFlagView()      
      this.update()
      wx.redirectTo({
        url: '/pages/book/book',
      })
    }
  }
})

