<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :title="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl2"
                 v-show="isTabfixed"
    />
    <!--ref='scrollContent'是为了$refs.scrollContent 取到DOM对象-->
    <scroll class="content"
            :refresh-flag="scrollReFlushFlag"
            ref="scrollContent"
            :probe-type="3"
            @scrollPosition="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore"
    >
      <template>
        <home-swiper :banners="banners" @homeSwiperImgLoad="swiperImgLoad"/>
        <home-recommend-view :recommends="recommends"/>
        <home-feature/>
        <tab-control :title="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl1"
                     :class="{fixed:isTabfixed}"
        />
        <goods-list :goods="showGoods"/>
      </template>
    </scroll>
    <!--本来回到顶部是要在backTop组件里进行点击事件的监听的，但是需要进行通信，所以为了方便就
    在使用组件的地方进行 组件事件的监听，与普通标签不同，组件监听需要.native修饰符-->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
    <!--ul>li{列表$}*100-->
  </div>
</template>

<script>
//公共组件的导入
import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
//业务组件的导入
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import HomeFeature from "./childComps/HomeFeature";
//引入封装的网络请求数据
import {getHomeMultidata, getHomeGoods} from "../../network/home";
// //引入防抖函数，解决refresh调用频繁问题
// import {debounce} from "../../common/utils";
//引入mixin 解决不同组件重复内容问题
import {imgListenerMixin, backTopMiXin} from 'common/mixin'

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommendView,
    HomeFeature,
    GoodsList,
    Scroll,
  },
  mixins: [imgListenerMixin, backTopMiXin],
  data() {
    return {
      //轮播图数据
      banners: [],
      //推荐数据
      recommends: [],
      //商品数据
      goods: {          //设计的数据模型
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      scrollReFlushFlag: Date.now(),
      isShowBackTop: false,
      // 当前tabControl的位置
      tabOffsetTop: 0,
      isTabfixed: false,
      saveY: 0
    }
  },
  created() {
    //组件创建完成就发送网络请求
    //1.请求多个数据
    //2.created这里仅通过函数调用来展示逻辑，具体请求函数在methods里
    //3.加了this-->this.getHomeMultidata，才是调用methods里的网络请求函数，不加就是在调用/network/home.js/里的方法了
    Promise.all([
      this.getHomeMultidata(),
      this.getHomeGoods('pop'),
      this.getHomeGoods('new'),
      this.getHomeGoods('sell')
    ]).then(() => {
      this.scrollReFlushFlag = Date.now()
    })
  },
  mounted() {
    //以下函数被整合到mixin里了
    // //用防抖函数，解决refresh调用频繁问题
    // const refresh = debounce(this.$refs.scrollContent.refresh)
    // //为了解决图片没加载完成但Scroll的可滚动距离就已经确定导致的上拉加载卡顿问题
    // //思路:在组件创建完成时就开始，监听每一张图片是否加载完成，只要有一张图片加载完成就调用一次refresh()
    // //方法：如何监听图片加载完成？用了VUE的图片加载完成事件（@load）--(原生JS有img.onload=function{}方法)
    // this.$bus.$on('goodsItemImgLoad', () => {
    //   refresh()
    // })
  },
  //当mainTabBar切换时，就会销毁当前tab的组件，但是在 APP.vue文件里将 router-view 用keep-alive包装起来就不会销毁了
  // destroyed() {
  //   console.log('home destroyed')
  // },

  //activated和deactivated 在这里用来确保 home在切换出去时记住当前滚动的位置，当切换回来时能回到该位置
  //另外需要 home组件在切出去时候不要销毁，，在 APP.vue文件里将 router-view 用keep-alive包装起来就不会销毁了
  activated() {
    this.$refs.scrollContent.scrollTo(0, this.saveY, 0)
    this.$refs.scrollContent.refresh()
  },
  deactivated() {
    //1.离开当前路径时保存Y值
    this.saveY = this.$refs.scrollContent.getScrollY()
    //2.取消全局事件的监听(图片加载完成事件)--
    //由于GoodsListItem这个公共组件会发送@load图片加载完成事件，但是接收该事件的组件有多个，为了只让当前使用的组件接收事件，
    //需要在未使用的组件中取消该事件的监听
    this.$bus.$off('goodsItemImgLoad', this.imgListener)
  },
  computed: {
    //直接展示在组件处，会太长，转化成计算属性再展示会简洁
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听相关
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //返回顶部
    backTopClick() {
      this.$refs.scrollContent.scrollTo(0, 0, 500)
    },
    //根据传来的BScroll移动的位置
    contentScroll(position) {
      // console.log(position)   测试能否拿到position数据
      //1.来展示backTop
      this.isShowBackTop = (-position.y) > 1000
      //2.决定tabControl是否吸顶
      this.isTabfixed = (-position.y) > this.tabOffsetTop
    },
    //上拉加载更多。根据传来的上拉事件是否触发
    loadMore() {
      //测试能否拿到pullingUp事件// console.log('上拉加载更多')
      this.getHomeGoods(this.currentType)
      //由于Bscroll计算可滚动区域的时机与上拉加载的时机不对，所以需要在每次上拉加载更多之后重新计算可滚动区域
      this.$refs.scrollContent.refresh()
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop - 44
    },
    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      return getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      return getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //完成上拉加载更多。只有完成上拉加载更多之后才能继续 下一次 的上拉加载更多事件
        this.$refs.scrollContent.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  /*!*为了在使用原生滚动时候，顶部导航栏能一直保持在顶部而不滑动*!*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  z-index: 9;
}

#home {
  /*margin-top: 44px;*/
  /*height: 100vh;*/
  /*position: relative;*/
}

/*.tab-control {*/
/*  !*吸顶效果*!*/
/*  !*到达该组件之前是static,之后是fixed*!*/
/*  !*移动端支持，其他部分浏览器支持*!*/
/*  position: sticky;*/
/*  top: 0;*/
/*  z-index: 9;*/
/*}*/
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}

.content {
  /*height: 300px;*/

  height: calc(100vh - 93px);
  overflow: hidden;
}
</style>
