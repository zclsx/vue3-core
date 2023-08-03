class ReactiveEffect {
  private _fn: any;
  constructor(fn, public scheduler?: any) {
    this._fn = fn;
  }

  run() {
    activeEffect = this; //获取实例对象

    return this._fn();
  }
}

const targetMap = new Map();
export function track(target, key) {
  //set   target -> key -> dep
  let depsMap = targetMap.get(target); //去取target
  //depsMap解决初始化问题：一开始可能没有,去初始化创建
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap); //将一个键值对 { target: depsMap } 存储到 Map 数据结构中
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  dep.add(activeEffect); //push fn

  // const dep = new Set()
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);

  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

let activeEffect;
export function effect(fn, options: any = {}) {
  const scheduler = options.scheduler;
  //fn
  const _effect = new ReactiveEffect(fn, scheduler);

  _effect.run();

  return _effect.run.bind(_effect);
}
