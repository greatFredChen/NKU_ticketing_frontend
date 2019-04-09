// pages/ticketList/ticketList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TicketList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var ticketList=JSON.parse(options.ticketList);
    var Userinfo=JSON.parse(options.Userinfo);
    //筛选status为“有效”的票并进行展示
    that.setData({
      TicketList:ticketList,
      access_token:Userinfo.access_token,
      Userinfo:Userinfo
    })
    that.transformToTime();
  },

  //时间戳转换为时间!
  transformToTime: function () {
    var that = this;
    var Ticket = that.data.TicketList;//这个是对象！！
    //调用util.js中的formateTime函数！！
    var util = require('../../utils/util.js');
    var length=Ticket.length;
    for(var i=0;i<length;i++) {
      var time=util.formatTime(new Date(Ticket[i].fetch_time*1000));
      var s="TicketList["+i+"].fetch_time";
      that.setData({
        [s]:time
      })
      //console.log(that.data.TicketList[i].fetch_time);
    }
  },

//退票
  ReturnTicket:function(e) {
    var that=this;
    var ticket_id=e.currentTarget.id;//button才可以用e.target.id   view只能用e.currentTarget.id,网上的博客一直在误导人！
    wx.request({
      url:'http://localhost:8081/nkutms/api/web/tickets/withdraw?access-token='+that.data.access_token,
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        ticket_id:ticket_id
      },
      success:function(res) {
        console.log(res.data);
        if(res.data.code==0) {
          wx.showToast({
            title: '退票成功!',
            icon:'none',
            duration:1500
          })
        }
        else {
          wx.showToast({
            title: '退票失败!',
            icon: 'none',
            duration: 1500
          })          
        }
      },
      fail:function() {
        wx.showToast({
          title: '退票失败!',
          icon:'none',
          duration:1500
        })
      }
    })
  },


//返回上一页
  Return:function() {
    var that=this;
    wx.redirectTo({
      url: '../User/User?data=' +JSON.stringify(that.data.Userinfo) +'&User=0',
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