<template>
  <div class="main">
    <ubanner />
    <div>
      <div class="content-center">
        <ul class="nav">
          <li>
            <router-link class="link" to="main">
              <span>UCMS</span>
            </router-link>
          </li>
          <li>
            <router-link class="link" to="club">
              <span>社团</span>
            </router-link>
          </li>
          <li>
            <router-link class="link" to="activity">
              <span>活动</span>
            </router-link>
          </li>
          <li>
            <router-link class="link" to="mine">
              <span>我的</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="carousel">
        <el-carousel height="400px">
          <el-carousel-item v-for="item in carpics" :key="item">
            <img :src="item" alt />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import ubanner from "../../components/header";

export default {
  name: "umain",
  components: {
    ubanner
  },
  data() {
    return {
      carpics: [
        "http://localhost:8008/carousel/car1.jpg",
        "http://localhost:8008/carousel/car2.jpg",
        "http://localhost:8008/carousel/car3.jpg",
        "http://localhost:8008/carousel/car4.jpg"
      ]
    };
  },
  computed: {}
};
</script>

<style>
.main {
  margin: 0 auto;
}

.content-center {
  width: 1414px;
  margin: 0 auto;
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
</style>