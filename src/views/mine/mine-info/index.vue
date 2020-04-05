<template>
  <div class="myinfo">
    <div class="title">
      <span>我的信息</span>
    </div>
    <el-divider>UCMS</el-divider>
    <div class="body">
      <div class="user-infos">
        <div class="info-item">
          <span class="info-item-key">我的账号：</span>
          <span class="info-item-value">{{name}}</span>
        </div>
        <div class="info-item">
          <span class="info-item-key">账户类型：</span>
          <span class="info-item-value">{{usertype}}</span>
        </div>
        <div class="info-item">
          <span class="info-item-key">用户昵称：</span>
          <el-input v-model="nickname" class="item-input"></el-input>
        </div>
        <div class="info-item">
          <span class="info-item-key">账户性别：</span>
          <div class="item-sex">
            <el-radio-group v-model="sex">
              <el-radio-button label="1">男</el-radio-button>
              <el-radio-button label="2">女</el-radio-button>
              <el-radio-button label="3">保密</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="info-item">
          <span class="info-item-key">邮箱地址：</span>
          <el-input v-model="email" class="item-input" placeholder="尚未填写"></el-input>
        </div>
        <div class="info-item-btn">
          <el-button type="primary" @click="handleSavebtn">保存修改</el-button>
        </div>
      </div>
      <div class="useravatar">
        <div class="img">
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
        <div>
          <div>
            <span>点击头像可以重新上传，建议的分辨率是200*200px!</span>
          </div>
          <div>
            <span>上传图片成功后请点击保存修改，否则不会生效!</span>
          </div>
          <div>
            <span>信息修改后，重新登录才会生效!</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqFileUrl, reqUser } from "@/network";

export default {
  name: "umineinfo",
  data() {
    return {
      name: this.$store.state.user.name,
      email: this.$store.state.user.email,
      nickname: this.$store.state.user.nickname,
      sex: this.$store.state.user.sex,
      isimageUrl: false,
      upheader: { "Content-Type": "multipart/form-data" },
      avatarUrl: "",
      avatarId: ""
    };
  },
  methods: {
    handleUploadOk(res) {
      this.avatarUrl = res.data.path;
      this.avatarId = res.data.id;
    },
    handleSavebtn() {
      reqUser({
        method: "put",
        data: {
          id: this.$store.state.user.id,
          sex: this.sex,
          nickname: this.nickname,
          email: this.email,
          avatar: this.avatarId
        }
      }).then(res => {
        if (res.id != null) {
          this.$message("保存成功！");
        } else {
          this.$message.error("保存失败！");
        }
      });
    }
  },
  computed: {
    usertype() {
      let typeid = this.$store.state.user.userType;
      let typeName = null;
      switch (typeid) {
        case 1:
          typeName = "注册用户";
          break;
        case 2:
          typeName = "管理用户";
          break;
        case 3:
          typeName = "超级用户";
          break;
      }
      return typeName;
    }
  },
  created: function() {
    let avatarid = this.$store.state.user.avatar;
    reqFileUrl({
      method: "get",
      params: {
        fileId: avatarid
      }
    }).then(res => {
      this.avatarUrl = res;
      this.isimageUrl = true;
    });
  }
};
</script>

<style scoped>
.myinfo {
  width: 780px;
  height: 560px;
}
.title {
  margin-top: 20px;
}
.body {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}
.title span {
  margin-left: 10px;
  font-size: 20px;
}
.user-infos {
  width: 300px;
  margin-left: 50px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 10px;
}
.info-item-key {
  color: #48576a;
  line-height: 40px;
}
.info-item-value {
  color: #898989;
  line-height: 40px;
}
.item-input {
  width: 180px;
}
.item-sex {
  width: 180px;
}
.info-item-btn {
  margin-top: 10px;
  text-align: center;
}
.useravatar img {
  cursor: pointer;
}
.useravatar span {
  color: #898989;
  font-size: 14px;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>