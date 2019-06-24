// pages/wsgrzl.js
const app = getApp();
var API_ROOT = app.globalData.API_ROOT;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xllist: ['小学', '幼儿园', '小学', '小学'],
    user_data:'',
    sex:'',
    is_marry:'',
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
      sex: e.currentTarget.dataset.xb*1
    })
  },
  selhf (e) {
    var hf = 'userinfo.hf'
    console.log(e.currentTarget.dataset.hf)
    this.setData({
      is_marry: e.currentTarget.dataset.hf*1
    })
  },
  bindRegionChange: function (e) { // 000
  console.log(22);
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
  submitData: function (event) {
    var user_id = wx.getStorageSync("user_id");
    console.log(user_id);
    // var that = this;
    // that.setData({
    //   user_id: userInfo.data.id
    // });
    console.log(event.detail.value)
    var user_data = event.detail.value;
    // var that = this;
    // console.log(that.user_id);
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_id = wx.getStorageSync("user_id");
    var that = this;
    wx.request({
      url: API_ROOT + '/api/login/get_user',
      method: "POST",
      data: {
        user_id: user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
console.log(res)        
        if (res.data.code == 200){
          that.setData({
            user_data: res.data.data,
            sex: res.data.data.sex,
            is_marry: res.data.data.is_marry
          });
        } else if (res.code == 201){
          var user_data = wx.getStorageSync("user_info");
          that.setData({
            user_data: user_data,
            sex: user_data.sex,
            is_marry: 0
          });
        } else if (res.code == 500){
          wx.showToast({
            title: res.data.msg
          });
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