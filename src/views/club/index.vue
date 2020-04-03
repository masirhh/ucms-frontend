<template>
  <div class="clubbody">
    <el-backtop></el-backtop>
    <uheader />
    <div class="activity-content">
      <el-divider></el-divider>
      <div class="activity-head">
        <span>嗨！想找点有趣的社团嘛！</span>
      </div>
      <el-divider></el-divider>
      <div class="searchbar">
        <div class="clubtypes">
          <el-button
            v-for="item in clubtypes"
            :key="item.id"
            @click="handleClubButton(item.id)"
            type="primary"
            round
          >{{item.name}}</el-button>
        </div>
        <el-input
          v-model="clubname"
          class="activity-search"
          placeholder="请输入你要查找的社团"
          @input="remoteMethod"
        ></el-input>
      </div>
      <el-divider></el-divider>
      <div class="club-cards">
        <uclubcard
          v-for="item in clubs"
          :clid="item.id"
          :clmembers="item.members"
          :clname="item.name"
          :cltime="item.createTime"
          :key="item.id"
        />
      </div>
    </div>
    <div class="activity-pager">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="ctotal"
        :page-size="6"
        :current-page.sync="cpage"
        @current-change="handleCurrentchange"
      ></el-pagination>
    </div>
    <ufooter />
  </div>
</template>

<script>
import uheader from "@/components/header";
import { reqClubtype, reqClub } from "@/network";
import uclubcard from "@/components/club-card";
import ufooter from "@/components/footer";

export default {
  name: "uclub",
  components: {
    uheader,
    uclubcard,
    ufooter
  },
  data() {
    return {
      clubtypes: "",
      clubs: "",
      cpage: 1,
      ctotal: null,
      clubname: null,
      currenttype: null
    };
  },
  methods: {
    remoteMethod() {
      let reqparams = {};
      let requrl = "";
      if (this.currenttype == null) {
        requrl = "/search-club";
        reqparams = { pageNum: this.cpage, cname: this.clubname };
      } else {
        reqparams = {
          pageNum: this.cpage,
          cname: this.clubname,
          ctypeid: this.currenttype
        };
        requrl = "/search-club-bytype";
      }

      reqClub({
        url: requrl,
        params: reqparams
      }).then(res => {
        this.clubs = res.list;
        this.ctotal = res.total;
      });
    },
    handleClubButton(typeId) {
      if (this.currenttype === typeId) {
        this.currenttype = null;
      } else {
        this.currenttype = typeId;
      }
      this.remoteMethod();
    },
    handleCurrentchange() {
      this.remoteMethod();
    }
  },
  created: function() {
    reqClubtype().then(res => {
      this.clubtypes = res;
    });
    this.handleCurrentchange();
  }
};
</script>

<style scoped>
.activity-content {
  width: 1414px;
  margin: 0 auto;
}

.searchbar {
  position: relative;
}
.activity-head {
  position: relative;
  text-align: center;
  font-size: 38px;
}
.clubtypes {
  width: 1110px;
  overflow-wrap: normal;
}
.activity-search {
  width: 220px;
  position: absolute;
  right: 10px;
  bottom: 1px;
}
.club-cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 420px;
  overflow: hidden;
}
.activity-pager {
  margin-top: 20px;
  text-align: center;
  margin-bottom: 20px;
}
</style>