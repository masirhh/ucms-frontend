<template>
  <div class="message">
    <div class="left">
      <div class="avatar">
        <el-avatar :size="60" :src="avatarUrl"></el-avatar>
      </div>
      <div class="name">
        <span>{{id}}</span>
      </div>
    </div>
    <div class="middle">
      <el-divider class="divider" direction="vertical"></el-divider>
      <div class="middle-content">
        <span>消息内容</span>
      </div>
      <el-divider class="divider" direction="vertical"></el-divider>
    </div>
    <div class="right">
      <div class="btns">
        <el-button class="btn" type="primary">
          <span>已读</span>
        </el-button>
        <el-button class="btn btn-bottom" type="primary">
          <span>同意</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqUser, reqMessage, reqFileUrl } from "@/network";

export default {
  name: "umessage",
  props: {
    uid: null
  },
  data() {
    return {
      fromid: this.uid,
      name: "",
      message: "",
      opreated: "",
      avatarUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    };
  },
  created: function() {
      reqUser({
          method:"get",
          params:{
              id:this.fromid
          }
      }).then(res=>{
          this.name=res.name
          
      })


  }
};
</script>

<style scoped>
.message {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 16px;
  width: 740px;
  height: 85px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.left {
  margin-left: 10px;
}
.middle {
  display: flex;
  align-items: center;
}
.middle-content {
  width: 500px;
  overflow: hidden;
}
.middle .divider {
  height: 80px;
}
.btns {
  margin-right: 20px;
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: space-between;
}
.btn {
  height: 30px;
  margin: 0px;
}
.btn span {
  margin-top: 1px;
}
</style>