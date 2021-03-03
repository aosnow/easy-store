// ------------------------------------------------------------------------------
// name: shop
// author: mudas( mschool.tech )
// created: 2021/1/26 15:22
// ------------------------------------------------------------------------------

import Vue from 'vue';
import * as Types from '@/store/types';
import EasyStore, { namespace } from '@mudas/store';

const Config = [
  {
    type: namespace(Types.SWEEP_SHOP_INFO),
    url: { url: '/index/getShopperInfo', http: Vue.http }
  }
];

export default new EasyStore(Config).output();
