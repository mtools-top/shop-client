<template>
  <div style="margin-bottom: 100px;">
    <template v-if="isUser">
      <template v-if="cartList.length != 0">
        <van-card
          v-for="i in cartList"
          :key="i.id"
          :price="i.price.toFixed(2)"
          desc="描述信息"
          :title="i.goodsname"
          :thumb="$local + i.img"
        >
          <template #footer>
            <van-stepper
              v-model="i.num"
              theme="round"
              button-size="22"
              disable-input
            />
            <van-button type="danger" size="mini" round @click="del(i.id)"
              >删除</van-button
            >
            <!-- @plus="plus(i)"
              @minus="minus(i)" -->
          </template>
        </van-card>
        <van-submit-bar
          :price="totalPrice"
          button-text="提交订单"
          @submit="onSubmit"
          style="margin-bottom: 50px;"
        />
      </template>
      <template v-else>
        <div class="cart-empty">
          <van-empty
            class="custom-image"
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="购物车还未添加商品!"
          />
        </div>
      </template>
    </template>
    <template v-else>
      <div @click="login" class="cart-empty">
        <van-empty
          class="custom-image"
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="点我登陆"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { cartAdd, cartDel, cartList } from "../../utils/request";
export default {
  data() {
    return {
      isUser: false,
      cartList: [],
      uid: ""
    };
  },
  computed: {
    totalPrice() {
      let num = 0;
      for (let i = 0; i < this.cartList.length; i++) {
        num += this.cartList[i].price * this.cartList[i].num;
      }
      return num*100;
    }
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    del(id) {
      cartDel({ id }).then(res => {
        this.getCartList();
      });
    },
    onSubmit() {
      this.$toast.fail("暂无接口");
    },
    // 后台没有减少数量接口,顾抛弃已下代码
    // // 点击增加
    // plus(oldCart) {
    //   let { uid, goodsid } = oldCart;
    //   let num = 1;
    //   this.changeCartNum({uid,goodsid,num})
    // },
    // // 点击减少
    // minus(oldCart) {
    //   let { uid, goodsid } = oldCart;
    //   let num = -1;
    //   this.changeCartNum({uid,goodsid,num})
    // },
    // // 购物车添加事件
    // changeCartNum(obj) {
    //   cartAdd(obj).then(res => {

    //   });
    // },
    getCartList() {
      // 获取购物车列表,肯定登陆后才会走到这一步.
      let uid = this.uid;
      cartList({ uid }).then(res => {
        if (res.data.list == null || res.data.list.length == 0) {
          this.cartList = [];
          return;
        }
        this.cartList = res.data.list;
      });
    },
    ...mapActions({
      acActive: "acActive"
    })
  },
  mounted() {
    this.acActive(2);
    if (sessionStorage.getItem("user")) {
      this.isUser = true;
      this.uid = JSON.parse(sessionStorage.getItem("user")).uid;
      this.getCartList();
    }
  }
};
</script>

<style scoped>
.cart-empty {
  padding-top: 100px;
}
/* 删除按钮 */
.van-button {
  margin-top: 5px;
}
</style>
