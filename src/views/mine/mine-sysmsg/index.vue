<template>
  <div class="sysmsg">
    <div class="title">
      <span>我收到的系统消息</span>
    </div>
    <el-divider>UCMS</el-divider>

    <div class="message-box">
      <umessage
        v-for="item in messages"
        :key="item.id"
        :umsgid="item.id"
        :ufromid="item.fromUserId"
        :umsg="item.content"
        :uopreated="item.opreated"
        :uchecked="item.checked"
        :ucreatetime="item.createTime"
      ></umessage>
      <div class="page-msg" v-if="messages!=null">
        <el-pagination
          :total="ctotal"
          :page-size="4"
          :current-page.sync="cpage"
          @current-change="handlepagechange"
          background
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import umessage from "@/components/message";
import { reqMessage } from "@/network";

export default {
  name: "uminerecmsg",
  components: {
    umessage
  },
  data() {
    return {
      messages: null,
      id: this.$store.state.user.id,
      cpage: 1,
      ctotal: null
    };
  },
  methods: {
    handlepagechange() {
      reqMessage({
        method: "get",
        url: "/mymessage",
        params: {
          toUserId: this.id,
          fromUserId: 1,
          pageNum: this.cpage
        }
      }).then(res => {
        this.messages = res.list;
        this.ctotal = res.total;
      });
    },
    created: function() {
      this.handlepagechange;
    }
  }
};
</script>

<style scoped>
.sysmsg {
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
.page-msg {
  text-align: center;
  margin-top: 20px;
}
</style>