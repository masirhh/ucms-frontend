<template>
  <div class="wrap-banner">
    <div class="banner">
      <img class="center" src="../../assets/ubanner.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "uHeader"
};
</script>

<style>
.wrap-banner{
    position: relative;
    height: 106px;
}
.banner {
  height: 86px;
  background-color: #00a0d8;
}
.center {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
</style>