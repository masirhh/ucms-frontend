<template>
  <div class="footer-wrap">
    <div class="footer">
      <div class="about">
        <div class="box-text">
          <span>关于</span>
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
          <span>链接</span>
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
  margin-top: 100px;
  height: 200px;
}
.footer {
  width: 980px;
  display: flex;
  margin: 0 auto;
  height: 100%;
  justify-content: center;
  align-items: center;
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
}
.box-item li {
  margin-top: 10px;
  width: 133px;
}
.box-item a:visited {
  text-decoration: none;
  color: inherit;
}
</style>