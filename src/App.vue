<template>
  <div>
    <Header/>
    <router-view></router-view>
    <!-- 在首页和搜索页面显示，登录和注册页面不显示 -->
    <Footer v-show='$route.meta.show'/>
  </div>
</template>

<script>
//引入相关组件
import Header from './components/Header/index.vue'
import Footer from './components/Footer'
export default {
  name: "App",
  components:{
    Header,
    Footer,
  },
  mounted(){
    //请求三级联动的数据
    this.$store.dispatch("CategoryList");
  }
};
</script>

<style>
</style>
