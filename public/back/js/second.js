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
        // console.log(info);
        $('tbody').html(template('tmp',info));
        $('#Paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, 
          currentPage : info.page,//当前页数
          totalPages : Math.ceil(info.total/info.size),//总页数 注意不是总条数
          onPageClicked: function (event, originalEvent, type, page) {
            currentPage = page;
            render();
          }
        })

      }
    })
  }
  //动态生成一级分类  
  $('#addBtn1').on('click',function () {
    $('#myModal2').modal('show');
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      dataType:"json",
      data:{
        page:1,
        pageSize:100
      },
      success:function (info) {  
        // console.log(info);
        //动态生成一级分类  
        $('.dropdown-menu').html(template('tpl',info));
      }
    })
  })

  //点击一级分类按钮更换信息--事件委托
  $('.dropdown-menu').on('click',"a",function () {
    $('#dropdownTxt').html($(this).html());
    //获取当前一级分类的id 赋值给后台需要的数据上面
    $('[name="categoryId"]').val($(this).data('id'));
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })

  //实现图片上传页面显示图片
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      // console.log(data);
      var src = data.result.picAddr;
      $('#imgBox img').attr('src',src);
      $('[name="brandLogo"]').val(src);
      // console.log($('[name="brandLogo"]').val());
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });
  //表单验证
  $('#form').bootstrapValidator({
    //   默认不校验 隐藏域的 input, 我们需要重置 excluded 为 [], 恢复对 隐藏域的校验
    excluded: [],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定校验字段
    fields: {
      //校验对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级分类'
          },
        }
      },

      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类'
          },
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传图片'
          },
        }
      },
    }
  })


  // 实现ajax提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      dataType:"json",
      data:$('#form').serialize(),
      success:function (info) {  
        console.log(info);
        render();
        $('#myModal2').modal('hide');
        $('#form').data('bootstrapValidator').resetForm(true);
        $('#dropdownTxt').html('请选择一级分类');
        $('#imgBox img').attr('src',"./images/none.png");
      }
    })
  });


})