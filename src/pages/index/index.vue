<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="#ee0a24">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <van-tabs v-model="activeName">
      <van-tab title="热门推荐" name="hot">
        <van-card
          v-for="i in hotGoods"
          :key="i.id"
          :price="i.price"
          :title="i.goodsname"
          :thumb="$local + i.img"
          desc="商品描述"
          tag="Hot"
        >
          <template #footer>
            <van-button
              type="primary"
              size="small"
              icon="cart-o"
              @click="addGood(i.id)"
            ></van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="发现新品" name="new">
        <van-card
          v-for="i in newGoods"
          :key="i.id"
          :price="i.price"
          :title="i.goodsname"
          :thumb="$local + i.img"
          desc="商品描述"
          tag="New"
        >
          <template #footer>
            <van-button
              type="primary"
              size="small"
              icon="cart-o"
              @click="addGood(i.id)"
            ></van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="所有商品" name="all">
        <van-card
          v-for="i in allGoods"
          :key="i.id"
          :price="i.price"
          :title="i.goodsname"
          :thumb="$local + i.img"
          desc="商品描述"
        >
          <template #footer>
            <van-button
              type="primary"
              size="small"
              icon="cart-o"
              @click="addGood(i.id)"
            ></van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
// 懒加载不导入没法用????
import { Lazyload } from "vant";
Vue.use(Lazyload);
import { cartAdd, getBanner, getGoods } from "../../utils/request";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      images: [],
      activeName: "hot",
      hotGoods: [],
      newGoods: [],
      allGoods: [],
      // 是否登陆
      isUser: false
    };
  },
  methods: {
    addGood(goodsid) {
      if (!this.isUser) {
        this.$toast.fail("请登录后再操作");
        return;
      }
      // console.log(goodsid);
      // 获取用户uid
      let uid = JSON.parse(sessionStorage.getItem("user")).uid;
      // 目前默认添加数量为1,未实现库存管理.
      let num = 1;
      cartAdd({ goodsid, uid, num }).then(res => {
        if (res.data.msg === "添加成功") {
          this.$toast.success(res.data.msg);
          // 更新购物车
          this.acBadgeNum();
          return;
        }
        this.$toast.fail(res.data.msg);
      });
    },
    ...mapActions({
      acActive: "acActive",
      acBadgeNum: "acBadgeNum"
    })
  },
  mounted() {
    this.acActive(0);
    // 获取banner列表,如果为空展示默认图片
    getBanner().then(res => {
      res.data.list
        ? res.data.list.map(i => this.images.push(this.$local + i.img))
        : this.images.push(
            "https://tse1-mm.cn.bing.net/th/id/OIP.oNldXqP7l_WMLAHbp9UjmQHaDf?w=301&h=164&c=7&o=5&pid=1.7"
          );
    });
    getGoods().then(res => {
      for (let i = 0; i < res.data.list.length; i++) {
        res.data.list[i].content.forEach(i => (i.price = i.price.toFixed(2)));
      }
      this.hotGoods = res.data.list[0].content;
      this.newGoods = res.data.list[1].content;
      this.allGoods = res.data.list[2].content;
    });
    // 判断是否登陆
    if (sessionStorage.getItem("user")) {
      this.isUser = true;
    }
  }
};
</script>

<style scoped>
.van-swipe {
  height: 250px;
  margin-bottom: 10px;
}
.van-swipe img {
  height: 100%;
  width: 100%;
}
.van-tabs {
  margin-bottom: 50px;
}
</style>
