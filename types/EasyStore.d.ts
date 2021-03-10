// ------------------------------------------------------------------------------
// name: EasyStore.d
// author: mudas( mschool.tech )
// created: 2021/1/27
// ------------------------------------------------------------------------------

import { Module, Store, ActionContext } from 'vuex';
import { AxiosRequestConfig } from 'axios';

export declare interface EasyStoreInstance<S, R> {

  _store: EasyStoreModule<S, R>;

  /**
   * 注册 state
   * @param {string} type 类型标识
   * @param {any} [value=null] 初始化数据
   * @param {Boolean} [increment=false] 是否使用增量保存方法将数据保存到 state
   */
  registerState(type: string, value?: S, increment?: boolean): void;

  /**
   * 注册 getter
   * @param {string} type 类型标识
   * @param {EasyStoreGetter<any, any>} [getter=null] 初始化数据
   */
  registerGetter(type: string, getter?: EasyStoreGetter<S, R>): void;

  /**
   * 注册 mutation
   * @param {string} type 类型标识
   * @param {EasyStoreMutation<any>} [mutation=null] 初始化数据
   * @param {Boolean} [increment=false] 是否使用增量保存方法将数据保存到 state
   */
  registerMutation(type: string, mutation?: EasyStoreMutation<S>, increment?: boolean): void;

  /**
   * 注册 Action 方法
   * @param {String} type 类型标识
   * @param {URLConfig} url 接口配置地址（若不配置将省略 action 的注册）
   * @param {EasyStoreAction<any, any>} [action=null]
   * @param {CommonParams} [params=null] 每次请求都会加入的参数数据，如 {data:{a:10,...}, config:{headers:{...}, timeout:1000}}
   */
  registerAction(type: string, url?: URLConfig, action?: EasyStoreAction<S, R>, params?: CommonParams): void;

  /**
   * 注册单个 store 模块
   * <p>目的旨在简化 store 注册结构，减少重复劳动。</p>
   * <p>在不指定 scheme 参数的默认情况下，state, getter, mutation 都会注册</p>
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

export interface RegisterScheme {
  state?: boolean;
  getter?: boolean;
  mutation?: boolean;
  action?: boolean;
}

export interface EasyStoreModule<S, R> {
  // 每次请求都会加入的参数数据，如 {data:{a:10,...}, config:{headers:{...}, timeout:1000}}
  params?: CommonParams; // 全局，所有请求都会提交该数据

  // 是否增量存储数据到 state 中
  increment?: boolean;

  namespaced?: boolean;
  state?: S | (() => S);
  getters?: GetterTree<S, R>;
  actions?: ActionTree<S, R>;
  mutations?: MutationTree<S>;
}

export interface GetterTree<S, R> {
  [key: string]: EasyStoreGetter<S, R>;
}

export interface ActionTree<S, R> {
  [key: string]: EasyStoreAction<S, R>;
}

export interface MutationTree<S> {
  [key: string]: EasyStoreMutation<S>;
}

export type EasyStoreGetter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any;
export type EasyStoreAction<S, R> = ActionHandler<S, R> | ActionObject<S, R>;
export type EasyStoreMutation<S> = (state: S, payload?: any) => any;

export type ActionHandler<S, R> = (this: Store<R>, injectee: ActionContext<S, R>, payload?: any, conf?: any) => any;

export interface ActionObject<S, R> {
  root?: boolean;
  handler: ActionHandler<S, R>;
}

export declare interface EasyStoreStatic<S, R> {
  new(config: EasyStoreConfig<S, R>[], options?: EasyStoreModule<S, R>): EasyStoreInstance<S, R>;
}

export declare interface EasyStoreConfig<S, R> {
  // type 类型标识
  type: string;

  // 接口配置地址（若不配置将省略 action 的注册，除非自定义 action 方法）
  url?: URLConfig;

  // State的默认值
  state?: S;

  // 自定义 getter 方法（一般无须指定，自动根据type生成对应的 getter）
  getter?: EasyStoreGetter<S, R>;

  // 自定义 mutation 方法（一般无须指定，自动根据type生成对应的 mutation）
  mutation?: EasyStoreMutation<S>;

  // 自定义 action 方法（一般无须指定，自动根据 url 生成对应的接口请求方法）
  action?: EasyStoreAction<S, R>;

  // 每次请求都会加入的参数数据，如 {data:{a:10,...}, config:{headers:{...}, timeout:1000}}
  params?: CommonParams;

  // 是否增量存储数据到 state 中
  increment?: boolean;

  // 手动指定 state、getter、mutation、action 的注册方案
  scheme?: RegisterScheme;
}

export declare interface URLConfig {
  url: string;
  http: any;
  method?: string; // 默认 'get'
}

declare const EasyStore: EasyStoreStatic<any, any>;

export default EasyStore;
