$.ajaxPrefilter((options) => {
    options.url = "http://www.liulongbin.top:3007" + options.url

    // 注入 token
    if (options.url.includes("/my/")) {
        options.headers = {
            Authorization: localStorage.getItem("token")
        }
    }
})