<template>
  <div class="publishedact">
    <div class="title">
      <span>我发布的活动</span>
    </div>
    <el-divider>UCMS</el-divider>
    <div class="acts-table">
      <div class="btn">
        <el-button @click="handlePublish" type="primary">发布新活动</el-button>
      </div>
      <el-table :data="activities" max-height="420px" border stripe style="width: 100%">
        <el-table-column prop="id" width="50px" label="id"></el-table-column>
        <el-table-column prop="name" width="100px" label="名称"></el-table-column>
        <el-table-column prop="organizeTime" :formatter="timeformatter" width="100px" label="时间"></el-table-column>
        <el-table-column prop="description" label="简介"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160px">
          <template slot-scope="scope">
            <el-button @click="handleToDetail(scope.row)" type="text" size="small">查看详情</el-button>
            <el-button @click="handleDeleteAct(scope.row)" type="text" size="small">删除活动</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { reqActivities, reqClub } from "@/network";

export default {
  name: "upublishedact",
  data() {
    return {
      activities: null
    };
  },
  methods: {
    timeformatter(val) {
      let ct = new Date(val.organizeTime);
      let myYear = ct.getFullYear();
      let myMonth = ct.getMonth() + 1;
      let myDate = ct.getDate();
      return myYear + "-" + myMonth + "-" + myDate;
    },
    handleToDetail(res) {
      let id = res.id;
      this.$router.push({
        path: "/activity/" + id
      });
    },
    handleDeleteAct(res) {
      let acid = res.id;
      reqActivities({
        method: "delete",
        data: {
          id: acid
        }
      }).then(res => {
        if (res === true) this.$message.success("删除成功");
        else this.$message.error("删除失败");
      });
    },
    handlePublish() {
      this.$router.push({
        path: "/publish"
      });
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
      let cid = res.id;
      reqActivities({
        url: "/myactivities",
        params: {
          clubId: cid
        }
      }).then(res => {
        this.activities = res;
      });
    });
  }
};
</script>

<style scoped>
.publishedact {
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
.acts-table {
  margin-left: 20px;
}
.btn {
  margin-bottom: 10px;
}
</style>