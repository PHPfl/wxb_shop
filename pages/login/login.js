// pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageFlag: 0 // 0-密码登录 1-验证码 2-注册
  },
  selpage (e) {
    this.setData({
      pageFlag: e.currentTarget.dataset.page*1
    })
  },
  dl (e) {
    if (!e.currentTarget.flag) {
      this.setData({
        pageFlag: 0
      })
    }
  },
  zc (e) {
    if (!e.currentTarget.flag) {
      this.setData({
        pageFlag: 2
      })
    }
    
  },
  open:function(){
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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