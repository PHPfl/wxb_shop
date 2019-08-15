// pages/hyzx/hyzx.js
const app = getApp();
var API_ROOT = app.globalData.API_ROOT;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_sq:1,
    phoneGrant: !1,
    session_key: '',
    id: '',
    user_info:'',
    top_user_id:0
  },
  yck: function (e) {
    wx.navigateTo({
      url: '../yck/yck',
    });
  },
  my_info:function(){
    wx.navigateTo({
      url: '../wsgrzl/wsgrzl?type=1',
    });
  },
  tx: function (e) {
    wx.navigateTo({
      url: '../txmx/txmx',
    });
  },
  setphoneNumber: function (a) {
    var n = this;
    n.setData({
      phoneGrant: a,
    });
  },
  ddmx:function(){
    wx.navigateTo({
      url: '/pages/xsddmx/xsddmx'
    });
  },
  xx: function () {
    wx.navigateTo({
      url: '/pages/ejxxmx/ejxxmx'
    });
  },
  // 打开分享选择弹框
  showShareModal: function () {
    var page = this;
    wx.downloadFile({
      url: page.data.user_info.er_code,     //仅为示例，并非真实的资源'https://yg.lvshaguoji.cn/Data/ls.png'
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        wx.showToast({
            title: "正在保存推广码",
            icon: 'loading',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                if (res.statusCode === 200) {
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success(res) {
                      wx.showToast({
                        title: '推广码已保存相册',
                      })
                    },
                    fail(res) {
                      wx.showToast({
                        title: '推广码保存失败！',
                      })
                    }
                  })
                }
              }, 2000) //延迟时间
            }
          })
        
      }
    })
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
        id: n.data.id
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
          wx.redirectTo({
            url: '/pages/wsgrzl/wsgrzl'
          });

        }
      }
    });
  },
  // 点击授权按钮执行事件
  onGotUserInfo: function (e) {
    console.log("点击button", e.detail.userInfo)
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
                  openid: data_info.openid,
                  pid: n.data.top_user_id
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
  dj:function(){
    wx.navigateTo({
      url: '../djmxdt/djmxdt'
    });
  },
  onTapDayWeather() {

    wx.navigateToMiniProgram({
      appId: 'wxe1a7a48442fe7826',
      path:'pages/index/index?id=123',
      extraData: {},
      envVersion: 'develop',
      success(res) {
        // 打开成功
      },
      fail(res){
        console.log(res)
      },
      complete(res){
        console.log(res);
      }
    })
    // wx.navigateTo({
    //   url: '/pages/sc/sc'
    // });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var top_user_id = decodeURIComponent(options.scene);
    console.log(222);
    if (top_user_id){
      this.setData({
        top_user_id: top_user_id
      });
    }
    console.log(options);
    
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // console.log(res.authSetting['scope.userInfo']);          
          var userInfo = wx.getStorageSync("user_info");
          // console.log(userInfo);          
          var is_marry  = wx.getStorageSync("is_marry");
          var user_id =  wx.getStorageSync("user_id");
          // console.log('is_marry' + is_marry);          
          var dl = wx.getStorageSync("dl");
          // console.log('is_phone' + is_phone);       
          if (dl == 1) {
            // 用户信息为空时重新登录
            this.setData({
              is_sq: 1
            });
            
          } else if (is_marry != 1){
            wx.redirectTo({
              url: '/pages/wsgrzl/wsgrzl'
            });
          }
        } else {
          //去授权
          this.setData({
            is_sq: 0
          });
         
        }
      }
    })
    // console.log(that.data.is_sq);
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
    var that = this;
    var user_id = wx.getStorageSync("user_id");
    wx.request({
      url: API_ROOT + '/api/login/get_user_info',
      method: "POST",
      data: {
        id: user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        // 向后台发送用户信息
        that.setData({
          user_info: res.data.data
        });
        // console.log(res.data.data.is_dl); 
      },
      fail: function (error) {
        wx.showToast({
          title: error.errMsg,
        });
      }
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
    // var pages = getCurrentPages(); // 当前页面
    // var beforePage = pages[pages.length - 2]; // 前一个页面
    // // console.log("beforePage");
    // // console.log(beforePage);
    // wx.navigateBack({
    //   success: function () {
    //     beforePage.onLoad(); // 执行前一个页面的onLoad方法
    //   }
    // });

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