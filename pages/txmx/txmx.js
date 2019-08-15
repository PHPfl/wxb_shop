// pages/txmx/txmx.js
const app = getApp();
var WxParse = require('../../utils/wxParse/wxParse.js');
var API_ROOT = app.globalData.API_ROOT;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabFlag: '00',
    data:'',
    article:'',
    mx_data:''
  },
  tabclick (e) {
    console.log(e)
    this.setData({
      tabFlag: e.currentTarget.dataset.tab
    })
    var that = this;
    console.log(e.currentTarget.dataset.tab);    
    if (e.currentTarget.dataset.tab == '01'){
      that.mingxi();
    }
  },
  tx:function(){
    var that = this;
    var now_money = that.data.data.now_money;
    var tx_ed = that.data.data.gz.tx_ed;
    if (now_money > tx_ed){
      that.tx_money(now_money);
    }else{
      wx.showToast({
        title: "未达到提现金额",
        icon: 'loading',
        duration: 2000,

      })
    }
  },
  tx_money: function (now_money){
    var that = this;
    var user_id = wx.getStorageSync("user_id");
    wx.request({
      url: API_ROOT + '/api/user/tx_money',
      method: "POST",
      data: {
        now_money: now_money,
        user_id: user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data;
        if(data.code == 200){
          wx.showToast({
            title: data.msg,
            icon: 'success',
            duration: 2000,
            success: function () {
              that.mingxi();
            }
          })
        }else{
          wx.showToast({
            title: data.msg,
          })
        }
      },
    });
  },
  mingxi:function(){
    var that = this;
    var user_id = wx.getStorageSync("user_id");
    that.setData({
      tabFlag: '01'
    });
    //请求数据===
    wx.request({
      url: API_ROOT + '/api/user/get_money_list',
      method: "POST",
      data: {
        user_id: user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data;
        if (data.code == 200) {
          that.setData({
            mx_data: data.data
          });
        } else {
          wx.showToast({
            title: data.msg,
          })
        }
      },
    });
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
    this.get_user_info();
  },
  get_user_info:function(){
    var that = this;
    var user_id = wx.getStorageSync("user_id");
    wx.request({
      url: API_ROOT + '/api/user/get_user_money',
      method: "POST",
      data: {
        user_id: user_id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data;
        var article = data.gz.content;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          data: data
        });
      },
    });   
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