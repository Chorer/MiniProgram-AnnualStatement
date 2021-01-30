Component({
  options:{
    addGlobalClass: true
  },
  properties: {
    hasProtocolCheck: Boolean
  },
  data: {
    isProtocolShow: false
  },
  methods: {
    changeProtocolState(){
      this.triggerEvent('_changeProtocolState',!this.properties.hasProtocolCheck)
    },
    stopScroll(){},
    openProtocol(){
      this.setData({
        isProtocolShow: true
      })
    },
    closeProtocol(){
      this.setData({
        isProtocolShow: false
      })
    }
  }
})
