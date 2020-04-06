<template>
  <div class="managed">
    <div class="title">
      <span>我管理的社团</span>
    </div>
    <el-divider>UCMS</el-divider>
    <div class="head">
      <el-button type="text" @click="handleShowClub" size="large">社团</el-button>
      <el-button type="text" @click="handleShowMember" size="large">社员</el-button>
    </div>
    <div class="clubinfo" v-if="isShow">
      <div class="club-container">
        <div class="club-infos">
          <div class="info-item">
            <div class="item-title">
              <span>社团名称</span>
            </div>
            <div class="item-content">
              <span>{{managedClub.name}}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="item-title">
              <span>社团类型</span>
            </div>
            <div class="item-content">
              <span>{{managedClub.typeName}}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="item-title">
              <span>创立时间</span>
            </div>
            <div class="item-content">
              <span>{{creatTime}}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="item-title">
              <span>社团人数</span>
            </div>
            <div class="item-content">
              <span>{{managedClub.members}}</span>
            </div>
          </div>
        </div>
        <div class="club-avatar">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8082/ucms/file"
            :show-file-list="false"
            :on-success="handleUploadOk"
            name="avatar"
          >
            <img v-if="isimageUrl" :src="avatarUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="club-desc">
        <span>社团简介</span>
        <el-input
          class="desc-content"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="textarea"
        ></el-input>
        <el-button class="savebtn" @click="handleSaveBtn" type="primary">保存更改</el-button>
      </div>
    </div>
    <div class="clubmembers" v-if="!isShow">
      <div class="members-table">
        <el-table :data="clubusers" max-height="420px" border stripe style="width: 100%">
          <el-table-column prop="id" width="50px" label="id"></el-table-column>
          <el-table-column prop="name" width="100px" label="姓名"></el-table-column>
          <el-table-column prop="nickname" width="100px" label="昵称"></el-table-column>
          <el-table-column prop="telephone" label="电话"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column fixed="right" label="操作" width="160px">
            <template slot-scope="scope">
              <el-button @click="handleSendMsg(scope.row)" type="text" size="small">发送信息</el-button>
              <el-button @click="handleQuitClub(scope.row)" type="text" size="small">踢出社团</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { reqClub, reqFileUrl, reqJoin, reqMessage } from "@/network";
export default {
  name: "uminemanaged",
  data() {
    return {
      isShow: true,
      managedClub: "",
      avatarUrl: "",
      avatarId: "",
      isimageUrl: false,
      textarea: "",
      clubusers: {}
    };
  },
  methods: {
    handleShowClub() {
      this.isShow = true;
    },
    handleShowMember() {
      this.isShow = false;
    },
    handleUploadOk(res) {
      this.avatarUrl = res.data.path;
      this.avatarId = res.data.id;
    },
    handleSaveBtn() {
      reqClub({
        method: "put",
        data: {
          id: this.managedClub.id,
          avatar: this.avatarId,
          description: this.textarea
        }
      }).then(res => {
        if (res != null) {
          this.$message.success("操作成功");
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    handleSendMsg(row) {
      this.$prompt("请输入发送的信息", "信息", {
        confirmButtonText: "确认发送",
        cancelButtonText: "取消"
      })
        .then(success => {
          reqMessage({
            method: "post",
            data: {
              fromUserId: this.$store.state.user.id,
              toUserId: row.id,
              content: success.value,
              opreated: 1
            }
          });
          this.$message.success("发送了信息");
        })
        .catch(() => {
          this.$message.info("你取消了发送");
        });
    },
    handleQuitClub(row) {
      console.log("1 " + this.managedClub.id);
      console.log(row);
      reqJoin({
        method: "delete",
        data: {
          userId: row.id,
          clubId: this.managedClub.id
        }
      }).then(res => {
        if (res === true) {
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败");
        }
      });
    }
  },
  computed: {
    creatTime() {
      let ct = new Date(this.managedClub.createTime);
      let myYear = ct.getFullYear();
      let myMonth = ct.getMonth() + 1;
      let myDate = ct.getDate();
      return myYear + "-" + myMonth + "-" + myDate;
    }
  },
  created: function() {
    reqClub({
      url: "/get-club-by-admin",
      method: "get",
      params: {
        id: this.$store.state.user.id
      }
    }).then(res => {
      reqClub({
        url: "/" + res.id
      }).then(res => {
        this.managedClub = res;
        this.textarea = res.description;
        reqFileUrl({
          params: {
            fileId: res.avatar
          }
        }).then(res => {
          this.avatarUrl = res;
          this.isimageUrl = true;
        });
        reqJoin({
          method: "get",
          url: "/get-user-by-club",
          params: {
            clubId: res.id
          }
        }).then(res => {
          this.clubusers = res;
        });
      });
    });
  }
};
</script>

<style scoped>
.managed {
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
.head {
  text-align: center;
}
.club-infos {
  margin-left: 25px;
}
.info-item {
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.item-title span {
  color: #48576a;
}
.item-content span {
  color: #898989;
}
.club-container {
  display: flex;
  justify-content: space-between;
}
.club-desc {
  margin-left: 25px;
  width: 500px;
}
.desc-content {
  margin-top: 10px;
}
.savebtn {
  margin-top: 20px;
}
.members-table {
  margin-left: 20px;
  height: 420px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #f00;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>