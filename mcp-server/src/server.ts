const express = require('express');
const { createMcpServer, registerComponent } = require('@modelcontextprotocol/sdk');
const { z } = require('zod');

const app = express();
const port = process.env.PORT || 3000;



// GlassBadge 元数据 schema
const GlassBadgeSchema = z.object({
  color: z.string(),
  text: z.string(),
});

// GlassSidebar 元数据 schema
const GlassSidebarSchema = z.object({
  items: z.array(z.object({ label: z.string() })),
});

// GlassTooltip 元数据 schema
const GlassTooltipSchema = z.object({
  content: z.string(),
});

// GlassTabs 元数据 schema
const GlassTabsSchema = z.object({
  tabs: z.array(z.object({ label: z.string(), content: z.string() })),
});

// GlassDropdown 元数据 schema
const GlassDropdownSchema = z.object({
  label: z.string(),
  items: z.array(z.object({ label: z.string() })),
});

// GlassCheckbox 元数据 schema
const GlassCheckboxSchema = z.object({
  label: z.string(),
  checked: z.boolean(),
});

// GlassTable 元数据 schema
const GlassTableSchema = z.object({
  columns: z.array(z.object({ key: z.string(), title: z.string() })),
  data: z.array(z.record(z.any())),
});

// GlassOrdering 元数据 schema
const GlassOrderingSchema = z.object({
  items: z.array(z.string()),
});

// GlassClozeInput 元数据 schema
const GlassClozeInputSchema = z.object({
  text: z.string(),
  answers: z.array(z.string()),
  letterMode: z.boolean().optional(),
});

// GlassRecorder 元数据 schema
const GlassRecorderSchema = z.object({
  question: z.string(),
  maxDuration: z.number().optional(),
});

// GlassCheckin 元数据 schema
const GlassCheckinSchema = z.object({
  totalDays: z.number(),
});

// GlassCheckinCalendar 元数据 schema
const GlassCheckinCalendarSchema = z.object({
  records: z.record(z.array(z.number())),
});

// GlassLearningTimeline 元数据 schema
const GlassLearningTimelineSchema = z.object({
  nodes: z.array(z.object({ date: z.string(), title: z.string(), description: z.string(), status: z.string() })),
});

// GlassQuestionNav 元数据 schema
const GlassQuestionNavSchema = z.object({
  current: z.number(),
  total: z.number(),
  title: z.string(),
  countdown: z.number().optional(),
});

// GlassImageQuiz 元数据 schema
const GlassImageQuizSchema = z.object({
  imageUrl: z.string(),
  question: z.string(),
  maxLength: z.number().optional(),
});

// GlassExplanation 元数据 schema
const GlassExplanationSchema = z.object({
  answer: z.string(),
  explanation: z.string(),
});

// GlassReadingVisualizer 元数据 schema
const GlassReadingVisualizerSchema = z.object({
  text: z.string(),
  annotations: z.array(z.object({ start: z.number(), end: z.number(), type: z.string(), color: z.string(), note: z.string().optional() })).optional(),
});

// GlassAbilityRadar 元数据 schema
const GlassAbilityRadarSchema = z.object({
  title: z.string(),
  abilities: z.array(z.object({ name: z.string(), value: z.number(), color: z.string().optional() })),
});

// GlassSchedule 元数据 schema
const GlassScheduleSchema = z.object({
  items: z.array(z.object({ week: z.string(), date: z.string(), time: z.string(), title: z.string(), description: z.string(), tags: z.array(z.string()), color: z.string(), progress: z.number() })),
});

// GlassReadAloud 元数据 schema
const GlassReadAloudSchema = z.object({
  text: z.string(),
  lang: z.string().optional(),
});

// 注册组件元数据
const components = [
  { name: 'GlassBadge', schema: GlassBadgeSchema, description: '液态玻璃风格徽章组件' },
  { name: 'GlassSidebar', schema: GlassSidebarSchema, description: '液态玻璃风格侧边栏组件' },
  { name: 'GlassTooltip', schema: GlassTooltipSchema, description: '液态玻璃风格提示组件' },
  { name: 'GlassTabs', schema: GlassTabsSchema, description: '液态玻璃风格标签页组件' },
  { name: 'GlassDropdown', schema: GlassDropdownSchema, description: '液态玻璃风格下拉菜单组件' },
  { name: 'GlassCheckbox', schema: GlassCheckboxSchema, description: '液态玻璃风格复选框组件' },
  { name: 'GlassTable', schema: GlassTableSchema, description: '液态玻璃风格表格组件' },
  { name: 'GlassOrdering', schema: GlassOrderingSchema, description: '液态玻璃风格排序组件' },
  { name: 'GlassClozeInput', schema: GlassClozeInputSchema, description: '液态玻璃风格完形填空组件' },
  { name: 'GlassRecorder', schema: GlassRecorderSchema, description: '液态玻璃风格录音组件' },
  { name: 'GlassCheckin', schema: GlassCheckinSchema, description: '液态玻璃风格打卡组件' },
  { name: 'GlassCheckinCalendar', schema: GlassCheckinCalendarSchema, description: '液态玻璃风格打卡日历组件' },
  { name: 'GlassLearningTimeline', schema: GlassLearningTimelineSchema, description: '液态玻璃风格学习时间轴组件' },
  { name: 'GlassQuestionNav', schema: GlassQuestionNavSchema, description: '液态玻璃风格题目导航组件' },
  { name: 'GlassImageQuiz', schema: GlassImageQuizSchema, description: '液态玻璃风格图片题组件' },
  { name: 'GlassExplanation', schema: GlassExplanationSchema, description: '液态玻璃风格答案解析组件' },
  { name: 'GlassReadingVisualizer', schema: GlassReadingVisualizerSchema, description: '液态玻璃风格阅读可视化组件' },
  { name: 'GlassAbilityRadar', schema: GlassAbilityRadarSchema, description: '液态玻璃风格能力雷达组件' },
  { name: 'GlassSchedule', schema: GlassScheduleSchema, description: '液态玻璃风格学习计划组件' },
  { name: 'GlassReadAloud', schema: GlassReadAloudSchema, description: '液态玻璃风格点读组件' },
];

components.forEach(c => registerComponent(c));

// 创建 MCP Server
createMcpServer(app);

app.listen(port, () => {
  console.log(`Liquid Glass MCP Server 启动于 http://localhost:${port}`);
});
