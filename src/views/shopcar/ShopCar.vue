<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
import {mapGetters} from 'vuex'

export default {
  name: "ShopCar",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //没有使用 mapGetters辅助函数时
      // cartLength(){
      //   // return this.$store.state.cartList.length
      //   // return this.$store.getters.cartLength
      // }
    //使用 mapGetters辅助函数时（两个方法）
    //1.直接用getters里函数名的方法，传[]
      // ...mapGetters(["cartLength"])
    //2.想取别名的方法,传{}
    ...mapGetters({
      length: 'cartLength',
      cartList:'cartList'
    })
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: white;
}
</style>
