<template>
  <div>
    <div class="banner">
      <img class="center" src="../assets/ubanner.png" alt />
    </div>
    <div class="login">
      <el-divider>
        <span class="login-text">登录</span>
      </el-divider>
      <div class="login-box">
        <div class="login-box-item">
          <span class="login-box-span">用户名：</span>
          <el-input class="login-box-input" placeholder="请输入用户名" v-model="uname" clearable></el-input>
        </div>
        <div class="login-box-item">
          <span class="login-box-span">密码：</span>
          <el-input class="login-box-input" placeholder="请输入密码" v-model="upassword" show-password></el-input>
        </div>
        <div class="login-box-item">
          <el-button class="login-box-button" @click="login" type="primary">登录</el-button>
          <el-button class="login-box-button" @click="toRegist">注册</el-button>
        </div>
      </div>
    </div>
    <ufooter></ufooter>
  </div>
</template>

<script>
import { reqUser } from "../network";
import ufooter from "../components/uFooter"

export default {
  name: "ulogin",
  data() {
    return {
      uname: "",
      upassword: ""
    };
  },
  components:{
    ufooter
  },
  methods: {
    login() {
      reqUser({
        method: "get",
        params: {
          name: this.uname,
          password: this.upassword
        }
      }).then(res => {
        if (res != null) {
          let storage = window.localStorage;
          storage.setItem("id", res.id);
          this.$router.push("main");
        } else {
          this.$alert(
            "登陆失败，请检查用户名和密码是否正确。若还没有账户，请先注册。",
            "登陆失败"
          );
        }
      });
    },
    toRegist() {
      this.$router.push("regist");
    }
  }
};
</script>

<style>
.banner {
  position: relative;
  height: 86px;
  background-color: #00a0d8;
  margin: 0 auto;
}
.center {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.login {
  width: 980px;
  margin: 0 auto;
}
.login-text {
  font-size: 38px;
}
.login-box {
  width: 490px;
  margin: 0 auto;
  margin-top: 200px;
}
.login-box-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.login-box-span {
  margin-right: 20px;
}
.login-box-input {
  width: 400px;
}
.login-box-button {
  width: 150px;
}
</style>