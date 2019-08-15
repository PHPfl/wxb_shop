// pages/ejxxmx/ejxxmx.js
const app = getApp();
var API_ROOT = app.globalData.API_ROOT;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabFlag: '00',
    img: '',
    name: '',
    address: '',
    openid: '',
    scale: 1,
    canvasWidth: 375,
    order_list: '',
    order_all_money: ''
  },
  tabclick(e) {
    console.log(e)
    this.setData({
      tabFlag: e.currentTarget.dataset.tab
    })
    // if (e.currentTarget.dataset.tab == '00') { // 测试
    //   this.bgcanvas([{ x: '1月', y: '0' }, { x: '2月', y: '0' }, { x: '本月', y: '0' }, { x: '2月', y: null }, { x: '1月', y: null }, { x: '1月', y: null }])
    // }
  },
  bgcanvas(data) {
    var dataL = data 
    //|| [{ x: '1月', y: '111' }, { x: '2月', y: '555' }, { x: '本月', y: '9999' },
    //{ x: '4月', y: null }, { x: '5月', y: null }, { x: '6月', y: null }]

    var s = this.data.scale
    var yz = [];
    var ctx = wx.createCanvasContext('canvas');
    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, this.data.canvasWidth, 220 * s)
    ctx.setStrokeStyle('#999')
    ctx.moveTo(30 * s, 20 * s)
    ctx.lineTo(30 * s, 180 * s)
    ctx.lineTo(345 * s, 180 * s)
    ctx.stroke()

    ctx.setFontSize(14 * s)
    dataL.forEach((val, idx) => {
      // console.log(val,idx)
      if (val.x == '本月') {
        ctx.setFillStyle('#2F72FF')
      } else {
        ctx.setFillStyle('#999')
      }
      if (val.y != null) {
        yz.push(val.y)
      }
      ctx.fillText(val.x, 50 * (idx + 1) * s, 200 * s)
    })
    // y 轴 20-180 高 160 用 60- 170
    var max = Math.max(...yz), min = Math.min(...yz)
    //var ys = (max - min) != 0 ? 110 / (max - min) : 0;
    var ys = 120 / max != Infinity && 120 / max || 1;
    console.log(max, min, ys)
    yz.forEach((val, idx) => { // 画点
      ctx.beginPath()
      if (idx === (yz.length - 1) && ys != 0) {
        ctx.setFillStyle('#2F72FF')
        ctx.setFontSize(14 * s)
        ctx.fillText(val, (50 * (idx + 1) - 5) * s, (160 - ys * val) * s)
        ctx.arc((50 * (idx + 1) + 10) * s, (170 - ys * val) * s, 4 * s, 0, 2 * Math.PI)
      } else {
        ctx.setFillStyle('#999')
        ctx.setFontSize(10 * s)
        ctx.fillText(val, (50 * (idx + 1) + 5) * s, (162 - ys * val) * s)
        ctx.arc((50 * (idx + 1) + 10) * s, (170 - ys * val) * s, 3 * s, 0, 2 * Math.PI)
      }
      ctx.setFillStyle('#2F72FF')
      ctx.fill()
    })
    ctx.setStrokeStyle('#2F72FF')
    ctx.moveTo(60 * s, (170 - ys * yz[0]) * s)
    yz.forEach((val, idx) => { // 画线
      if (idx === (yz.length - 1)) return;
      ctx.lineTo((50 * (idx + 2) + 10) * s, (170 - ys * yz[idx + 1]) * s)
    })
    ctx.stroke()
    ctx.draw()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      img:options.img,
      name: options.name,
      address: options.address,
      openid:options.openid
    })
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
    var self = this
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          scale: res.windowWidth / 375,
          canvasWidth: res.windowWidth,
        })
      },
    })
    self.get_user_info();
    
  },

  get_user_info:function(){
    var that = this;
    wx.request({
      url: API_ROOT + '/api/user/get_user_xx',
      method: "POST",
      data: {
        openid: that.data.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data_info = res.data;
        if (data_info.code == 500) {
          wx.showToast({
            title: data_info.msg,
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        } else {
          // wx.redirectTo({
          //   url: '/pages/wsgrzl/wsgrzl'
          // });
          console.log(data_info.data);
          // wx.showToast({
          //   title: res.data.msg,
          //   icon: 'loading',
          //   duration: 2000,
          //   success: function () {
          //     setTimeout(function () {
          //       //要延时执行的代码
          //       that.bgcanvas(data_info.data);
          //     }, 2000) //延迟时间
          //   }
          // })
          that.bgcanvas(data_info.data);
          that.setData({
            order_list: data_info.order_list,
            order_all_money: data_info.order_all_money
          });
        }
      }
    });
    // this.bgcanvas()
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