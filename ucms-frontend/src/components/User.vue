<template>
  <el-container>
    <el-header>
      <h2>This a User Page</h2>
    </el-header>
    <el-main>
      <el-button type="primary" @click="showUser()">ShowUser</el-button>
      {{users}}
    </el-main>
  </el-container>
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