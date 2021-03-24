<template>
  <div>
    <div id="login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="user.phone"
          name="phone"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="user.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit"
            >登陆</van-button
          >
        </div>
      </van-form>
    </div>
    <div class="tips">
      <p style="text-align: center;">
        还未注册?<i style="color:#1989fa" @click="$router.push('/register')"
          >注册</i
        >
      </p>
    </div>
  </div>
</template>

<script>
import { login } from "../../utils/request";
export default {
  data() {
    return {
      user: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      login(values).then(res => {
        if (res.data.msg === "登录成功") {
          this.$toast.success(res.data.msg);
          // 登陆成功,将返回数据放入本地
          sessionStorage.setItem('user',JSON.stringify(res.data.list))
          this.cancel();
          this.$router.push('/mime')
          return;
        }
          this.$toast.fail(res.data.msg);
      });
    },
    cancel() {
      this.user = {
        phone: "",
        password: ""
      };
    }
  }
};
</script>

<style scoped>
#login {
  margin: 100px 40px 20px;
  box-shadow: 0 0 20px 0px #1989fa;
  border-radius: 10px;
  overflow: hidden;
}
</style>
