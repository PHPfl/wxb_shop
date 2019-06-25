// pages/wsgrzl.js
const app = getApp();
var API_ROOT = app.globalData.API_ROOT;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xllist: ['初中以下', '高中', '大专', '本科','研究生','博士'],
    nickName:'',
    jg: '',
    user_phone: '',
    id_card: '',
    address: '',
    xl: '',
    sex:'',
    is_marry:'',
    // userinfo: {
    //   xl:'点击选择学历',
    //   date: '点击选择出生年月日',
    //   adress: '点击选择经销地区',
    //   xb: 99, // 性别
    //   hf: 99, // 婚否
    //   birthday:''
    // }

  },
  selxb (e) {
    var xb = 'userinfo.xb'
    console.log(e.currentTarget.dataset.xb)
    this.setData({
      sex: e.currentTarget.dataset.xb*1,
    })
  },
  selhf (e) {
    var hf = 'userinfo.hf'
    console.log(e.currentTarget.dataset.hf)
    this.setData({
      is_marry: e.currentTarget.dataset.hf*1,
    })
  },
  bindRegionChange: function (e) { // 000
    this.setData({
      address: e.detail.value.join('')
    })
  },
  bindDateChange: function(e) { //0
    this.setData({
      birthday: e.detail.value
    })
  },
   bindPickerChange: function(e) { //000000
   console.log(e);
    this.setData({
      xl: e.detail.value
    })
  },
  submitData: function (event) {
    var user_id = wx.getStorageSync("user_id");
    console.log(user_id);
    var that = this;
    // that.setData({
    //   user_id: userInfo.data.id
    // });
    console.log(event.detail.value)
    var user_data = event.detail.value;
    wx.request({
      url: API_ROOT + '/api/login/save_info',
      method: 'POST',
      data: {
        user_data: JSON.stringify(user_data),
        sex: that.data.sex,
        is_marry: that.data.is_marry,
        user_id: user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                //要延时执行的代码
                wx.switchTab({
                  url: '../index/index'
                })
              }, 2000) //延迟时间
            }
          })
        } else if (res.data.code == 500) {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    });
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
          var user_data = res.data.data;
          that.setData({
            avatarUrl: user_data.avatarUrl,
            birthday: user_data.birthday,
            sex: user_data.sex,
            is_marry: user_data.is_marry,
            nickName: user_data.nickName,
            jg: user_data.jg,
            user_phone: user_data.user_phone,
            id_card: user_data.id_card,
            address: user_data.address,
            xl: user_data.xl,
          });
        } else if (res.code == 201){
          var user_data = wx.getStorageSync("user_info");
          that.setData({
            sex: user_data.sex,
            is_marry: user_data.is_marry,
            nickName: user_data.nickName,
            jg: user_data.jg,
            user_phone: user_data.user_phone,
            id_card: user_data.id_card,
            address: user_data.address,
            xl: user_data.xl,
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