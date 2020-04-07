<template>
  <div class="mainbody">
    <el-backtop></el-backtop>
    <ubanner />
    <div>
      <div class="carousel">
        <el-carousel height="400px">
          <el-carousel-item v-for="item in carpics" :key="item">
            <img :src="item" class="carimgs" alt />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="content-center">
        <div class="content-body">
          <div class="hotactivity">
            <div class="hot-left">
              <div class="hots-head">
                <div class="head-left">
                  <img src="@/assets/shanzi.png" alt />
                  <span>热门活动</span>
                </div>
                <div class="head-right">
                  <el-button plain class="head-right-btn" @click="handleToAct">更多</el-button>
                </div>
              </div>
              <div class="hot-box">
                <!-- 热门活动 -->
                <uhotcard
                  v-for="item in hotacts"
                  :key="item.id"
                  :cid="item.article"
                  :cname="item.name"
                  :cdesc="item.description"
                  :cavatar="item.avatar"
                  :ctype="1"
                ></uhotcard>
              </div>
            </div>
            <div class="hotimgs">
              <el-carousel height="456px">
                <el-carousel-item v-for="item in hotactimgs" :key="item">
                  <img :src="item" alt />
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="hotclub">
            <div class="hot-left">
              <div class="hots-head">
                <div class="head-left">
                  <img src="@/assets/hulu.png" alt />
                  <span>热门社团</span>
                </div>
                <div class="head-right">
                  <el-button plain class="head-right-btn" @click="handleToClu">更多</el-button>
                </div>
              </div>
              <div class="hot-box">
                <!-- 热门社团 -->
                <uhotcard
                  v-for="item in hotclubs"
                  :key="item.id"
                  :cid="item.id"
                  :cname="item.name"
                  :cdesc="item.description"
                  :cavatar="item.avatar"
                  :ctype="2"
                ></uhotcard>
              </div>
            </div>
            <div class="hotimgs">
              <el-carousel height="456px">
                <el-carousel-item v-for="item in hotcluimgs" :key="item">
                  <img :src="item" alt />
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ufooter></ufooter>
  </div>
</template>

<script>
import ubanner from "@/components/header";
import ufooter from "@/components/footer";
import uhotcard from "@/components/hot-card";
import { reqActivities, reqClub } from "@/network";

export default {
  name: "uhome",
  components: {
    ubanner,
    ufooter,
    uhotcard
  },
  data() {
    return {
      //  首页轮播图
      carpics: [
        "http://localhost:8008/carousel/car1.png",
        "http://localhost:8008/carousel/car2.png",
        "http://localhost:8008/carousel/car3.png",
        "http://localhost:8008/carousel/car4.png"
      ],
      // 首页热门活动图片
      hotactimgs: [
        "http://localhost:8008/carousel/car5.png",
        "http://localhost:8008/carousel/car6.png",
        "http://localhost:8008/carousel/car7.png"
      ],
      // 首页热门社团图片
      hotcluimgs: [
        "http://localhost:8008/carousel/car8.png",
        "http://localhost:8008/carousel/car9.png",
        "http://localhost:8008/carousel/car10.png"
      ],
      hotacts: "",
      hotclubs: ""
    };
  },
  methods: {
    handleToAct() {
      this.$router.push("activity");
    },
    handleToClu() {
      this.$router.push("club");
    }
  },
  created: function() {
    reqActivities({
      url: "/homeact",
      params: {
        pageNum: 1
      }
    }).then(res => {
      this.hotacts = res.list;
    });

    reqClub({
      method: "get",
      params: {
        pageNum: 1
      }
    }).then(res => {
      this.hotclubs = res.list;
    });
  },
  computed: {}
};
</script>

<style scoped>
.mainbody {
  margin: 0 auto;
  overflow-x: hidden;
}
.carousel {
  margin: 0 auto;
}
.carimgs {
  width: 100vw;
  height: 400px;
}

.content-center {
  width: 1414px;
  margin: 0 auto;
  margin-bottom: 10px;
}

.nav {
  color: #303133;
  display: flex;
  list-style: none;
  margin: 0;
  justify-content: space-between;
}
.link,
.link:visited {
  color: #303133;
  text-decoration: none;
}
.content-body {
  margin-top: 20px;
}
.hotactivity {
  display: flex;
  justify-content: space-between;
}
.hot-left {
  width: 1070px;
}
.hotclub {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.hots-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1070px;
  height: 36px;
  margin-bottom: 16px;
}
.head-left {
  height: 36px;
  line-height: 36px;
  display: flex;
  align-items: center;
}
.head-left span {
  margin-left: 5px;
  font-size: 20px;
  font-weight: 700;
  height: 36px;
  line-height: 36px;
}
.head-right-btn {
  height: 36px;
}
.hot-box {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  height: 404px;
}
.hotimgs {
  width: 320px;
}
</style>