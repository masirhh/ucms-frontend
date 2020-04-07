<template>
  <div class="club-card">
    <div class="card-img">
      <img :src="avtarurl" alt />
    </div>
    <div class="card-body">
      <div class="span">
        <span>{{cname}}</span>
      </div>
      <el-divider class="card-body-divider"></el-divider>
      <div class="card-info">
        <div class="card-info-body">
          <div>
            <span>社团人数:{{cmembers}}</span>
          </div>
          <div>
            <span>创立时间:{{creatTime}}</span>
          </div>
        </div>
        <el-button class="card-button" @click="handButtonClick">查看详情</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqFileUrl } from "@/network";

export default {
  name: "uclubcard",
  props: {
    clid: null,
    clmembers: null,
    clname: null,
    cltime: null,
    cavtarid: null
  },
  data() {
    return {
      cid: this.clid,
      cmembers: this.clmembers,
      cname: this.clname,
      ctime: this.cltime,
      cavatar: this.cavtarid,
      avtarurl: ""
    };
  },
  methods: {
    handButtonClick() {
      this.$router.push({
        name: "clubdetail",
        params: { id: this.cid }
      });
    }
  },
  computed: {
    creatTime() {
      let ct = new Date(this.ctime);
      let myYear = ct.getFullYear();
      let myMonth = ct.getMonth() + 1;
      let myDate = ct.getDate();
      return myYear + "-" + myMonth + "-" + myDate;
    }
  },
  created: function() {
    reqFileUrl({
      method: "get",
      params: {
        fileId: this.cavatar
      }
    }).then(res => {
      this.avtarurl = res;
    });
  }
};
</script>

<style scoped>
.club-card {
  width: 400px;
  height: 200px;
  margin-top: 10px;
  display: flex;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.club-card img {
  width: 200px;
  height: 200px;
}
.card-body {
  padding: 2px;
  width: 200px;
  position: relative;
}
.span {
  margin-top: 10px;
}
.span span {
  margin-left: 10px;
  font-size: 26px;
  line-height: 26px;
}
.card-body-divider {
  margin-top: 10px;
}
.card-info-body {
  margin-top: 40px;
  color: #606266;
}
.card-button {
  position: absolute;
  bottom: 2px;
  width: 196px;
}
</style>