import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  reqLoginUser
} from "../network"

Vue.use(VueRouter)

const user = () => import("../views/user")
const login = () => import("../views/login")
const main = () => import("../views/main")
const mine = () => import("../views/mine")
const regist = () => import("../views/regist")

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
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})


export default router