import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  reqLoginUser
} from "../network"

Vue.use(VueRouter)


const login = () => import("@/views/login")
const home = () => import("@/views/home")
const mine = () => import("@/views/mine")
const regist = () => import("@/views/regist")
const club = () => import("@/views/club")
const clubdetail = () => import("@/views/club/detail")
const error = () => import("@/views/error")
const activity = () => import("@/views/activity")
const actdetail = () => import("@/views/activity/detail")
const publishact = () => import("@/views/activity/publish")


const umineinfo = () => import("@/views/mine/mine-info")
const uminepassword = () => import("@/views/mine/mine-password")
const uminemanaged = () => import("@/views/mine/mine-managed")
const uminepublishedact = () => import("@/views/mine/mine-publishedact")
const uminejoined = () => import("@/views/mine/mine-joined")
const uminerecmsg = () => import("@/views/mine/mine-recmsg")
const uminesysmsg = () => import("@/views/mine/mine-sysmsg")

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
    redirect: '/home'
  }, {
    path: "/home",
    name: "home",
    component: home,
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
    children: [{
      path: "myinfo",
      name: "umineinfo",
      component: umineinfo
    }, {
      path: "mypassword",
      component: uminepassword
    }, {
      path: "joinedclub",
      component: uminejoined
    }, {
      path: "managedclub",
      component: uminemanaged
    }, {
      path: "recmsg",
      component: uminerecmsg
    }, {
      path: "sysmsg",
      component: uminesysmsg
    }, {
      path: "publishedact",
      component: uminepublishedact
    }],
    beforeEnter: (to, from, next) => {
      let storage = window.localStorage;
      let id = storage.getItem("id")
      if (id === null) {
        next("/login")
      } else(
        reqLoginUser({
          method: "get",
          params: {
            key: id
          }
        }).then(res => {
          if (res === null) {
            next("/login")
          } else {
            let usr = JSON.parse(res)
            if (id == usr.id) {
              next("/mine")
            } else {
              if (from.name === "login") {
                next("/login")
              } else {
                next("/login")
              }
            }
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
  {
    path: "/publish",
    name: "publishact",
    component: publishact
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