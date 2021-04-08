## Functions

<dl>
<dt><a href="#registerState">registerState(type, [value])</a></dt>
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
<p>默认情况下 state, getter, mutation 都会进行注册（设置成 false 可强制不注册）</p>
<p>设置自定义 action 或者 url 配置会注册 action 方法（将 action 设置成 false，或者 action 和 url 都不设置可强制不注册）</p>
<p>在指定 increment 增量保存数据开关为打开状态时，必须保障对应的 state 为 Object 类型</p></dd>
<dt><a href="#output">output()</a> ⇒ <code>EasyStoreModule</code></dt>
<dd><p>输出 Store.Module 配置数据</p>
</dd>
</dl>

<a name="registerState"></a>

## registerState(type, [value])
注册 state

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | 类型标识 |
| [value] | <code>any</code> | <code></code> | 初始化数据 |

<a name="registerGetter"></a>

## registerGetter(type, [getter])
注册 getter

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | 类型标识 |
| [getter] | <code>Getter</code> | <code></code> | 初始化数据 |

<a name="registerMutation"></a>

## registerMutation(type, [mutation], [increment])
注册 mutation

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | 类型标识 |
| [mutation] | <code>Mutation</code> | <code></code> | 初始化数据 |
| [increment] | <code>Boolean</code> | <code>false</code> | 是否使用增量保存方法将数据保存到 state |

<a name="registerAction"></a>

## registerAction(type, url, [action], [params])
注册 Action 方法

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>String</code> |  | 类型标识 |
| url | <code>URLConfig</code> |  | 接口配置地址（若不配置将省略 action 的注册） |
| [action] | <code>Action</code> | <code></code> |  |
| [params] | <code>CommonParams</code> | <code></code> | 每次请求都会加入的全局参数数据，如 {data:{a:10,...}, conf:{headers:{...}, timeout:1000}} |

<a name="register"></a>

## register(option)
注册单个 store 模块
<p>目的旨在简化 store 注册结构，减少重复劳动。</p>
<p>默认情况下 state, getter, mutation 都会进行注册（设置成 false 可强制不注册）</p>
<p>设置自定义 action 或者 url 配置会注册 action 方法（将 action 设置成 false，或者 action 和 url 都不设置可强制不注册）</p>
<p>在指定 increment 增量保存数据开关为打开状态时，必须保障对应的 state 为 Object 类型</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>EasyStoreConfig</code> | 配置 |

<a name="output"></a>

## output() ⇒ <code>EasyStoreModule</code>
输出 Store.Module 配置数据

**Kind**: global function  
