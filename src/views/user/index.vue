<template>
  <div>
     <el-button type="primary">Primary</el-button>
  </div>
</template>

<script>
import { reqUser } from "@/network";

export default {
  name: "user",
  data() {
    return {
      users: ""
    };
  },
  components: {

  },
  methods: {
    showUser() {
      reqUser().then(res => (this.users = res));
    }
  }
};
</script>

<style>
.el-main {
  text-align: center;
}
</style>