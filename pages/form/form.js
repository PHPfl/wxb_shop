// pages/my/my.js
const app = getApp();
var golbal = app.globalData;
var imgs = golbal.img_root;
var API_ROOT = golbal.API_ROOT;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: '',
    type: '',
    id: '',
    money:'',
    good_name:'',
    costprice:''
  },
  submitData: function (event) {
    var userInfo = wx.getStorageSync("user_info");
    var form_data = event.detail.value;
    var that = this;
    console.log(form_data);
    wx.request({
      url: API_ROOT + '/api/good/add',
      method: 'POST',
      data: {
        form_data: JSON.stringify(form_data),
        id: that.data.id,
        user_id: that.data.user_id,
        type: that.data.type,
        num: that.data.num,
        money:that.data.money,
        good_name: that.data.good_name,
        good_path: that.data.good_path,
        costprice: that.data.costprice
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        // if (res.data.code == 200) {
        //   wx.showModal({
        //     title: '提示',
        //     content: res.data.msg,
        //     success: function (res) {
        //       if (res.confirm) {
        //         wx.navigateTo({
        //           url: '../setcar/setcar?Id=' + 0,
        //         });
        //       }else{
        //         wx.switchTab({
        //           url: '../index/index'
        //         })
        //       }
        //     }
        //   })
        // } else 
        if (res.data.code == 200) {
          wx.showToast({
            title: res.data.msg,
          });
          wx.navigateTo({
            url: '../fh/fh?id=' + res.data.data,
          });
          // wx.showToast({
          //   title: res.data.msg,
          //   icon: 'success',
          //   duration: 2000,
          //   success: function () {
          //     setTimeout(function () {
          //       //要延时执行的代码
          //       wx.switchTab({
          //         url: '../index/index'
          //       })
          //     }, 2000) //延迟时间
          //   }
          // })
        } else if (res.data.code == 500) {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openids = wx.getStorageSync("openid");
    console.log(options);
    var that = this;
    that.setData({
      id: options.Id,
      user_id: openids,
      type:options.type,
      num:options.num,
      money: options.money,
      good_name: options.good_name,
      good_path: options.good_path,
      costprice: options.costprice
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