// ------------------------------------------------------------------------------
// name: user
// author: mudas( mschool.tech )
// created: 2021/1/26 15:22
// ------------------------------------------------------------------------------

import Vue from 'vue';
import * as Types from '@/store/types';
import EasyStore from '@mudas/easy-store';

const SWEEP_USER_INFO = Types.SWEEP_USER_INFO.namespace;

const Config = [
  {
    type: SWEEP_USER_INFO,
    params: {
      data: { a: 10 },
      config: { headers: { 'custom-head': 'test' } }
    },
    url: { url: '/index/getUserInfo', http: Vue.http, method: 'get' }
  }
];

export default new EasyStore(Config).output();
