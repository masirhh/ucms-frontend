<template>
  <transition name="el-fade-in-linear">
    <div class="card">
      <div class="card-img">
        <img class="card-img-body" :src="artavatarurl" alt />
      </div>
      <el-divider class="card-divider" direction="vertical"></el-divider>
      <div class="card-content">
        <div class="card-content-head">
          <span class="card-title">{{acname}}</span>
          <el-date-picker
            class="card-time"
            v-model="actime"
            type="date"
            placeholder="Not Found"
            format="yyyy 年 MM 月 dd 日"
            readonly
          ></el-date-picker>
        </div>
        <el-divider></el-divider>
        <div class="card-content-body">
          <p class="card-content-body-p">{{acdesc}}</p>
          <el-button round class="card-content-body-button" @click="handleClick">查看详情</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { reqFileUrl } from "@/network";
export default {
  name: "uactcard",
  props: {
    actname: null,
    acttime: null,
    actdesc: null,
    actartid: null,
    actavatar: null,
    acactid: null
  },
  data() {
    return {
      acname: this.actname,
      actime: this.acttime,
      acdesc: this.actdesc,
      artid: this.actartid,
      actid: this.acactid,
      artavatarid: this.actavatar,
      artavatarurl: ""
    };
  },
  methods: {
    handleClick() {
      this.$router.push({
        name: "actdetail",
        params: {
          id: this.artid,
          actid: this.acactid
        }
      });
    }
  },
  created: function() {
    reqFileUrl({
      method: "get",
      params: {
        fileId: this.artavatarid
      }
    }).then(res => {
      this.artavatarurl = res;
    });
  }
};
</script>

<style scoped>
.card {
  display: flex;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.card-img {
  width: 235px;
  height: 236px;
}

.card-img-body {
  width: 235px;
  height: 236px;
}
.card-divider {
  height: 230px;
  margin-top: 3px;
}
.card-title {
  font-size: 25px;
  font-weight: 700;
}
.card-time {
  color: #606266;
  margin-left: 5px;
  background-color: #f1f1f1;
}
.card-content-head {
  display: flex;
  justify-content: space-between;
  height: 20px;
  line-height: 20px;
}
.card-content {
  width: 1150px;
  margin-top: 15px;
  margin-bottom: 10px;
  position: relative;
}
.card-content-body p {
  overflow: hidden;
  height: 123px;
  margin-bottom: 0;
  color: #909399;
}
.card-content-body-button {
  position: absolute;
  right: 1px;
  bottom: 1px;
}
</style>