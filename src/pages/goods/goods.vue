<template>
  <div class="clearfix">
    <div id="sidebar">
      <van-sidebar v-model="activeKey" @change="change">
        <van-sidebar-item
          v-for="i in cateArr"
          :key="i.id"
          :title="i.catename"
        />
      </van-sidebar>
    </div>
    <div id="second">
      <div class="nav">
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="i in cateChildrenArr"
            :key="i.id"
            @click="secondCate(i.id)"
          >
            <van-image :src="$local + i.img" style="heigth:67px" />
            <i class="nav-des">{{ i.catename }}</i>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="content">
        <template v-if="goodsArr.length != 0">
          <van-card
            v-for="i in goodsArr"
            :key="i.id"
            :price="i.price"
            desc="描述信息"
            :title="i.goodsname"
            :thumb="$local + i.img"
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
        </template>
        <template v-else>
          <van-empty
            class="custom-image"
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="暂无商品,敬请期待"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { cartAdd, getCate, getCateGoods } from "../../utils/request";
export default {
  data() {
    return {
      activeKey: 0,
      cateArr: [],
      cateChildrenArr: [],
      goodsArr: []
    };
  },
  methods: {
    // 点击一级分类获取二级
    change(index) {
      this.cateChildrenArr = this.cateArr[index].children;
      let fid = this.cateChildrenArr[0].id;
      // 初始商品分类列表
      this.getCateArr(fid);
    },
    // 点击二级分类获取列表
    secondCate(fid) {
      // 获取分类列表
      this.getCateArr(fid);
    },
    /**
     * @getCateArr
     * 传入需要查询的fid即可.函数内部已转换为对象
     */
    getCateArr(fid) {
      getCateGoods({ fid }).then(res => {
        let data = res.data.list;
        if (data != null && data.length != 0) {
          this.goodsArr = data;
          this.goodsArr.forEach(i => (i.price = i.price.toFixed(2)));
        } else {
          this.goodsArr = [];
        }
      });
    },
    addGood(goodsid) {
      if (!sessionStorage.getItem('user')) {
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
          this.acBadgeNum()
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
    this.acActive(1);
    // 获取分类树性结构
    getCate().then(res => {
      let data = res.data.list;
      if (data != null && data.length != 0) {
        this.cateArr = data;
        this.cateChildrenArr = data[0].children;
        let fid = this.cateChildrenArr[0].id;
        // 初始商品分类列表
        this.getCateArr(fid);
      }
    });
  }
};
</script>

<style scoped>
#sidebar {
  float: left;
  height: 100vh;
  width: 80px;
  background-color: #f7f8fa;
}
#second {
  float: left;
  height: 100vh;
  width: calc(100% - 80px);
}
#second .nav-des {
  color: #333;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
}
/* 分类无商品时 */
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>
