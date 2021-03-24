<template>
  <div>
    <div id="login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="user.phone"
          name="phone"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="user.nickname"
          name="nickname"
          label="昵称"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
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
          <van-button round block type="primary" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
    <div class="tips">
      <p style="text-align: center;">
        已有账号?<i style="color:#1989fa" @click="$router.push('/login')"
          >登陆</i
        >
      </p>
    </div>
  </div>
</template>

<script>
import { register } from "../../utils/request";
export default {
  data() {
    return {
      user: {
        phone: "",
        nickname: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit(values) {
      // console.log("submit", values);
      register(values).then(res => {
        if (res.data.msg === "注册成功") {
          this.$toast.success(res.data.msg);
          this.$router.push("/login");
          return
        }
          this.$toast.fail(res.data.msg);
      });
    },
    cancel() {
      this.user = {
        phone: "",
        nickname: "",
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
