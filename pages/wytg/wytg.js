// pages/wytg/wytg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasWidth: 100,
    canvasHeight: 100,
    scale: 1,
    popflag: false
  },
  popclick () {
    this.setData({
      popflag: !this.data.popflag
    })
  },
  setImage () {
    
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success() {
            wx.showToast({
              title: '图片已保存至相册'
            });
          }
        });
      }
    });
  },
  bgcanvas () {
    var s =this.data.scale
    var ctx = wx.createCanvasContext('canvas');
    var img = '../image/ccccc.png';
    var ewm = '../image/ewm.png';

    ctx.setFillStyle('#2F72FF')
    ctx.fillRect(0, 0, this.data.canvasWidth, this.data.canvasHeight)
    ctx.setFillStyle('#fff')
    ctx.fillRect(15*s, 15*s, 310*s, 290*s)
    ctx.drawImage(img, 25*s, 25*s, 290*s, 270*s)

    ctx.setFontSize(22*s)
    ctx.setFillStyle('#fff')
    ctx.fillText('精品钻戒 红宝石 戒指', 15*s, 340*s)
    ctx.setFontSize(16)
    ctx.fillText('精品钻戒 红宝石 戒指', 15*s, 370*s)
    ctx.setStrokeStyle('#fff')
    ctx.moveTo(15*s, 395*s)
    ctx.lineTo(325*s, 395*s)
    ctx.stroke()
    ctx.setFontSize(30*s)
    ctx.fillText('LOGO', 15*s, 455*s)
    ctx.setFontSize(12*s)
    ctx.fillText('识别二维码', 180*s, 440*s)
    ctx.fillText('查看商品详情', 168*s, 460*s)
    ctx.drawImage(ewm, 255*s, 410*s, 70*s, 70*s)
    ctx.draw()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self= this
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          scale: res.windowWidth/375,
          canvasWidth: res.windowWidth -35,
          canvasHeight: res.windowHeight -110
        })
      },
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
    this.bgcanvas()

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