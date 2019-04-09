// pages/ActivityDetail/ActivityDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    User:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var activity_id=options.Detail_id;
    var Userinfo=JSON.parse(options.Userinfo);
    wx.request({
      url: 'http://localhost:8081/nkutms/org-api/web/activities/'+activity_id,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method:'GET',
      success: function (res) {
        console.log(res.data.data);
        var code=res.data.code;
        if(code==0) {
        that.setData({
          List: res.data.data,
          User:options.User,
          activity_id:activity_id,
          page_id:options.page_id,
          Userinfo:Userinfo
        })
        that.transformToTime();
        if (that.data.User == 0) {
          that.setData({
            org_id: Userinfo.org_info.id
          })
        }
        else {
        that.setData({
          user_id: Userinfo.user_info.user_id
        })
        }
        }
        else {
          wx.navigateBack({
            url: '../Activity/Activity',
          })
        }
      }
    })
  },

  //时间戳转换为时间!
  transformToTime: function () {
    var that = this;
    var activity = that.data.List;//这个是对象！！
    //调用util.js中的formateTime函数！！
    var util = require('../../utils/util.js');
    //开始转换
      var tk_start = util.formatTime(new Date(activity.ticketing_start_at * 1000));
      var tk_end = util.formatTime(new Date(activity.ticketing_end_at * 1000));
      var act_start = util.formatTime(new Date(activity.start_at * 1000));
      var act_end = util.formatTime(new Date(activity.end_at * 1000));
      var start_tk = "List.ticketing_start_at";
      var end_tk = "List.ticketing_end_at";
      var start_act = "List.start_at";
      var end_act = "List.end_at";
      that.setData({
        [start_tk]: tk_start,
        [end_tk]: tk_end,
        [start_act]: act_start,
        [end_act]: act_end
      })
  },


//Organizer:
  //获取参与者信息
  GetList:function() {
    var that=this;
    wx.navigateTo({
      url: '../GetParticipant/GetParticipant?activity_id='+that.data.List.id+'&org_id='+that.data.org_id+'&access_token='+that.data.Userinfo.access_token,
    })
  },

  //返回上一页
  returnPrev:function() {
    var that=this;
    var page_id=that.data.page_id;
    if(page_id==0){
    wx.redirectTo({
      url: '../Activity/Activity?User=' + that.data.User +'&Userinfo='+JSON.stringify(that.data.Userinfo),
    })
    }
    else {
      wx.redirectTo({
        url: '../ActivityPublished/ActivityPublished?User=' + that.data.User + '&Userinfo=' + JSON.stringify(that.data.Userinfo),
      })
    }
  },

//修改活动
changeActivity:function() {
  var that=this;
  wx.redirectTo({
    url: '../changeActivity/changeActivity?Activityinfo=' + JSON.stringify(that.data.List) + '&Userinfo=' + JSON.stringify(that.data.Userinfo) + '&page_id=' + that.data.page_id +'&activity_id='+that.data.activity_id,
  })
},

//删除活动
deleteActivity:function() {
  var that=this;
  var page_id=that.data.page_id;
  wx.request({
    url: 'http://localhost:8081/nkutms/org-api/web/activities/cancel-activity?access-token=' + that.data.access_token,
    method: 'POST',
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: {
      org_id: that.data.org_id,
      activity_id:that.data.activity_id
    },
    success: function (res) {
      console.log(res.data);
      var code = res.data.code;
      if (code == 0) {
        wx.showToast({
          title: "删除成功",
          icon: 'none',
          duration: 1500
        });
        if(page_id==0) {
        wx.redirectTo({
          url: '../Activity/Activity?User=' + that.data.User + '&Userinfo=' + JSON.stringify(that.data.Userinfo),
        })
      }
      else {
        wx.redirectTo({
          url: '../ActivityPublished/ActivityPublished?User='+that.data.User+'&Userinfo='+JSON.stringify(that.data.Userinfo),
        })
      }
      }
      else {
        wx.showToast({
          title: "删除失败",
          icon: 'none',
          duration: 1500
        })
      }
    },
    fail: function () {
      wx.showToast({
        title: "删除失败",
        icon: 'none',
        duration: 1500
      })
    }
  })
},

//User:
  //抢票
  GetTicket:function() {
    var that=this;
    wx.request({
      url: 'http://localhost:8081/nkutms/api/web/activities/ticketing?access-token='+that.data.access_token,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        user_id:that.data.user_id,
        activity_id:that.data.activity_id
      },
      success:function(res) {
        console.log(res);
        if(res.data.code==0) {
        wx.showToast({
          title: "抢票成功",
          icon: 'none',
          duration: 1500
        })
        }
        else if(res.data.message=="已抢过票！") {
          wx.showToast({
            title: '已抢过票！',
            icon:'none',
            duration:1500
          })
        }
        else {
          wx.showToast({
            title: '抢票失败！',
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