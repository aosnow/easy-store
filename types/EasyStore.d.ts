// ------------------------------------------------------------------------------
// name: EasyStore.d
// author: mudas( mschool.tech )
// created: 2021/1/27
// ------------------------------------------------------------------------------

import { Module, Getter, Mutation, Action } from 'vuex';
import { AxiosRequestConfig } from 'axios';

export { Module, Getter, Mutation, Action };

export declare interface EasyStoreInstance<S, R> {

  _store: EasyStoreModule<S, R>;

  /**
   * 注册 state
   * @param {string} type 类型标识
   * @param {any} [value=null] 初始化数据
   */
  registerState(type: string, value?: S): void;

  /**
   * 注册 getter
   * @param {string} type 类型标识
   * @param {Getter} [getter=null] 初始化数据
   */
  registerGetter(type: string, getter?: Getter<S, R>): void;

  /**
   * 注册 mutation
   * @param {string} type 类型标识
   * @param {Mutation} [mutation=null] 初始化数据
   * @param {Boolean} [increment=false] 是否使用增量保存方法将数据保存到 state
   */
  registerMutation(type: string, mutation?: Mutation<S>, increment?: boolean): void;

  /**
   * 注册 Action 方法
   * @param {String} type 类型标识
   * @param {URLConfig} url 接口配置地址（若不配置将省略 action 的注册）
   * @param {Action} [action=null]
   * @param {CommonParams} [params=null] 每次请求都会加入的参数数据，如 {data:{a:10,...}, config:{headers:{...}, timeout:1000}}
   */
  registerAction(type: string, url?: URLConfig, action?: Action<S, R>, params?: CommonParams): void;

  /**
   * 注册单个 store 模块
   * <p>目的旨在简化 store 注册结构，减少重复劳动。</p>
   * <p>默认情况下 state, getter, mutation 都会进行注册（设置成 false 可强制不注册）</p>
   * <p>设置自定义 action 或者 url 配置会注册 action 方法（将 action 设置成 false，或者 action 和 url 都不设置可强制不注册）</p>
   * <p>在指定 increment 增量保存数据开关为打开状态时，必须保障对应的 state 为 Object 类型</p>
   * @param {EasyStoreConfig} option 配置
   */
  register(option: EasyStoreConfig<S, R>): void;

  /**
   * 输出 Store.Module 配置数据
   */
  output(): EasyStoreModule<S, R>;
}

export interface CommonParams {
  data?: Object | (() => Object);
  config?: AxiosRequestConfig;
}

export interface EasyStoreModule<S, R> extends Module<S, R> {
  // 每次请求都会加入的参数数据，如 {data:{a:10,...}, config:{headers:{...}, timeout:1000}}
  params?: CommonParams; // 全局，所有请求都会提交该数据

  // 是否增量存储数据到 state 中
  increment?: boolean;
}

export declare interface EasyStoreStatic<S, R> {
  new(config: EasyStoreConfig<S, R>[], options?: EasyStoreModule<S, R>): EasyStoreInstance<S, R>;
}

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

declare const EasyStore: EasyStoreStatic<any, any>;

export default EasyStore;
