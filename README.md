# Figma Heron Handoff Plugin
这是一个 Figma 插件，可以帮你导出离线的设计标注文件，设计标注的界面你可以查看 https://figmacn.com/handoff 的 Demo。

## 使用
- 打开 Figma 客户端。
- 找到自己安装的插件那个页面。
- 找到 `Development`，这里有个 `New Plugin...`，点它。
- 选择 `Link existing plugin` 并选中文件夹中的 `manifest.json`。
- 安装成功后，在画布中右击，依次选择 `Plugin -> Development -> Figma Heron Handoff Plugin`，就可以导出啦。

## 开发
* 执行 `yarn` 安装依赖。
* 执行 `yarn dev` 启动开发模式。
* 在 Figma 客户端依次点击 `Figma` -> `Plugins` -> `Development` -> `New Plugin...` 并选中 `manifest.json` 来查看插件效果。
* 执行 `yarn build` 构建可使用的版本。

⭐ 想改变界面请修改 [App.tsx](./src/app/components/App.tsx)。
⭐ 在 [controller.ts](./src/plugin/controller.ts) 中使用 Figma API。
⭐ 在 [Figma API 文档](https://www.figma.com/plugin-docs/api/api-overview/)查阅 API 用法。

## 技术及工具
* React + Webpack
* TypeScript
* TSLint
* Prettier precommit hook
