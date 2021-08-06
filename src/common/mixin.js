//mix in 混入，vue高级----作用:避免相同逻辑在不同组件内重复实现
import {debounce} from "./utils";


//1.图片加载完成
export const imgListenerMixin = {
  data() {
    return {
      // 为了函数的复用，将函数抽离 需要使用的变量
      imgListener: null
    }
  },
  mounted() {
    //用防抖函数，解决refresh调用频繁问题
    const newRefresh = debounce(this.$refs.scrollContent.refresh, 100)
    // 为了函数的复用，将函数抽离
    this.imgListener = () => {
      newRefresh()
    }
    //为了解决图片没加载完成但Scroll的可滚动距离就已经确定导致的上拉加载卡顿问题
    //思路:在组件创建完成时就开始，监听每一张图片是否加载完成，只要有一张图片加载完成就调用一次refresh()
    //方法：如何监听图片加载完成？用了VUE的图片加载完成事件（@load）--(原生JS有img.onload=function{}方法)
    this.$bus.$on("goodsItemImgLoad", this.imgListener)
  }
}

//2.回到顶部
import BackTop from "components/content/backTop/BackTop";
export const backTopMiXin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scrollContent.scrollTo(0, 0, 300)
    }
  }
}
