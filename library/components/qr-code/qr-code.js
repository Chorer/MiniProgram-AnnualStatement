import create from '../../store/create'
import { getQrCodeUrl } from '../../utils/storage'

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
    prevList:[],
    nextList:[],
    person: '',
    qrCodeUrl: ''
  },
  methods: {
    initData(){
      this.setData({
        qrCodeUrl: getQrCodeUrl()        
      })
    }
  }
})

