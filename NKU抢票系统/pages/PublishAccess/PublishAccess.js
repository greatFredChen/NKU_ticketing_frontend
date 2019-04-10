// pages/PublishAccess/PublishAccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:'Access',
    ticketStartDate:"2018-01-01",
    ticketStartTime:"00:00",
    ticketEndDate: "2018-01-01",
    ticketEndTime:"00:00",
    ActivityStartDate:"2018-01-01",
    ActivityStartTime:"00:00",
    ActivityEndDate:"2018-01-01",
    ActivityEndTime:"00:00",
    Activity_name:"",
    Activity_category:"",
    max_people:"",
    Location:"",
    Introduction:"",
    categoryArray:['讲座','演讲','宣讲','其它'],
    categoryIndex:0
  },

  //切换页面
  handleChange({ detail }) {
    var that=this;
    this.setData({
      current: detail.key
    });
    if (this.data.current == 'Activity') {
      wx.redirectTo({
        url: '../Activity/Activity?User=0' + '&Userinfo=' +JSON.stringify(that.data.Userinfo),
      })
    }
    if (this.data.current == 'Organizer') {
      wx.redirectTo({
        url: '../Organizer/Organizer?List='+JSON.stringify(that.data.Userinfo),
      })
    }
    if(this.data.current=='index') {
      wx.reLaunch({
        url: '../index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var Userinfo = JSON.parse(options.Userinfo);
    console.log(Userinfo);
    that.setData({
      User:options.User,
      Userinfo:Userinfo
    })
  },

//选择器函数
  bindTicketStartDate:function(e) {
    this.setData({
      ticketStartDate:e.detail.value
    })
  },

  bindTicketStartTime:function(e) {
    this.setData({
      ticketStartTime:e.detail.value
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
    console.log(this.data.ActivityEndTime);
  },

//输入框内容
  bindActivityName:function(e) {
    this.setData({
      Activity_name:e.detail.value
    })
  },
  //category picker组件！
  bindCategory:function(e) {
    this.setData({
      categoryIndex:e.detail.value
    })
  },

  bindMaxPeople:function(e) {
    this.setData({
      max_people:e.detail.value
    })
  },

  bindLocation:function(e) {
    this.setData({
      Location:e.detail.value
    })
  },

  bindIntro:function(e) {
    this.setData({
      Introduction:e.detail.value
    })
  },

//确认按钮
  Check:function() {
    var that=this;
    var h=that.data.max_people.toString();
    //判断是否为空
    if (!that.strCheck_one())
    {
      wx.showToast({
        title: '必要项为空或者含有非法字符！',
        icon:'none',
        duration:1500
      })
    }
    else if(!that.strCheck_two()) {
      wx.showToast({
        title: '简介中含有敏感字符!',
        icon:'none',
        duration:1500
      })
    }
    else if (!that.strCheck_three()) {
      wx.showToast({
        title: '活动人数一栏格式不符!',
        icon: 'none',
        duration: 1500
      })
    }
    else if(!that.timeCheck()) {
      wx.showToast({
        title: '时间设置出现问题!',
        icon: 'none',
        duration: 1500
      })      
    }
    else {
    //计算成时间戳
    var ticketStart=new Date(that.data.ticketStartDate+" "+that.data.ticketStartTime+":00").getTime()/1000;
    var ticketEnd = new Date(that.data.ticketEndDate + " " + that.data.ticketEndTime + ":00").getTime() / 1000;
    var ActivityStart = new Date(that.data.ActivityStartDate + " " + that.data.ActivityStartTime + ":00").getTime() / 1000;
      var ActivityEnd = new Date(that.data.ActivityEndDate + " " + that.data.ActivityEndTime + ":00").getTime() / 1000;
    wx.request({
      url:'http://localhost:8081/nkutms/org-api/web/activities/add-activity?access-token='+that.data.Userinfo.access_token,
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        org_id:that.data.Userinfo.org_info.id,
        activity_name:that.data.Activity_name,
        category:that.data.categoryIndex,
        location:that.data.Location,
        ticketing_start_at:ticketStart,
        ticketing_end_at:ticketEnd,
        start_at:ActivityStart,
        end_at:ActivityEnd,
        max_people:that.data.max_people,
        intro:that.data.Introduction
      },
      success:function(res) {
        console.log(res);
        if(res.data.code==0) {
          wx.showToast({
            title: '创建成功',
            icon:'none',
            duration:1500
          })
        }
        else {
          wx.showToast({
            title: '传输失败',
            icon:'none',
            duration:1500
          })
        }
      },
      fail:function() {
        wx.showToast({
          title: '传输失败',
          icon:'none',
          duration:1500
        })
      }
    })
    }
  },

  //开启字符串检查 检查必要项
  strCheck_one:function() {
    var that=this;
    //字符串不得包含无法parse的字符 必要项只能写中文 英文 数字和下划线 且不得为空！
    var strReg =/^([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[a-zA-Z0-9_]){1,}$/;
    return strReg.test(that.data.Activity_name)&&strReg.test(that.data.Location);
  },

  //字符串检查2 检查简介
  strCheck_two:function() {
    var that=this;
    var strReg =/^[^=&?]*$/
    return strReg.test(that.data.Introduction);
  },

  //字符串检查3 检查最大人数
  strCheck_three: function () {
    var that = this;
    var strReg = /^[0-9]{1,4}$/
    return strReg.test(that.data.max_people)
  },

  timeCheck:function() {
    var that=this;
    var ticketStart = new Date(that.data.ticketStartDate + " " + that.data.ticketStartTime + ":00").getTime() / 1000;
    var ticketEnd = new Date(that.data.ticketEndDate + " " + that.data.ticketEndTime + ":00").getTime() / 1000;
    var ActivityStart = new Date(that.data.ActivityStartDate + " " + that.data.ActivityStartTime + ":00").getTime() / 1000;
    var ActivityEnd = new Date(that.data.ActivityEndDate + " " + that.data.ActivityEndTime + ":00").getTime() / 1000;
    var curtime=Date.parse(new Date())/1000;
    console.log(curtime)
    if(curtime<ticketStart&&ticketStart<ticketEnd&&ticketEnd<ActivityStart&&ActivityStart<ActivityEnd) {
      return true;
    }
    else {
      return false;
    }
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