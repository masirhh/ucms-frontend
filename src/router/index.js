import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  reqLoginUser
} from "../network"

Vue.use(VueRouter)

const user = () => import("@/views/user")
const login = () => import("@/views/login")
const main = () => import("@/views/main")
const mine = () => import("@/views/mine")
const regist = () => import("@/views/regist")
const club = () => import("@/views/club")
const clubdetail = () => import("@/views/club/detail")
const error = () => import("@/views/error")
const activity = () => import("@/views/activity")
const actdetail = () => import("@/views/activity/detail")


const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: "/",
    redirect: '/main'
  }, {
    path: "/main",
    name: "main",
    component: main,
  },
  {
    path: "/user",
    name: "user",
    component: user,
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      title: "login"
    }
  },
  {
    path: "/mine",
    component: mine,
    beforeEnter: (to, from, next) => {
      let storage = window.localStorage;
      let id = storage.getItem("id")
      if (id === null) {
        next("login")
      } else(
        reqLoginUser({
          method: "get",
          params: {
            key: id
          }
        }).then(res => {
          if (id === res) {
            next("mine")
          } else {
            if (from.name === "login") {
              next("main")
            }
            next("login")
          }
        })
      )
      next()
    }
  },
  {
    path: "/regist",
    name: "regist",
    component: regist
  },
  {
    path: "/club",
    name: "club",
    component: club
  },
  {
    path: "/club/:id",
    name: "clubdetail",
    component: clubdetail
  },
  {
    path: "/activity",
    name: "activity",
    component: activity,
  },
  {
    path: "/activity/:id",
    name: "actdetail",
    component: actdetail
  },
  // 404页面，当上面的路由没有匹配到的时候会匹配这个路由
  {
    path: "*",
    name: "error",
    component: error
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})


export default router