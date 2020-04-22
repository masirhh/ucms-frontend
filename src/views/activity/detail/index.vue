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
      <div class="comment">
        <div class="comment-head">
          <div class="head-pic"></div>
          <span class="head-word">评论({{commentsnum}})</span>
        </div>
        <el-divider></el-divider>
        <div class="mycomment">
          <el-input
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="诶！好像还有点儿意思，说点儿什么？"
            v-model="commentText"
          ></el-input>
          <el-button type="primary" class="sendBtn" @click="handSendBtn">点击发送</el-button>
        </div>
        <el-divider></el-divider>
        <div class="comment-list" v-if="isComment">
          <ucomment
            v-for="item in comments"
            :key="item.id"
            :comtime="item.createTime"
            :comuserid="item.userId"
            :comcontent="item.content"
          ></ucomment>
          <div class="activity-pager">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="ctotal"
              :page-size="10"
              :current-page.sync="cpage"
              @current-change="handleCurrentchange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <ufooter />
  </div>
</template>

<script>
import uheader from "@/components/header";
import ufooter from "@/components/footer";
import ucomment from "@/components/comment";
import { reqArticle, reqActivities, reqComment, reqLoginUser } from "@/network";

export default {
  name: "uactdetail",
  data() {
    return {
      actarid: this.$route.params.id,
      viewerdata: "",
      actid: this.$route.params.actid,
      act: "",
      islogin: false,
      isComment: false,
      comments: null,
      commentsnum: 0,
      ctotal: null,
      cpage: 1,
      commentText: ""
    };
  },
  components: {
    uheader,
    ufooter,
    ucomment
  },
  methods: {
    handleCurrentchange() {
      reqComment({
        method: "get",
        url: "/articleid",
        params: {
          articleId: this.actarid,
          pageNum: this.cpage
        }
      }).then(res => {
        if (res.total != 0) {
          this.ctotal = res.total;
          this.comments = res.list;
          this.commentsnum = res.total;
          this.isComment = true;
        }
      });
    },
    handSendBtn() {
      let locId = window.localStorage.getItem("id");
      if (locId == null) {
        this.$message.error("你尚未登陆!");
      } else {
        reqLoginUser({
          params: {
            key: locId
          }
        }).then(res => {
          if (res != null) {
            res = JSON.parse(res);
            let uid = res.id;
            reqComment({
              method: "post",
              data: {
                content: this.commentText,
                userId: uid,
                articleId: this.actarid
              }
            }).then(res => {
              if (res != null) {
                this.$message.success("发表成功!");
                this.handleCurrentchange();
                this.$forceUpdate();
              } else {
                this.$message.error("发表失败!");
              }
            });
          } else {
            this.$message.error("你尚未登陆!");
          }
        });
      }
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
    this.handleCurrentchange();
  }
};
</script>

<style scoped>
.actdetail-warpper {
  min-height: 965px;
  overflow-x: hidden;
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
.comment {
  margin-top: 20px;
  margin-bottom: 10px;
}
.mycomment {
  display: flex;
}
.sendBtn {
  margin-left: 10px;
}
.comment-head {
  height: 21px;
}
.head-pic {
  display: inline-block;
  height: 21px;
  width: 10px;
  background-color: #3cb371;
  vertical-align: middle;
}
.head-word {
  margin-left: 5px;
  line-height: 21px;
}
.activity-pager {
  text-align: center;
  margin-bottom: 20px;
}
.foot {
  margin-top: 20px;
}
</style>