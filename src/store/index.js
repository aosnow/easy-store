// ------------------------------------------------------------------------------
// name: index
// author: 喵大斯( mschool.tech )
// created: 2019/8/22 21:34
// ------------------------------------------------------------------------------

import Vue from 'vue';
import Vuex from 'vuex';
import * as Module from './types/module';

import Sweep from './sweep';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    [Module.SWEEP]: Sweep
  }
});

export default store;
