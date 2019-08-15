// pages/sc/sc.js
const app = getApp();
var API_ROOT = app.globalData.API_ROOT;
var pageSize,   // 数据显示个数
  page,   // 页面默认页数
  all_page;  // 总页数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    splist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 1;
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    that.jz(); 
  },
  jz:function(){
    var that = this;
    wx.request({
      url: API_ROOT + '/api/good/index',
      method: "POST",
      data: {
        page: page
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data_info = res.data;

        if (data_info.code == 200) {
          var data = res.data.data;
          all_page = res.data.all_apge;
          if (that.data.splist.length == 0) {
            that.setData({
              splist: data
            });
          } else {
            that.setData({
              splist: that.data.splist.concat(data)
            });
          }
          wx.hideLoading();
        } else {
          wx.showToast({
            title: '请刷新重试',
          })
        }
      }
    });
  },
  good:function(e){
    console.log(e);
    var id = e.currentTarget.dataset.id;
    console.log(id);    
    wx.navigateTo({
      url: '/pages/spxq/spxq?id='+id,
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
    var that = this;
    console.log(page); 
    console.log(all_page);   
    if (page >= all_page) {
      
      wx.showLoading({
        title: '数据加载完毕',
      });
    } else {
      wx.showLoading({
        title: '加载中',
      });
      page = page + 1,   // 上拉加载时页数增加
        that.jz(that);  // 活动图文推荐列表渲染
    }
    setTimeout(function () {
      wx.hideLoading();
    }, 500);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})