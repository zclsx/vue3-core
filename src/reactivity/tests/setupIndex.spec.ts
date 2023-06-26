import { add } from "../index";
//node.js 环境默认模块是 cjs 现在用的是 esm规范，转换babel
//yarn add --dev babel-jest @babel/core @babel/preset-env babel核心的东西
//https://jestjs.io/docs/getting-started
//还需要再配置一下让它支持Using TypeScript
//yarn add --dev @babel/preset-typescript
it("init", () => {
  expect(add(1, 1)).toBe(2);
  //1.集成 yarn add typescript --dev/  TS npx tsc --init   /  tsconif文件
  //2.引入yarn add jest @types/jest --dev
});
