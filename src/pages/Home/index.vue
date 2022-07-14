<template>
  <div>
    <!-- 三级联动组件区域 -->
    <TypeNav></TypeNav>
    <!-- 列表，轮播图区域 -->
    <ListContainer></ListContainer>
    <!-- 每日推荐区域 -->
    <Recommend></Recommend>
    <!-- 商品排行区域 -->
    <Rank></Rank>
    <!-- 猜你喜欢区域 -->
    <Like></Like>
    <!-- 楼层区域 -->
    <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"></Floor> 
    <!-- 商标区域 -->
    <Brand></Brand>
  </div>
</template>

<script>
//引入相关组件
import ListContainer from './ListContainer/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'

//引入处理仓库的组件
import {mapState} from 'vuex'
export default {
    name:'Home',
    //注册相关组件
    components:{
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand,
    },
    mounted(){
      //获取floor组件的信息
      this.$store.dispatch('getFloorList')
      //获取用户的信息
      this.$store.dispatch('getUserInfo')
    },
    computed:{
      ...mapState({
        floorList: state => state.home.floorList
      })
    }
}
</script>

<style>

</style>