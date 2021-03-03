// ------------------------------------------------------------------------------
// name: merge
// author: mudas( mschool.tech )
// created: 2021/1/30 5:41
// ------------------------------------------------------------------------------

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
export function merge(modules, options = null) {
  const store = {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    ...options
  };

  modules.forEach(mod => {
    const state = typeof mod.state === 'function' ? mod.state() : mod.state;
    store.state = { ...store.state, ...state };
    store.getters = { ...store.getters, ...mod.getters };
    store.mutations = { ...store.mutations, ...mod.mutations };
    store.actions = { ...store.actions, ...mod.actions };
  });

  return store;
}
