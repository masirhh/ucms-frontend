<template>
  <div>{{clubid}}</div>
</template>

<script>
export default {
  name: "uclubdetail",
  data() {
    return {
      clubid: this.$route.params.id
    };
  }
};
</script>

<style>
</style>