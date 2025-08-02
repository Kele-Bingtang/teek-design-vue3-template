# Teek Design Vue3

Teek 是一个基于 [Vue3](https://github.com/vuejs/core)、[TypeScript](https://www.typescriptlang.org/)、[Vite](https://github.com/vitejs/vite)、[ElementPlus](https://element-plus.org/zh-CN) 构建的颜值强大、功能丰富、开箱即用的中后台管理系统解决方案。

这是 `monorepo` 版，只包含项目最基础的框架，当前对应完整版的 `v1.5.1` 版本。

完整版请看 [Teek Design Vue3](https://github.com/Kele-Bingtang/teek-design-vue3)。

## 本地开发

安装依赖

```sh
pnpm install
```

编译运行

```sh
pnpm template dev
```

项目启动后自动打开浏览器，地址为：`http://localhost:8099/`。

## 项目打包

打包运行（测试环境使用）

```sh
pnpm template build:test
```

打包运行（生产环境使用）

```sh
pnpm template build
# or
pnpm template build:prod
```


