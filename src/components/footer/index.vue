<template>
  <div class="footer-wrap">
    <div class="footer">
      <div class="about">
        <div class="box-text">
          <span>About</span>
        </div>
        <div>
          <ul class="box-item">
            <li>
              <a href="https://spring.io/projects/spring-boot/" target="_blank">
                <span>SpringBoot</span>
              </a>
            </li>
            <li>
              <a href="https://cn.vuejs.org/" target="_blank">
                <span>Vue.js</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/" target="_blank">
                <span>Github</span>
              </a>
            </li>
            <li>
              <a href="http://nginx.org/" target="_blank">
                <span>Nginx</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <el-divider class="footer-divider" direction="vertical"></el-divider>
      <div class="link">
        <div class="box-text">
          <span>Link</span>
        </div>
        <div>
          <ul class="box-item">
            <li>
              <a href="https://cn.vuejs.org/" target="_blank">
                <span>Vue.js</span>
              </a>
            </li>
            <li>
              <a href="https://vuex.vuejs.org/zh/" target="_blank">
                <span>Vuex</span>
              </a>
            </li>
            <li>
              <a href="https://router.vuejs.org/zh/" target="_blank">
                <span>Vue-router</span>
              </a>
            </li>
            <li>
              <a href="https://element.eleme.cn/#/zh-CN" target="_blank">
                <span>Element Ui</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ufooter"
};
</script>

<style>
.footer-wrap {
  height: 200px;
  width: 100vw;
  min-width: 1414px;
  background-color: #f6f9fa;
}
.footer {
  display: flex;
  margin: 0 auto;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #f6f9fa;
}
.footer-divider {
  height: 100%;
}
.box-text {
  text-align: center;
  font-size: 20px;
  color: #99a2aa;
}
.about,
.link {
  width: 400px;
}
.box-item {
  padding-left: 50px;
  display: flex;
  justify-content: space-between;
  list-style: none;
  flex-wrap: wrap;
}
.box-item a {
  text-decoration: none;
  color: black;
}
.box-item li {
  margin-top: 10px;
  width: 133px;
}
.box-item a:visited {
  text-decoration: none;
  color: black;
}
</style>