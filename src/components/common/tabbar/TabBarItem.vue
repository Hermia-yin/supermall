<template>
  <div class="tab-bar-item" @click="itemClick">
    <div>
      <slot :name="isActive ? 'item-icon-active': 'item-icon'"></slot>
    </div>
<!--现在要用动态绑定class来改变文字样式，但是为了防止插槽被tabBar里的div替换掉而取不到class,需要用div将slot包起来，并在div上取class.-->
<!--上面两个slot为了防止这种现象发生，也做了div的包装-->
    <div :style="{color: isActive ? activeColor : 'inherit'}">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'#ff8198'
    }
  },
  data() {
    return {
      // isActive: false,
    }
  },
  computed:{
    isActive(){
      // /home->item(/home) = true
      // /home->item(/category) = false
      // /home->item(/shopCar) = false
      // /home->item(/profile) = false
      return this.$route.path.indexOf(this.path)!==-1;
      //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。 如果没有找到匹配的字符串则返回-1。
    },
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{}
    }
  },
  methods: {
    //点击每个Tab切换路由，通过itemClick方法实现
    itemClick() {
      //1.想返回上个页面用push，不想返回用replace
      //2.replace里面的路径是动态的，通过props来传递path值，是在mainTabBar里每个TabBar添加path属性得到的
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
