// pages/fh/fh.js
const app = getApp();
var golbal = app.globalData;

var API_ROOT = golbal.API_ROOT;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    info:"",
    id:''
  },
  get_info(id){
    var that = this;
    wx.request({
      url: API_ROOT + '/api/good/order_info',
      method: "POST",
      data: {
        id: id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data_info = res.data;

        if (data_info.code == 200) {
          that.setData({
            info: data_info.data
          });
        } else {
          wx.showToast({
            title: data_info.msg,
          })
        }
      }
    });
  },
  fh() {
    var that = this;
    var openids = wx.getStorageSync("openid");
    wx.request({
      url: API_ROOT + '/api/good/fh_order',
      method: "POST",
      data: {
        id: that.data.id,
        user_id: openids
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data_info = res.data;

        if (data_info.code == 200) {
          wx.showToast({
            title: data_info.msg,
            icon: 'success',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                //要延时执行的代码
                wx.navigateTo({
                  url: '/pages/my/my',
                });
              }, 2000) //延迟时间
            }
          })
        } else {
          wx.showToast({
            title: data_info.msg,
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var order_id = options.id;
    that.setData({
      id: order_id
    });
    that.get_info(order_id);
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