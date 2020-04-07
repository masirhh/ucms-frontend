<template>
  <div class="hot-card" @click="handleCardClick">
    <div class="card-img">
      <img :src="cardimgurl" class="card-img-size" alt />
    </div>
    <div class="card-content">
      <div class="card-content-title">
        <span>{{hname}}</span>
      </div>
      <div class="card-content-desc">
        <span>{{hdesc}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reqFileUrl } from "@/network";

export default {
  name: "uhotcard",
  props: {
    cid: null,
    cname: null,
    cdesc: null,
    cavatar: null,
    ctype: null
  },
  data() {
    return {
      hid: this.cid,
      hname: this.cname,
      hdesc: this.cdesc,
      havatar: this.cavatar,
      htype: this.ctype,
      cardimgurl: "http://localhost:8008/hotimgs/hotimg1.png"
    };
  },
  methods: {
    handleCardClick() {
      switch (this.htype) {
        case 1: {
          this.$router.push({
            name: "actdetail",
            params: { id: this.hid }
          });
          break;
        }
        case 2: {
          this.$router.push({
            name: "clubdetail",
            params: {
              id: this.hid
            }
          });
          break;
        }
      }
    }
  },
  created: function() {
    reqFileUrl({
      method: "get",
      params: {
        fileId: this.havatar
      }
    }).then(res => {
      this.cardimgurl = res;
    });
  }
};
</script>

<style scoped>
.hot-card {
  width: 206px;
  height: 190px;
  cursor: pointer;
}
.card-img {
  width: 206px;
  height: 116px;
  margin-bottom: 10px;
}
.card-img-size {
  width: 206px;
  height: 116px;
}
.card-content {
  width: 206px;
  height: 64px;
  overflow: hidden;
}
.card-content-title {
  color: #212121;
  font-size: 18px;
}
.card-content-desc {
  font-size: 12px;
  color: #505050;
  transition-property: color;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  transition-delay: 0s;
}
.hot-card:hover .card-content-title,
.hot-card:hover .card-content-desc {
  color: #00a0d8;
}
</style>