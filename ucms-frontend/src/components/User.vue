<template>
  <div>
    <h2>This a User Page</h2>
  </div>
</template>

<script>
import {reqUser} from "../network";

export default {
  name: "user",
  data() {
    return {
      users: ""
    };
  }
};

reqUser().then(res=>console.log(res.data))
</script>

<style>
</style>