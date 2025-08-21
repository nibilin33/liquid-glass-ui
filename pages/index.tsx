import { SetStateAction, useState } from "react";
import { GlassButton } from "../components/GlassButton";
import { GlassCard } from "../components/GlassCard";
import { GlassInput } from "../components/GlassInput";
import { Badge } from "../components/GlassBadge";
import { GlassModal } from "../components/GlassModal";
import { GlassSidebar } from "../components/GlassSidebar";
import { GlassTooltip } from "../components/GlassTooltip";
import { GlassTabs } from "../components/GlassTabs";
import { GlassDropdown } from "../components/GlassDropdown";
import { GlassCheckbox } from "../components/GlassCheckbox";

const categories = ["全部", "基础", "交互", "导航", "布局"];

const components = [
  { name: "Button", category: "基础", preview: <GlassButton>按钮</GlassButton>, code: `<GlassButton>按钮</GlassButton>` },
  { name: "Card", category: "基础", preview: <GlassCard title="卡片">内容</GlassCard>, code: `<GlassCard title="卡片">内容</GlassCard>` },
  { name: "Input", category: "基础", preview: <GlassInput placeholder="输入内容" />, code: `<GlassInput placeholder="输入内容" />` },
  // Checkbox 示例将在组件内动态生成
  {
    name: "Badge",
    category: "基础",
    preview: (
      <div className="flex gap-2 flex-wrap">
        <Badge color="green">绿色</Badge>
        <Badge color="blue">蓝色</Badge>
        <Badge color="amber">黄色</Badge>
        <Badge color="red">红色</Badge>
        <Badge color="teal">青色</Badge>
        <Badge color="gray">灰色</Badge>
      </div>
    ),
    code:
      `<Badge color="green">绿色</Badge>\n` +
      `<Badge color="blue">蓝色</Badge>\n` +
      `<Badge color="amber">黄色</Badge>\n` +
      `<Badge color="red">红色</Badge>\n` +
      `<Badge color="teal">青色</Badge>\n` +
      `<Badge color="gray">灰色</Badge>`
  },
  {
    name: "Modal",
    category: "交互",
    preview: <GlassModal open={true} title="弹窗标题">弹窗内容</GlassModal>,
    code: `<GlassModal open={true} title="弹窗标题">弹窗内容</GlassModal>`
  },
  {
    name: "Sidebar",
    category: "导航",
    preview: <GlassSidebar items={[{label: "首页"}, {label: "组件库"}]} />,
    code: `<GlassSidebar items={[{label: '首页'}, {label: '组件库'}]} />`
  },
  {
    name: "Tooltip",
    category: "交互",
    preview: <GlassTooltip content="提示内容"><GlassButton>悬停提示</GlassButton></GlassTooltip>,
    code: `<GlassTooltip content="提示内容"><GlassButton>悬停提示</GlassButton></GlassTooltip>`
  },
  {
    name: "Tabs",
    category: "布局",
    preview: <GlassTabs tabs={[{label: "Tab1", content: "内容1"}, {label: "Tab2", content: "内容2"}]} />,
    code: `<GlassTabs tabs={[{label: 'Tab1', content: '内容1'}, {label: 'Tab2', content: '内容2'}]} />`
  },
  {
    name: "Dropdown",
    category: "交互",
    preview: <GlassDropdown label="请选择" items={[{ label: "选项一", onClick: () => {} }, { label: "选项二", onClick: () => {} }]} />,
    code: `<GlassDropdown label="请选择" items={[{ label: '选项一', onClick: () => {} }, { label: '选项二', onClick: () => {} }]} />`
  },
];

export default function RootLayout() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("全部");
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  // 在渲染时插入 GlassCheckbox 示例
  const allComponents = [
    {
      name: "Checkbox",
      category: "基础",
      preview: <GlassCheckbox label="同意协议" checked={checkboxChecked} onChange={setCheckboxChecked} />,
      code: `<GlassCheckbox label="同意协议" checked={checked} onChange={setChecked} />`
    },
    ...components
  ];

  const filtered = allComponents.filter(c =>
    (category === "全部" || c.category === category) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="container-prose py-8 min-h-screen">
      <div className="flex gap-4 mb-8 items-center">
        <GlassInput placeholder="搜索组件…" value={search} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearch(e.target.value)} className="w-64" />
        <div className="flex gap-2 overflow-x-auto flex-nowrap md:flex-wrap w-full scrollbar-hide">
          {categories.map(cat => (
            <GlassButton key={cat} onClick={() => setCategory(cat)} color={category === cat ? "emerald" : "gray"} className="min-w-[80px]">
              {cat}
            </GlassButton>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(c => (
          <GlassCard key={c.name} title={c.name}>
            <div className="mb-4">{c.preview}</div>
            <Badge>{c.category}</Badge>
            <div className="mt-4 flex justify-between">
              <GlassButton onClick={() => navigator.clipboard.writeText(c.code || "")}>复制源码</GlassButton>
              <GlassButton onClick={() => window.location.href = `/showcase/${c.name.toLowerCase()}`}>查看详情</GlassButton>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
