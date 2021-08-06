<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <check-box :is-checked="item.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="item.image" alt="商品图片"/>
    </div>
    <div class="item-info">
      <div class="item-title">{{ item.title }}</div>
      <div class="item-desc">商品描述: {{ item.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ item.price }}</div>
        <div class="item-count right">x{{ item.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from "components/content/checkBox/CheckBox";

export default {
  name: "CartListItem",
  components: {
    CheckBox
  },
  props: {
    item: {
      type: Object,
      default: {

      }
    }
  },
  methods: {
    checkClick() {
      this.item.checked = !this.item.checked
    }
  }

}
</script>

<style scoped>
.cart-list-item {
  font-size: 0;
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #cccccc;
}

/*.cart-list-item :last-child {*/
/*  border-bottom: 0;*/
/*}*/

.item-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
}

.item-img img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
  /*object-fit: cover;*/
}

.item-info {
  font-size: 15px;
  color: #333333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
  width: 88%;
}

.item-info .item-desc {
  font-size: 12px;
  margin-top: 15px;
  color: #666666;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: #ff4500;
}
</style>
