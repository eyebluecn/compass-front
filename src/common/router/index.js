import Vue from "vue";
import Router from "vue-router";

import LbFrameView from "../../lobby/Frame.vue";
import HomeIndex from "../../lobby/home/Index";


import ByFrameView from "../../backyard/Frame.vue";

import SiteCreate from "../../backyard/site/Create";
import SiteList from "../../backyard/site/List";


import UserLogin from "../../backyard/user/Login.vue";
import UserList from "../../backyard/user/List";
import UserChangePassword from "../../backyard/user/ChangePassword";
import UserCreate from "../../backyard/user/Create";


import PreferenceIndex from "../../backyard/preference/Index";
import PreferenceEdit from "../../backyard/preference/Edit";
import NotFound from "../../backyard/layout/NotFound";
import store from "../vuex/index.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  linkActiveClass: "is-link-active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [

    {
      path: "/by",
      component: ByFrameView,
      children: [


        {
          path: "site/list",
          name: "SiteList",
          component: SiteList,
          meta: {
            title: "站点列表",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "SiteList",
                title: "站点列表"
              }
            ]
          }
        },

        {
          path: "site/create",
          name: "SiteCreate",
          component: SiteCreate,
          meta: {
            title: "新建站点",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "SiteList",
                title: "站点列表"
              },
              {
                name: "SiteCreate",
                title: "新建站点"
              }
            ]
          }
        },

        {
          path: "site/edit/:uuid",
          name: "SiteEdit",
          component: SiteCreate,
          meta: {
            title: "编辑站点",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "SiteList",
                title: "站点列表"
              },
              {
                name: "SiteEdit",
                title: "编辑站点"
              }
            ]
          }
        },



        {
          path: "user/login",
          name: "UserLogin",
          component: UserLogin,
          meta: {
            title: "登录",
            requiresAuth: false,
            breadcrumbs: []
          }
        },
        {
          path: "user/list",
          name: "UserList",
          component: UserList,
          meta: {
            title: "用户列表",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "UserList",
                title: "用户列表"
              }
            ]
          }
        },
        {
          path: "user/change/password",
          name: "UserChangePassword",
          component: UserChangePassword,
          meta: {
            title: "修改密码",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "UserChangePassword",
                title: "修改密码"
              }
            ]
          }
        },
        {
          path: "user/create",
          name: "UserCreate",
          component: UserCreate,
          meta: {
            title: "创建用户",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "UserList",
                title: "用户列表"
              },
              {
                name: "UserCreate",
                title: "创建用户"
              }
            ]
          }
        },
        {
          path: "user/edit/:uuid",
          name: "UserEdit",
          component: UserCreate,
          meta: {
            title: "编辑用户",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "UserList",
                title: "用户列表"
              },
              {
                name: "UserEdit",
                title: "编辑用户"
              }
            ]
          }
        },
        {
          path: "preference",
          name: "PreferenceIndex",
          component: PreferenceIndex,
          meta: {
            title: "网站偏好",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "PreferenceIndex",
                title: "网站偏好"
              }
            ]
          }
        },
        {
          path: "preference/edit",
          name: "PreferenceEdit",
          component: PreferenceEdit,
          meta: {
            title: "网站偏好设置",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "PreferenceIndex",
                title: "网站偏好"
              }, {
                name: "PreferenceEdit",
                title: "网站偏好设置"
              }
            ]
          }
        },
        //未被上面处理的route被视为404
        {
          path: "*",
          component: NotFound,
          meta: { requiresAuth: false }
        }
      ]
    },
    {
      path: "/",
      component: LbFrameView,
      children: [
        {
          path: "",
          name: "HomeIndex",
          component: HomeIndex,
          meta: {
            title: "首页",
            requiresAuth: false,
            breadcrumbs: []
          }
        },
        //未被上面处理的route被视为404
        {
          path: "*",
          component: NotFound,
          meta: { requiresAuth: false }
        }
      ]
    }

  ]
});

//装填面包屑
function fillBreadcrumbs(to) {
  //清空数组
  store.state.breadcrumbs.splice(0, store.state.breadcrumbs.length);
  if (to.meta.breadcrumbs) {
    //追加一个数组
    store.state.breadcrumbs.push.apply(store.state.breadcrumbs, to.meta.breadcrumbs);
  }
}

//add global interceptor.
router.beforeEach((to, from, next) => {

  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "个人博客";
  }

  //handle auth feature.
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.state.user.role === "GUEST") {
      next({
        path: "/by/user/login",
        query: { redirect: to.fullPath }
      });
    } else {

      fillBreadcrumbs(to);
      next();
    }
  } else {

    fillBreadcrumbs(to);
    next();
  }
});

export default router;
