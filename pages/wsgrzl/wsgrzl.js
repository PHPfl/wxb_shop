// pages/wsgrzl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xllist: ['小学', '幼儿园', '小学', '小学'],
    userinfo: {
      xl:'点击选择学历',
      date: '点击选择出生年月日',
      adress: '点击选择经销地区',
      xb: 99, // 性别
      hf: 99 // 婚否
    }

  },
  selxb (e) {
    var xb = 'userinfo.xb'
    console.log(e.currentTarget.dataset.xb)
    this.setData({
      [xb]: e.currentTarget.dataset.xb*1
    })
  },
  selhf (e) {
    var hf = 'userinfo.hf'
    console.log(e.currentTarget.dataset.hf)
    this.setData({
      [hf]: e.currentTarget.dataset.hf*1
    })
  },
  bindRegionChange: function (e) { // 000
    var adress = 'userinfo.adress'
    this.setData({
      [adress]: e.detail.value.join('')
    })
  },
  bindDateChange: function(e) { //0000
    var date = 'userinfo.date'
    this.setData({
      [date]: e.detail.value
    })
  },
   bindPickerChange: function(e) { //000000
    var xl = 'userinfo.xl'
    this.setData({
      [xl]: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})