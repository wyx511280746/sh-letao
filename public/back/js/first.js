$(function () {
  var currentPage=1;
  var pageSize = 2;
  render();
  function render() {
    $.ajax({
      type:"get",
      url: "/category/queryTopCategoryPaging",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {  
        // console.log(info);
        $('tbody').html(template('tmp',info))
        $('#Paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,               
          currentPage: info.page,      
          totalPages: Math.ceil(info.total/info.size),   
          onPageClicked: function (event, originalEvent, type, page) {
            currentPage = page;
            render();
          }     
        })
      }
    })
  }
  // 点击事件
  $('#addBtn').click(function () {

    $('#myModal2').modal('show');

  })
  $("#form").bootstrapValidator({  
    // live: 'disabled',//验证时机，enabled是内容有变化就验证（默认），disabled和submitted是提交再验证  
    // excluded: [':disabled', ':hidden', ':not(:visible)'],//排除无需验证的控件，比如被禁用的或者被隐藏的  
    // submitButtons: '#btn-test',//指定提交按钮，如果验证失败则变成disabled，但我没试成功，反而加了这句话非submit按钮也会提交到action指定页面  
    // message: '通用的验证失败消息',//好像从来没出现过  
    feedbackIcons: {//根据验证结果显示的各种图标  
        valid: 'glyphicon glyphicon-ok',  
        invalid: 'glyphicon glyphicon-remove',  
        validating: 'glyphicon glyphicon-refresh'  
    },  
    fields: {  
      classify1: {  
            validators: {  
                notEmpty: {//检测非空,radio也可用  
                    message: '内容不能为空'  
                },   
                // regexp: {//正则验证  
                //     regexp: /^[a-zA-Z0-9_\.]+$/,  
                //     message: '所输入的字符不符要求'  
                // },  
            }  
        },
    }  
});  
//使用ajax提交表单
$('#form').on('success.form.bv',function (e) {
    //阻止表单提交
  e.preventDefault();
  console.log('阻止完成');
  var categoryName = $('#classify1').val();
  console.log(categoryName)
  //通过ajax提交
  $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:{
        categoryName:categoryName
      },
      dataType:"json",
      success : function (info) {  
        render();
        $('#myModal2').modal('hide');
        //表单重置
        $('#form').data('bootstrapValidator').resetForm(true);
      }

  })

})


})