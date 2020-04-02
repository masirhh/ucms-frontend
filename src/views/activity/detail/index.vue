<template>
  <div>
    <uheader />
    <div class="actdetail-content">
      <mavon-editor ref="md" v-model="mddata" @imgAdd="addimg" @save="savamd"></mavon-editor>
      <mavon-editor
        v-model="viewerdata"
        :subfield="prop.subfield"
        :defaultOpen="prop.defaultOpen"
        :toolbarsFlag="prop.toolbarsFlag"
        :editable="prop.editable"
        :scrollStyle="prop.scrollStyle"
      ></mavon-editor>
    </div>
  </div>
</template>

<script>
import uheader from "@/components/header";
import { upAvatar, reqArticle } from "@/network";

export default {
  name: "uactdetail",
  data() {
    return { actid: this.$route.params.id, mddata: "", viewerdata: "" };
  },
  components: {
    uheader
  },
  methods: {
    addimg(pos, file) {
      let formdata = new FormData();
      formdata.append("avatar", file);
      upAvatar({
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.$refs.md.$img2Url(pos, res);
      });
    },
    savamd(origin) {
      reqArticle({
        method: "post",
        data: {
          content: origin
        }
      }).then(res => {
        this.viewerdata = res.content;
        console.log(this.viewerdata);
      });
    }
  },
  computed: {
    prop() {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      };
      return data;
    }
  }
};
</script>

<style scoped>
.actdetail-content {
  width: 1414px;
  margin: 0 auto;
}
</style>