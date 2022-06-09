$(function () {
    // 点击去注册账号让 登录框隐藏，注册框显示
    $("#link_reg").click(() => {
      $(".login-box").hide();
      $(".reg-box").show();
    });
    // 点击去登录让 注册框隐藏，登录框显示
    $("#link_login").click(() => {
      $(".login-box").show();
      $(".reg-box").hide();
    });

    // 从 LayUI 中获取 form 对象
    const form = layui.form;

    // 通过 form.verify() 方法自定义校验规则
    form.verify({
        // 数组方式
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验两次密码是否一致的规则
        repwd: (val) => {
            // 1.先获取密码框的值
            const pwd = $(".reg-box [name=password").val();
            //2.判断两次密码是否一致
            if(pwd !== val) return "两次密码不一致"
        },
    });

    const baseUrl = "http://www.liulongbin.top:3007"
    //注册账号
    $('#form_reg').on('submit', (e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: "/api/reguser",
            data: {
                username: $("#form_reg [name=username").val(),
                password: $("#form_reg [name=password").val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message,{icon: 7});
                layer.msg("注册成功！");
                // 注册成功后跳转到登录界面
                $("#link_login").click();
            }
        })
    })

    $('#form_login').submit(function(e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url:  "/api/login",
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg('登录失败',{icon: 2})
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
  });