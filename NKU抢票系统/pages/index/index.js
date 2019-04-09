//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    code:''
  },

//发布页
  Publish:function() {
    wx.redirectTo({
    url:'../Publish/Publish',
  })
},

//抢票页
  bindGetUserInfo:function(e) {
    var that=this;
    //通过wx.login()获取登陆凭证，为求保险，建议后面采用settimeout延迟操作
    wx.login({
      success:function(res) {
        if(res.code) {//res.code不为0/null，允许登陆
          that.setData({
            code:res.code
          })
        }
        else {
          wx.showToast({
            title: '连接失败！',
            icon:'none',
            duration:1500
          })
        }
      }
    })
    //获取用户微信名
    setTimeout(function() {
    if(e.detail.userInfo) {
      that.setData({
        nickname:e.detail.userInfo.nickName
      });
      //console.log(that.data.nickname);
      //传微信号给后端
      wx.request({
        url:'http://localhost:8081/nkutms/api/web/users/wechat-login',
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          code:that.data.code
        },
        success:function(res) {
          var code=res.data.code;
          console.log(res.data);
          if(code==0) {
            var data=res.data.data;
            //转到用户页
            wx.redirectTo({
             url: '../User/User?User=1'+'&data='+JSON.stringify(data),
             })
          }
          //此时为第一次登陆，需要绑定账号和密码
          else if(code==2) {
            //跳转到注册页面
            wx.redirectTo({
              url: '../editUserInfo/editUserInfo?code=' + that.data.code + '&nickname=' + that.data.nickname,
            })
          }
        },
        fail:function(res) {
          wx.showToast({
            title: "传输失败",
            icon: 'none',
            duration: 1500
          })
        }
      })
      //转到用户页
     /* wx.navigateTo({
        url: '../User/User'
      })*/
    }
    else {
      wx.showToast({
        title: '授权失败',
        icon: 'none',
        duration: 1500
      })
    }
    },1000) //延迟1s进行，多线程
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