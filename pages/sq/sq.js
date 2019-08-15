// pages/sq/sq.js
const app = getApp();
var API_ROOT = app.globalData.API_ROOT;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneGrant: !1,
    session_key:'',
    id:''
  },
  
  setphoneNumber: function (a) {
    var n = this;
    n.setData({
      phoneGrant: a,
    });
  },
  getPhoneNumber: function (a) {
    console.log(a.detail.encryptedData);
    var n = this, e = n.data.session_key;
    
    wx.request({
      url: API_ROOT + '/api/login/get_phone',
      method: "POST",
      data: {
        data: a.detail.encryptedData,
        iv: encodeURIComponent(a.detail.iv),
        key: e,
        id:n.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data_info = res.data;       
        if(data_info.code == 500){
          wx.showToast({
            title: data_info.msg,
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        }else{
          wx.redirectTo({
            url: '/pages/wsgrzl/wsgrzl'
          });
          
        }
      }  
    });
  },  
  // 点击授权按钮执行事件
  onGotUserInfo: function (e) {
    console.log("点击button",e.detail.userInfo)
    if (e.detail.userInfo) {
      this.common(e.detail.userInfo); // 点击获取信息后登录
    } else {
      wx.showModal({
        title: '授权提示',
        content: '小程序需要您的微信授权才能使用'
      });
    }
  },
  common: function (userInfo) {
    var n = this;
    // 登录
    wx.login({
      success: res => {
        var code = res.code;
        // console.log(code, userInfo);
        if (code) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: API_ROOT + '/api/login/get_openid',
            method: "POST",
            data: {
              code: code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              var data_info = res.data.data;
              // console.log(sendOpenid);                    
              wx.setStorage({
                key: "openid",
                data: data_info.openid,
              });
              n.setData({
                session_key: data_info.session_key
              });
              // 向后台发送用户信息
              wx.request({
                url: API_ROOT + '/api/login/register',
                method: "POST",
                data: {
                  nickName: userInfo.nickName,
                  sex: userInfo.gender,
                  avatarUrl: userInfo.avatarUrl,
                  openid: data_info.openid
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: function (res) {
                  // 向后台发送用户信息
                  console.log("用户信息发送成功！");
                  // 缓存用户信息
                  wx.setStorageSync("user_info", userInfo);
                  wx.setStorageSync("user_id", res.data.data);
                  n.setData({
                    id: res.data.data
                  });
                  n.setphoneNumber(1)
                },
                fail: function (error) {
                  wx.showToast({
                    title: error.errMsg,
                  });
                }
              });
            },
            fail: function (error) {
              wx.showToast({
                title: error.errMsg
              });
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
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