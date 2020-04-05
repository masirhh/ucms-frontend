<template>
  <div class="mine">
    <el-backtop></el-backtop>
    <uheader />
    <div class="mine-body">
      <div class="mine-card">
        <div class="card-left">
          <el-menu @select="changeView" :default-openeds="defaultopeneds" router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-info"></i>
                <span>我的信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/mine/myinfo">基本信息</el-menu-item>
                <el-menu-item index="/mine/mypassword">修改密码</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-help"></i>
                <span>我的社团</span>
              </template>
              <el-menu-item-group>
                <el-menu-item  index="/mine/joinedclub">我加入的社团</el-menu-item>
                <el-menu-item v-if="clubmanageable" index="/mine/managedclub">我管理的社团</el-menu-item>
                <el-menu-item v-if="clubmanageable" index="/mine/publishedact">我发布的活动</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-message-solid"></i>
                <span>我的消息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/mine/recmsg">我收到的消息</el-menu-item>
                <el-menu-item index="/mine/sysmsg">系统消息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
        <div class="card-right">
          <div class="noview" v-if="isclicknav">
            <span>你想看点什么东西呢？</span>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="foot">
      <ufooter />
    </div>
  </div>
</template>

<script>
import uheader from "@/components/header";
import ufooter from "@/components/footer";
import { reqLoginUser } from "@/network";

export default {
  name: "umine",
  components: {
    uheader,
    ufooter
  },
  data() {
    return {
      defaultopeneds: ["1", "2", "3"],
      umineinfo: {
        name: "umineinfo"
      },
      isclicknav: true,
      clubmanageable: false
    };
  },
  methods: {
    changeView() {
      this.isclicknav = false;
    }
  },
  created: function() {
    let localdata = window.localStorage;
    let id = localdata.getItem("id");
    reqLoginUser({
      params: {
        key: id
      }
    }).then(res => {
      res = JSON.parse(res);
      this.$store.commit("setUser", res);
      if (res.userType != 1) {
        this.clubmanageable = true;
      }
    });
  }
};
</script>

<style scoped>
.mine {
  position: relative;
  height: 100vh;
  min-height: 965px;
}
.mine-body {
  width: 1414px;
  margin: 0 auto;
}
.mine-card {
  width: 980px;
  margin: 0 auto;
  border: 1px solid #00a0d8;
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 10px;
  display: flex;
  margin-bottom: 20px;
}
.card-left {
  width: 200px;
}
.noview {
  height: 560px;
  width: 780px;
  text-align: center;
}
.noview span {
  display: inline-block;
  margin-top: 260px;
  color: #909399;
}
.card-right {
  width: 780px;
  height: 560px;
}

.foot {
  position: absolute;
  bottom: 0px;
}
</style>