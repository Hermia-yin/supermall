<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props: {
    refreshFlag: {
      type: Number,
      //当默认值是一个对象或者数组的时候，default需要是一个函数
      default() {
        return 0
      }
    },
    // 0和1不监听滚动事件,2监听但是不监听手指松开后的滑动距离,3全部监听
    //为什么要通过父组件传递值过来？因为不是每个用BScroll的组件都需要监听滚动事件，所以由父组件来决定滚动事件的监听与否
    probeType: {
      type: Number,
      default() {
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    refreshFlag() {
      this.scroll?.refresh()
    }
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // true:开启div标签的点击事件;  默认是false（这时的button标签可以触发点击事件）
      click: true,
      // 0和1不监听滚动事件,2监听但是不监听手指松开后的滑动距离,3全部监听
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scrollPosition', position)
      })
    }
    //3.监听上拉加载更多事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多')
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    //将this.scroll包装起来，使用的时候更简便
    //time=500是预设变量默认值
    scrollTo(x, y, time = 500) {
      //先确定SCroll是否建立，再让旗下的方法能够使用，否则可能会因为时间差导致报错(this,scroll &&)
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      // console.log('-----')
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
