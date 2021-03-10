// ------------------------------------------------------------------------------
// name: easy-store
// author: mudas( mschool.tech )
// created: 2021/1/26 15:41
// ------------------------------------------------------------------------------

import { isFunction, isBoolean, isPlainObject } from '@mudas/util';
import { increment as incrementData } from './increment';
import { DEBUG } from './debug';

/**
 * 解析多元数据类型
 * @param {Object|Function} data
 * @param {*} defaultData 当 data 未设置时默认返回的值
 * @return {Object}
 * @private
 */
function _resolveData(data, defaultData = {}) {
  return isFunction(data) ? data() : data || defaultData;
}

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
   * <p>注意：options.params 将在任何 request 请求发出时，同时进行提交。</p>
   * @param {EasyStoreConfig[]} [config=null] 额外配置
   * @param {EasyStoreModule} [options=null] 参数同 register()
   */
  constructor(config = null, options = null) {
    this._store = { ...EasyStore._genTemplate(), ...options };

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
  // 子级 store 存储空间
  // ----------------------------------------

  /**
   * @type {EasyStoreModule}
   * @private
   */
  _store;

  // --------------------------------------------------------------------------
  //
  // Class methods
  //
  // --------------------------------------------------------------------------

  /**
   * 生成模块基础默认模板
   * @return {EasyStoreModule}
   * @private
   */
  static _genTemplate() {
    return {
      namespaced: true, // 强制使用 namespaced 命名空间路径
      state: Object.create(null),
      getters: Object.create(null),
      mutations: Object.create(null),
      actions: Object.create(null)
    };
  }

  /**
   * 当前 type 对应的模块是否开启增量保存
   * <p>通过 increment 直接设置 '打开/关闭' 增量保存方法<p>
   * <p>通过设置全局参数，且 increment 未设置（即 undefined 等非布尔值类型），来全局开启增量保存方法</p>
   * @param {Boolean} increment 指定 type 对应的 increment 参数
   * @private
   */
  _isIncrement(increment) {
    const { increment: globalIncrement } = this._store;
    return increment || (!isBoolean(increment) && globalIncrement);
  }

  /**
   * 注册 state
   * @param {string} type 类型标识
   * @param {any} [value=null] 初始化数据
   * @param {Boolean} [increment=false] 是否使用增量保存方法将数据保存到 state
   */
  registerState(type, value = {}, increment = false) {
    // 增量保存时，state 的基础数据必须为 Object 类型
    this._store.state[type] = this._isIncrement(increment) && !isPlainObject(value) ? {} : value;
  }

  /**
   * 注册 getter
   * @param {string} type 类型标识
   * @param {EasyStoreGetter} [getter=null] 初始化数据
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
   * @param {EasyStoreMutation} [mutation=null] 初始化数据
   * @param {Boolean} [increment=false] 是否使用增量保存方法将数据保存到 state
   */
  registerMutation(type, mutation = null, increment = false) {

    const self = this;
    mutation = mutation || function(state, data) {
      if (self._isIncrement(increment) && isPlainObject(data)) {
        incrementData(state[type], data);
      }
      else {
        state[type] = data;
      }
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
   * @param {EasyStoreAction} [action=null]
   * @param {CommonParams} [params=null] 每次请求都会加入的全局参数数据，如 {data:{a:10,...}, conf:{headers:{...}, timeout:1000}}
   */
  registerAction(type, url, action = null, params = null) {

    let finalAction;

    const { data: globalData, config: globalConfig } = this._store.params || {};
    const { data, config } = params || {};
    const defaultData = { ..._resolveData(globalData), ..._resolveData(data) };
    const defaultConfig = { ..._resolveData(globalConfig), ..._resolveData(config) };

    // conf: AxiosRequestConfig
    // 可用于自定义 headers，例如 { headers: { 'Content-type': 'application/x-www-form-urlencoded' } }
    if (isFunction(action)) {
      finalAction = function(context, params, conf) {

        params = { ...defaultData, ...params };
        conf = { ...defaultConfig, ...conf };

        // this - Store 实例
        return action['call'](this, context, params, conf);
      };
    }
    else {
      const mutationRegisted = !!this._store.mutations[type];
      finalAction = function(context, params, conf) {

        url = typeof url === 'string' ? { url } : url;

        const { url: realURL, method = 'get', http } = url;
        const func = http[method.toLowerCase()];

        if (typeof func !== 'function') throw new Error('Non-existent http method');

        // 全局自定义数据和参数的支持

        params = { ...defaultData, ...params };
        conf = { ...defaultConfig, ...conf };

        // 发出 http 请求
        return func.call(http, realURL, params, conf)
                   .then(({ data }) => {
                     if (mutationRegisted) context.commit(type, data.data);
                     return Promise.resolve(data.data);
                   })
                   .catch(reason => Promise.reject(reason));
      };
    }

    if (typeof this._store.actions[type] === 'function' && DEBUG) {
      console.warn('EasyStore: action has been overwritten as a new method');
    }

    this._store.actions[type] = finalAction;
  }

  /**
   * 注册单个 store 模块
   * <p>目的旨在简化 store 注册结构，减少重复劳动。</p>
   * <p>在不指定 scheme 参数的默认情况下，state, getter, mutation 都会注册</p>
   * <p>在指定 increment 增量保存数据开关为打开状态时，必须保障对应的 state 为 Object 类型</p>
   * @param {EasyStoreConfig} option 配置
   */
  register(option) {

    const { type, url, state = {}, getter = null, mutation = null, action = null, params = null, increment, scheme } = option;

    // 不保存数据，将不注册 state, getter, mutation
    (!scheme || scheme.state || state) && this.registerState(type, state, increment);
    (!scheme || scheme.getter || getter) && this.registerGetter(type, getter);
    (!scheme || scheme.mutation || mutation) && this.registerMutation(type, mutation, increment);

    // 自定义 action 或者已设置 url 才注册 action
    (action || url) && this.registerAction(type, url, action, params);

  }

  /**
   * 输出 Store.Module 配置数据
   */
  output() {
    return this._store;
  }
}
