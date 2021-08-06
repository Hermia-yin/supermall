<template>
  <!-- 判断goods对象是否为空,为空则不渲染 -->
  <div v-if="Object.keys(goods).length!==0" class="base-info">
    <div class="base-info-title">{{ goods.title }}</div>
    <div class="base-info-price">
      <span class="now-price">{{ goods.newPrice }}</span>
      <span class="old-price">{{ goods.oldPrice }}</span>
      <span class="discount" v-if="goods.discount">{{ goods.discount }}</span>
    </div>
    <div class="base-info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="base-info-service">
      <span class="info-service-item"
            v-for="index in goods.services.length-1"
            v-if="goods.services[index - 1].icon"
            :key="index"
      >
        <img :src="goods.services[index - 1].icon" alt=""/>
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>

<style scoped>
.base-info {
  width: 100%;
  margin-top: 15px;
  padding: 0 10px;
  color: #999999;
  border-bottom: 5px solid #f2f5f8;
}

.base-info-title {
  text-align: justify;
  color: #222222;
}

.base-info-price {
  margin-top: 10px;
}

.base-info-price .now-price {
  font-size: 24px;
  color: #ff5777;
}

.base-info-price .old-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}

.base-info-price .discount {
  font-size: 12px;
  position: relative;
  top: -4px;
  margin-left: 5px;
  padding: 3px 6px;
  color: #ffffff;
  border-radius: 8px;
  background-color: #ff5777;
}

.base-info-other {
  font-size: 13px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.base-info-service {
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}

.info-service-item img {
  position: relative;
  top: 2px;
  width: 14px;
  height: 14px;
}

.info-service-item span {
  font-size: 13px;
  margin-left: 5px;
  color: #333333;
}
</style>
