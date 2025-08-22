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
import { PriceSets } from "components/PriceSets";

const categories = ["All", "Basic", "Interactive", "Navigation", "Layout"];

const components = [
  {
    name: "PriceSets",
    category: "Layout",
    grid: "full",
    preview: (
      <PriceSets
        sets={[
          {
            name: "Basic Plan",
            price: "$10/month",
            features: [ 
              { text: "Feature 1", supported: true },
              { text: "Feature 2", supported: false }
            ],
          },
          {
            name: "Pro Plan",
            price: "$20/month",
            features: [
              { text: "Feature 1", supported: true },
              { text: "Feature 2", supported: true },
              { text: "Feature 3", supported: false },
              { text: "Feature 4", supported: false }
            ],
            highlight: true,
          },
          {
            name: "Enterprise Plan",
            price: "$30/month",
            features: [
              { text: "Feature 1", supported: true },
              { text: "Feature 2", supported: true },
              { text: "Feature 3", supported: true },
              { text: "Feature 4", supported: false },
              { text: "Feature 5", supported: false }
            ],
          },
        ]}
      />
    ),
  },
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
          { label: "Overview", content: "Liquid Glass UI brings glassmorphism to education and design." },
          { label: "Features", content: "Explore frosted panels, gradients, and interactive learning tools with Liquid Glass UI." },
        ]}
      />
    ),
    code: `<Tabs tabs={[{label: 'Overview', content: 'Liquid Glass UI brings glassmorphism to education and design.'}, {label: 'Features', content: 'Explore frosted panels, gradients, and interactive learning tools with Liquid Glass UI.'}]} />`,
  },
  {
    name: "Dropdown",
    category: "Interactive",
    preview: (
      <Dropdown
        label="Choose a Liquid Glass style"
        items={[
          { label: "Frosted Liquid Glass", onClick: () => { } },
          { label: "Gradient Liquid Glass", onClick: () => { } },
        ]}
      />
    ),
    code: `<Dropdown label="Choose a Liquid Glass style" items={[{ label: 'Frosted Liquid Glass', onClick: () => {} }, { label: 'Gradient Liquid Glass', onClick: () => {} }]} />`,
  },
];

export default function RootLayout() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
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
      category: "Interactive",
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
      code: `<Schedule items={[{ week: 'Week 1', date: '2025-08-21', time: '08:00', title: 'Vocabulary Review', description: 'Memorize core vocabulary', tags: ['English'], color: '#f59e42', progress: 80 }, ...]} />`,
      grid: "full",
    },
    {
      name: "AbilityRadar",
      category: "Interactive",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">Ability Radar Chart Example (Liquid Glass UI for EdTech)</div>
          <AbilityRadar
            title="Learning Ability Radar (Liquid Glass UI)"
            abilities={[
              { name: "Vocabulary", value: 80, color: "#10b981" },
              { name: "Grammar", value: 65, color: "#3b82f6" },
              { name: "Listening", value: 70, color: "#f59e42" },
              { name: "Speaking", value: 60, color: "#ef4444" },
              { name: "Reading", value: 90, color: "#6366f1" },
              { name: "Writing", value: 55, color: "#14b8a6" },
            ]}
          />
        </div>
      ),
      code: `<AbilityRadar title="Learning Ability Radar (Liquid Glass UI)" abilities={[{ name: 'Vocabulary', value: 80 }, { name: 'Grammar', value: 65 }, { name: 'Listening', value: 70 }, { name: 'Speaking', value: 60 }, { name: 'Reading', value: 90 }, { name: 'Writing', value: 55 }]} />`,
      grid: "full",
    },
    {
      name: "ReadingVisualizer",
      category: "Interactive",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">
            Reading Visualization (Text Annotation + Mind Map)
          </div>
          <ReadingVisualizer
            text={
              "Build stunning glassmorphism interfaces with Liquid Glass UI—Apple-inspired, interactive, and education-ready. Perfect for online learning, quizzes, timelines, check-in, mindmaps, recorders, and rich explanations. Empower your EdTech platform with modern design and seamless user experience."
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
      code: `<ReadingVisualizer text="Build stunning glassmorphism interfaces with Liquid Glass UI—Apple-inspired, interactive, and education-ready. Perfect for online learning, quizzes, timelines, check-in, mindmaps, recorders, and rich explanations. Empower your EdTech platform with modern design and seamless user experience." annotations={[{ start: 0, end: 24, type: 'Call to Action', color: '#10b981', note: 'Get started' }, { start: 89, end: 133, type: 'Education', color: '#f59e42', note: 'Education-focused' }]} mindmap={{ id: 'root', title: 'Showcase Structure', children: [{ id: '1', title: 'Glassmorphism UI', note: 'Apple-inspired design', color: '#10b981' }, { id: '2', title: 'Education Features', children: [{ id: '2-1', title: 'Learning Tools', note: 'Interactive components' }, { id: '2-2', title: 'Modern Classroom', note: 'Online education' }] }, { id: '3', title: 'Easy Integration', children: [{ id: '3-1', title: 'Download & Use', note: 'Quick setup' }] }] }} />`,
      grid: "full",
    },
    {
      name: "ClozeInput",
      category: "Interactive",
      grid: "full",
      preview: (
        <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-2 text-xs text-gray-500">
              Normal Mode (One Input per Blank)
            </div>
            <ClozeInput
              text="Last Saturday, our family decided to visit a corn maze for the first time. We {0} it {1} to {2} our {3} out, but we were completely {4}."
              answers={["thought", "would be easy", "find", "way", "wrong"]}
            />
          </div>
          <div>
            <div className="mb-2 text-xs text-gray-500">
              Letter-by-letter Mode (One Input per Letter)
            </div>
            <ClozeInput
              text="The capital of France is {0}."
              answers={["Paris"]}
              letterMode
            />
          </div>
          <div className="md:col-span-2">
            <div className="mb-2 text-xs text-gray-500">
              Letter-by-letter + Prefill (Some Letters Pre-filled)
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
      category: "Interactive",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">
            Read Aloud Example (Click Word to Play Audio)
          </div>
          <ReadAloud
            text="Build stunning glassmorphism interfaces with Liquid Glass UI—Apple-inspired, interactive, and education-ready. Perfect for online learning, quizzes, timelines, check-in, mindmaps, recorders, and rich explanations. Empower your EdTech platform with modern design and seamless user experience."
            lang="en-US"
          />
        </div>
      ),
      code: `<ReadAloud text="Build stunning glassmorphism interfaces with Liquid Glass UI—Apple-inspired, interactive, and education-ready. Perfect for online learning, quizzes, timelines, check-in, mindmaps, recorders, and rich explanations. Empower your EdTech platform with modern design and seamless user experience." lang="en-US" />`,
      grid: undefined,
    },
    {
      name: "Checkin",
      category: "Interactive",
      preview: (
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-xs text-gray-500">Check-in Component Example</div>
            <Checkin
              totalDays={21}
              onCheckin={(day) => alert(`Checked in on day ${day}`)}
            />
          </div>
        </div>
      ),
      code: `<Checkin totalDays={21} onCheckin={day => alert('Checked in on day ' + day)} />`,
    },
    {
      name: "CheckinCalendar",
      category: "Interactive",
      grid: "full",
      preview: (
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-xs text-gray-500">
              Calendar-style Check-in (Supports Month Switching)
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
  onCheckin={date => alert('Checked in: ' + date)}
  />`,
    },
    {
      name: "LearningTimeline",
      category: "Interactive",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">
            Learning Timeline Component
          </div>
          <LearningTimeline
            nodes={[
              {
                date: "2025-08-01",
                title: "Vocabulary Memorization",
                description: "Completed 100 new words",
                status: "done",
              },
              {
                date: "2025-08-02",
                title: "Grammar Practice",
                description: "Mastered tense usage",
                status: "doing",
              },
              {
                date: "2025-08-03",
                title: "Listening Training",
                description: "30 minutes of listening material",
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
      category: "Interactive",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">
            Question Navigation Example (Countdown Auto Next, Glassmorphism, Interactive Quiz, EdTech)
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <QuestionNav
              current={2}
              total={5}
              title="Listening"
              countdown={countdown}
              onPrev={() => true}
              onNext={() => true}
            />
            <Button onClick={() => setCountdown(8)}>Show Countdown</Button>
          </div>
        </div>
      ),
      code: `<QuestionNav
  current={2}
  total={5}
  title="Listening Comprehension"
  countdown={countdown}
  onPrev={() => true}
  onNext={() => true}
/>
`,
    },
    {
      name: "Explanation",
      category: "Interactive",
      preview: (
        <div className="space-y-6">
            <div className="mb-2 text-xs text-gray-500">
              Glassmorphism Answer Explanation (Markdown Supported, Interactive, EdTech, Quiz, Learning)
            </div>
            <Explanation
              answer="42"
              explanation={
                "**Explanation:**\n\n- This is a sample markdown explanation block for interactive quizzes and education platforms built with Liquid Glass UI.\n- Supports lists, code, quotes, and rich formatting for glassmorphism learning experiences.\n\n> You can showcase detailed solution steps and reasoning here for better understanding.\n\n```js\nconsole.log('Hello, Liquid Glass UI!')\n```"
              }
              defaultOpen={false}
            />
        </div>
      ),
        code: `<Explanation answer="42" explanation={"**Explanation:**\n\n- This is a sample markdown explanation block for interactive quizzes and education platforms built with Liquid Glass UI.\n- Supports lists, code, quotes, and rich formatting for glassmorphism learning experiences.\n\n> You can showcase detailed solution steps and reasoning here for better understanding.\n\n\`\`\`js\nconsole.log('Hello, Liquid Glass UI!')\n\`\`\`"} />`,
    },
    {
      name: "Recorder",
      category: "Interactive",
      preview: (
        <div className="space-y-6">
          <div>
              <div className="mb-2 text-xs text-gray-500">Speaking Recorder</div>
              <Recorder
                question="Please introduce yourself in English."
                maxDuration={30}
                onSubmit={(blob) =>
                  alert("Audio submitted! Size: " + blob.size + " bytes")
                }
              />
          </div>
          <div>
              <div className="mb-2 text-xs text-gray-500">Read-Aloud Recorder</div>
              <Recorder
                question="Please read aloud the reference audio below."
                referenceAudio="/demo.mp3"
                maxDuration={20}
                onSubmit={(blob) =>
                  alert("Audio submitted! Size: " + blob.size + " bytes")
                }
              />
          </div>
        </div>
      ),
        code:
          `<Recorder question="Please introduce yourself in English." maxDuration={30} onSubmit={blob => alert('Audio submitted! Size: ' + blob.size + ' bytes')} />\n` +
          `<Recorder question="Please read aloud the reference audio below." referenceAudio="/demo.mp3" maxDuration={20} onSubmit={blob => alert('Audio submitted! Size: ' + blob.size + ' bytes')} />`,
    },
    {
      name: "Table",
      category: "Layout",
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
      category: "Basic",
      preview: (
        <Checkbox
          label="I agree to the terms and conditions"
          checked={checkboxChecked}
          onChange={setCheckboxChecked}
        />
      ),
      code: `<Checkbox label="I agree to the terms and conditions" checked={checked} onChange={setChecked} />`,
    },
    {
      name: "Input",
      category: "Basic",
      preview: (
        <div>
          <Input placeholder="Enter text" label="Input Field" />
          <div className="my-4" />
          <Input
            label="Email"
            required
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            validate={async (v: any) =>
              !v.includes("@") ? "Please enter a valid email" : ""
            }
            placeholder="Please enter your email"
          />
        </div>
      ),
      code: `<Input placeholder="Enter text" label="Input Field" /> <Input label="Email" required validate={async (v) => !v.includes('@') ? 'Please enter a valid email' : ''} />`,
    },
    {
      name: "Ordering",
      category: "Interactive",
      preview: (
        <div>
          <div className="mb-2 text-xs text-gray-500">Draggable list items for sorting</div>
          <Ordering
            items={["Apple", "Banana", "Orange"]}
            onChange={(newOrder) => console.log(newOrder)}
          />
        </div>
      ),
      code: `<Ordering items={["Apple", "Banana", "Orange"]} onChange={newOrder => console.log(newOrder)} />`,
    },
    {
      name: "ImageQuiz",
      category: "Interactive",
      grid: "full",
      preview: (
        <div className="space-y-6">
          <div className="mb-2 text-xs text-gray-500">Image Description Quiz Example</div>
          <ImageQuiz
            imageUrl="/favicon.png"
            question="Please describe the content of the image below in one sentence."
            maxLength={80}
            onSubmit={async (desc) =>
              desc.length > 10 ? "Description submitted!" : "Please provide a more complete description."
            }
          />
        </div>
      ),
      code: `<ImageQuiz imageUrl="/favicon.png" question="Please describe the content of the image below in one sentence." maxLength={80} onSubmit={async desc => desc.length > 10 ? 'Description submitted!' : 'Please provide a more complete description.'} />`,
    },
    ...components,
  ];

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
            Liquid Glass UI Component Library
          </h1>
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium shadow mb-4">
            Modern Glassmorphism for Education & Web Design
          </span>
        </div>
        {/* 简介段落 + SEO 优化信息 */}
        <section className="mb-10 mx-auto max-w-2xl rounded-xl bg-white/60 backdrop-blur-lg shadow-lg p-6 border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 tracking-tight">Empowering Modern Education & Design</h2>
          <p className="mb-3 text-gray-700 leading-relaxed">
            <span className="font-bold text-emerald-600">Liquid Glass UI</span> is a cutting-edge React component library featuring glassmorphism, interactive quizzes, timelines, check-in calendars, mindmaps, recorders, and markdown explanations. Perfect for EdTech, online learning, and modern web design.
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
        </section>
      </div>
    </>
  );
}
