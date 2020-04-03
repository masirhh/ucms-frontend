<template>
  <div class="wrap-banner">
    <div class="banner">
      <div class="banner-body">
        <img class="center" src="@/assets/ubanner.png" alt />
        <ul class="nav-menu">
          <li>
            <router-link class="link" to="main">
              <i class="el-icon-house el-icon">
                <span>UCMS</span>
              </i>
            </router-link>
          </li>
          <li>
            <router-link class="link" to="club">
              <i class="el-icon-help el-icon">
                <span>社团</span>
              </i>
            </router-link>
          </li>
          <li>
            <router-link class="link" to="activity">
              <i class="el-icon-basketball el-icon">
                <span>活动</span>
              </i>
            </router-link>
          </li>
          <li>
            <router-link class="link" to="mine">
              <i class="el-icon-user el-icon">
                <span>我的</span>
              </i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "uHeader"
};
</script>

<style scoped>
.wrap-banner {
  width: 100vw;
  height: 106px;
}
.banner {
  height: 86px;
  background-color: #00a0d8;
}
.banner-body {
  width: 1414px;
  margin: 0 auto;
  position: relative;
}
.center {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.nav-menu {
  top: 60px;
  right: 0px;
  width: 240px;
  padding: 0;
  margin: 0;
  position: absolute;
  display: flex;
  justify-content: space-between;
  list-style: none;
}
.el-icon {
  color: #ffffff;
}
.nav-menu li span {
  color: #ffffff;
}
</style>