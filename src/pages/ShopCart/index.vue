<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @click="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllcheck&&cartInfoList.length > 0"
          @click="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn"  target="_blank" @click.prevent='$router.push("/trade")'>结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//引入节流
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  computed: {
    ...mapGetters(["cartList"]),
    //购物车的信息
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //计算购物车总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    //计算底部的复选框是否全选
    isAllcheck() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },

  mounted() {
    this.getData();
  },
  methods: {
    //获取购物车个人数据的请求
    getData() {
      this.$store.dispatch("getCartList");
    },
    //修改某一个产品的个数
    handler: throttle(async function (type, disNum, cart) {
      //对数量进行修改
      switch (type) {
        case "add":
          //带给服务器的变化量
          disNum = 1;
          break;
        case "minus":
          //判断产品的个数要大于1
          if (cart.skuNum > 1) {
            disNum = -1;
          } else {
            disNum = 0;
          }
          break;
        case "change":
          //如果用户输入的字符非法
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }

      try {
        //派发action
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        //成功后再发获取服务器上的新数据
        this.getData();
      } catch (error) {}
    }, 1000),
    //删除购物车的某一个产品的回调
    async deleteCartById(skuId) {
      try {
        //派发action发送删除数据的请求
        await this.$store.dispatch("deleteCartListBySkuId", skuId);
        //成功的话
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改某一个产品的勾选状态
    async updateChecked(cart, event) {
      //判断带给服务器的值
      let isChecked = event.target.checked ? 1 : 0;
      try {
        await this.$store.dispatch("updateCheckedById", {
          skuId: cart.skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除选中的全部产品,没办法收集到参数
    async deleteAllCheckedCart() {
      try {
        //派发一个action
        await this.$store.dispatch("deleteAllCheckedCart");
        //再发请求过去购物车列表信息
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
    //修改全部商品的选中状态
    async updateAllCartChecked(event) {
      try {
        let ischecked = event.target.checked ? "1" : "0";
        //派发action
        await this.$store.dispatch("updateAllCartIsChecked", ischecked);
        this.getData()
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .item-txt {
          text-align: center;
        }
      }

      .cart-list-con4 {
        width: 10%;
      }

      .cart-list-con5 {
        width: 17%;

        .mins {
          border: 1px solid #ddd;
          border-right: 0;
          float: left;
          color: #666;
          width: 6px;
          text-align: center;
          padding: 8px;
        }

        input {
          border: 1px solid #ddd;
          width: 40px;
          height: 33px;
          float: left;
          text-align: center;
          font-size: 14px;
        }

        .plus {
          border: 1px solid #ddd;
          border-left: 0;
          float: left;
          color: #666;
          width: 6px;
          text-align: center;
          padding: 8px;
        }
      }

      .cart-list-con6 {
        width: 10%;

        .sum {
          font-size: 16px;
        }
      }

      .cart-list-con7 {
        width: 13%;

        a {
          color: #666;
        }
      }
    }
  }
}

.cart-tool {
  overflow: hidden;
  border: 1px solid #ddd;

  .select-all {
    padding: 10px;
    overflow: hidden;
    float: left;

    span {
      vertical-align: middle;
    }

    input {
      vertical-align: middle;
    }
  }

  .option {
    padding: 10px;
    overflow: hidden;
    float: left;

    a {
      float: left;
      padding: 0 10px;
      color: #666;
    }
  }

  .money-box {
    float: right;

    .chosed {
      line-height: 26px;
      float: left;
      padding: 0 10px;
    }

    .sumprice {
      width: 200px;
      line-height: 22px;
      float: left;
      padding: 0 10px;

      .summoney {
        color: #c81623;
        font-size: 16px;
      }
    }

    .sumbtn {
      float: right;

      a {
        display: block;
        position: relative;
        width: 96px;
        height: 52px;
        line-height: 52px;
        color: #fff;
        text-align: center;
        font-size: 18px;
        font-family: "Microsoft YaHei";
        background: #e1251b;
        overflow: hidden;
      }
    }
  }
}
</style>