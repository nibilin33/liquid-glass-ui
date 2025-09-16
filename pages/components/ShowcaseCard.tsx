"use client";
import React, { Suspense } from "react";
import { toast } from "react-hot-toast";
import { FaCopy, FaEye } from "react-icons/fa";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import dynamic from "next/dynamic";
// 动态导入 SyntaxHighlighter 及主题
const SyntaxHighlighter = dynamic(
  async () => {
    const mod = await import("react-syntax-highlighter");
    const { oneDark } = await import("react-syntax-highlighter/dist/cjs/styles/prism");
    return function Highlighter(props: any) {
      return (
        <mod.Prism style={oneDark} {...props}>
          {props.children}
        </mod.Prism>
      );
    };
  },
  { ssr: false, loading: () => <div>loading...</div> }
);

interface ShowcaseCardProps {
  component: {
    name: string;
    description: string;
    code: string;
    preview?: React.ReactNode;
    category?: string;
  };
  onCopy?: () => void;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ component, onCopy }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(component.code);
      toast.success("Copy successful! 🎉");
      onCopy?.();
    } catch {
      toast.error("Copy failed 😢");
    }
  };

  return (
    <div className="transition flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{component.name}</h3>
        {component.category && <Badge>{component.category}</Badge>}
      </div>
      <p className="text-gray-600 mb-2">{component.description}</p>
      {component.preview && (
        <div className="mb-4 p-3">{component.preview}</div>
      )}
      <div className="overflow-x-auto rounded mb-4">
        <Suspense fallback={<div>loading...</div>}>
          <SyntaxHighlighter language="tsx" customStyle={{ borderRadius: 8, fontSize: 14, margin: 0 }}>
            {component.code}
          </SyntaxHighlighter>
        </Suspense>
      </div>
      <div className="mt-auto flex justify-between gap-2">
        <Button
          title="Copy Liquid Glass UI Code"
          onClick={handleCopy}
        >
          <FaCopy className="inline mr-1" />
          {/* Copy Code */}
        </Button>
        <Button
          title="View Liquid Glass UI Showcase"
          color="blue"
          onClick={() =>
            (window.location.href = `/showcase/${component.name.toLowerCase()}`)
          }
        >
          <FaEye className="inline mr-1" />
          {/* View Showcase */}
        </Button>
      </div>
    </div>
  )};
  
export default ShowcaseCard;