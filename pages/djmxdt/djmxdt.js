// pages/djmxdt/djmxdt.js
const app = getApp();
var API_ROOT = app.globalData.API_ROOT;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:'',
    headarr:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user_id = wx.getStorageSync("user_id");
    wx.request({
      url: API_ROOT + '/api/user/get_tb',
      method: "POST",
      data: {
        user_id: user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        // 向后台发送用户信息
        that.setData({
          headarr: res.data.data,
          top: res.data.top_list
        });
        // console.log(res.data.data.is_dl); 
      },
      fail: function (error) {
        wx.showToast({
          title: error.errMsg,
        });
      }
    });
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