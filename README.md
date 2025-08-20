# Liquid Glass UI

## Description
Liquid Glass UI is a collection of React components that demonstrate a liquid glass effect using Tailwind CSS. This project is built with Next.js and TypeScript, providing a modern and efficient way to create beautiful UI elements.

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

## License

This project is licensed under the MIT License. See the LICENSE file for more details.