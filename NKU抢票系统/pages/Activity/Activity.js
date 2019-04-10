// pages/Activity/Activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Account:0,
    current:'Activity',
    List:[],
    User:-1,
    currentPage:1,
    maxPage:1,
    searchName:'',
    categoryArray: ['讲座', '演讲', '宣讲', '其它'],
    categoryIndex: 0
  },

  //切换页面
  handleChange({ detail }) {
    var that=this;
    this.setData({
      current: detail.key
    });
    if (this.data.current == 'Access') {
      wx.redirectTo({
        url: '../PublishAccess/PublishAccess?User=0' + '&Userinfo='+JSON.stringify(that.data.Userinfo),
      })
    }
    if (this.data.current == 'index') {
      wx.reLaunch({
        url: '../index/index',
      })
    }
    if(this.data.current=='User') {
      wx.redirectTo({
        url: '../User/User?User=1'+'&data='+JSON.stringify(that.data.Userinfo),
      })
    }
    if (this.data.current =='Organizer') {
      wx.redirectTo({
        url: '../Organizer/Organizer?List='+JSON.stringify(that.data.Userinfo),
      })
    }
  },

  //进入详细页面
  viewDetail:function(e) {
    var that=this;
    //获取id并传到下一页
    const id=e.currentTarget.id;
    wx.redirectTo({
      url: '../ActivityDetail/ActivityDetail?Detail_id='+id+'&User='+that.data.User+'&Userinfo='+JSON.stringify(that.data.Userinfo)+'&page_id=0',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var Userinfo=JSON.parse(options.Userinfo);
    that.setData({
      Userinfo:Userinfo
    })
    wx.request({
      url:"http://localhost:8081/nkutms/org-api/web/activities?page=1",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      success:function(res) {
        console.log(res.data)
        that.setData({
          List:res.data.data,
          maxPage:res.data.pages,
          User:options.User
        })
        that.transformToTime();
      }
    })
  },

//时间戳转换为时间!
transformToTime:function() {
  var that=this;
  var activity=that.data.List;
  //调用util.js中的formateTime函数！！
  var util=require('../../utils/util.js');
  //开始转换
  var length=activity.length;
  for(var i=0;i<length;i++) {
    var tk_start=util.formatTime(new Date(activity[i].ticketing_start_at*1000));
    var tk_end = util.formatTime(new Date(activity[i].ticketing_end_at*1000));
    var act_start = util.formatTime(new Date(activity[i].start_at*1000));
    var act_end = util.formatTime(new Date(activity[i].end_at*1000));
    var start_tk="List["+i+"].ticketing_start_at";
    var end_tk="List["+i+"].ticketing_end_at";
    var start_act="List["+i+"].start_at";
    var end_act="List["+i+"].end_at";
    that.setData({
      [start_tk]:tk_start,
      [end_tk]:tk_end,
      [start_act]:act_start,
      [end_act]:act_end
    })
  }
},

//活动列表的上一页
Prev:function() {
  var that=this;
  if(that.data.currentPage>1) {
    that.setData({
      currentPage:that.data.currentPage-1
    });
    wx.request({
      url:'http://localhost:8081/nkutms/org-api/web/activities?page='+that.data.currentPage,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      success:function(res) {
        that.setData({
          List:res.data.data
        })
        that.transformToTime();
      }
    })
  }
},
//活动列表的下一页
Next:function() {
  var that = this;
  if (that.data.currentPage <that.data.maxPage) {
    that.setData({
      currentPage: that.data.currentPage+1
    });
    wx.request({
      url:'http://localhost:8081/nkutms/org-api/web/activities?page=' + that.data.currentPage,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          List: res.data.data
        })
        that.transformToTime();
      }
    })
  }
},

  //搜索栏活动姓名
  bindActivityName:function(e) {
    this.setData({
      searchName:e.detail.value
    })
  },

  //搜索栏类别
  bindCategory:function(e) {
    this.setData({
      categoryIndex:e.detail.value
    })
  },

  //清空！重置搜索栏
  Clear:function() {
    var that=this;
    this.setData({
      searchName:'',
      categoryIndex:0
    })
    wx.request({
      url: "http://localhost:8081/nkutms/org-api/web/activities?page=1",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          List: res.data.data,
          maxPage: res.data.pages,
          currentPage:1
        })
        that.transformToTime();
      }
    })
  },

  //确认并进入
  Enter:function() {
    var that=this;
    if(!that.strCheck()) {
      wx.showToast({
        title: '搜索栏为空或格式不符!',
        icon: 'none',
        duration: 1500
      })       
    }
    else {
      console.log(that.data.searchName)
    wx.request({
      url: 'http://localhost:8081/nkutms/org-api/web/activities/search',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method:'POST',
      data: {
        name:that.data.searchName,
        category:that.data.categoryIndex
      },
      success:function(res) {
        console.log(res);
        var List=res.data.data;
        var del=[];
        for(var i=0;i<List.length;i++) {
          if(List[i].status=='待审核') {
            del.push(i);
          }
        }
        for(var i=0;i<del.length;i++) {
          List.splice(del[i],1);
        }
        that.setData({
          List: List,
          maxPage:res.data.pages,
          currentPage: 1
        })
        that.transformToTime();        
      },
      fail:function() {
        wx.showToast({
          title: '连接失败',
          icon: 'none',
          duration: 1500
        })        
      }   
    })
    }
  },
  
  //利用正则进行检查
  strCheck:function() {
    var that = this;
    //字符串不得包含无法parse的字符 必要项只能写中文 英文 数字和下划线 且不得为空！
    var strReg = /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[a-zA-Z0-9_]){1,}$/;
    return strReg.test(that.data.searchName);
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