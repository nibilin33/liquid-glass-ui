import { useRouter } from 'next/router';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { JSX, useMemo } from 'react';

const componentMap: Record<string, { name: string; preview: JSX.Element; code: string }> = {
  button: {
    name: 'Button',
    preview: <Button>按钮</Button>,
    code: `<Button>按钮</Button>`
  },
  input: {
    name: 'Input',
    preview: <Input placeholder="输入内容" />, 
    code: `<Input placeholder=\"输入内容\" />`
  },
  card: {
    name: 'Card',
    preview: <Card title="卡片">内容</Card>,
    code: `<Card title=\"卡片\">内容</Card>`
  }
};

export default function ShowcaseDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const info = useMemo(() => slug && componentMap[String(slug).toLowerCase()], [slug]);

  if (!info) return <div className="p-8">未找到该组件</div>;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-200 via-emerald-300 to-gray-500">
      <h1 className="text-2xl font-bold mb-6 text-white drop-shadow">{info.name} 组件详情</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="实时预览">
          <div className="p-4">{info.preview}</div>
        </Card>
        <Card title="源码">
          <pre className="bg-gray-900 text-green-200 p-4 rounded-xl overflow-x-auto text-sm mb-4">{info.code}</pre>
          <Button onClick={() => navigator.clipboard.writeText(info.code)}>一键复制源码</Button>
        </Card>
      </div>
    </div>
  );
}
