import { SetStateAction, useState, useRef } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import ShowcaseCard from '../previews/ShowcaseCard';
import allComponents from "../data";

const categories = ["All", "Basic", "Interactive", "Navigation", "Layout"];


export default function RootLayout() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = allComponents.filter(
    (c) =>
      (category === "All" || c.category === category) &&
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* SEO Canonical 链接，使用 next/head 以避免 hydration 错误 */}
      {typeof window === "undefined" ? null : null}
      <div className="container-prose py-8 min-h-screen">
        {/* 页面主标题 */}
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg mb-4 tracking-tight">
              Liquid Glass UI – Tailwind Glassmorphism React Components & Next.js Library
          </h1>
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium shadow mb-4">
              Modern Glassmorphism for Education, Next.js & Web Design
          </span>
        </div>
        {/* 简介段落 + SEO 优化信息 */}
        <section className="mb-10 mx-auto max-w-2xl rounded-xl bg-white/60 backdrop-blur-lg shadow-lg p-6 border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 tracking-tight">Empowering Modern Education & Design</h2>
          <p className="mb-3 text-gray-700 leading-relaxed">
            <span className="font-bold text-emerald-600">Liquid Glass UI</span> a modern glassmorphism React component library for Tailwind CSS and Next.js. It includes both essential UI elements (Button, Card, Modal, Table, etc.) and unique educational components (Quiz, Timeline, Check-in, Mindmap) for EdTech, dashboards, SaaS, and modern web apps.
          </p>
          <p className="mb-1 text-gray-700 leading-relaxed">
            <b>Key Features:</b> <br />
            <ul className="list-disc pl-5 mb-2">
              <li>Glassmorphism design: frosted panels, gradients, glowing effects</li>
              <li>Education-focused: interactive quizzes, timelines, check-in, mindmap, recorder, explanation</li>
              <li>Responsive & accessible: mobile-friendly, keyboard navigation, ARIA support</li>
              <li>Easy integration: plug-and-play React components, TypeScript support</li>
              <li>SEO optimized: semantic HTML, rich metadata, fast performance</li>
            </ul>
          </p>
          <p className="mb-1 text-gray-700 leading-relaxed">
            <b>Use Cases:</b> <br />
            <ul className="list-disc pl-5 mb-2">
              <li>Online education platforms, learning management systems (LMS)</li>
              <li>Quiz apps, exam systems, interactive classroom tools</li>
              <li>Portfolio sites, SaaS dashboards, glassmorphism landing pages</li>
              <li>Any project needing beautiful, modern, and educational UI components</li>
            </ul>
          </p>
          <p className="mb-1 text-gray-700 leading-relaxed">
            All components are documented with clear examples and use cases. Explore the showcase below to discover practical, expert-designed UI elements for your next project.
          </p>
        </section>
        {/* 搜索与分类 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Browse Components</h2>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search components…"
              value={search}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setSearch(e.target.value)
              }
              className="w-64"
            />
            <div className="flex gap-2 overflow-x-auto flex-nowrap md:flex-wrap w-full scrollbar-hide">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  color={category === cat ? "emerald" : "gray"}
                  className="min-w-[80px]"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </section>
        {/* 组件展示区块 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Component Showcase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((c:any) => {
              // grid === 'full' 时始终占据整行
              let gridStyle: React.CSSProperties | undefined = undefined;
              //@ts-ignore
              if (c.grid === "full") {
                gridStyle = { gridColumn: "1 / -1" };
              } else if ("grid" in c && c.grid) {
                // 仅在 md/lg 屏幕允许跨列，移动端单列
                gridStyle = {
                  gridColumn: `span 1 / span 1`,
                };
              }
              return (
                <div key={c.name} style={gridStyle}>
                  <Card title={c.name}>
                    <ShowcaseCard
                      component={c}
                    ></ShowcaseCard>
                  </Card>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
