// ------------------------------------------------------------------------------
// name: index.d
// author: mudas( mschool.tech )
// created: 2021/1/27
// ------------------------------------------------------------------------------

import { Module } from 'vuex';
import EasyStore from './EasyStore';

export interface ChildModule extends Module<any, any> {}

export interface MergeOptions {
  namespaced?: boolean;
}

/**
 * 合并多个子级 store 模块后输出合并模块
 * @param {ChildModule[]} modules
 * @param {MergeOptions} [options=null]
 * @return {ChildModule} 合并结果
 *
 * @example
 * import { merge } from '@mudas/store';
 * import User from './user';
 * import Shop from './shop';
 *
 * // 将子级模块 User、Shop 合并提供到 vuex 进行注册
 * export default merge([
 *  User,
 *  Shop
 * ]);
 */
export function merge(modules: ChildModule[], options?: MergeOptions): ChildModule;

/**
 * 对指定 state 进行增量数据修改或者增加
 * @param {Object} state store.state.item
 * @param {Object} data 需要保存的数据体
 */
export function increment(state, data): void;

/**
 * 分解 storeType 从而获取路径的最后一级用于模块内部
 * <p>比如 `sweep/userinfo` ，返回结果为 `userinfo`</p>
 * @param storeType 模块完整 type（一般完整 type 直接应用于 store.dispath、store.commit）
 * @return {String} 最后一级路径名，应用于模块内部相互通信
 *
 * @example
 * namespace('sweep/userinfo')
 * => 'userinfo'
 */
export function namespace(storeType: string): string;

export default EasyStore;
export { EasyStore };
