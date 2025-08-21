import { SetStateAction, useState } from "react";
import { FaCopy, FaEye } from 'react-icons/fa';
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
import { ReadingVisualizer } from "../components/ReadingVisualizer";
import { AbilityRadar } from "../components/AbilityRadar";
import { Schedule } from "../components/Schedule";
import { ReadAloud } from "../components/ReadAloud";

const categories = ["All", "Basic", "Interactive", "Navigation", "Layout"];

const components = [
  {
    name: "Button",
    category: "Basic",
    preview: <Button>Button</Button>,
    code: `<Button>Button</Button>`,
  },
  {
    name: "Card",
    category: "Basic",
    preview: (
      <Card title="Liquid Glass Card">
        Experience the Liquid Glass UI modern glassmorphism effect with smooth gradients and glowing edges. Liquid Glass components make your interface shine.
      </Card>
    ),
    code: `<Card title="Liquid Glass Card">Experience the modern glassmorphism effect with smooth gradients and glowing edges.</Card>`,
  },
  {
    name: "Badge",
    category: "Basic",
    preview: (
      <div className="flex gap-2 flex-wrap">
        <Badge color="green">Liquid Glass Green</Badge>
        <Badge color="blue">Liquid Glass Blue</Badge>
        <Badge color="amber">Liquid Glass Yellow</Badge>
        <Badge color="red">Liquid Glass Red</Badge>
        <Badge color="teal">Liquid Glass Teal</Badge>
        <Badge color="gray">Liquid Glass Gray</Badge>
      </div>
    ),
    code:
      `<Badge color="green">Liquid Glass Green</Badge>\n` +
      `<Badge color="blue">Liquid Glass Blue</Badge>\n` +
      `<Badge color="amber">Liquid Glass Yellow</Badge>\n` +
      `<Badge color="red">Liquid Glass Red</Badge>\n` +
      `<Badge color="teal">Liquid Glass Teal</Badge>\n` +
      `<Badge color="gray">Liquid Glass Gray</Badge>`
  },
  {
    name: "Modal",
    category: "Interactive",
    preview: (
      <Modal open={true} title="Liquid Glass Modal">
        Liquid Glass Modal Content: Experience frosted glass, vibrant highlights, and the best of Liquid Glass UI.
      </Modal>
    ),
    code: `<Modal open={true} title="Liquid Glass Modal">Liquid Glass Modal Content: Experience frosted glass, vibrant highlights, and the best of Liquid Glass UI.</Modal>`,
  },
  {
    name: "Sidebar",
    category: "Navigation",
    preview: <Sidebar items={[{ label: "Home" }, { label: "Components" }]} />,
    code: `<Sidebar items={[{label: 'Liquid Glass Dashboard'}, {label: 'Liquid Glass UI'}]} />`,
  },
  {
    name: "Tooltip",
    category: "Interactive",
    preview: (
      <Tooltip content="Liquid Glass Tooltip Content">
        <Button>Hover for Liquid Glass Tooltip</Button>
      </Tooltip>
    ),
    code: `<Tooltip content="Liquid Glass Tooltip"><Button>Hover for a liquid glassy tip</Button></Tooltip>`,
  },
  {
    name: "Tabs",
    category: "Layout",
    preview: (
      <Tabs
        tabs={[
          { label: "Liquid Glass Overview", content: "Liquid Glass UI brings glassmorphism to education and design." },
          { label: "Liquid Glass Features", content: "Explore frosted panels, gradients, and interactive learning tools with Liquid Glass UI." },
        ]}
      />
    ),
    code: `<Tabs tabs={[{label: 'Liquid Glass Overview', content: 'Liquid Glass UI brings glassmorphism to education and design.'}, {label: 'Liquid Glass Features', content: 'Explore frosted panels, gradients, and interactive learning tools with Liquid Glass UI.'}]} />`,
  },
  {
    name: "Dropdown",
    category: "Interactive",
    preview: (
      <Dropdown
        label="Choose a Liquid Glass style"
        items={[
          { label: "Frosted Liquid Glass", onClick: () => {} },
          { label: "Gradient Liquid Glass", onClick: () => {} },
        ]}
      />
    ),
    code: `<Dropdown label="Choose a Liquid Glass style" items={[{ label: 'Frosted Liquid Glass', onClick: () => {} }, { label: 'Gradient Liquid Glass', onClick: () => {} }]} />`,
  },
];

export default function RootLayout() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("全部");
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  // 在渲染时插入 GlassCheckbox 示例
  const [tablePage, setTablePage] = useState(1);
  const tableColumns = [
    { key: "name", title: "Name", sortable: true },
    {
      key: "age",
      title: "Age",
      sortable: true,
      render: (v: any) => (
        <span className="font-bold text-emerald-600">{v}</span>
      ),
    },
    { key: "city", title: "City" },
  ];
  const tableData = [
    { name: "John", age: 22, city: "Shanghai" },
    { name: "Lisa", age: 28, city: "Beijing" },
    { name: "William", age: 35, city: "Guangzhou" },
    { name: "Zoe", age: 19, city: "Shenzhen" },
    { name: "Mason", age: 41, city: "Hangzhou" },
    { name: "Sunny", age: 25, city: "Chengdu" },
    { name: "Joe", age: 30, city: "Chongqing" },
    { name: "Wendy", age: 27, city: "Nanjing" },
    { name: "Edward", age: 33, city: "Suzhou" },
    { name: "Walter", age: 24, city: "Wuhan" },
  ];

  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState<number | undefined>(undefined);
  const allComponents = [
    {
      name: "Schedule",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">
            Review Plan (Grouped by Week, Long-term Example)
          </div>
          <Schedule
            items={[
              {
                week: "Week 1",
                date: "2025-08-21",
                time: "08:00",
                title: "Vocabulary Review",
                description: "Memorize core vocabulary",
                tags: ["English"],
                color: "#f59e42",
                progress: 80,
              },
              {
                week: "Week 1",
                date: "2025-08-22",
                time: "09:00",
                title: "Grammar Practice",
                description: "Complete grammar exercises",
                tags: ["English"],
                color: "#10b981",
                progress: 60,
              },
              {
                week: "Week 1",
                date: "2025-08-23",
                time: "10:00",
                title: "Listening Training",
                description: "30 min listening material",
                tags: ["English"],
                color: "#3b82f6",
                progress: 40,
              },
              {
                week: "Week 2",
                date: "2025-08-28",
                time: "08:00",
                title: "Reading Comprehension",
                description: "Intensive reading of 2 articles",
                tags: ["English"],
                color: "#6366f1",
                progress: 50,
              },
              {
                week: "Week 2",
                date: "2025-08-29",
                time: "09:00",
                title: "Writing Practice",
                description: "Write a short essay",
                tags: ["English"],
                color: "#f43f5e",
                progress: 30,
              },
              {
                week: "Week 2",
                date: "2025-08-30",
                time: "10:00",
                title: "Speaking Practice",
                description: "Record self-introduction",
                tags: ["English"],
                color: "#14b8a6",
                progress: 20,
              },
              {
                week: "Week 3",
                date: "2025-09-04",
                time: "08:00",
                title: "Vocabulary Review",
                description: "Review common mistakes",
                tags: ["English"],
                color: "#f59e42",
                progress: 70,
              },
              {
                week: "Week 3",
                date: "2025-09-05",
                time: "09:00",
                title: "Grammar Special",
                description: "Tense and voice summary",
                tags: ["English"],
                color: "#10b981",
                progress: 40,
              },
              {
                week: "Week 3",
                date: "2025-09-06",
                time: "10:00",
                title: "Mock Exam",
                description: "Full mock test",
                tags: ["English"],
                color: "#3b82f6",
                progress: 10,
              },
            ]}
          />
        </div>
      ),
      code: `<Schedule items={[{ week: '第1周', date: '2025-08-21', time: '08:00', title: '词汇复习', description: '背诵核心词汇', tags: ['英语'], color: '#f59e42', progress: 80 }, ...]} />`,
      grid: "full",
    },
    {
      name: "AbilityRadar",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">能力图谱雷达图示例</div>
          <AbilityRadar
            title="学习能力图谱"
            abilities={[
              { name: "词汇", value: 80, color: "#10b981" },
              { name: "语法", value: 65, color: "#3b82f6" },
              { name: "听力", value: 70, color: "#f59e42" },
              { name: "口语", value: 60, color: "#ef4444" },
              { name: "阅读", value: 90, color: "#6366f1" },
              { name: "写作", value: 55, color: "#14b8a6" },
            ]}
          />
        </div>
      ),
      code: `<AbilityRadar title="学习能力图谱" abilities={[{ name: '词汇', value: 80 }, { name: '语法', value: 65 }, { name: '听力', value: 70 }, { name: '口语', value: 60 }, { name: '阅读', value: 90 }, { name: '写作', value: 55 }]} />`,
      grid: "full",
    },
    {
      name: "ReadingVisualizer",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">
            阅读可视化（文本标注+思维导图）
          </div>
          <ReadingVisualizer
            text={
              "Start creating beautiful interfaces with Liquid Glass component library. Experience Apple's design system on the web. Perfect for building modern, education-focused platforms and interactive learning tools."
            }
            annotations={[
              {
                start: 0,
                end: 24,
                type: "Call to Action",
                color: "#10b981",
                note: "Get started",
              },
              {
                start: 89,
                end: 133,
                type: "Education",
                color: "#f59e42",
                note: "Education-focused",
              },
            ]}
            mindmap={{
              id: "root",
              title: "Showcase Structure",
              children: [
                {
                  id: "1",
                  title: "Glassmorphism UI",
                  note: "Apple-inspired design",
                },
                {
                  id: "2",
                  title: "Education Features",
                  children: [
                    {
                      id: "2-1",
                      title: "Learning Tools",
                      note: "Interactive components",
                    },
                    {
                      id: "2-2",
                      title: "Modern Classroom",
                      note: "Online education",
                    },
                  ],
                },
                {
                  id: "3",
                  title: "Easy Integration",
                  children: [
                    { id: "3-1", title: "Download & Use", note: "Quick setup" },
                  ],
                },
              ],
            }}
          />
        </div>
      ),
      code: `<ReadingVisualizer text="Start creating beautiful interfaces with Liquid Glass component library. Experience Apple's design system on the web. Perfect for building modern, education-focused platforms and interactive learning tools." annotations={[{ start: 0, end: 24, type: 'Call to Action', color: '#10b981', note: 'Get started' }, { start: 89, end: 133, type: 'Education', color: '#f59e42', note: 'Education-focused' }]} mindmap={{ id: 'root', title: 'Showcase Structure', children: [{ id: '1', title: 'Glassmorphism UI', note: 'Apple-inspired design', color: '#10b981' }, { id: '2', title: 'Education Features', children: [{ id: '2-1', title: 'Learning Tools', note: 'Interactive components' }, { id: '2-2', title: 'Modern Classroom', note: 'Online education' }] }, { id: '3', title: 'Easy Integration', children: [{ id: '3-1', title: 'Download & Use', note: 'Quick setup' }] }] }} />`,
      grid: "full",
    },
    {
      name: "ClozeInput",
      category: "交互",
      grid: "full",
      preview: (
        <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-2 text-xs text-gray-500">
              普通模式（每个空一个输入框）
            </div>
            <ClozeInput
              text="Last Saturday, our family decided to visit a corn maze for the first time. We {0} it {1} to {2} our {3} out, but we were completely {4}."
              answers={["thought", "would be easy", "find", "way", "wrong"]}
            />
          </div>
          <div>
            <div className="mb-2 text-xs text-gray-500">
              letter-by-letter 模式（每个字母一个输入框）
            </div>
            <ClozeInput
              text="The capital of France is {0}."
              answers={["Paris"]}
              letterMode
            />
          </div>
          <div className="md:col-span-2">
            <div className="mb-2 text-xs text-gray-500">
              letter-by-letter + prefill（部分字母预填）
            </div>
            <ClozeInput
              text="The capital of France is {0}."
              answers={["Paris"]}
              letterMode
              prefill={[["P", null, null, null, null]]}
            />
          </div>
        </div>
      ),
      code:
        `<ClozeInput text="Last Saturday, our family decided to visit a corn maze for the first time. We {0} it {1} to {2} our {3} out, but we were completely {4}." answers={["thought", "would be easy", "find", "way", "wrong"]} />\n` +
        `<ClozeInput text="The capital of France is {0}." answers={["Paris"]} letterMode />`,
    },

    {
      name: "ReadAloud",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">
            点读组件示例（点击单词播放语音）
          </div>
          <ReadAloud
            text="Start creating beautiful interfaces with Liquid Glass component library. Experience Apple's design system on the web. Perfect for building modern, education-focused platforms and interactive learning tools."
            lang="en-US"
          />
        </div>
      ),
      code: `<ReadAloud text="Start creating beautiful interfaces with Liquid Glass component library. Experience Apple's design system on the web. Perfect for building modern, education-focused platforms and interactive learning tools." lang="en-US" />`,
      grid: undefined,
    },
    {
      name: "Checkin",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-xs text-gray-500">打卡组件示例</div>
            <Checkin
              totalDays={21}
              onCheckin={(day) => alert(`已打卡第${day}天`)}
            />
          </div>
        </div>
      ),
      code: `<Checkin totalDays={21} onCheckin={day => alert('已打卡第' + day + '天')} />`,
    },
    {
      name: "CheckinCalendar",
      category: "交互",
      grid: "full",
      preview: (
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-xs text-gray-500">
              台历风格打卡组件示例（支持历史月份切换）
            </div>
            <CheckinCalendar
              records={{
                "2025-08": [1],
                "2025-07": [1],
              }}
            />
          </div>
        </div>
      ),
      code: `<CheckinCalendar
      records={{
                "2025-08": [1],
                "2025-07": [1]
              }}
    onCheckin={date => alert('已打卡：' + date)}
  />`,
    },
    {
      name: "LearningTimeline",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">
            学习轨迹时间轴组件示例
          </div>
          <LearningTimeline
            nodes={[
              {
                date: "2025-08-01",
                title: "单词记忆",
                description: "完成100个新单词",
                status: "done",
              },
              {
                date: "2025-08-02",
                title: "语法练习",
                description: "掌握时态用法",
                status: "doing",
              },
              {
                date: "2025-08-03",
                title: "听力训练",
                description: "听力材料30分钟",
                status: "todo",
              },
            ]}
          />
        </div>
      ),
      code: `<LearningTimeline\n  nodes={[\n    { date: '2025-08-01', title: '单词记忆', description: '完成100个新单词', status: 'done' },\n    { date: '2025-08-02', title: '语法练习', description: '掌握时态用法', status: 'doing' },\n    { date: '2025-08-03', title: '听力训练', description: '听力材料30分钟', status: 'todo' }\n  ]}\n/>`,
    },
    {
      name: "QuestionNav",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">
            套题导航组件示例（含倒计时自动下一题）
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <QuestionNav
              current={2}
              total={5}
              title="语法填空题"
              countdown={countdown}
              onPrev={() => true}
              onNext={() => true}
            />
            <Button onClick={() => setCountdown(8)}>显示计时</Button>
          </div>
        </div>
      ),
      code: `<QuestionNav
  current={2}
  total={5}
  title="语法填空题"
  countdown={countdown}
  onPrev={() => true}
  onNext={() => true}
/>
`,
    },
    {
      name: "Explanation",
      category: "交互",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">
            手风琴风格答案解析（支持 markdown）
          </div>
          <Explanation
            answer="42"
            explanation={
              "**解析：**\n\n- 这是一个示例 markdown 解析区块。\n- 支持列表、代码、引用等格式。\n\n> 你可以在这里展示详细解题思路。\n\n```js\nconsole.log('Hello, world!')\n```"
            }
            defaultOpen={false}
          />
        </div>
      ),
      code: `<Explanation answer="42" explanation={"**解析：**\n\n- 这是一个示例 markdown 解析区块。\n- 支持列表、代码、引用等格式。\n\n> 你可以在这里展示详细解题思路。\n\n\`\`\`js\nconsole.log('Hello, world!')\n\`\`\`"} />`,
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
              onSubmit={(blob) =>
                alert("已提交音频，大小：" + blob.size + "字节")
              }
            />
          </div>
          <div>
            <div className="mb-2 text-xs text-gray-500">跟读题录音示例</div>
            <Recorder
              question="请跟读下方原文音频。"
              referenceAudio="/demo.mp3"
              maxDuration={20}
              onSubmit={(blob) =>
                alert("已提交音频，大小：" + blob.size + "字节")
              }
            />
          </div>
        </div>
      ),
      code:
        `<Recorder question="请用英文介绍你自己。" maxDuration={30} onSubmit={blob => alert('已提交音频，大小：' + blob.size + '字节')} />\n` +
        `<Recorder question="请跟读下方原文音频。" referenceAudio="/demo.mp3" maxDuration={20} onSubmit={blob => alert('已提交音频，大小：' + blob.size + '字节')} />`,
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
      code: `<Table
  columns={[{ key: 'name', title: '姓名', sortable: true }, { key: 'age', title: '年龄', align: 'center', sortable: true, render: (v) => <span className='font-bold text-emerald-600'>{v}</span> }, { key: 'city', title: '城市' }]}
  data={[{ name: '张三', age: 22, city: '上海' }, ...]}
  page={tablePage}
  pageSize={5}
  total={tableData.length}
  onPageChange={setTablePage}
/>
`,
    },
    {
      name: "Checkbox",
      category: "基础",
      preview: (
        <Checkbox
          label="同意协议"
          checked={checkboxChecked}
          onChange={setCheckboxChecked}
        />
      ),
      code: `<Checkbox label="同意协议" checked={checked} onChange={setChecked} />`,
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
            validate={async (v: any) =>
              !v.includes("@") ? "请输入有效邮箱" : ""
            }
            placeholder="请输入邮箱"
          />
        </div>
      ),
      code: `<Input placeholder="输入内容" label="输入框" /> <Input label="邮箱" required validate={async (v) => !v.includes('@') ? '请输入有效邮箱' : ''} />`,
    },
    {
      name: "Ordering",
      category: "交互",
      preview: (
        <div>
          <div className="mb-2 text-xs text-gray-500">可拖拽列表项进行排序</div>
          <Ordering
            items={["苹果", "香蕉", "橙子"]}
            onChange={(newOrder) => console.log(newOrder)}
          />
        </div>
      ),
      code: `<Ordering items={["苹果", "香蕉", "橙子"]} onChange={newOrder => console.log(newOrder)} />`,
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
            onSubmit={async (desc) =>
              desc.length > 10 ? "描述已提交！" : "请补充更完整的描述。"
            }
          />
        </div>
      ),
      code: `<ImageQuiz imageUrl="/favicon.png" question="请用一句话描述下图内容。" maxLength={80} onSubmit={async desc => desc.length > 10 ? '描述已提交！' : '请补充更完整的描述。'} />`,
    },
    ...components,
  ];

  const filtered = allComponents.filter(
    (c) =>
      (category === "全部" || c.category === category) &&
      c.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      {/* SEO Canonical 链接，使用 next/head 以避免 hydration 错误 */}
      {typeof window === "undefined" ? null : null}
      <div className="container-prose py-8 min-h-screen">
        <div className="flex gap-4 mb-8 items-center">
          <Input
            placeholder="搜索组件…"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((c) => {
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
                  <div className="mb-4">{c.preview}</div>
                  <Badge>{c.category}</Badge>
                  <div className="mt-4 flex justify-between">
                    <Button
                      title="Copy Liquid Glass UI Code"
                      onClick={() => navigator.clipboard.writeText(c.code || "")}
                    >
                      <FaCopy className="inline" />
                    </Button>
                    <Button
                      title="View Liquid Glass UI Showcase"
                      color="blue"
                      onClick={() =>
                        (window.location.href = `/showcase/${c.name.toLowerCase()}`)
                      }
                    >
                      <FaEye className="inline" />
  
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
