// pages/spxq/spxq.js
const app = getApp();
var WxParse = require('../../utils/wxParse/wxParse.js');
var API_ROOT = app.globalData.API_ROOT;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
    article: '',
    id:'',
    imgUrls: [{
      src: "../image/ccccc.png"
    },{
      src: "../image/ccccc.png"
    },{
      src: "../image/ccccc.png"
    }],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    numb: 1,
    popflag: false
  },
  reducenum () {
    // console.log(--this.data.numb)
    if (this.data.numb <=1) return;
    this.setData({
      numb: --this.data.numb
    })
  },
  addnum () {
    this.setData({
      numb: ++this.data.numb
    })
  },
  popclick () {
    this.setData({
      popflag: !this.data.popflag
    })
  },
  xd(){
    var that = this;
    var money = that.data.numb * that.data.data.marketprice;
    var userid = wx.getStorageSync("openid");
    wx.request({
      url: API_ROOT + '/api/good/user_money',
      method: "POST",
      data: {
        id: userid,
        money: money
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data_info = res.data;

        if (data_info.code == 200) {
          wx.navigateTo({
            url: '../form/form?Id=' + that.data.id + '&type=' + 2 + "&num=" + that.data.numb + "&money=" + that.data.data.marketprice + "&good_name=" + that.data.data.title + "&good_path=" + that.data.data.thumb + "&costprice=" + that.data.data.costprice,
          });
        } else {
          wx.showToast({
            title: data_info.msg,
          })
        }
      }
    });
    
    console.log(that.data.numb)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this;
    var id = options.id;
    that.setData({
      id: id
    });
    that.get_info(id);
  },

  get_info:function(id){
    var that = this;
    wx.request({
      url: API_ROOT + '/api/good/test_one',
      method: "POST",
      data: {
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data_info = res.data;

        if (data_info.code == 200) {
          var data = res.data.data;
          var article = data.content;
          WxParse.wxParse('article', 'html', article, that, 5);
          that.setData({
            data: data
          });
        } else {
          wx.showToast({
            title: '请刷新重试',
          })
        }
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