// pages/ActivityPublished/ActivityPublished.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List:[],
    currentPage:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var Userinfo=JSON.parse(options.Userinfo);
    wx.request({
      url:'http://localhost:8081/nkutms/org-api/web/activities/my-activities?access-token='+Userinfo.access_token+'&page=1',
      method:'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        org_id:Userinfo.org_info.id
      },
      success:function(res) {
        console.log(res.data);
        var code=res.data.code;
        if(code==0){
        that.setData({
          List:res.data.data,
          User:options.User,
          Userinfo:Userinfo
        })
        that.transformToTime();
        }
      },
      fail:function(res) {
        wx.navigateBack();
      }
    })
  },

//加载列表的上一页
/*Prev:function() {
  var that=this;
  if(that.data.currentPage>1) {
    that.setData({
      currentPage:that.data.currentPage-1
    });
    wx.request({
      url: 'http://117.50.15.190/test/nm_ticketing_api/org-api/web/activities/my-activities?access-token=' + that.data.access_token +'&page='+that.data.currentPage,
      method:'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        org_id: that.data.org_id
      },
      success:function(res) {
        var code = res.data.code;
        if (code == 0) {
          that.setData({
            List: res.data.data
          })
      } 
      },
      fail:function(res) {
      } 
    })
  }
},*/
//加载列表下一页
/*Next:function() {
  var that = this;
  if (that.data.currentPage <that.data.maxPage) {
    that.setData({
      currentPage: that.data.currentPage + 1
    });
    wx.request({
      url: 'http://117.50.15.190/test/nm_ticketing_api/org-api/web/activities/my-activities?access-token=' + that.data.access_token + '&page=' + that.data.currentPage,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        org_id: that.data.org_id
      },
      success: function (res) {
        var code = res.data.code;
        if (code == 0) {
          that.setData({
            List: res.data.data
          })
        }
      },
      fail: function (res) {
      }
    })
  }  
},*/

//返回“我的”页面
Back:function() {
  var that=this;
  wx.redirectTo({
    url: '../Organizer/Organizer?List='+JSON.stringify(that.data.Userinfo),
  })
},

//查看活动详细界面
  viewDetail:function(e) {
    var that = this;
    //获取id并传到下一页
    const id = e.currentTarget.id;
    wx.redirectTo({
      url: '../ActivityDetail/ActivityDetail?Detail_id=' + id + '&User=0' + '&Userinfo=' + JSON.stringify(that.data.Userinfo) + '&page_id=1',
    })
  },

  //时间戳转换为时间!
  transformToTime: function () {
    var that = this;
    var activity = that.data.List;
    //调用util.js中的formateTime函数！！
    var util = require('../../utils/util.js');
    //开始转换
    var length = activity.length;
    for (var i = 0; i < length; i++) {
      var tk_start = util.formatTime(new Date(activity[i].ticketing_start_at * 1000));
      var tk_end = util.formatTime(new Date(activity[i].ticketing_end_at * 1000));
      var act_start = util.formatTime(new Date(activity[i].start_at * 1000));
      var act_end = util.formatTime(new Date(activity[i].end_at * 1000));
      var start_tk = "List[" + i + "].ticketing_start_at";
      var end_tk = "List[" + i + "].ticketing_end_at";
      var start_act = "List[" + i + "].start_at";
      var end_act = "List[" + i + "].end_at";
      that.setData({
        [start_tk]: tk_start,
        [end_tk]: tk_end,
        [start_act]: act_start,
        [end_act]: act_end
      })
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