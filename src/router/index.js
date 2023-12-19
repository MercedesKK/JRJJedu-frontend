import { createRouter, createWebHashHistory } from "vue-router";

// 后台管理
import Admin from "~/layouts/admin.vue";
import AdminIndex from "~/pages/index.vue";
import Login from "~/pages/login.vue";
import Register from "~/pages/register.vue";
import NotFound from "~/pages/404.vue";
import Userlist from "~/pages/user/userlist.vue";
import role from "~/pages/user/role.vue";
import tealist from "~/pages/user/tealist.vue";
import back from "~/pages/back.vue";

import video from "~/pages/video.vue";
import videotype from "~/pages/videotype.vue";
import commentmoment from "~/pages/commentmoment.vue";

// 课程
import chapter from "~/pages/course/chapter.vue";
import chaptervideo from "~/pages/course/chaptervideo.vue";
import courselist from "~/pages/course/courselist.vue";
import coursetype from "~/pages/course/coursetype.vue";


// 用户路由
import Index from "~/pages/userpages/index.vue";
import Home from "~/pages/userpages/home.vue";
import Detail from "~/pages/userpages/detail.vue";
import Mine from "~/pages/userpages/mine.vue";
import Search from "~/pages/userpages/search.vue";
import Searchpage from "~/pages/userpages/searchpage.vue";
import detail2 from "~/pages/userpages/detail2.vue";

const routes = [
  {
    path: "/",
    component: Admin,
    children: [
      {
        path: "/",
        component: AdminIndex,
        meta: {
          title: "后台首页",
        },
      },
      {
        path: "/userlist",
        component: Userlist,
        meta: {
          title: "用户列表",
        },
      },
      {
        path: "/role",
        component: role,
        meta: {
          title: "角色列表",
        },
      },
      {
        path: "/video",
        component: video,
        meta: {
          title: "视频",
        },
      },
      {
        path: "/videotype",
        component: videotype,
        meta: {
          title: "视频分类",
        },
      },
      {
        path: "/commentmoment",
        component: commentmoment,
        meta: {
          title: "评论",
        },
      },
      {
        path: "/tealist",
        component: tealist,
        meta: {
          title: "讲师",
        },
      },
      {
        path: "/chapter",
        component: chapter,
        meta: {
          title: "章节",
        },
      },
      {
        path: "/chaptervideo",
        component: chaptervideo,
        meta: {
          title: "章节视频",
        },
      },
      {
        path: "/courselist",
        component: courselist,
        meta: {
          title: "课程",
        },
      },
      {
        path: "/coursetype",
        component: coursetype,
        meta: {
          title: "课程目录",
        },
      },
      
    ],
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录页面",
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      title: "注册页面",
    },
  },
  {
    path: "/back",
    component: back,
    meta: {
      title: "找回密码",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path:"/index",
    meta: {
      title: "主页",
    },
    component: Index,
    children:[
      {
        path:"/home",
        meta: {
          title: "首页",
        },
        component: Home,
      },
      {
        path:"/detail",
        meta: {
          title: "详情",
        },
        component: Detail,
      },
      {
        path:"/mine",
        meta: {
          title: "我的",
        },
        component: Mine,
      },
      {
        path:"/search",
        meta: {
          title: "分类搜索",
        },
        component: Search,
      },
      {
        path:"/searchpage",
        meta: {
          title: "搜索",
        },
        component: Searchpage,
      },
      {
        path:"/detail2",
        meta: {
          title: "已购买详情",
        },
        component: detail2,
      },
    ]
  }
];




const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
