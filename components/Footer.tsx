import React from "react";

export interface FooterProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

const Footer: React.FC<FooterProps> = ({
  children,
  className = "",
  style,
  ...rest
}) => (
  <footer
    className={`w-full py-4 px-8 text-center text-gray-500 text-sm liquid-glass rounded-2xl shadow-glass ${className}`}
    style={style}
    {...rest}
  >
    {children ?? "© 2025 Liquid Glass ComponentKit. Powered by Next.js & Tailwind CSS."}
  </footer>
);

export default Footer;
