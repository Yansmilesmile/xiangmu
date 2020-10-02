$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show()
    })

    // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    //调用网页的接口
    function getajax(name1, pas) {
        // $.post('/api/reguser', {
        //     username: name1, password: pas
        // }, function (ajax) {

        //     if (status == 0 && ajax.message != '用户名被占用，请更换其他用户名！') {
        //         console.log(ajax.message);
        //         var val = ajax.message
        //         layer.msg(val, { icon: 1 });
        //         $('#link_login').click();
        //     } else {
        //         var val = ajax.message

        //         layer.msg(val, { icon: 2 });
        //     }
        // })
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: { username: name1, password: pas }, success: function (ajax) {
                if (status == 0 && ajax.message != '用户名被占用，请更换其他用户名！') {
                    console.log(ajax.message);
                    var val = ajax.message
                    layer.msg(val, { icon: 1 });
                    $('#link_login').click();
                } else {
                    var val = ajax.message

                    layer.msg(val, { icon: 2 });
                }
            }


        })
    }

    $('#getpost').on('submit', function (e) {
        e.preventDefault();
        var nama = $('#getpost [name="username"]').val()
        var password = $('#getpost   [name = "password"] ').val()
        getajax(nama, password)

    })
    $('#login-form').on('submit', function (e) {
     
        e.preventDefault();
        var name = $('#login-form [name="username"]').val()
        var password = $('#login-form  [name = "password"] ').val()
        logfm(name, password);
    })

    //获取用户的ajax请求
    function logfm(name1, pas) {
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: { username: name1, password: pas }, success: function (ajax) {
                if (status == 0 && ajax.message == "登录成功！") {
                    console.log(ajax);
                    var val = ajax.message
                    layer.msg(val, { icon: 1 });
                    return     location.href = '/home.html'

                } else {
                    var val = ajax.message
                    return layer.msg(val, { icon: 2 });

                }
            }
        })
    }

})