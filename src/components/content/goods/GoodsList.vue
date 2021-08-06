<template>
  <div class="goods">
<!--加一个key可以让这个组件在切换tab的时候，不复用组件（也就是使不同tab下的图片能够不同）-->
    <goods-list-item v-for="item in goods" :goods-item="item" :key="item.image"/>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components:{
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
