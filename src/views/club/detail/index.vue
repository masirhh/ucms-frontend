<template>
  <div class="club-detail">
    <el-backtop></el-backtop>
    <uheader />
    <div class="club-detail-body">
      <div class="club-detail-button">
        <el-button round @click="handleBackBtn" class="club-detail-button-btn">返回</el-button>
        <el-button type="primary" round @click="handleJoinBtn" class="club-detail-button-btn">申请加入</el-button>
      </div>
      <div class="club-detail-content">
        <div class="club-detail-body">
          <div class="content-head">
            <span class="club-name">{{club.name}}</span>
            <span class="club-type">{{club.typeName}}</span>
          </div>
          <el-divider></el-divider>
          <div class="content-middle">
            <div class="middle-left">
              <div class="middle-left-infos">
                <div class="middle-left-infos-item">
                  <span class="span-title">创立时间</span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="span-body">{{creatTime}}</span>
                </div>

                <div class="middle-left-infos-item">
                  <span class="span-title">社团人数</span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="span-body">{{club.members}}</span>
                </div>

                <div class="middle-left-infos-item">
                  <span class="span-title">管理人员</span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="span-body">{{club.managerName}}</span>
                </div>
              </div>
            </div>
            <el-divider class="middle-divider" direction="vertical">fengexian</el-divider>
            <div class="middle-right">
              <img :src="clubavatarurl" class="middle-right-img" alt />
            </div>
          </div>
          <el-divider></el-divider>
          <div class="content-bottom">
            <div class="bottom-head">
              <span>社团简介</span>
            </div>
            <div class="bottom-content">
              <p>{{club.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ufooter class="foot" />
  </div>
</template>

<script>
import { reqClub, reqLoginUser, reqMessage, reqFileUrl } from "@/network";
import uheader from "@/components/header";
import ufooter from "@/components/footer";

export default {
  name: "uclubdetail",
  data() {
    return {
      clubid: this.$route.params.id,
      club: "",
      clubavatarurl: ""
    };
  },
  components: { uheader, ufooter },
  methods: {
    handleBackBtn() {
      this.$router.go(-1);
    },
    handleJoinBtn() {
      this.$prompt("请输入申请信息", "申请信息", {
        confirmButtonText: "确认申请",
        cancelButtonText: "取消申请"
      })
        .then(success => {
          let storage = window.localStorage;
          let id = storage.getItem("id");
          if (id === null) {
            this.$message.error("你尚未登陆，请先登录！");
          } else
            reqLoginUser({
              method: "get",
              params: {
                key: id
              }
            }).then(res => {
              if (res === null) {
                this.$message.error("你尚未登陆，请先登录！");
              } else {
                res = JSON.parse(res);
                if (id != res.id) {
                  this.$message.error("登陆信息已失效，请重新登陆");
                } else {
                  this.$store.commit("setUser", res);
                  reqMessage({
                    method: "post",
                    data: {
                      fromUserId: this.$store.state.user.id,
                      toUserId: this.club.admin,
                      content: success.value,
                      opreated: 2
                    }
                  }).then(res => {
                    if (res === true) {
                      this.$message.success("申请成功，请静候佳音");
                    } else {
                      this.$message.error("登陆信息已失效，请重新登陆");
                    }
                  });
                }
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "你取消了申请。"
          });
        });
    }
  },
  computed: {
    creatTime() {
      let ct = new Date(this.club.createTime);
      let myYear = ct.getFullYear();
      let myMonth = ct.getMonth() + 1;
      let myDate = ct.getDate();
      return myYear + "-" + myMonth + "-" + myDate;
    }
  },
  created: function() {
    reqClub({
      url: "/" + this.clubid
    }).then(res => {
      this.club = res;
      reqFileUrl({
        method: "get",
        params: {
          fileId: res.avatar
        }
      }).then(res => {
        this.clubavatarurl = res;
      });
    });
  }
};
</script>

<style scoped>
.club-detail {
  position: relative;
  height: 100vh;
  min-height: 965px;
}
.club-detail-button {
  margin: 0 auto;
  margin-top: 10px;
  width: 980px;
  display: flex;
  justify-content: space-between;
}
.club-detail-button-btn {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.club-detail-content {
  margin: 0 auto;
  margin-top: 10px;
  width: 980px;
  border: 1px solid #00a0d8;
  background-color: #f7f7f7;
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.club-detail-body {
  padding: 10px;
}
.content-head {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 40px;
}
.content-head .club-name {
  font-size: 30px;
}
.content-head .club-type {
  margin-left: 5px;
  text-align: center;
  height: 25px;
  width: 50px;
  background-color: #73c9e5;
  color: #fff;
  border-radius: 30%;
}
.content-middle {
  display: flex;
  justify-content: space-between;
}
.middle-left {
  width: 479px;
}
.middle-left-infos {
  display: flex;
  width: 470px;
  height: 100px;
  margin-top: 50px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.middle-left-infos-item {
  border-radius: 15px;
  width: 200px;
}
.middle-left-infos-item .span-body {
  display: inline-block;
  text-align: center;
  border-radius: 15px;
  width: 100px;
  background-color: #fff;
}
.middle-left-infos-item .span-title {
  margin-left: 10px;
}
.middle-divider {
  height: 200px;
}
.middle-right {
  width: 479px;
  text-align: center;
}
.middle-right-img {
  width: 200px;
  height: 200px;
  background-color: #f00;
}
.bottom-head span {
  font-size: 20px;
  margin-left: 10px;
}
.bottom-content {
  height: 170px;
}
.bottom-content p {
  color: #606266;
  margin-left: 10px;
  overflow: hidden;
}
.foot {
  position: absolute;
  bottom: 0px;
}
</style>