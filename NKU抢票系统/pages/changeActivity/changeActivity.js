// pages/changeActivity/changeActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticketStartDate: "2018-01-01",
    ticketStartTime: "00:00",
    ticketEndDate: "2018-01-01",
    ticketEndTime: "00:00",
    ActivityStartDate: "2018-01-01",
    ActivityStartTime: "00:00",
    ActivityEndDate: "2018-01-01",
    ActivityEndTime: "00:00"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var activityInfo = JSON.parse(options.Activityinfo);
    var Userinfo=JSON.parse(options.Userinfo);
    that.setData({
      ActivityInfo:activityInfo,
      Userinfo:Userinfo,
      page_id:options.page_id,
      activity_id: options.activity_id
    })
    var end_at=activityInfo.end_at.split(" ");
    var start_at = activityInfo.start_at.split(" ");
    var ticket_start = activityInfo.ticketing_start_at.split(" ");
    var ticket_end = activityInfo.ticketing_end_at.split(" ");
    that.setData({
    Activity_name: activityInfo.activity_name,
    Activity_category: activityInfo.category,
    max_people: activityInfo.max_people,
    Location: activityInfo.location,
    Introduction: activityInfo.introduction,
    ticketStartDate:ticket_start[0],
    ticketStartTime:ticket_start[1],
    ticketEndDate:ticket_end[0],
    ticketEndTime:ticket_end[1],
    ActivityStartDate:start_at[0],
    ActivityStartTime: start_at[1],
    ActivityEndDate: end_at[0],
    ActivityEndTime: end_at[1]
    })
  },

  //选择器函数
  bindTicketStartDate: function (e) {
    this.setData({
      ticketStartDate: e.detail.value
    })
  },

  bindTicketStartTime: function (e) {
    this.setData({
      ticketStartTime: e.detail.value
    })
  },

  bindTicketEndDate: function (e) {
    this.setData({
      ticketEndDate: e.detail.value
    })
  },

  bindTicketEndTime: function (e) {
    this.setData({
      ticketEndTime: e.detail.value
    })
  },

  bindActivityStartDate: function (e) {
    this.setData({
      ActivityStartDate: e.detail.value
    })
  },

  bindActivityStartTime: function (e) {
    this.setData({
      ActivityStartTime: e.detail.value
    })
  },

  bindActivityEndDate: function (e) {
    this.setData({
      ActivityEndDate: e.detail.value
    })
  },

  bindActivityEndTime: function (e) {
    this.setData({
      ActivityEndTime: e.detail.value
    })
  },

  //输入框内容
  bindActivityName: function (e) {
    this.setData({
      Activity_name: e.detail.value
    })
  },

  bindCategory: function (e) {
    this.setData({
      Activity_category: e.detail.value
    })
  },

  bindMaxPeople: function (e) {
    this.setData({
      max_people: e.detail.value
    })
  },

  bindLocation: function (e) {
    this.setData({
      Location: e.detail.value
    })
  },

  bindIntro: function (e) {
    this.setData({
      Introduction: e.detail.value
    })
  },

  //修改按钮
  Check: function () {
    var that = this;
    var h=that.data.max_people.toString();
    //判断是否为空
    if (!that.strCheck_one()) {
      wx.showToast({
        title: '必要项为空或者有特殊字符!',
        icon: 'none',
        duration: 1500
      })
    }
    else if(!that.strCheck_two()) {
      wx.showToast({
        title: '简介中含有敏感字符!',
        icon: 'none',
        duration: 1500
      })      
    }
    else if(!that.strCheck_three()) {
      wx.showToast({
        title: '活动人数一栏格式不符!',
        icon: 'none',
        duration: 1500
      })        
    }
    else {
      if (that.data.Activity_name == that.data.ActivityInfo.activity_name) {
        var activity_name="";
      }
      else {
        var activity_name=that.data.Activity_name;
      }
      if(that.data.Activity_category==that.data.ActivityInfo.category) {
        var category="";
      }
      else {
        var category=that.data.Activity_category;
      }
      if (that.data.max_people==that.data.ActivityInfo.max_people) {
        var max_people="";
      }
      else {
        var max_people=that.data.max_people;
      }
      if(that.data.Location==that.data.ActivityInfo.location) {
        var location="";
      }
      else {
        var location=that.data.Location;
      }
      if (that.data.Introduction == that.data.ActivityInfo.introduction) {
        var introduction="";
      }
      else {
        var introduction=that.data.Introduction;
      }

      //计算成时间戳
      var ticketStart = new Date(that.data.ticketStartDate + " " + that.data.ticketStartTime + ":00").getTime() / 1000;
      var ticketEnd = new Date(that.data.ticketEndDate + " " + that.data.ticketEndTime + ":00").getTime() / 1000;
      var ActivityStart = new Date(that.data.ActivityStartDate + " " + that.data.ActivityStartTime + ":00").getTime() / 1000;
      var ActivityEnd = new Date(that.data.ActivityEndDate + " " + that.data.ActivityEndTime + ":00").getTime() / 1000;
      console.log(ActivityEnd);
      console.log(that.data.ActivityEndDate + " " + that.data.ActivityEndTime + ":00");
      wx.request({
        url:'http://localhost:8081/nkutms/org-api/web/activities/edit-activity?access-token=' + that.data.Userinfo.access_token,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          org_id: that.data.Userinfo.org_info.id,
          activity_id:that.data.activity_id,
          activity_name: activity_name,
          category: category,
          location: location,
          ticketing_start_at: ticketStart,
          ticketing_end_at: ticketEnd,
          start_at: ActivityStart,
          end_at: ActivityEnd,
          max_people: max_people,
          intro: introduction
        },
        success: function (res) {
          console.log(res);
          if (res.data.code == 0) {
            wx.showToast({
              title: '修改成功',
              icon: 'none',
              duration: 1500
            })
          }
          else {
            wx.showToast({
              title: '修改失败',
              icon: 'none',
              duration: 1500
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '修改失败',
            icon: 'none',
            duration: 1500
          })
        }
      })
    }
  },

//返回按钮
Return:function() {
  var that=this;
  wx.redirectTo({
    url: '../ActivityDetail/ActivityDetail?Userinfo=' + JSON.stringify(that.data.Userinfo) +'&Detail_id='+that.data.activity_id+'&User=0'+'&page_id='+that.data.page_id,
  })
},

  //开启字符串检查 检查必要项
  strCheck_one: function () {
    var that = this;
    //字符串不得包含无法parse的字符 必要项只能写中文 英文 数字和下划线 且不得为空！
    var strReg = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[a-zA-Z0-9_]){1,}$/;
    return strReg.test(that.data.Activity_name) && strReg.test(that.data.Activity_category) 
    && strReg.test(that.data.Location);
  },

  //字符串检查2 检查简介
  strCheck_two: function () {
    var that=this;
    var strReg = /^[^=&?]*$/;
    return strReg.test(that.data.Introduction);
  },

  //字符串检查3 检查最大人数
  strCheck_three:function() {
    var that=this;
    var strReg=/^[0-9]{1,5}$/;
    return strReg.test(that.data.max_people);
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