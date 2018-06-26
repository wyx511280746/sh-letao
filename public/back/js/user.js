$(function () {
  var pageSize = 5;
  var currentPage = 1 ;
  var totalPages;
  var currentId;
  var isDelete;
  render();
  function render() {
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      dataType:'json',
      data : {
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {  
        // console.log(info);
        $('tbody').html(template('tmp',info));
        $('#Paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,//bootstrap版本
          currentPage: info.page,//当前页码
          totalPages: Math.ceil(info.total/info.size),//总页数（后台传过来的数据）
          onPageClicked: function (event, originalEvent, type, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  //点击按钮事件
  $('tbody').on('click','.btn',function () {
    $('#myModal2').modal('show');
    // 记录当前的用户id
    currentId = $(this).parent().data('id');
    // console.log(currentId);
    isDelete = $(this).hasClass('btn-danger')? 0 : 1 ;
    // console.log(isDelete);
    $('#logoutBtn2').on('click',function () {
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        dataType:'json',
        data : {
          id:currentId,
          isDelete:isDelete
        },
        success:function (info) {  
          // console.log(info);
          render();
        }
      })
      $('#myModal2').modal('hide');
    })
  })

})