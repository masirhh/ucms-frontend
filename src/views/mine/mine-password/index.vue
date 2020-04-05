<template>
  <div class="password">
    <div class="title">
      <span>修改密码</span>
    </div>
    <el-divider>UCMS</el-divider>
    <div class="body">
      <div class="pass">
        <div>
          <span>旧的密码</span>
          <div class="input">
            <el-input v-model="oldpwd" type="password"></el-input>
          </div>
        </div>
      </div>
      <div class="pass">
        <div>
          <span>新的密码</span>
          <div class="input">
            <el-input v-model="newpwd" type="password"></el-input>
          </div>
        </div>
      </div>
      <div class="pass">
        <el-button type="primary" @click="handleUpdateBtn">
          <span>确认修改</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqUser } from "@/network";

export default {
  name: "uminepassword",
  data() {
    return {
      oldpwd: "",
      newpwd: ""
    };
  },
  methods: {
    handleUpdateBtn() {
      reqUser({
        method: "get",
        url:"/checkpwd",
        params: {
          id: this.$store.state.user.id,
          password: this.oldpwd
        }
      }).then(res => {
        if (res != null) {
          reqUser({
            method: "put",
            data: {
              id: this.$store.state.user.id,
              password: this.newpwd
            }
          }).then(res => {
            if (res.id != null) {
              this.$message("修改成功！");
            } else {
              this.$message.error("修改失败！");
            }
          });
        } else {
          this.$message.error("请正确输入你的旧密码！");
        }
      });
    }
  }
};
</script>

<style scoped>
.password {
  width: 780px;
  height: 560px;
}
.title {
  margin-top: 20px;
}
.title span {
  margin-left: 10px;
  font-size: 20px;
}
.body {
  text-align: center;
  margin-top: 130px;
}
.input {
  width: 300px;
}
.pass {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>