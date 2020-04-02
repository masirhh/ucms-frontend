<template>
  <div class="error">
    <div class="error-content">
      <img src="~@/assets/logo-white.png" alt />
      <span> Not Found.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "uerror"
};
</script>

<style>
.error {
  height: 100vh;
  background-color: #00A0D8;
}
.error-content{
    line-height: 100vh;
    text-align: center;
}
.error-content span{
    color: #fff;
    font-size: 10vh;
}
</style>