// pages/Organizer/Organizer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:'Organizer',
  },

//切换页面
  handleChange({ detail }) {
    var that=this;
    this.setData({
      current: detail.key
    });
    if(this.data.current=='Activity') {
      wx.redirectTo({
        url: '../Activity/Activity?User=0'+'&Userinfo='+JSON.stringify(that.data.List),
      })
    }
    if(this.data.current=='Access') {
      wx.redirectTo({
        url: '../PublishAccess/PublishAccess?User=0' +'&Userinfo='+JSON.stringify(that.data.List),
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
    var List = JSON.parse(options.List);
    this.setData({
      List:List
    })
    console.log(List);
  },

  //获取已经发布的活动
  GetPublished:function() {
    var that=this;
    wx.redirectTo({
      url: '../ActivityPublished/ActivityPublished?Userinfo=' + JSON.stringify(that.data.List) +'&User=0',
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