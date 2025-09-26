import React from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Badge } from "./components/Badge";
import { Modal } from "./components/Modal";
import { Tooltip } from "./components/Tooltip";
import { Tabs } from "./components/Tabs";
import { Dropdown } from "./components/Dropdown";
import { ClozeInput } from "./components/ClozeInput";
import { Checkin } from "./components/Checkin";
import { CheckinCalendar } from "./components/CheckinCalendar";
import { LearningTimeline } from "./components/LearningTimeline";
import { ImageQuiz } from "./components/ImageQuiz";
import { Explanation } from "./components/Explanation";
import { ReadingVisualizer } from "./components/ReadingVisualizer";
import { AbilityRadar } from "./components/AbilityRadar";
import { Schedule } from "./components/Schedule";
import { ReadAloud } from "./components/ReadAloud";
import { PriceSets } from "./components/PriceSets";
import { AutoHighlight } from "./components/AutoHighlight";

const CheckboxPreview = React.lazy(() => import("./previews/CheckboxPreview"));
const InputPreview = React.lazy(() => import("./previews/InputPreview"));
const TablePreview = React.lazy(() => import("./previews/TablePreview"));
const QuestionNavPreview = React.lazy(() => import("./previews/QuestionNavPreview"));
const AIFlowPreview = React.lazy(() => import("./previews/AIFlowPreview"));
const RecorderPreview = React.lazy(() => import("./previews/RecorderPreview"));
const OrderingPreview = React.lazy(() => import("./previews/OrderingPreview"));
const AnswersheetPreview = React.lazy(() => import("./previews/AnswersheetPreview"));
const DatePickerPreview = React.lazy(() => import("./previews/DatePickerPreview"));
const SwitchPreview = React.lazy(() => import("./previews/SwtichPreview"));
const SidebarPreview = React.lazy(() => import("./previews/SidebarPreview"));
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
    name: "AutoHighlight",
    category: "Basic",
    preview: (
      <div className="space-y-4">
        <div className="text-lg font-semibold">AutoHighlight Example</div>
        <div className="text-4xl font-extrabold leading-tight">
          <AutoHighlight
            text="Why do the best experts choose Rush Analytics?"
            highlights={["the", "best experts", "choose", "Rush Analytics"]}
            color="#FFE066"
          />
        </div>
      </div>
    ),
    code: `<AutoHighlight
  text="Why do the best experts choose Rush Analytics?"
  highlights={["the", "best experts", "choose", "Rush Analytics"]}
  color="#FFE066"
/>`,
  },
  {
    name: "Button",
    category: "Basic",
    preview: <Button>Button</Button>,
    code: `<Button>Button</Button>`,
  },
  {
    name: 'Switch',
    category: 'Basic',
    preview: <SwitchPreview />,
    code: `<Switch checked={on} onChange={setOn} label="Glassmorphism Switch" />`,
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
      <Modal isOpen={true} onClose={() => { }}>
        Liquid Glass Modal Content: Experience frosted glass, vibrant highlights, and the best of Liquid Glass UI.
      </Modal>
    ),
    code: `<Modal isOpen={true} onClose={() => { }}>Liquid Glass Modal Content: Experience frosted glass, vibrant highlights, and the best of Liquid Glass UI.</Modal>`,
  },
  {
    name: 'Sidebar',
    category: 'Navigation',
    preview: <SidebarPreview />,
    code: `<Sidebar items={['Dashboard', { label: 'Profile', onClick: () => alert('Profile clicked!') }, 'Settings', 'Help']} activeIndex={active} onActiveChange={setActive} />`,
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
    name: "Answersheet",
    category: "Interactive",
    preview: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <AnswersheetPreview />
      </React.Suspense>
    ),
    grid: "full",
    code: `<AnswersheetRenderer id="answersheet" markdown={"# Liquid Glass Component SEO Answersheet\\n [id=section1 type=section topic=liquid-glass-ui]\\n ## Section 1: Liquid Glass UI Overview\\n 1. What is Liquid Glass UI?\\n - A modern UI library inspired by glassmorphism design principles, featuring frosted glass effects, vibrant gradients, and interactive components.\\n 2. List three key features of Liquid Glass UI.\\n - Frosted glass panels with blur effects\\n - Interactive learning components (quizzes, timelines)\\n - Seamless integration with React applications\\n [id=section2 type=section topic=components]\\n ## Section 2: Components in Liquid Glass UI\\n 1. Name five components provided by Liquid Glass UI.\\n - Button, Card, Modal, Tooltip, Tabs\\n 2. Describe the purpose of the AbilityRadar component.\\n - The AbilityRadar component visualizes multiple skill dimensions in a radar chart format, useful for displaying learning progress or skill assessments.\\n [id=section3 type=section topic=usage]\\n ## Section 3: Usage and Integration\\n 1. How do you install Liquid Glass UI in a React project?\\n - Using npm: npm install liquid-glass-ui or yarn add liquid-glass-ui\\n 2. Provide a basic example of using the Button component from Liquid Glass UI.\\n - import { Button } from 'liquid-glass-ui';\\n - <Button color='green'>Click Me</Button>"} onSubmit={(answers) => console.log(answers)} />`,
  },
  {
    name: "DatePicker",
    category: "Interactive",
    preview: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <DatePickerPreview />
      </React.Suspense>
    ),
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
    name: 'AIFlow',
    category: 'Interactive',
    preview: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <AIFlowPreview />
      </React.Suspense>
    )
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
      <React.Suspense fallback={<div>Loading...</div>}>
        <QuestionNavPreview />
      </React.Suspense>
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
      <React.Suspense fallback={<div>Loading...</div>}>
        <RecorderPreview />
      </React.Suspense>
    ),
    code:
      `<Recorder question="Please introduce yourself in English." maxDuration={30} onSubmit={blob => alert('Audio submitted! Size: ' + blob.size + ' bytes')} />\n` +
      `<Recorder question="Please read aloud the reference audio below." referenceAudio="/demo.mp3" maxDuration={20} onSubmit={blob => alert('Audio submitted! Size: ' + blob.size + ' bytes')} />`,
  },
  {
    name: "Table",
    category: "Layout",
    preview: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <TablePreview />
      </React.Suspense>
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
      <React.Suspense fallback={<div>Loading...</div>}>
        <CheckboxPreview />
      </React.Suspense>
    ),
    code: `<Checkbox label="I agree to the terms and conditions" checked={checked} onChange={setChecked} />`,
  },
  {
    name: "Input",
    category: "Basic",
    preview: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <InputPreview />
      </React.Suspense>
    ),
    code: `<Input placeholder="Enter text" label="Input Field" /> <Input label="Email" required validate={async (v) => !v.includes('@') ? 'Please enter a valid email' : ''} />`,
  },
  {
    name: "Ordering",
    category: "Interactive",
    preview: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <OrderingPreview />
      </React.Suspense>
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
export default allComponents;