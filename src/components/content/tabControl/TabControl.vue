<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in title"
      class="tab-control-item"
      :class="{active:index===currentIndex}"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      //当默认值是一个对象或者数组的时候，default需要是一个函数
      default() {
        return []
      }
    }
  },
  data() {
    return {
      //点击每个tab时传入该tab的index,赋值给currrntIndex，然后比较currentIndex与tab本身的index是否相等来决定tab的样式
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      //子组件通信
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
  background-color: white;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 0 5px 4px;
}

.active span {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}

</style>
