// ------------------------------------------------------------------------------
// name: EasyStore.d
// author: mudas( mschool.tech )
// created: 2021/1/27
// ------------------------------------------------------------------------------

import { GetterTree, ActionTree, MutationTree, ModuleTree, Store, ActionContext } from 'vuex';

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
   * @param {EasyStoreGetter<any, any>} [getter=null] 初始化数据
   */
  registerGetter(type: string, getter?: EasyStoreGetter<S, R>): void;

  /**
   * 注册 mutation
   * @param {string} type 类型标识
   * @param {EasyStoreMutation<any>} [mutation=null] 初始化数据
   */
  registerMutation(type: string, mutation?: EasyStoreMutation<S>): void;

  /**
   * 注册 Action 方法
   * @param {String} type 类型标识
   * @param {URLConfig} url 接口配置地址（若不配置将省略 action 的注册）
   * @param {EasyStoreAction<any, any>} [action=null]
   * @param {CommonParams} [params=null] 每次请求都会加入的参数数据，如 {data:{a:10,...}, conf:{headers:{...}, timeout:1000}}
   */
  registerAction(type: string, url?: URLConfig, action?: EasyStoreAction<S, R>, params?: CommonParams): void;

  /**
   * 注册单个 store 模块
   * <p>目的旨在简化 store 注册结构，减少重复劳动。</p>
   * @param {EasyStoreConfig} option 配置
   */
  register(option: EasyStoreConfig<S, R>): void;

  /**
   * 输出 Store.Module 配置数据
   */
  output(): EasyStoreModule<S, R>;
}

export interface CommonParams {
  data?: any;
  config?: any;
}

export interface EasyStoreModule<S, R> {
  namespaced?: boolean;
  state?: S | (() => S);
  getters?: GetterTree<S, R>;
  actions?: ActionTree<S, R>;
  mutations?: MutationTree<S>;
  modules?: ModuleTree<R>;
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
  Template: EasyStoreModule<S, R>;

  new(config: EasyStoreConfig<S, R>[], options?: EasyStoreModule<S, R>): EasyStoreInstance<S, R>;
}

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

  // 每次请求都会加入的参数数据，如 {data:{a:10,...}, conf:{headers:{...}, timeout:1000}}
  params?: CommonParams;

  // 是否不需要将 action 请求的数据存储到 state 中
  notSave?: boolean;
}

export declare interface URLConfig {
  url: string;
  http: any;
  method?: string; // 默认 'get'
}

declare const EasyStore: EasyStoreStatic<any, any>;

export default EasyStore;
