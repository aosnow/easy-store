// ------------------------------------------------------------------------------
// name: 原生JS相关处理入口
// author: mudas( mschool.tech )
// created: 2021/1/22 14:58
// ------------------------------------------------------------------------------

export function registerGetter(target, name, method) {
  const config = Object.getOwnPropertyDescriptor(target, name);

  if (!config || !config.get) {
    Object.defineProperty(target, name, { get: method });
  }
}

export function registerSetter(target, name, method) {
  const config = Object.getOwnPropertyDescriptor(target, name);

  if (!config || !config.set) {
    Object.defineProperty(target, name, { set: method });
  }
}

export function registerMethod(target, name, method) {
  if (!target[name]) {
    target[name] = method;
  }
}

export default function(Vue) {

  // ----------------------------------------
  // String
  // ----------------------------------------

  // STORE 设置（确保在 Vuex.Store 创建前设置生效）
  // 让 store 内部能快速定位如 module/name 中的 name
  // 因为开启了 module.namespace 模式，只需要在内部使用最后的 name
  registerGetter(String.prototype, 'namespace', function() {
    return this.substring(this.lastIndexOf('/') + 1);
  });

}
