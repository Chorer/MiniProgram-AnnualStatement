const ald = require('./utils/ald-stat.js')

App({
  onLaunch(options) {
    /* 保存场景值和小程序码参数（可能为空） */
    console.log(options)
    this.globalData.scene = options.scene 
    this.globalData.qrCodeQuery = options.query.scene ? decodeURIComponent(options.query.scene) : "none"
  },
  globalData: {
    scene: '',
    qrCodeQuery:'',
    pageSum: 0
  }
})