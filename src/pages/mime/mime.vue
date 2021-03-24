<template>
  <div>
    <div class="bg">
      <van-image
        round
        width="10rem"
        height="10rem"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <i v-if="isUser" class="nickname">{{nickname}}</i>
    </div>
    <template v-if="isUser">
      <div class="more">
        <van-button type="danger" @click="out">安全退出</van-button>
        <van-cell title="我的收藏" is-link />
        <van-cell title="我的评论" is-link />
        <van-cell title="我的订单" is-link />
      </div>
    </template>
    <template v-else>
      <div class="login-register">
        <van-button type="info" @click="login">登陆</van-button>
        <van-button type="primary" @click="register">注册</van-button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isUser: false,
      nickname: ""
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
    out() {
      this.$toast.loading({
        message: "退出中...",
        forbidClick: true
      });
      sessionStorage.removeItem("user");
      this.$router.go(0);
    },
    ...mapActions({
      acActive: "acActive"
    })
  },
  mounted() {
    this.acActive(3);
    // 开始判断是否登陆
    if (sessionStorage.getItem("user")) {
      this.isUser = true;
      this.nickname = JSON.parse(sessionStorage.getItem('user')).nickname
    }
  }
};
</script>

<style scoped>
.bg {
  position: relative;
  margin-bottom: 10px;
  width: 100vw;
  height: 260px;
  background-color: #eee;
}
.bg .nickname{
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
}
.van-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.more,
.login-register {
  padding: 5px;
}
.more .van-button {
  width: 100%;
  margin-bottom: 20px;
}
.login-register .van-button {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}
</style>
