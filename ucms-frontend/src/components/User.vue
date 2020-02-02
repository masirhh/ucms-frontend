<template>
  <div>
    <h2>This a User Page</h2>
    <el-button type="primary" @click="showUser()">查看用户</el-button>
    {{users}}
  </div>
</template>

<script>
import { reqUser } from "../network";

export default {
  name: "user",
  data() {
    return {
      users: ""
    };
  },
  methods: {
    showUser() {
      reqUser().then(res => (this.users = res.data.data));
    }
  }
};
</script>

<style>
</style>