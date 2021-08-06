<template>
  <div class="detail-image" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="image-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="image-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list"
           :src="item"
           :key="index"
           @load="imageLoad"
           alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailImage",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      count: 0,
      imagesLength: 0
    }
  },
  methods: {
    imageLoad() {
      //为了节约性能，当所有图片都加载完成后再使用回调函数发送load事件
      //先加再比较
      if (++this.count === this.imagesLength) {
        this.$emit("imgLoad");
      }
    }
  },
  watch: {
    detailInfo() {
      //为了节约性能，只取一次图片个数信息，通过监听props里detailInfo属性的变化，获取图片个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
}
</script>

<style scoped>
.detail-image {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  position: absolute;
  bottom: 0;
  width: 5px;
  height: 5px;
  content: "";
  background-color: #333333;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  font-size: 14px;
  padding: 15px 0;
}

.image-key {
  font-size: 15px;
  margin: 10px 0 10px 15px;
  color: #333333;
}

.image-list img {
  width: 100%;
}
</style>
