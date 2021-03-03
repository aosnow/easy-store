// ------------------------------------------------------------------------------
// name: increment
// author: mudas( mschool.tech )
// created: 2021/1/30 5:43
// ------------------------------------------------------------------------------

import Vue from 'vue';
import { merge, isPlainObject } from '@mudas/util';
import { DEBUG } from './debug';

/**
 * 对指定 state 进行增量数据修改或者增加
 * @param {Object} state store.state.item
 * @param {Object} data 需要保存的数据体
 */
export function increment(state, data) {
  if (isPlainObject(state) && isPlainObject(data)) {
    merge(state, data, _mergeValue);
  }
  else {
    if (DEBUG) console.warn('increment: `state` and `data` must be of `PlainObject`');
  }
}

function _mergeValue(objValue, srcValue, key, object, source) {
  Vue.set(object, key, srcValue);
}
