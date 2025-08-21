import { SetStateAction, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Badge } from "../components/Badge";
import { Modal } from "../components/Modal";
import { Sidebar } from "../components/Sidebar";
import { Tooltip } from "../components/Tooltip";
import { Tabs } from "../components/Tabs";
import { Dropdown } from "../components/Dropdown";
import { Checkbox } from "../components/Checkbox";
import { Table } from "../components/Table";
import { Ordering } from "../components/Ordering";
import { ClozeInput } from "../components/ClozeInput";
import { Recorder } from "../components/Recorder";
import { Checkin } from "../components/Checkin";
import { CheckinCalendar } from "../components/CheckinCalendar";
import { LearningTimeline } from "../components/LearningTimeline";
import { QuestionNav } from "../components/QuestionNav";
import { ImageQuiz } from "../components/ImageQuiz";
import { Explanation } from "../components/Explanation";
const categories = ["全部", "基础", "交互", "导航", "布局"];

const components = [
  { name: "Button", category: "基础", preview: <Button>按钮</Button>, code: `<Button>按钮</Button>` },
  { name: "Card", category: "基础", preview: <Card title="卡片">内容</Card>, code: `<Card title="卡片">内容</Card>` },
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
    preview: <Modal open={true} title="弹窗标题">弹窗内容</Modal>,
    code: `<Modal open={true} title="弹窗标题">弹窗内容</Modal>`
  },
  {
    name: "Sidebar",
    category: "导航",
    preview: <Sidebar items={[{ label: "首页" }, { label: "组件库" }]} />,
    code: `<Sidebar items={[{label: '首页'}, {label: '组件库'}]} />`
  },
  {
    name: "Tooltip",
    category: "交互",
    preview: <Tooltip content="提示内容"><Button>悬停提示</Button></Tooltip>,
    code: `<Tooltip content="提示内容"><Button>悬停提示</Button></Tooltip>`
  },
  {
    name: "Tabs",
    category: "布局",
    preview: <Tabs tabs={[{ label: "Tab1", content: "内容1" }, { label: "Tab2", content: "内容2" }]} />,
    code: `<Tabs tabs={[{label: 'Tab1', content: '内容1'}, {label: 'Tab2', content: '内容2'}]} />`
  },
  {
    name: "Dropdown",
    category: "交互",
    preview: <Dropdown label="请选择" items={[{ label: "选项一", onClick: () => { } }, { label: "选项二", onClick: () => { } }]} />,
    code: `<Dropdown label="请选择" items={[{ label: '选项一', onClick: () => {} }, { label: '选项二', onClick: () => {} }]} />`
  },
];

export default function RootLayout() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("全部");
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  // 在渲染时插入 GlassCheckbox 示例
  const [tablePage, setTablePage] = useState(1);
  const tableColumns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', sortable: true, render: (v: any) => <span className="font-bold text-emerald-600">{v}</span> },
    { key: 'city', title: '城市' }
  ];
  const tableData = [
    { name: '张三', age: 22, city: '上海' },
    { name: '李四', age: 28, city: '北京' },
    { name: '王五', age: 35, city: '广州' },
    { name: '赵六', age: 19, city: '深圳' },
    { name: '钱七', age: 41, city: '杭州' },
    { name: '孙八', age: 25, city: '成都' },
    { name: '周九', age: 30, city: '重庆' },
    { name: '吴十', age: 27, city: '南京' },
    { name: '郑十一', age: 33, city: '苏州' },
    { name: '王十二', age: 24, city: '武汉' }
  ];

  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState<number | undefined>(undefined);
  const allComponents = [
    {
      name: "ClozeInput",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-xs text-gray-500">普通模式（每个空一个输入框）</div>
            <ClozeInput
              text="Last Saturday, our family decided to visit a corn maze for the first time. We {0} it {1} to {2} our {3} out, but we were completely {4}."
              answers={["thought", "would be easy", "find", "way", "wrong"]}
            />
          </div>
          <div>
            <div className="mb-2 text-xs text-gray-500">letter-by-letter 模式（每个字母一个输入框）</div>
            <ClozeInput
              text="The capital of France is {0}."
              answers={["Paris"]}
              letterMode
            />
          </div>
          <div>
            <div className="mb-2 text-xs text-gray-500">letter-by-letter + prefill（部分字母预填）</div>
            <ClozeInput
              text="The capital of France is {0}."
              answers={["Paris"]}
              letterMode
              prefill={[['P', null, null, null, null]]}
            />
          </div>
        </div>
      ),
      code:
        `<ClozeInput text="Last Saturday, our family decided to visit a corn maze for the first time. We {0} it {1} to {2} our {3} out, but we were completely {4}." answers={["thought", "would be easy", "find", "way", "wrong"]} />\n` +
        `<ClozeInput text="The capital of France is {0}." answers={["Paris"]} letterMode />`
    },
    {
      name: "Checkin",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-xs text-gray-500">打卡组件示例</div>
            <Checkin totalDays={21} onCheckin={day => alert(`已打卡第${day}天`)} />
          </div>
        </div>
      ),
      code:
        `<Checkin totalDays={21} onCheckin={day => alert('已打卡第' + day + '天')} />`
    },
    {
      name: "CheckinCalendar",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-xs text-gray-500">台历风格打卡组件示例（支持历史月份切换）</div>
            <CheckinCalendar
              records={{
                "2025-08": [1],
                "2025-07": [1]
              }}
            />
          </div>
        </div>
      ),
      code:
        `<CheckinCalendar
      records={{
                "2025-08": [1],
                "2025-07": [1]
              }}
    onCheckin={date => alert('已打卡：' + date)}
  />`
    },
    {
      name: "LearningTimeline",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">学习轨迹时间轴组件示例</div>
          <LearningTimeline
            nodes={[
              { date: "2025-08-01", title: "单词记忆", description: "完成100个新单词", status: "done" },
              { date: "2025-08-02", title: "语法练习", description: "掌握时态用法", status: "doing" },
              { date: "2025-08-03", title: "听力训练", description: "听力材料30分钟", status: "todo" }
            ]}
          />
        </div>
      ),
      code:
        `<LearningTimeline\n  nodes={[\n    { date: '2025-08-01', title: '单词记忆', description: '完成100个新单词', status: 'done' },\n    { date: '2025-08-02', title: '语法练习', description: '掌握时态用法', status: 'doing' },\n    { date: '2025-08-03', title: '听力训练', description: '听力材料30分钟', status: 'todo' }\n  ]}\n/>`
    },
    {
      name: "QuestionNav",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">套题导航组件示例（含倒计时自动下一题）</div>
          <div className="flex flex-col justify-center items-center gap-4">
            <QuestionNav
              current={2}
              total={5}
              title="语法填空题"
              countdown={countdown}
              onPrev={() => true}
              onNext={() => true}
            />
            <Button onClick={() => setCountdown(8)}>
              显示计时
            </Button>
          </div>

        </div>
      ),
      code:
        `<QuestionNav
  current={2}
  total={5}
  title="语法填空题"
  countdown={countdown}
  onPrev={() => true}
  onNext={() => true}
/>
`
    },
    {
      name: "Explanation",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">手风琴风格答案解析（支持 markdown）</div>
          <Explanation
            answer="42"
            explanation={"**解析：**\n\n- 这是一个示例 markdown 解析区块。\n- 支持列表、代码、引用等格式。\n\n> 你可以在这里展示详细解题思路。\n\n```js\nconsole.log('Hello, world!')\n```"}
            defaultOpen={false}
          />
        </div>
      ),
      code:
        `<Explanation answer="42" explanation={"**解析：**\n\n- 这是一个示例 markdown 解析区块。\n- 支持列表、代码、引用等格式。\n\n> 你可以在这里展示详细解题思路。\n\n\`\`\`js\nconsole.log('Hello, world!')\n\`\`\`"} />`
    },
    {
      name: "Recorder",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-xs text-gray-500">口语题录音示例</div>
            <Recorder
              question="请用英文介绍你自己。"
              maxDuration={30}
              onSubmit={blob => alert('已提交音频，大小：' + blob.size + '字节')}
            />
          </div>
          <div>
            <div className="mb-2 text-xs text-gray-500">跟读题录音示例</div>
            <Recorder
              question="请跟读下方原文音频。"
              referenceAudio="/demo.mp3"
              maxDuration={20}
              onSubmit={blob => alert('已提交音频，大小：' + blob.size + '字节')}
            />
          </div>
        </div>
      ),
      code:
        `<Recorder question="请用英文介绍你自己。" maxDuration={30} onSubmit={blob => alert('已提交音频，大小：' + blob.size + '字节')} />\n` +
        `<Recorder question="请跟读下方原文音频。" referenceAudio="/demo.mp3" maxDuration={20} onSubmit={blob => alert('已提交音频，大小：' + blob.size + '字节')} />`
    },
    {
      name: "Table",
      category: "布局",
      preview: (
        <div style={{ height: 320 }}>
          <Table
            columns={tableColumns}
            data={tableData}
            page={tablePage}
            pageSize={5}
            total={tableData.length}
            onPageChange={setTablePage}
          />
        </div>
      ),
      code:
        `<Table
  columns={[{ key: 'name', title: '姓名', sortable: true }, { key: 'age', title: '年龄', align: 'center', sortable: true, render: (v) => <span className='font-bold text-emerald-600'>{v}</span> }, { key: 'city', title: '城市' }]}
  data={[{ name: '张三', age: 22, city: '上海' }, ...]}
  page={tablePage}
  pageSize={5}
  total={tableData.length}
  onPageChange={setTablePage}
/>
`
    },
    {
      name: "Checkbox",
      category: "基础",
      preview: <Checkbox label="同意协议" checked={checkboxChecked} onChange={setCheckboxChecked} />,
      code: `<Checkbox label="同意协议" checked={checked} onChange={setChecked} />`
    },
    {
      name: "Input",
      category: "基础",
      preview: (
        <div>
          <Input placeholder="输入内容" label="输入框" />
          <div className="my-4" />
          <Input
            label="邮箱"
            required
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            validate={async (v: any) => !v.includes('@') ? '请输入有效邮箱' : ''}
            placeholder="请输入邮箱"
          />
        </div>
      ),
      code: `<Input placeholder="输入内容" label="输入框" /> <Input label="邮箱" required validate={async (v) => !v.includes('@') ? '请输入有效邮箱' : ''} />`
    },
    {
      name: "Ordering",
      category: "交互",
      preview: (
        <div>
          <div className="mb-2 text-xs text-gray-500">可拖拽列表项进行排序</div>
          <Ordering items={["苹果", "香蕉", "橙子"]} onChange={newOrder => console.log(newOrder)} />
        </div>
      ),
      code: `<Ordering items={["苹果", "香蕉", "橙子"]} onChange={newOrder => console.log(newOrder)} />`
    },
    {
      name: "ImageQuiz",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">看图描述题型示例</div>
          <ImageQuiz
            imageUrl="/favicon.png"
            question="请用一句话描述下图内容。"
            maxLength={80}
            onSubmit={async desc => desc.length > 10 ? "描述已提交！" : "请补充更完整的描述。"}
          />
        </div>
      ),
      code:
        `<ImageQuiz imageUrl="/favicon.png" question="请用一句话描述下图内容。" maxLength={80} onSubmit={async desc => desc.length > 10 ? '描述已提交！' : '请补充更完整的描述。'} />`
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
        <Input placeholder="搜索组件…" value={search} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearch(e.target.value)} className="w-64" />
        <div className="flex gap-2 overflow-x-auto flex-nowrap md:flex-wrap w-full scrollbar-hide">
          {categories.map(cat => (
            <Button key={cat} onClick={() => setCategory(cat)} color={category === cat ? "emerald" : "gray"} className="min-w-[80px]">
              {cat}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(c => (
          <Card key={c.name} title={c.name}>
            <div className="mb-4">{c.preview}</div>
            <Badge>{c.category}</Badge>
            <div className="mt-4 flex justify-between">
              <Button onClick={() => navigator.clipboard.writeText(c.code || "")}>复制源码</Button>
              <Button onClick={() => window.location.href = `/showcase/${c.name.toLowerCase()}`}>查看详情</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
