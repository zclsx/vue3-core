import { track, trigger } from "./effect";

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      //target当前的对象是{foo:1} key-> foo
      //Reflect.get(target, key) 是 ES6 中的一个内置方法
      //可以获取对象上某个属性的值。其中，target 表示目标对象， key 代表对象属性名称。
      const res = Reflect.get(target, key);
      //TODO依赖收集
      track(target, key);
      return res;
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value);

      trigger(target, key);
      return res;
    },
  });
}
