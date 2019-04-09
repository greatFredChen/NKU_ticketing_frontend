// pages/Publish/Publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acc:'',
    pwd:'',
    Style:''
  },
  //获取密码
  bindPassword:function(e) {
    this.setData({
      pwd:e.detail.value
    })
  },
  //获取账号
  bindAccount:function(e) {
    this.setData({
      acc:e.detail.value
    })
  },
  //登陆确认，需要和后端确认登陆信息(采用POST方法)
  loginAccess:function () {
    var that=this;
    wx.request({
      url:'http://localhost:8081/nkutms/org-api/web/organizers/login',
      method:'POST',
      data:{
      credential:that.data.acc,
      password:that.data.pwd
      },
      header: {
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(res) {
        console.log(res);
        //加入返回的信息为成功，则登陆进去，否则失败
        var data=res.data.data;
        var code=res.data.code;
        console.log(data);
        //登陆成功
        if(code==0) {
          that.setData({
            List:data
          })
          //转到Organizer界面并且把用户信息传递到该界面
          wx.redirectTo({
            url: '../Organizer/Organizer?List=' + JSON.stringify(that.data.List),
          })
        }
        else {
          wx.showToast({
            title: "账号或密码错误",
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail:function(res) {
        wx.showToast({
          title: "连接失败",
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  //返回主界面
  returnToIndex:function () {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  
  //改变输入框样式
  changeStyle_one:function(event) {
    var that=this;
    that.setData({
      Style:event.currentTarget.id
    })
  },

  changeStyle_two:function(event) {
    var that=this;
    that.setData({
      Style:''
    })
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