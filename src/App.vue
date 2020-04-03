<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  min-width: 1414px;
}
</style>
