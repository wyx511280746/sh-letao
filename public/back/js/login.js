$(function () {  
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
          username: {  
              validators: {  
                  notEmpty: {//检测非空,radio也可用  
                      message: '用户名不能为空'  
                  },  
                  stringLength: {//检测长度  
                      min: 2,  
                      max: 6,  
                      message: '长度必须在2-6之间'  
                  },  
                  callback : {
                    message : '用户名不存在'
                  }
                  // regexp: {//正则验证  
                  //     regexp: /^[a-zA-Z0-9_\.]+$/,  
                  //     message: '所输入的字符不符要求'  
                  // },  
              }  
          },
          password: {  
              validators: {  
                  notEmpty: {//检测非空,radio也可用  
                      message: '密码不能为空'  
                  },  
                  stringLength: {//检测长度  
                      min: 6,  
                      max: 12,  
                      message: '长度必须在6-12之间'  
                  },  
                  callback : {
                    message :'密码错误'
                  }
                  // regexp: {//正则验证  
                  //     regexp: /^[a-zA-Z0-9_\.]+$/,  
                  //     message: '所输入的字符不符要求'  
                  // },  
  
              }  
          }  
      }  
  });  
  //使用ajax提交表单
  $('#form').on('success.form.bv',function (e) {
      //阻止表单提交
    e.preventDefault();
    console.log('阻止完成');
    
    //通过ajax提交
    $.ajax({
        type:'post',
        url:'/employee/employeeLogin',
        data:$('#form').serialize(),
        dataType:"json",
        success : function (info) {  
            console.log(info);    
          if(info.success ){
            location.href = 'index.html';
          }
          if(info.error === 1001 ){
            $('#form').data("bootstrapValidator").updateStatus('password','INVALID',"callback");
          }
          if(info.error === 1000 ){
            $('#form').data("bootstrapValidator").updateStatus('username','INVALID',"callback");
          }

        }

    })

  })
  //表单重置
  $('[type="reset"]').click(function () {
    $('#form').data('bootstrapValidator').resetForm(true);
  })

});  