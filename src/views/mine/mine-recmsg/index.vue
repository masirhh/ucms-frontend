<template>
  <div class="recmsg">
    <div class="title">
      <span>我收到的用户消息</span>
    </div>
    <el-divider>UCMS</el-divider>

    <div class="message-box">
      <umessage v-for="item in 4" :key="item" :uid=1></umessage>
    </div>
  </div>
</template>

<script>
import umessage from "@/components/message";

export default {
  name: "uminerecmsg",
  components: {
    umessage
  }
};
</script>

<style scoped>
.recmsg {
  width: 780px;
  height: 560px;
}
.title {
  margin-top: 20px;
}
.title span {
  margin-left: 10px;
  font-size: 20px;
}
</style>