<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="imgObj.imgUrl"  id="big"/>
    </div>
    <!-- 蒙版 -->
    <div class="mask" id="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        currentIndex:0
      }
    },
    computed:{
      imgObj(){
        return this.skuImageList[this.currentIndex]||{}
      }
    },
    mounted(){
      //绑定时间知到用户点击了哪一张小图片，全局事件总线
      this.$bus.$on('getIndex',(index) => {
        console.log(index);
        //修改响应式数据
        this.currentIndex = index
      })
    },
    methods:{
      handler(e){     
      //获取蒙板
      // let mask = this.$refs.mask;
      let mask = document.querySelectorAll("#mask")[0]
      // let big = this.$refs.big;
      let big = document.querySelectorAll('#big')[0]

      // console.log(mask);

      // 计算蒙板的left|top数值
      let l = e.offsetX - mask.offsetWidth / 2;
      let t = e.offsetY - mask.offsetHeight / 2;
      //约束蒙板的上下左右范围
      if (l < 0) l = 0;
      if (l > mask.offsetWidth) l = mask.offsetWidth;
      if (t < 0) t = 0;
      if (t > mask.offsetHeight) t = mask.offsetHeight;
      mask.style.left = l + "px";
      mask.style.top = t + "px";
      big.style.left = -2 * l + "px";
      big.style.top = -2 * t + "px";
    },
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>