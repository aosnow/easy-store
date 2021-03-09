## Functions

<dl>
<dt><a href="#genTemplate">genTemplate()</a> ⇒ <code>EasyStoreModule</code></dt>
<dd><p>生成模块基础默认模板</p>
</dd>
<dt><a href="#registerState">registerState(type, [value], [increment])</a></dt>
<dd><p>注册 state</p>
</dd>
<dt><a href="#registerGetter">registerGetter(type, [getter])</a></dt>
<dd><p>注册 getter</p>
</dd>
<dt><a href="#registerMutation">registerMutation(type, [mutation], [increment])</a></dt>
<dd><p>注册 mutation</p>
</dd>
<dt><a href="#registerAction">registerAction(type, url, [action], [params])</a></dt>
<dd><p>注册 Action 方法</p>
</dd>
<dt><a href="#register">register(option)</a></dt>
<dd><p>注册单个 store 模块</p>
<p>目的旨在简化 store 注册结构，减少重复劳动。</p>
<p>在不指定 scheme 参数的默认情况下，state, getter, mutation 都会注册</p>
<p>在指定 increment 增量保存数据开关为打开状态时，必须保障对应的 state 为 Object 类型</p></dd>
<dt><a href="#output">output()</a></dt>
<dd><p>输出 Store.Module 配置数据</p>
</dd>
</dl>

<a name="genTemplate"></a>

## genTemplate() ⇒ <code>EasyStoreModule</code>
生成模块基础默认模板

**Kind**: global function  
<a name="registerState"></a>

## registerState(type, [value], [increment])
注册 state

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | 类型标识 |
| [value] | <code>any</code> | <code></code> | 初始化数据 |
| [increment] | <code>Boolean</code> | <code>false</code> | 是否使用增量保存方法将数据保存到 state |

<a name="registerGetter"></a>

## registerGetter(type, [getter])
注册 getter

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | 类型标识 |
| [getter] | <code>EasyStoreGetter</code> | <code></code> | 初始化数据 |

<a name="registerMutation"></a>

## registerMutation(type, [mutation], [increment])
注册 mutation

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | 类型标识 |
| [mutation] | <code>EasyStoreMutation</code> | <code></code> | 初始化数据 |
| [increment] | <code>Boolean</code> | <code>false</code> | 是否使用增量保存方法将数据保存到 state |

<a name="registerAction"></a>

## registerAction(type, url, [action], [params])
注册 Action 方法

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>String</code> |  | 类型标识 |
| url | <code>URLConfig</code> |  | 接口配置地址（若不配置将省略 action 的注册） |
| [action] | <code>EasyStoreAction</code> | <code></code> |  |
| [params] | <code>CommonParams</code> | <code></code> | 每次请求都会加入的全局参数数据，如 {data:{a:10,...}, conf:{headers:{...}, timeout:1000}} |

<a name="register"></a>

## register(option)
注册单个 store 模块
<p>目的旨在简化 store 注册结构，减少重复劳动。</p>
<p>在不指定 scheme 参数的默认情况下，state, getter, mutation 都会注册</p>
<p>在指定 increment 增量保存数据开关为打开状态时，必须保障对应的 state 为 Object 类型</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>EasyStoreConfig</code> | 配置 |

<a name="output"></a>

## output()
输出 Store.Module 配置数据

**Kind**: global function  
