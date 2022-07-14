<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <transition name='sort'>
          <div class="sort" v-show="show">
            <!-- 将一二三即级分类的点击事件委派给它的父元素
          通过给a标签添加自定义属性来确定点击的是a标签 -->
            <div class="all-sort-list2" @click="gosearch">
              <div
                class="item bo"
                v-for="(c1, index) in CategoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryname="c1.categoryName"
                    :data-categoryid1="c1.categoryId"
                  >
                    {{ c1.categoryName }}
                  </a>
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryname="c2.categoryName"
                          :data-categoryid2="c2.categoryId"
                        >
                          {{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryname="c3.categoryName"
                            :data-categoryid3="c3.categoryId"
                          >
                            {{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//引入那三种vuex提供的map组件
import { mapState } from "vuex";
//引入lodash组件来解决防抖与节流 _throttle用来节流 _debounce用来防抖
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  //挂载上就要去服务器要数据
  data() {
    return {
      //用于判断一级分类是否高亮
      currentIndex: -1,
      //用来判断一级分类是否展开
      show: true,
    };
  },
  mounted() {
    //如果是search组件将三级联动隐藏
    if (this.$route.path != "/home") 
        this.show = false;
  },
  computed: {
    ...mapState({
      CategoryList: (state) => state.home.CategoryList,
    }),
  },
  methods: {
    //一级分类鼠标移动事件函数
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }),
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    //三级联动区域的点击跳转事件
    //利用event属性获得触发点击事件的元素的信息
    gosearch(event) {
      // console.log(event.target.dataset);
      //拿到触发点击事件的元素的自定义属性
      let element = event.target.dataset;
      //判断是a标签触发的点击事件
      if (element.categoryname) {
        //整理路由跳转要传递的参数
        let location = { name: "search" };
        let query = { categoryName: element.categoryname };
        //判断是几级，并给query追加上其id
        if (element.categoryid1) {
          query.category1Id = element.categoryid1;
        }
        if (element.categoryid2) query.category2Id = element.categoryid2;
        if (element.categoryid3) query.category3Id = element.categoryid3;
        //将参数合并
        location.query = query;
        //进行路由跳转,如果搜索栏有params参数也要带过去
        if(this.$route.params.keywords)
        location.params = this.$route.params
        //发送请求
        this.$router.push(location);
      }
    },
    entershow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
  },
};
</script>



<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            // background: pink;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            height: 450px;
            overflow: hidden; //有人改数据时候防止页面变形

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }

    //过渡动画
    // .sort-enter{
    //   height: 0;
    // }

    // .sort-enter-to{
    //   height: 100%;
    // }

    // .sort-enter-active{
    //   transition:all 0.3s linear
    // }
  }
}
</style>