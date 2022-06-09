function getUserInfo() {
    $.ajax({
        method:'GET',
        url:"/my/userinfo",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        success: res => {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('获取用户信息成功')
            //调用渲染函数
            renderAvatar(res.data)
            console.log(res);
        }
    })
}

// 渲染用户信息
const renderAvatar = user => {
    const name = user.nickname || user.username
    //渲染欢迎语
    $('#welcome').html(`欢迎 ${name}`)
    // 按需渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}

//退出登录
$("#btnLogout").click(() => {
    console.log(1);
    layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
       localStorage.removeItem('token');
       location.href = "/login.html";
      });
})
getUserInfo()