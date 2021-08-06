<template>
  <div id="app">
    <!-- 除了详情页退出时不需记住状态-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>
<style>
@import 'assets/css/base.css';

</style>
