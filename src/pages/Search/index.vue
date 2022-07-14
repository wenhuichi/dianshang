<template>
  <div>
    <typeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTademark">x</i>
            </li>
            <!-- 售卖属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrvalue, index) in searchParams.props"
              :key="index"
            >
              {{ attrvalue.split(":")[1] }}<i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的地方 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a
                    >综合<span v-show="isOne">
                      <span v-show="isasc"> ↑</span>
                      <span v-show="isdasc"> ↓</span>
                    </span></a
                  >
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <a
                    >价格<span v-show="isTwo">
                      <span v-show="isasc"> ↑</span>

                      <span v-show="isdasc"> ↓</span>
                    </span></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器区域 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",

  components: {
    SearchSelector,
  },

  data() {
    return {
      searchParams: {
        //一二三级分类的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //分类名称
        categoryName: "",
        //用户输入的关键字
        keyword: "",
        //排序，升序和降序
        order: "1:desc",
        //分页器，显示第几页，默认是一
        pageNo: 1,
        //控制每一页显示多少条数据
        pageSize: 10,
        //平台售卖数据
        props: [],
        //品牌
        trademark: "",
      },
    };
  },

  computed: {
    // ...mapState({
    //   goodsList:state => state.searchList.goodsList
    // })
    //getters是不区分小仓库的,mapgetters传递的是一个数组
    ...mapGetters(["goodsList"]),
    //获取展示商品一共多少条数据
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
    //判断排序方式
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isasc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isdasc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  //挂载完毕只执行一次
  mounted() {
    this.getData();
  },
  beforeMount() {
    //这时候用来修改带给数据库的参数searchParams
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  methods: {
    //向服务器发请求获取search模块数据（根据参数不同返回不同的值）
    getData() {
      console.log(this.searchParams);
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //删除分类的名字的面包屑
    removeCategoryName() {
      //置空分类名称和id
      //变为undefine，不会将这个字段发送到服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //自己跳转自己进行路由信息的改变
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //删除关键字的面包屑
    removeKeyword() {
      //置空关键字
      this.searchParams.keyword = undefined;
      //再次发请求
      this.getData();
      //通知兄弟组件清除关键字
      this.$bus.$emit("clear");
      if (this.$route.query) {
        console.log(this.$route.query);
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //删除品牌的面包屑
    removeTademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //删除属性的面包屑
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      //再发请求
      this.getData();
    },
    //自定义品牌点击事件的回调
    tradeMarkInfo(trademark) {
      //整理要传递的参数
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //再次发请求进行展示
      this.getData();
    },
    //自定义属性点击事件的回调
    attrInfo(attr, attrValue) {
      console.log(attr, attrValue);
      //整理参数
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重
      if (this.searchParams.props.indexOf(prop) == -1) {
        this.searchParams.props.push(prop);
      }
      //再次发请求
      this.getData();
    },
    //自定义分页器获取当前点击页数的回调函数
    getPageNo(pageNo) {
      //重新编写传递的参数
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
    //排序点击事件
    changeOrder(flag) {
      //flag判断点击的是哪个综合和排序
      let originOrder = this.searchParams.order;
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];

      //点击的是已经被选中的
      if (flag == originFlag) {
        //整理需要发送的参数
        this.searchParams.order = `${flag}:${
          originSort == "desc" ? "asc" : "desc"
        }`;
        console.log(this.searchParams.order);
        //重新发送请求
        this.getData();
      } else {
        //整理需要发送的参数
        this.searchParams.order = `${flag}:${originSort}`;
        //重新发送请求
        this.getData();
      }
    },
  },
  watch: {
    //监测路由信息是否发生变化，如果发生变化，再次请求
    $route(newValue, oldValue) {
      //重新整理需要传递的参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
      //重新置空三级分类
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  text-align: center;
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
