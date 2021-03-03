// ------------------------------------------------------------------------------
// name: index
// author: mudas( mschool.tech )
// created: 2020/3/19 13:53
// ------------------------------------------------------------------------------

import { merge } from '@mudas/store';
import User from './user';
import Shop from './shop';

export default merge([
  User,
  Shop
]);
