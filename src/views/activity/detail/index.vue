<template>
  <div>
    <uheader />
    <div class="actdetail-content">
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
import { reqArticle } from "@/network";

export default {
  name: "uactdetail",
  data() {
    return { actid: this.$route.params.id, viewerdata: "" };
  },
  components: {
    uheader
  },
  methods: {},

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
  },
  created: function() {
    reqArticle({
      method: "get",
      url: "/" + this.actid
    }).then(res => {
      this.viewerdata = res.content;
    });
  }
};
</script>

<style scoped>
.actdetail-content {
  width: 1414px;
  margin: 0 auto;
}
</style>