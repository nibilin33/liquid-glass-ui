# Liquid Glass UI


## Description
Liquid Glass UI is a collection of React components that demonstrate a liquid glass effect using Tailwind CSS. This project is built with Next.js and TypeScript, providing a modern and efficient way to create beautiful UI elements.

![Liquid Glass UI Demo](docs/demo.png)

## Installation

To install the package, run the following command:

```
npm install liquid-glass-tailwind-react
```

## Usage

To use the `LiquidGlass` component in your Next.js application, import it as follows:

```tsx
import { LiquidGlass } from 'liquid-glass-tailwind-react';

const HomePage = () => {
  return (
    <div>
      <LiquidGlass />
    </div>
  );
};

export default HomePage;
```

## Props

The `LiquidGlass` component accepts the following props:

- `className` (string): Additional CSS classes to apply to the component.
- `style` (React.CSSProperties): Inline styles to apply to the component.

## Development

To run the development server, use the following command:

```
npm run dev
```

This will start the Next.js application in development mode.

## Build

To build the project for production, run:

```
npm run build
```

## Possible Problems

### 1. React 版本冲突
```
TypeError: Cannot read properties of null (reading 'useContext')
```
如果运行 `npm ls react` 发现有多个不同版本的 React（如 18.2.0 和 18.3.1），Next.js 构建时可能会失败。  
**解决方法：**  
请确保所有依赖都使用同一个 React 版本（推荐 18.2.0），并在 `package.json` 中统一声明和使用 `resolutions` 字段。

### 2. Tailwind 样式未生效

如果组件样式未生效，请确保在项目的全局样式文件（如 `styles/globals.css`）中正确引入 Tailwind 指令：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
## License

This project is licensed under the MIT License. See the LICENSE file for more details.