<template>
  <div class="comment">
    <div class="comment-left">
      <div class="left-user">
        <div class="left-user-avatar">
          <el-avatar
            :size="50"
            :src="avatarurl"
            alt="EER"
          ></el-avatar>
        </div>
        <div class="left-user-info">
          <span class="span-name">{{cusername}}</span>
          <span class="span-time">{{loctime}}</span>
        </div>
      </div>
    </div>
    <div class="comment-right">{{textarea}}</div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import { reqUser, reqFileUrl } from "@/network";

export default {
  name: "ucomment",
  props: {
    comtime: null,
    comuserid: null,
    comcontent: null
  },
  data() {
    return {
      textarea: this.comcontent,
      ctime: this.comtime,
      cuserid: this.comuserid,
      avatarurl: "",
      ccontent: "",
      cusername: ""
    };
  },
  computed: {
    loctime() {
      let ct = new Date(this.ctime);
      let myYear = ct.getFullYear();
      let myMonth = ct.getMonth() + 1;
      let myDate = ct.getDate();
      return myYear + "-" + myMonth + "-" + myDate;
    }
  },
  created: function() {
    reqUser({
      method: "get",
      url: "/" + this.cuserid
    }).then(res => {
      this.cusername = res.name;
      reqFileUrl({
        method: "get",
        params: {
          fileId: res.avatar
        }
      }).then(res => {
        this.avatarurl = res;
      });
    });
  }
};
</script>

<style scoped>
.comment-left {
  width: 120px;
}
.left-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-user-info {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}
.span-time {
  font-size: 12px;
  color: #909399;
}
.comment-right {
  margin-left: 55px;
}
</style>