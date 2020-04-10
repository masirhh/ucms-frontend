<template>
  <div class="publish">
    <uheader />
    <div class="pubbody">
      <div class="act-infos">
        <div class="base-info">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动简介">
              <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="活动地点">
              <el-input v-model="form.loc"></el-input>
            </el-form-item>
            <el-form-item label="活动时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <span class="tishi">编辑好信息后请点击下方的编辑器保存按钮进行发布</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="act-avatar">
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
          <span class="tishi">您必须选择一张图片！</span>
        </div>
      </div>
      <div class="article-info">
        <mavon-editor class="mvedit" ref="md" v-model="mddata" @imgAdd="addimg" @save="savamd"></mavon-editor>
      </div>
    </div>
    <ufooter />
  </div>
</template>

<script>
import {
  reqArticle,
  upAvatar,
  reqLoginUser,
  reqClub,
  reqActivities
} from "@/network";
import uheader from "@/components/header";
import ufooter from "@/components/footer";

export default {
  name: "upublishiact",
  components: {
    uheader,
    ufooter
  },
  data() {
    return {
      mddata: "",
      clubid: "",
      form: {
        name: "",
        desc: "",
        date: "",
        loc: ""
      },
      isimageUrl: false,
      avatarUrl: "",
      acticleid: ""
    };
  },
  methods: {
    handleUploadOk(res) {
      this.avatarUrl = res.data.path;
      this.avatarId = res.data.id;
      this.isimageUrl = true;
    },
    addimg(pos, file) {
      let formdata = new FormData();
      formdata.append("avatar", file);
      upAvatar({
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.$refs.md.$img2Url(pos, res.path);
      });
    },
    savamd(origin) {
      reqArticle({
        method: "post",
        data: {
          content: origin,
          userId: this.$store.state.user.id,
          clubId: this.clubid
        }
      }).then(res => {
        let aid = res.id;
        reqActivities({
          method: "post",
          data: {
            name: this.form.name,
            description: this.form.desc,
            organizeTime: this.form.date,
            organizeLocation: this.form.loc,
            userId: this.$store.state.user.id,
            clubId: this.clubid,
            article: aid,
            avatar: this.avatarId
          }
        }).then(res => {
          if (res === true) {
            this.$router.push({
              path: "/activity"
            });
          } else {
            this.$message.error("发布失败");
          }
        });
      });
    }
  },
  created: function() {
    let local = window.localStorage;
    let lid = local.getItem("id");
    if (lid === null) {
      this.$router.push({
        path: "/login"
      });
    } else {
      reqLoginUser({
        params: {
          key: lid
        }
      }).then(res => {
        if (res === null) {
          this.$router.push({
            path: "/login"
          });
        } else {
          res = JSON.parse(res);
          this.$store.commit("setUser", res);
        }
      });

      reqClub({
        url: "/get-club-by-admin",
        method: "get",
        params: {
          id: this.$store.state.user.id
        }
      }).then(res => {
        this.clubid = res.id;
      });
    }
  }
};
</script>

<style scoped>
.publish {
  overflow: hidden;
}
.pubbody {
  width: 1414px;
  margin: 0 auto;
  height: 100vh;
}
.act-infos {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  margin-top: 10px;
  padding: 10px 20px;
}
.base-info {
  width: 650px;
  margin-top: 20px;
}
.tishi {
  margin-left: 10px;
  color: #909399;
}
.act-avatar {
  width: 235px;
  height: 236px;
  border: 1px dashed #409eff;
  margin-top: 20px;
  margin-right: 200px;
}
.mvedit {
  height: 500px;
}

.avatar-uploader .el-upload {
  border: 1px solid #f00;
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
  width: 235px;
  height: 236px;
  line-height: 236px;
  text-align: center;
}
.avatar {
  width: 235px;
  height: 236px;
  display: block;
}
</style>