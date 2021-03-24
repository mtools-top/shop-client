<template>
  <div>
    <template v-if="$route.name == '首页'">
      <van-nav-bar :title="$route.name" />
    </template>
    <template v-else>
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="onClickLeft()"
      />
    </template>

    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/index" icon="home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/goods" icon="shop-o">
        商品
      </van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o" :badge="badgeNum">
        购物车
      </van-tabbar-item>
      <van-tabbar-item to="/mime" icon="user-circle-o">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      // badgeNum: 0
    };
  },
  /**
   * 点击返回,底部导航跟着变换,按照以前的方法会报错
   *  Computed property "active" was assigned to but it has no setter.
   * 译:计算属性'active'已经分配，但是没有setter
   * 参考:
   * https://vuex.vuejs.org/zh/guide/getters.html
   * https://blog.csdn.net/weixin_43348064/article/details/108480966
   */
  computed: {
    active: {
      get() {
        /**
         * 点击返回被调用
         */
        return this.$store.getters.active;
      },
      set(newValue) {
        /**
         * 点击导航跳转和返回被调用
         */
        return newValue;
      }
    },
    ...mapGetters({
      badgeNum:'badgeNum'
    })
  },
  methods: {
    // change() {
    //   console.log(this.active);
    // },
    onClickLeft() {
      this.$router.go(-1);
    },
    ...mapActions({
      acBadgeNum: "acBadgeNum"
    })
  },
  mounted() {
    this.acBadgeNum()
  }
};
</script>

<style></style>
