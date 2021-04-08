// ------------------------------------------------------------------------------
// name: user
// author: mudas( mschool.tech )
// created: 2021/1/26 15:22
// ------------------------------------------------------------------------------

import Vue from 'vue';
import * as Types from '@/store/types';
import EasyStore, { namespace } from '@mudas/store';

const Config = [
  {
    type: namespace(Types.USER_INFO),
    state: {
      other: {
        a: 1
      },
      memberInfo: {
        uid: '',
        nick: ''
      }
    },
    increment: true,
    params: {
      data: { a: 10 },
      config: { headers: { 'custom-head': 'test' } }
    },
    url: {
      url: '/index/getUserInfo',
      http: Vue.http,
      method: 'get'
    },
    action(context, params, conf) {
      return Vue.http.get('/index/getUserInfo', { ...params }, conf)
                .then(({ data }) => {
                  context.commit(namespace(Types.USER_INFO), data.data);
                  return Promise.resolve(data.data);
                })
                .catch(reason => Promise.reject(reason));
    }
  }
];

export default new EasyStore(Config, { params: { data: { b: 20 } } }).output();
