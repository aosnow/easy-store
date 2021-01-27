// ------------------------------------------------------------------------------
// name: shop
// author: mudas( mschool.tech )
// created: 2021/1/26 15:22
// ------------------------------------------------------------------------------

import Vue from 'vue';
import * as Types from '@/store/types';
import EasyStore from '@mudas/easy-store';

const SWEEP_SHOP_INFO = Types.SWEEP_SHOP_INFO.namespace;

const Config = [
  {
    type: SWEEP_SHOP_INFO,
    url: { url: '/index/getShopperInfo', http: Vue.http }
  }
];

export default new EasyStore(Config).output();
