$(function () {



  //判断用户是否登录
  if(location.href.indexOf('login.html')){
    $.ajax({
      url:'/employee/checkRootLogin',
      type:'get',
      dataType:'json',
      success:function (info) {
        // console.log(info);
        if(info.error===400){
          location.href = "login.html";
        }
      }
    })
  }
  // // 实现进度条功能
  $(document).ajaxStart(function () {  
    NProgress.start();
  })
  $(document).ajaxStop(function () {  
    NProgress.done();
  });



  $('.category').click(function () {
    $('.child').stop().slideToggle();
  })

  $('.icon_menu').click(function () {
    $('.lt_aside').toggleClass('menuhide');
    $('.content_top').toggleClass('menuhide');
    $('.content-bottom').toggleClass('menuhide');
  });
  // 用户退出事件
  $('#logoutBtn').click(function () {
    $.ajax({
      type:'get',
      url: "/employee/employeeLogout",
      dataType:'json',
      success: function (info) {  
        // console.log(info);
        if(info.success){
          location.href = "login.html";
        }
      }
    })
  })


})