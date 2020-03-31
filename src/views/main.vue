<template>
  <div class="main">
    <div class="banner">
      <img class="center" src="http://localhost:8008/banner.png" alt />
    </div>
    <div>
      <ul class="nav">
        <li>
          <span>UCMS</span>
        </li>
        <li>
          <span>社团</span>
        </li>
        <li>
          <span>活动</span>
        </li>
        <li>
          <router-link to="/mine">
            <span>登陆</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "umain",
  components: {},
  data() {
    return {};
  },
  computed: {
    
  }
};
</script>

<style>
.main {
  position: relative;
  width: 1414px;
  margin: 0 auto;
}

.center {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}

.banner {
  height: 180px;
}

.nav {
  color: #f00;
  display: flex;
  list-style: none;
  margin: 0;
  justify-content: space-between;
}

a {
  text-decoration: none;
}
a:visited {
  color: inherit;
}
</style>