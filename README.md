# easy-store

> Use vuex in a more concise and convenient way

### Usage

``` bash
$ npm install -S @mudas/easy-store
```

### Option
Use the 'EasyStoreConfig' to register multiple stores
```ts
export declare interface EasyStoreConfig<S, R> {
  // type 类型标识
  type: string;

  // 接口配置地址（若不配置将省略 action 的注册）
  url?: URLConfig;

  // State的默认值
  state?: S;

  // 自定义 getter 方法（一般无须指定，自动根据type生成对应的 getter）
  getter?: EasyStoreGetter<S, R>;

  // 自定义 mutation 方法（一般无须指定，自动根据type生成对应的 mutation）
  mutation?: EasyStoreMutation<S>;

  // 自定义 action 方法（一般无须指定，自动根据 url 生成对应的接口请求方法）
  action?: EasyStoreAction<S, R>;

  // 是否不需要将 action 请求的数据存储到 state 中
  nosave?: boolean;
}

export declare interface URLConfig {
  url: string;
  http: any;
  method?: string; // 默认 'get'
}
```
> Note: for more information, please see types

### Usage example
```js
const USER_LOGIN = 'login';
const USER_LOGINOUT = 'logout';

const storeConfig = [
  {
    type: USER_LOGIN,
    url: { url: '/user/login', http: Vue.http, method: 'post' }
  },
  {
    type: USER_LOGINOUT,
    url: { url: '/user/logout', http: Vue.http },  // default method: 'get'
    mutation(state) {
      state.loginfo = null;
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
  state: {login: null, login-out: null}
}
```

If you only register action, refer to the following:
```js
const DATA_LIST = 'data-list';

const storeConfig = [
  {
    type: DATA_LIST,
    nosave: true,
    url: { url: '/data/list', http: Vue.http, method: 'get' }
  }
];

export default new EasyStore(storeConfig).output();
```
