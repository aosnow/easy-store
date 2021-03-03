<a name="merge"></a>

## merge(modules, [options]) ⇒ <code>ChildModule</code>
合并多个子级 store 模块后输出合并模块

**Kind**: global function  
**Returns**: <code>ChildModule</code> - 合并结果  

| Param | Type | Default |
| --- | --- | --- |
| modules | <code>Array.&lt;ChildModule&gt;</code> |  | 
| [options] | <code>MergeOptions</code> | <code></code> | 

**Example**  
```js
import { merge } from '@mudas/store';import User from './user';import Shop from './shop';// 将子级模块 User、Shop 合并提供到 vuex 进行注册export default merge([ User, Shop]);
```
