import { SetStateAction, useState } from "react";
import { GlassButton } from "../../components/GlassButton";
import { GlassCard } from "../../components/GlassCard";
import { GlassInput } from "../../components/GlassInput";
import { Badge } from "../../components/GlassBadge";

const components = [
  { name: "Button", category: "基础", preview: <GlassButton>按钮</GlassButton>, code: `<GlassButton>按钮</GlassButton>` },
  { name: "Card", category: "基础", preview: <GlassCard title="卡片">内容</GlassCard>, code: `<GlassCard title="卡片">内容</GlassCard>` },
  { name: "Input", category: "基础", preview: <GlassInput placeholder="输入内容" />, code: `<GlassInput placeholder="输入内容" />` },
  { name: "Badge", category: "基础", preview: <Badge>徽章</Badge>, code: `<Badge>徽章</Badge>` },
];

const categories = ["全部", "基础"];

export default function ShowcaseHome() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("全部");
  const filtered = components.filter(c =>
    (category === "全部" || c.category === category) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-8">
      <div className="flex gap-4 mb-8 items-center">
        <GlassInput placeholder="搜索组件…" value={search} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearch(e.target.value)} className="w-64" />
        <div className="flex gap-2">
          {categories.map(cat => (
            <GlassButton key={cat} onClick={() => setCategory(cat)} color={category === cat ? "emerald" : "gray"}>{cat}</GlassButton>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(c => (
          <GlassCard key={c.name} title={c.name}>
            <div className="mb-4">{c.preview}</div>
            <Badge>{c.category}</Badge>
            <div className="mt-4 flex justify-between">
              <GlassButton onClick={() => navigator.clipboard.writeText(c.code)}>复制源码</GlassButton>
              <GlassButton onClick={() => window.location.href = `/showcase/${c.name.toLowerCase()}`}>查看详情</GlassButton>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
