// pages/GetParticipant/GetParticipant.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var org_id=options.org_id;
    var activity_id = options.activity_id;
    var access_token=options.access_token;
    console.log(org_id); console.log(activity_id);
    wx.request({
      url:'http://localhost:8081/nkutms/org-api/web/activities/my-participants?access-token='+access_token,
      method:'POST',
      header: {
        'content-type':'application/x-www-form-urlencoded'
      },
      data: {
        org_id:org_id,
        activity_id:activity_id
      },
      success:function(res) {
        console.log(res.data);
        if(res.data.code==0) {
          that.setData({
            UserList:res.data.data
          })
          that.transformToTime();
        }
      }
    })
  },

  //时间戳转换为时间!
  transformToTime: function () {
    var that = this;
    var User = that.data.UserList;
    //调用util.js中的formateTime函数！！
    var util = require('../../utils/util.js');
    //开始转换
    var length = User.length;
    for (var i = 0; i < length; i++) {
      var time=util.formatTime(new Date(User[i].fetch_time*1000));
      console.log(time);
      var s ="UserList["+i+"].fetch_time";
      that.setData({
        [s]:time
      })
    }
  },

//返回按钮
  Return:function() {
    wx.navigateBack();
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