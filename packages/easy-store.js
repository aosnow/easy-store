// ------------------------------------------------------------------------------
// name: easy-store
// author: mudas( mschool.tech )
// created: 2021/1/26 15:41
// ------------------------------------------------------------------------------

const DEBUG = process.env.NODE_ENV !== 'production';

/**
 * 简化的 Store 操作辅助工具
 */
export default class EasyStore {

  // --------------------------------------------------------------------------
  //
  // Class constructor
  //
  // --------------------------------------------------------------------------

  /**
   * 构建 EasyStore 实例
   * @param {EasyStoreConfig[]} [config=null] 额外配置
   * @param {EasyStoreModule<any,any>} [options=null] 参数同 registerStore
   */
  constructor(config = null, options = null) {
    this._store = { ...EasyStore.Template, ...options };

    if (Array.isArray(config)) {
      config.forEach(conf => this.register(conf));
    }
  }

  // --------------------------------------------------------------------------
  //
  // Class properties
  //
  // --------------------------------------------------------------------------

  // ----------------------------------------
  // 默认模板
  // ----------------------------------------

  static Template = {
    namespaced: true, // 强制使用 namespaced 命名空间路径
    state: Object.create(null),
    getters: Object.create(null),
    mutations: Object.create(null),
    actions: Object.create(null)
  };

  // ----------------------------------------
  // 子级 store 存储空间
  // ----------------------------------------

  /**
   * @type {{mutations:any, state:any, getters:any, actions:any, namespaced:boolean}|null}
   * @private
   */
  _store = null;

  // --------------------------------------------------------------------------
  //
  // Class methods
  //
  // --------------------------------------------------------------------------

  /**
   * 注册 state
   * @param {string} type 类型标识
   * @param {any} [value=null] 初始化数据
   */
  registerState(type, value = null) {
    this._store.state[type] = value;
  }

  /**
   * 注册 getter
   * @param {string} type 类型标识
   * @param {EasyStoreGetter<any, any>} [getter=null] 初始化数据
   */
  registerGetter(type, getter = null) {
    getter = getter || function(state) {
      return state[type];
    };

    if (typeof this._store.getters[type] === 'function' && DEBUG) {
      console.warn('EasyStore: getter has been overwritten as a new method');
    }

    this._store.getters[type] = getter;
  }

  /**
   * 注册 mutation
   * @param {string} type 类型标识
   * @param {EasyStoreMutation<any>} [mutation=null] 初始化数据
   */
  registerMutation(type, mutation = null) {
    mutation = mutation || function(state, data) {
      state[type] = data;
    };

    if (typeof this._store.mutations[type] === 'function' && DEBUG) {
      console.warn('EasyStore: mutation has been overwritten as a new method');
    }

    this._store.mutations[type] = mutation;
  }

  /**
   * 注册 Action 方法
   * @param {String} type 类型标识
   * @param {URLConfig} url 接口配置地址（若不配置将省略 action 的注册）
   * @param {EasyStoreAction<any, any>} [action=null]
   * @param {CommonParams} [params=null] 每次请求都会加入的全局参数数据，如 {data:{a:10,...}, conf:{headers:{...}, timeout:1000}}
   */
  registerAction(type, url, action = null, params = null) {
    url = typeof url === 'string' ? { url } : url;

    const { data, config } = params || {};
    const { url: realURL, method = 'get', http } = url;
    const func = http[method.toLowerCase()];

    if (typeof func !== 'function') throw new Error('Non-existent http method');

    // conf: AxiosRequestConfig - 可用于自定义 headers，例如 { headers: { 'Content-type': 'application/x-www-form-urlencoded' } }
    action = action || function(context, params, conf) {
      // 全局自定义数据和参数的支持
      params = { ...data, ...params };
      conf = { ...config, ...conf };

      // 发出 http 请求
      return func.call(http, realURL, params, conf).then(({ data }) => {
        context.commit(type, data.data);
        return Promise.resolve(data.data);
      }).catch(reason => Promise.reject(reason));
    };

    if (typeof this._store.actions[type] === 'function' && DEBUG) {
      console.warn('EasyStore: action has been overwritten as a new method');
    }

    this._store.actions[type] = action;
  }

  /**
   * 注册单个 store 模块
   * <p>目的旨在简化 store 注册结构，减少重复劳动。</p>
   * @param {EasyStoreConfig} option 配置
   */
  register(option) {

    const { type, url, state = null, getter = null, mutation = null, action = null, params = null, notSave = false } = option;

    // 设置 url 才注册 action
    url && this.registerAction(type, url, action, params);

    // 不保存数据，将不注册 state, getter, mutation
    !notSave && this.registerState(type, state);
    !notSave && this.registerGetter(type, getter);
    !notSave && this.registerMutation(type, mutation);

  }

  /**
   * 输出 Store.Module 配置数据
   */
  output() {
    return this._store;
  }
}
