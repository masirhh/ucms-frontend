<template>
  <div class="message">
    <div class="left">
      <div class="avatar">
        <el-avatar :size="60" :src="avatarUrl"></el-avatar>
      </div>
      <div class="name">
        <span>{{name}}</span>
      </div>
    </div>
    <div class="middle">
      <el-divider class="divider" direction="vertical"></el-divider>
      <div class="middle-content">
        <span>{{message}}--{{ctime}}</span>
      </div>
      <el-divider class="divider" direction="vertical"></el-divider>
    </div>
    <div class="right">
      <div class="btns">
        <el-button v-if="ischecked" class="btn" type="primary">
          <span>已读</span>
        </el-button>
        <el-button @click="handleOkBtn" v-if="isOpreated" class="btn btn-bottom" type="primary">
          <span>同意</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqUser, reqFileUrl, reqMessage, reqJoin, reqClub } from "@/network";

export default {
  name: "umessage",
  props: {
    umsgid: null,
    ufromid: null,
    umsg: null,
    uopreated: null,
    uchecked: null,
    ucreatetime: null
  },
  data() {
    return {
      fromid: this.ufromid,
      msgid: this.umsgid,
      name: "",
      message: this.umsg,
      checked: this.uchecked,
      opreated: this.uopreated,
      time: this.ucreatetime,
      avatarid: "",
      avatarUrl: ""
    };
  },
  methods: {
    handleOkBtn() {
      switch (this.opreated) {
        case 2: {
          reqMessage({
            method: "put",
            data: {
              id: this.msgid,
              opreated: 1,
              checked: 1
            }
          }).then(res => {
            if (res != null) {
              reqClub({
                method: "get",
                url: "/get-club-by-admin",
                params: {
                  id: this.$store.state.user.id
                }
              }).then(res => {
                reqJoin({
                  method: "post",
                  data: {
                    userId: this.fromid,
                    clubId: res.id
                  }
                }).then(res => {
                  if (res != null) this.$message.success("操作成功");
                });
              });
            } else {
              this.$message.error("操作失败");
            }
          });
          break;
        }
        case 3: {
          reqMessage({
            method: "put",
            data: {
              id: this.msgid,
              opreated: 1,
              checked: 1
            }
          }).then(res => {
            if (res != null) {
              reqClub({
                method: "get",
                url: "/get-club-by-admin",
                params: {
                  id: this.$store.state.user.id
                }
              }).then(res => {
                reqJoin({
                  method: "put",
                  data: {
                    userId: this.fromid,
                    clubId: res.id
                  }
                }).then(res => {
                  if (res != null) this.$message.success("操作成功");
                });
              });
            } else {
              this.$message.error("操作失败");
            }
          });
          break;
        }
      }
    }
  },
  created: function() {
    reqUser({
      method: "get",
      url: "/" + this.fromid
    }).then(res => {
      this.name = res.name;
      reqFileUrl({
        method: "get",
        params: {
          fileId: res.avatar
        }
      }).then(res1 => {
        this.avatarUrl = res1;
      });
    });
  },
  computed: {
    ischecked() {
      if (this.checked === 1) {
        return false;
      } else return true;
    },
    isOpreated() {
      if (this.opreated === 1) {
        return false;
      } else {
        return true;
      }
    },
    ctime() {
      let ct = new Date(this.ucreatetime);
      let myYear = ct.getFullYear();
      let myMonth = ct.getMonth() + 1;
      let myDate = ct.getDate();
      return myYear + "-" + myMonth + "-" + myDate;
    }
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