<template>
  <div class="joined">
    <div class="title">
      <span>我加入的社团</span>
    </div>
    <el-divider>UCMS</el-divider>
    <div class="clubs">
      <joinedclub
        v-for="item in myclubs"
        :key="item.id"
        :uclubid="item.clubId"
        :uclubadmin="item.admin"
      />
    </div>
    <div class="page clubs">
      <el-pagination
        :total="ctotal"
        :page-size="6"
        :current-page.sync="cpage"
        @current-change="handlepagechange"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import joinedclub from "@/components/joinedclub";
import { reqJoin } from "@/network";

export default {
  name: "uminejoined",
  components: {
    joinedclub
  },
  data() {
    return {
      myclubs: null,
      ctotal: null,
      cpage: 1
    };
  },
  methods: {
    handlepagechange() {
      reqJoin({
        method: "get",
        url: "/myclub",
        params: {
          userId: this.$store.state.user.id,
          pageNum: this.cpage
        }
      }).then(res => {
        this.myclubs = res.list;
        this.ctotal = res.total;
      });
    }
  },
  created: function() {
    this.handlepagechange();
  }
};
</script>

<style scoped>
.joined {
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
.clubs {
  width: 600px;
  margin: 0 auto;
}
.page {
  margin-top: 25px;
  text-align: center;
}
</style>