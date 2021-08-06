<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList"
                      :key="index"
                      :item='item'
      />
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartLIstItem";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  //有了新的数据后，scroll的可滚动区域的计算需要刷新，这样才能滚起来
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);

}

.content {
  height: 100%;
  overflow: hidden;
}
</style>
