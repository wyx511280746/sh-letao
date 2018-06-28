$(function () {
  var currentPage = 1 ;
  var pageSize = 2 ;
  var imgArr=[];

  render();
  function render() {
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {  
        // console.log(info);
        $('tbody').html(template("tmp",info));
        //分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          // size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page ;
            render();
          }
        });
      }
    })
  }

  // 点击实现模态框
  $('#addBtn').click(function () {
    $('#myModal2').modal('show');
    // 实现动态渲染下拉框

    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      dataType:'json',
      data:{
        page : 1,
        pageSize : 1000
      },
      success:function (info) {  
        // console.log(info);
        $('.dropdown-menu').html(template('tpl',info));
      }
    })
  })
  // 点击下拉框实现更换
  $('.dropdown-menu').on('click','a',function () {
    $('#dropdownTxt').html($(this).html());
    $('[name="brandId"]').val($(this).data('id'));
    $("#form").data('bootstrapValidator').updateStatus("brandId", "VALID");
  })


  $("#fileupload").fileupload({
    dataType:'json',
    done:function ( e,data ){  
      // console.log(data.result);
      var imgObj = data.result;
      if(imgArr.length >= 3){
        imgArr.unshift();
        console.log(imgArr);
        $('#imgBox img:last-of-type').remove();
      }

      $('#imgBox').prepend("<img src=" + imgObj.picAddr + " width='100px' height='100px'>");
      imgArr.push(imgObj);
      $("#form").data('bootstrapValidator').updateStatus("picFlag", "VALID");
    }
  })

  //表单验证
  $('#form').bootstrapValidator({
    // 重置排除项
    excluded: [],
  
    // 指定校验小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 检验字段
    fields: {
      // 二级分类 id
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      // 库存, 只能是数字且不能以 0 开头
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          // regexp 正则校验
          regexp: {
            // 正则规则
            regexp: /^[1-9]\d*$/,
            message: "请输入有效的商品库存"
          }
        }
      },
      // 尺码, 32-46
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          // regexp 正则校验
          regexp: {
            // 正则规则
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入一个合法的尺码, 例如 32-44 "
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      // 校验是否上传满三张图片了
      picFlag: {
        validators: {
          notEmpty: {
            message: "请上传 3 张图片"
          }
        }
      }
    }

  })

  $('#form').on('success.form.bv',function (e) {  
    e.preventDefault();

    var  data = $('#form').serialize();
    data += "&picAddr1"+imgArr[0].picAddr + '&PicName' + imgArr[0].picName ;
    data += "&picAddr2"+imgArr[1].picAddr + '&PicName' + imgArr[1].picName ;
    data += "&picAddr3"+imgArr[2].picAddr + '&PicName' + imgArr[2].picName ;

    $.ajax({
      type:'post',
      url:'/product/addProduct',
      dataType:'json',
      data:data,
      success:function (info) {  
        console.log(info);
        $('#form').data('bootstrapValidator').resetForm(true);
        currentPage = 1 ;
        render();
        $('#myModal2').modal('hide');
        $('#dropdownTxt').html('请选择一级分类');
        $("#imgBox img").remove();
      }
    })
  })
    





})