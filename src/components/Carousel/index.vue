<template>
                <div class="swiper-container" id="floor1Swiper" ref='cur'>
                <div class="swiper-wrapper">
                  <div class="swiper-slide"  v-for="(carousel) in list" :key="carousel.id">
                    <img :src="carousel.imgUrl" />
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
</template>

<script>
//注册swiper插件
import Swiper from 'swiper'
export default {
    name:'Carousel',
    props:['list'],
    watch:{
        list:{
            immediate:true,
                  handler(){
      this.$nextTick(() => {
        //初始化Swiper类的实例
        var mySwiper = new Swiper(this.$refs.cur, {
          //设置轮播图防线
          direction: "horizontal",
          //开启循环模式
          loop: true,
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
            //分页器类型
            type: "bullets",
            //点击分页器，切换轮播
            clickable: true,
          },
          //自动轮播
          autoplay: {
            delay: 1000,
            //新版本的写法：目前是5版本
            // pauseOnMouseEnter: true,
            //如果设置为true，当切换到最后一个slide时停止自动切换
            stopOnLastSlide: true,
            //用户操作swiper之后，是否禁止autoplay
            disableOnInteraction: false,
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          //切换效果
          // effect: "cube",
        });

        //1:swiper插件,对外暴露一个Swiper构造函数
        //2:Swiper构造函数需要传递参数 1、结构总根节点CSS选择器|根节点真实DOM节点  2、轮播图配置项
        //鼠标进入停止轮播
        mySwiper.el.onmouseover = function () {
          mySwiper.autoplay.stop();
        };
        //鼠标离开开始轮播
        mySwiper.el.onmouseout = function () {
          mySwiper.autoplay.start();
        };
      });
      }

        }
    }
}
</script>

<style>

</style>