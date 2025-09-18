# Liquid Glass MCP Server

本项目为 liquid-glass-ui 组件库的 Model Context Protocol (MCP) 服务端，基于 TypeScript。

## 功能
- 组件元数据注册与远程查询
- API 文档自动生成
- 支持与前端/第三方集成

## 技术栈
- TypeScript
- @modelcontextprotocol/sdk
- zod

## 快速开始
1. 安装依赖：`npm install`
2. 启动开发：`npm run dev` 或 `ts-node src/server.ts`
3. 参考 MCP SDK 文档：https://github.com/modelcontextprotocol/create-python-server

## 目录结构
- src/: 服务端源码
- .github/: Copilot 指令
- .vscode/: VS Code 配置

## 说明
- 可扩展更多 liquid-glass-ui 组件元数据与 API。
- 支持 MCP 标准协议。
