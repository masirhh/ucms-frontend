<template>
  <div class="activitybody">
    <el-backtop></el-backtop>
    <uheader />
    <div class="activity-content">
      <el-divider></el-divider>
      <div class="activity-head">
        <span>嗨！想找点有趣的活动嘛！</span>
        <el-input
          v-model="actname"
          class="activity-search"
          placeholder="请输入你要查找的活动"
          @input="remoteMethod"
        ></el-input>
      </div>
      <el-divider></el-divider>

      <div class="activity-cards">
        <uactcard
          v-for="item in activits"
          :key="item.id"
          :actavatar="item.avatar"
          :actname="item.name"
          :acttime="item.organizeTime"
          :actdesc="item.description"
          :acactid="item.id"
          :actartid="item.article"
        ></uactcard>
      </div>
      <div class="activity-pager">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="ctotal"
          :page-size="5"
          :current-page.sync="cpage"
          @current-change="handleCurrentchange"
        ></el-pagination>
      </div>
    </div>
    <ufooter />
  </div>
</template>

<script>
import uheader from "@/components/header";
import uactcard from "@/components/activity-card";
import ufooter from "@/components/footer";

import { reqActivities } from "@/network";
export default {
  name: "uactivity",
  components: {
    uheader,
    uactcard,
    ufooter
  },
  data() {
    return {
      activits: null,
      cpage: 1,
      ctotal: null,
      actname: ""
    };
  },
  methods: {
    remoteMethod() {
      reqActivities({
        method: "get",
        url: "/searchact",
        params: { pageNum: this.cpage, actName: this.actname }
      }).then(res => {
        this.activits = res.list;
        this.ctotal = res.total;
      });
    },
    handleCurrentchange() {
      this.remoteMethod();
    }
  },
  created: function() {
    this.handleCurrentchange();
  }
};
</script>

<style scoped>
.activitybody{
  overflow-x: hidden;
}
.activity-content {
  width: 1414px;
  margin: 0 auto;
}
.activity-head {
  position: relative;
  text-align: center;
  font-size: 38px;
}
.activity-search {
  width: 220px;
  position: absolute;
  right: 10px;
  bottom: 1px;
}
.activity-pager {
  text-align: center;
  margin-bottom: 20px;
}
</style>>

