<template>
  <div class="joinedclub">
    <div class="clubname">
      <span>{{clubname}}</span>
    </div>
    <div class="clubtype">
      <span>{{clubtype}}</span>
    </div>
    <div class="btns">
      <el-button @click="handleCheck" type="primary">查看</el-button>
      <el-button @click="handleQuit" type="primary">退出</el-button>
    </div>
  </div>
</template>

<script>
import { reqClub, reqMessage } from "@/network";

export default {
  name: "joinedclub",
  props: {
    uclubid: null,
    uclubadmin: null
  },
  data() {
    return {
      clubid: this.uclubid,
      userid: this.$store.state.user.id,
      clubname: "",
      clubtype: ""
    };
  },
  created: function() {
    reqClub({
      url: "/" + this.uclubid,
      method: "get"
    }).then(res => {
      this.clubname = res.name;
      this.clubtype = res.typeName;
    });
  },
  methods: {
    handleCheck() {
      this.$router.push({
        path: "/club/" + this.clubid
      });
    },
    handleQuit() {
      this.$prompt("请输入申请信息", "申请信息", {
        confirmButtonText: "确认退出",
        cancelButtonText: "取消"
      })
        .then(success => {
          reqMessage({
            method: "post",
            data: {
              fromUserId: this.userid,
              toUserId: this.uclubadmin,
              content: success.value,
              opreated: 3
            }
          });
          this.$message.success("提交了申请");
        })
        .catch(() => {
          this.$message.info("你取消了申请");
        });
    }
  }
};
</script>

<style scoped>
.joinedclub {
  height: 50px;
  width: 600px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}
.btns {
  margin-right: 20px;
}
.clubname {
  margin-left: 10px;
}
</style>