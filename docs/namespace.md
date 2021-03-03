<a name="namespace"></a>

## namespace(storeType) ⇒ <code>String</code>
分解 storeType 从而获取路径的最后一级用于模块内部
<p>比如 `sweep/userinfo` ，返回结果为 `userinfo`</p>

**Kind**: global function  
**Returns**: <code>String</code> - 最后一级路径名，应用于模块内部相互通信  

| Param | Description |
| --- | --- |
| storeType | 模块完整 type（一般完整 type 直接应用于 store.dispath、store.commit） |

