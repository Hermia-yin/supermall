<template>
  <div class="cart-bottom-bar">
    <div class="check-total">
      <check-box class="check-box" :is-checked="isSelectAll" @click.native="clickCheckButton"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计：</span>
      <span class="price">{{ totalPrice }}</span>
    </div>
    <div class="buy-key" @click="buyButtonClick">
      <span>去结算</span>
      <span>({{ checkLength }})</span>
    </div>
  </div>
</template>

<script>
import CheckBox from "components/content/checkBox/CheckBox";
import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckBox
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return '¥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    //购物车全选按钮
    //1.显示时的状态
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      return !(this.cartList.find(item => !item.checked))
    }
  },
  methods: {
    //2.点击时的状态
    clickCheckButton() {
      if (this.isSelectAll) {
        this.cartList.forEach(item=>item.checked = false)
      } else {
        this.cartList.forEach(item=>item.checked = true)
      }
    },
    buyButtonClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择要购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  /*position: relative;*/
  /*bottom: -44px;*/
  display: flex;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, .2);
  height: 40px;
  background-color: white;
  font-size: 14px;
}

.check-total {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
}

.check-box {
  margin-right: 8px;
}

.total-price {
  flex: 1;
  text-align: center;
  line-height: 40px;

}

.total-price .price {
  color: red;
}

.buy-key {
  width: 25%;
  background-color: #ff8198;
  text-align: center;
  line-height: 40px;
  color: white;
}

</style>
