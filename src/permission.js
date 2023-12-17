import router from "~/router";
import { getToken } from "~/composables/auth"
import { toast } from '~/composables/util'
import store from "./store"

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    const token = getToken()
    if (!token && to.path != "/login" && to.path != "/register" && to.path != "/back") {
        toast("请先登录","error")
        return next({path:"/login"})
    }

    // 防止重复登录
    if (token && to.path == "/login"){
        toast("请勿重复登录","error")
        return next({path:from.path ? from.path : "/"})
    }

    // 如果用户登录 自动获取用户信息 储存在vuex
    if (token) {
        await store.dispatch("getinfo")
    }

    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : "") + "-渐入嘉靖教育平台"

    document.title = title

    next()
    
});



