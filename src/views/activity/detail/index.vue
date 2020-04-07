<template>
  <div class="actdetail-warpper">
    <uheader />
    <div class="actdetail-content">
      <div class="act-info">
        <div class="info-name">
          <span>{{act.name}}</span>
        </div>
        <div class="info-time">
          <span>
            <i class="el-icon-time"></i>
            {{loctime}}
          </span>
        </div>
        <div class="info-loc">
          <i class="el-icon-location-information"></i>
          {{act.organizeLocation}}
        </div>
      </div>
      <mavon-editor
        v-model="viewerdata"
        :subfield="prop.subfield"
        :defaultOpen="prop.defaultOpen"
        :toolbarsFlag="prop.toolbarsFlag"
        :editable="prop.editable"
        :scrollStyle="prop.scrollStyle"
      ></mavon-editor>
    </div>
    <div class="foot">
      <ufooter />
    </div>
  </div>
</template>

<script>
import uheader from "@/components/header";
import ufooter from "@/components/footer";
import { reqArticle, reqActivities } from "@/network";

export default {
  name: "uactdetail",
  data() {
    return {
      actarid: this.$route.params.id,
      viewerdata: "",
      actid: this.$route.params.actid,
      act: ""
    };
  },
  components: {
    uheader,
    ufooter
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
    },
    loctime() {
      let ct = new Date(this.act.organizeTime);
      let myYear = ct.getFullYear();
      let myMonth = ct.getMonth() + 1;
      let myDate = ct.getDate();
      return myYear + "-" + myMonth + "-" + myDate;
    }
  },
  created: function() {
    reqArticle({
      method: "get",
      url: "/" + this.actarid
    }).then(res => {
      this.viewerdata = res.content;
    });
    reqActivities({
      method: "get",
      url: "/" + this.actid
    }).then(res => {
      this.act = res;
    });
  }
};
</script>

<style scoped>
.actdetail-warpper {
  min-height: 965px;
  height: 100vh;
}

.actdetail-content {
  width: 1414px;
  margin: 0 auto;
}
.info-name span {
  font-size: 30px;
}
.info-time span {
  color: #909399;
}
.info-loc {
  color: #909399;
}
.act-info {
  margin-bottom: 20px;
}
.foot {
  margin-top: 20px;
}
</style>