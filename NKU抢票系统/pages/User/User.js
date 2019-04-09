// pages/User/User.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:'User',
    User:1
  },

  //切换页面
  handleChange({ detail }) {
    var that=this;
    this.setData({
      current: detail.key
    });
    if (this.data.current == 'Activity') {
      wx.redirectTo({
        url: '../Activity/Activity?User=1'+'&Userinfo='+JSON.stringify(that.data.Userinfo),
      })
    }
    if (this.data.current == 'index') {
      wx.reLaunch({
        url: '../index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data=JSON.parse(options.data);
    this.setData({
      User:options.User,
      Userinfo:data
    })
  },

//“我抢过的票”按钮
  GetTicket:function() {
    var that=this;
    wx.request({
      url:'http://localhost:8081/nkutms/api/web/tickets/my-tickets?access-token='+ that.data.Userinfo.access_token,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        user_id:that.data.Userinfo.user_info.user_id
      },
      success: function (res) {
        //console.log(res.data);
        if(res.data.code==0) {
          var Ticket=res.data.data;
          wx.redirectTo({
            url: '../ticketList/ticketList?ticketList='+JSON.stringify(Ticket)+'&Userinfo='+JSON.stringify(that.data.Userinfo),
          })
        }
        else {
          wx.showToast({
            title: '异常!',
            icon:'none',
            duration:1500
          })
        }
      }
    })
  },

//进入更改个人信息界面
  editInfo:function() {
    var that=this;
    wx.redirectTo({
      url: '../editUserInfo/editUserInfo?Userinfo='+JSON.stringify(that.data.Userinfo),
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