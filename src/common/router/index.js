import Vue from "vue";
import Router from "vue-router";

import LbFrameView from "../../lobby/Frame.vue";
import HomeIndex from "../../lobby/home/Index";


import ByFrameView from "../../backyard/Frame.vue";
import CarouselCreate from "../../backyard/carousel/Create";
import CarouselList from "../../backyard/carousel/List";

import ColumnCreate from "../../backyard/column/Create";
import ColumnList from "../../backyard/column/List";
import Pictures from "../../backyard/column/Pictures";

import UserLogin from "../../backyard/user/Login.vue";
import UserList from "../../backyard/user/List";
import UserChangePassword from "../../backyard/user/ChangePassword";
import UserCreate from "../../backyard/user/Create";
import ArticleList from "../../backyard/article/List.vue";
import ArticleCreate from "../../backyard/article/Create.vue";
import ArticleDetail from "../../backyard/article/Detail.vue";


import VersionList from "../../backyard/version/List.vue";
import VersionCreate from "../../backyard/version/Create.vue";
import VersionDetail from "../../backyard/version/Detail.vue";


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
          path: "",
          name: "ArticleList",
          component: ArticleList,
          meta: {
            title: "文章列表",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "ArticleList",
                title: "文章列表"
              }
            ]
          }
        },
        {
          path: "article/create",
          name: "ArticleCreate",
          component: ArticleCreate,
          meta: {
            title: "新建文章",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "ArticleList",
                title: "文章列表"
              },
              {
                name: "ArticleCreate",
                title: "新建文章"
              }
            ]
          }
        },
        {
          path: "article/edit/:uuid",
          name: "ArticleEdit",
          component: ArticleCreate,
          meta: {
            title: "编辑文章",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "ArticleList",
                title: "文章列表"
              },
              {
                name: "ArticleEdit",
                title: "编辑文章"
              }
            ]
          }
        },
        {
          path: "article/detail/:uuid",
          name: "ArticleDetail",
          component: ArticleDetail,
          meta: {
            title: "文章详情",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "ArticleList",
                title: "文章列表"
              },
              {
                name: "ArticleDetail",
                title: "文章详情"
              }
            ]
          }
        },

        {
          path: "version/list",
          name: "VersionList",
          component: VersionList,
          meta: {
            title: "版本列表",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "VersionList",
                title: "版本列表"
              }
            ]
          }
        },
        {
          path: "version/create",
          name: "VersionCreate",
          component: VersionCreate,
          meta: {
            title: "新建版本",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "VersionList",
                title: "版本列表"
              },
              {
                name: "VersionCreate",
                title: "新建版本"
              }
            ]
          }
        },
        {
          path: "version/edit/:uuid",
          name: "VersionEdit",
          component: VersionCreate,
          meta: {
            title: "编辑版本",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "VersionList",
                title: "版本列表"
              },
              {
                name: "VersionEdit",
                title: "编辑版本"
              }
            ]
          }
        },
        {
          path: "version/detail/:uuid",
          name: "VersionDetail",
          component: VersionDetail,
          meta: {
            title: "版本详情",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "VersionList",
                title: "版本列表"
              },
              {
                name: "VersionDetail",
                title: "版本详情"
              }
            ]
          }
        },

        {
          path: "carousel/list",
          name: "CarouselList",
          component: CarouselList,
          meta: {
            title: "轮播图列表",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "CarouselList",
                title: "轮播图列表"
              }
            ]
          }
        },

        {
          path: "carousel/create",
          name: "CarouselCreate",
          component: CarouselCreate,
          meta: {
            title: "新建轮播图",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "CarouselList",
                title: "轮播图列表"
              },
              {
                name: "CarouselCreate",
                title: "新建轮播图"
              }
            ]
          }
        },

        {
          path: "carousel/edit/:uuid",
          name: "CarouselEdit",
          component: CarouselCreate,
          meta: {
            title: "编辑轮播图",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "CarouselList",
                title: "轮播图列表"
              },
              {
                name: "CarouselEdit",
                title: "编辑轮播图"
              }
            ]
          }
        },

        {
          path: "column/list",
          name: "ColumnList",
          component: ColumnList,
          meta: {
            title: "首页栏目列表",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "ColumnList",
                title: "首页栏目列表"
              }
            ]
          }
        },

        {
          path: "column/create",
          name: "ColumnCreate",
          component: ColumnCreate,
          meta: {
            title: "新建首页栏目",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "ColumnList",
                title: "首页栏目列表"
              },
              {
                name: "ColumnCreate",
                title: "新建首页栏目"
              }
            ]
          }
        },

        {
          path: "column/edit/:uuid",
          name: "ColumnEdit",
          component: ColumnCreate,
          meta: {
            title: "编辑首页栏目",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "ColumnList",
                title: "首页栏目列表"
              },
              {
                name: "ColumnEdit",
                title: "编辑首页栏目"
              }
            ]
          }
        },

        {
          path: "column/pictures",
          name: "Pictures",
          component: Pictures,
          meta: {
            title: "图片选择",
            requiresAuth: true,
            breadcrumbs: [
              {
                name: "Pictures",
                title: "图片选择"
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
