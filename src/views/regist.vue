<template>
  <div>
    <div class="banner">
      <img class="center" src="../assets/ubanner.png" alt />
    </div>
    <div class="login">
      <el-divider>
        <span class="login-text">注册</span>
      </el-divider>
      <div class="login-box">
        <div class="login-box-item">
          <span class="login-box-span">性别：</span>
          <el-radio v-model="usex" label="1" selected>
            <span>男</span>
          </el-radio>
          <el-radio v-model="usex" label="2">
            <span>女</span>
          </el-radio>
        </div>
        <div class="login-box-item">
          <span class="login-box-span">账号：</span>
          <el-input class="login-box-input" placeholder="请输入用户名" v-model="uname" clearable></el-input>
        </div>
        <div class="login-box-item">
          <span class="login-box-span">昵称：</span>
          <el-input class="login-box-input" placeholder="请输入昵称" v-model="unickname" clearable></el-input>
        </div>

        <div class="login-box-item">
          <span class="login-box-span">密码：</span>
          <el-input class="login-box-input" placeholder="请输入密码" v-model="upassword" show-password></el-input>
        </div>
        <div class="login-box-item login-box-item-regist">
          <el-button class="login-box-button" @click="regist" key="regist">注册</el-button>
        </div>
      </div>
    </div>
    <ufooter></ufooter>
  </div>
</template>

<script>
import { reqUser } from "../network";
import ufooter from "../components/footer/uFooter";

export default {
  name: "uregist",
  data() {
    return {
      uname: "",
      upassword: "",
      unickname: "",
      usex: "1"
    };
  },
  components: {
    ufooter
  },
  methods: {
    vilidateDate() {
      if (
        this.uname.length < 1 ||
        this.upassword.length < 1 ||
        this.unickname.length < 1
      ) {
        return false;
      } else return true;
    },
    regist() {
      if (this.vilidateDate()) {
        reqUser({
          method: "post",
          data: {
            name: this.uname,
            password: this.upassword,
            sex: this.usex,
            nickname: this.unickname
          }
        }).then(res => {
          if (res.id != null) {
            this.$alert("恭喜你 注册成功", "注册成功").then(() => {
              this.$router.push("main");
            });
          }
        });
      } else {
        this.$alert("请检查你填写的信息，是否存在不完整的情况", "注册失败");
      }
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
.login-box-item-regist {
  display: flex;
  justify-content: center;
}
.login-box-button {
  width: 150px;
}
</style>