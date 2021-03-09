<template>
  <div id="app">
    <el-page-header title="返回" content="测试"></el-page-header>

    <div>
      <h3>
        用户信息：
        <el-button @click="requestUser">request user</el-button>
      </h3>
      <pre class="content">{{userInfo}}</pre>
      <pre class="content">{{userInfo.other}}</pre>
      <pre class="content">{{userInfo|get('memberInfo.mobile')}}</pre>
      <pre class="content">{{userInfo.memberInfo}}</pre>
    </div>

    <div>
      <h3>
        店铺信息：
        <el-button @click="requestShop">request shop</el-button>
      </h3>
      <pre class="content">{{shopInfo}}</pre>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { get } from '@mudas/util';
import * as Types from '@/store/types';

export default {
  name: 'app',
  mixins: [],

  data() {
    return {
      value: ''
    };
  },

  filters: {
    get(input, path) {
      console.warn(input, path, input[path], get(input, path));
      return get(input, path);
    }
  },

  computed: {
    ...mapGetters({
      userInfo: Types.USER_INFO,
      shopInfo: Types.SWEEP_SHOP_INFO
    })
  },

  methods: {
    requestUser() {
      this.$store.dispatch(Types.USER_INFO, { authMode: 1, buyerId: '2088002288842095' })
          .catch(reason => this.$message({ type: 'error', message: reason.message }));
    },

    requestShop() {
      this.$store.dispatch(Types.SWEEP_SHOP_INFO, { storeId: 655079, buyerId: '2088002288842095' })
          .catch(reason => this.$alert(reason.message));
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 50px;
}

.content {
  min-height: 200px;
  max-height: 300px;
  border: 1px dotted lightseagreen;
  border-radius: 8px;
  overflow-y: auto;
}
</style>
