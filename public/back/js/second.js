$(function () {
  var currentPage = 1;
  var pageSize =5;

  render();
  function render() {
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {  
        console.log(info);
        $('tbody').html(template('tmp',info))
      }
    })
  }








})