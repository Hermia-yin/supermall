<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scrollContent"
            :probe-type="3"
            @scrollPosition="detailScrollPosition"
    >
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop :shop="shop"/>
      <detail-image :detailInfo="detailInfo" @imgLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommend" ref="recommend"/>
    </scroll>
    <!--本来回到顶部是要在backTop组件里进行点击事件的监听的，但是需要进行通信，所以为了方便就
   在使用组件的地方进行 组件事件的监听，与普通标签不同，组件监听需要.native修饰符-->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>

    <detail-bottom-bar class="detail-bottom-bar" @addCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShop from "./childComps/DetailShop";
import DetailImage from "./childComps/DetailImage"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from './childComps/DetailBottomBar'
import {getDetail, GoodsInfo, Shop, GoodsParams, getRecommend} from "network/detail";

import Scroll from '../../components/common/scroll/Scroll'
import GoodsList from "../../components/content/goods/GoodsList";
import {imgListenerMixin, backTopMiXin} from "common/mixin";
import {debounce} from "common/utils";

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    getDetail,
    GoodsInfo,
    DetailBaseInfo,
    Shop,
    DetailShop,
    DetailImage,
    GoodsParams,
    DetailParamInfo,
    Scroll,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [imgListenerMixin, backTopMiXin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      titleTopY: [],
      getTitleTopY: null,
      currentIndex: 0
    }
  },
  created() {
    //1.保存传入的详情页iid
    this.iid = this.$route.params.iid
    //2.通过iid拿到详情页数据
    getDetail(this.iid).then(res => {
      const data = res.result
      console.log(data)
      //1.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages
      //2.获取商品信息
      this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //4.获取商品详情图片
      this.detailInfo = data.detailInfo
      //5.获取商品参数信息
      this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)
      //6.获取评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    //3.获取推荐数据
    getRecommend().then(res => {
      this.recommend = res.data.list
    })
    //4.给titleTopY赋值 (值= 点击detail导航栏各项后，应该向上滚动的y的距离)
    //用防抖函数原因：取值的时机是在图片加载完成之后，所以只需要取一次值
    this.getTitleTopY = debounce(() => {
      // 为了防止取多次值，在每次取值前先初始化数组
      this.titleTopY = []
      this.titleTopY.push(0)
      this.titleTopY.push(this.$refs.param.$el.offsetTop)
      this.titleTopY.push(this.$refs.comment.$el.offsetTop)
      this.titleTopY.push(this.$refs.recommend.$el.offsetTop)
      this.titleTopY.push(Number.MAX_VALUE)
    }, 100)

    //在Vue将数据渲染到界面上后，BScroll再重新计算高度，
    this.$nextTick(() => {
      this.$refs.scrollContent.refresh()
    })
  },
  mounted() {
  },
  //取消全局事件的监听(图片加载完成事件)--
  //由于GoodsListItem这个公共组件会发送@load图片加载完成事件，但是接收该事件的组件有多个，为了只让当前使用的组件接收事件，
  //需要在未使用的组件中取消该事件的监听
  destroyed() {
    this.$bus.$off('goodsItemImgLoad', this.imgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scrollContent.refresh()
      //点击导航栏滚动到相应位置——在图片加载完成后调用取topY函数
      this.getTitleTopY()
    },
    titleClick(index) {
      this.$refs.scrollContent.scrollTo(0, -this.titleTopY[index] + 44, 100)
    },
    //监听详情页滚动事件,并动态设置navBar的index，使nav跳转到对应标签
    detailScrollPosition(position) {
      //1.获取Y的值
      const positionY = -(position.y - 44)
      //2.positionY和主题中的值进行对比

      //[0,7938,9120,9452,Number.MAX_VALUE]
      //positionY 在 0 和 7938 之间，index = 0
      //positionY 在 7938 和 9120 之间，index = 1
      //positionY 在 9120 和 9452 之间，index = 2
      //positionY 在 9452 和 非常大值 之间，index = 3
      let length = this.titleTopY.length
      for (let i = 0; i < length; i++) {
        //条件1：防止赋值过程过于频繁
        //方法1，直接设置判断条件
        // if (this.currentIndex !== i &&
        //   ((i < length - 1 && positionY >= this.titleTopY[i] && positionY < this.titleTopY[i + 1]) ||
        //     (i === length - 1 && positionY >= this.titleTopY[i])
        //   )) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
        //方法2，使用最大值push进数组，就可以使用简单的判断条件
        if (this.currentIndex !== i &&
          (i < length - 1 && positionY >= this.titleTopY[i] && positionY < this.titleTopY[i + 1])
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // //3.是否显示回到顶部
      this.isShowBackTop = -position.y > 1000
    },
    //添加购物车
    addToCart() {
      // console.log('点击了购物车');
      // 1.获取要展示的购物车信息
      const cartProduct = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.realPrice,
        iid: this.iid
      }
      //  2.将商品数据传到购物车页面
      // this.$store.cartList.push(cartProduct)
      // this.$store.commit('addCart',cartProduct)
      //向actions传数据用dispatch,then()是promise，用于添加了购物车之后要做的事情
      // this.$store.dispatch('addCart', cartProduct).then(res => {
      //     console.log(res)
      //   })
      //这是用了mapActions，上面是直接用的vuex；then()是promise，用于添加了购物车之后要做的事情
      this.addCart(cartProduct).then(res => {
        this.$toast.show(res, 2000)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: white;
  /*height: 100vh;*/
}

.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: white;
}

.content {
  height: calc(100vh - 44px);
  overflow: auto;
}
</style>
