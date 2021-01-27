// ------------------------------------------------------------------------------
// name: index
// author: mudas( mschool.tech )
// created: 2020/3/19 13:53
// ------------------------------------------------------------------------------

import * as utils from '@mudas/util-store';
import User from './user';
import Shop from './shop';

export default utils.mergeStore([
  User,
  Shop
]);
