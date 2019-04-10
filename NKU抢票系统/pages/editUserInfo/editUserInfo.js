// pages/editUserInfo/editUserInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    credential:'',
    password:'',
    checkPass:'',
    email:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      nickname: options.nickname,
      code:options.code
    })
    console.log(that.data.code);
    console.log(that.data.nickname)
  },

//账号
  bindCredential:function(e) {
    this.setData({
      credential:e.detail.value
    })
  },

//邮箱
  bindEmail:function(e) {
    this.setData({
      email:e.detail.value
    })
  },

  //密码
  bindPassword:function(e) {
    this.setData({
      password:e.detail.value
    })
  },

  //确认密码
  bindCheckPassword:function(e) {
    this.setData({
      checkPass:e.detail.value
    })
  },

//邮箱正则
CheckEmail:function() {
  var emailReg=/^[-_\.a-zA-Z0-9]+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
  return emailReg.test(this.data.email)
},
//账号正则
CheckCredential:function() {
  //利用正则表达式，账号只允许使用数字和大小写字母 此时账号要求>=6位且<=30位，并且只匹配数字 字母
  var credentialReg=/^[a-zA-Z0-9]{6,30}$/;
  return credentialReg.test(this.data.credential)
},

//确认修改
  Check:function() {
    var that=this;
    if(that.data.credential==""||that.data.password==""||that.data.email==""||that.data.checkPass=="") {
      wx.showToast({
        title: '必要项为空',
        icon:'none',
        duration:1500
      })
    }
    else if (that.data.password!=that.data.checkPass) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon:'none',
        duration:1500
      })
    }
    else if(!that.CheckEmail()) {
      wx.showToast({
        title: '邮箱格式不正确!',
        icon:'none',
        duration:1500
      })
    }
    else if(!that.CheckCredential()) {
      wx.showToast({
        title: '账号包含敏感字符或者位数不符合要求！',
        icon: 'none',
        duration: 1500
      })
    }
    else {
    wx.request({
      url:'http://localhost:8081/nkutms/api/web/users/bind-credential',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        code:that.data.code,
        user_name:that.data.nickname,
        credential:that.data.credential,
        email:that.data.email,
        password:that.data.password,
        category:'学生'
      },
      success:function(res) {
        console.log(res.data)
        if(res.data.code==0) {
          wx.showToast({
            title: '注册成功',
            icon:'none',
            duration:1500
          })
          wx.reLaunch({
            url: '../index/index',
          })
        }
        else {
          wx.showToast({
            title: '注册失败',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail:function() {
        wx.showToast({
          title: '连接失败',
          icon:'none',
          duration:1500
        })
      }
    })
    }
  },

//返回按钮
Return:function() {
  var that=this;
  wx.reLaunch({
    url: '../index/index',
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