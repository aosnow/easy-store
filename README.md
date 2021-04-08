# @mudas/store

> Use vuex in a more concise and convenient way

**Documents：** [view the document](https://aosnow.github.io/easy-store/)

### Usage

``` bash
npm install -S @mudas/store
```

## Build Option
By default, babel-loader does not translate all files in node_modules, so specifying node_modules separately requires the esm module that babel translates
```js
module.exports = {
  transpileDependencies: [
    '@mudas/*'
  ]
};
```

### Option
Use the 'EasyStoreConfig' to register multiple stores
```ts
export declare interface EasyStoreConfig<S, R> {
  // type 类型标识
  type: string;

  // 接口配置地址（若不配置将省略 action 的注册，除非自定义 action 方法）
  url?: URLConfig;

  // 每次请求都会加入的参数数据，如 {data:{a:10,...}, config:{headers:{...}, timeout:1000}}
  params?: CommonParams;

  // 是否增量存储数据到 state 中
  increment?: boolean;

  // State的默认值（若不设置此属性，则默认为 `{}`，设置成 `false` 强制不注册）
  state?: S | (() => S) | boolean; // support from v0.0.7

  // 自定义 getter 方法（或设置为 true，自动根据type生成对应的 getter，设置成 `false` 强制不注册）
  getter?: Getter<S, R> | boolean; // support from v0.0.7

  // 自定义 mutation 方法（或设置为 true，自动根据type生成对应的 mutation，设置成 `false` 强制不注册）
  mutation?: Mutation<S> | boolean; // support from v0.0.7

  // 自定义 action 方法（可不设置，自动根据 url 生成对应的接口请求方法）
  action?: Action<S, R> | boolean; // support from v0.0.7
}

export declare interface URLConfig {
  url: string;
  http: any;
  method?: string | Function; // 默认 'get'
}

export interface CommonParams {
  data?: Object | (() => Object);
  config?: AxiosRequestConfig;
}
```
> Note: for more information, please see types

### Usage example
```js
const USER_LOGIN = 'login';
const USER_LOGINOUT = 'login-out';

const storeConfig = [
  {
    type: USER_LOGIN,
    url: { url: '/user/login', http: Vue.http, method: 'post' }
  },
  {
    type: USER_LOGINOUT,
    url: { url: '/user/logout', http: Vue.http },  // default method: 'get'
    mutation(state, data) {
      state.loginfo = data;
    }
  }
];

export default new EasyStore(storeConfig).output();
```

ouput:
```js
{
  namespaced: true,
  actions: {login: ƒ, login-out: ƒ}
  getters: {login: ƒ, login-out: ƒ}
  mutations: {login: ƒ, login-out: ƒ}
  state: {login: {}, login-out: {}}
}
```

If you only register action, refer to the following:
```js
const DATA_LIST = 'data-list';

const storeConfig = [
  {
    type: DATA_LIST,
    // (ver <= 0.0.6) => scheme: {state:false, getter:false, mutation:false},

    // ver >= 0.0.7
    state: false,
    getter: false,
    mutation: false,

    url: { url: '/data/list', http: Vue.http, method: 'get' }
  }
];

export default new EasyStore(storeConfig).output();
```
