import React, { useRef } from "react";
import { AIFlow, AIFlowRef, AINode } from "../../components/AIFlow";
import { Button } from "../../components/Button";

export default function AIFlowPreview() {
  const flowRef = useRef<AIFlowRef>(null);
  const testNodes: AINode[] = [
    {
      id: 'plan-1',
      type: 'normal',
      title: '📚 AI Study Plan: Reading Overview',
      output: [
        '**Goal:** Improve reading comprehension and speed.',
        '- Duration: 2 weeks',
        '- Daily reading: 30 minutes',
        '- Focus: News articles, short stories, science texts'
      ]
    },
    {
      id: 'plan-2',
      type: 'normal',
      title: 'Step 1: Baseline Test',
      output: [
        'Take a baseline reading test to assess your current level.',
        '- [Start Test](#)',
        '- Record your speed and accuracy.'
      ]
    },
    {
      id: 'plan-3',
      type: 'normal',
      title: 'Step 2: Daily Practice',
      output: [
        'Read one article per day and summarize the main idea.',
        '- Use [ReadingVisualizer] for annotation.',
        '- Track progress in [Schedule] and [Timeline].'
      ]
    },
    {
      id: 'plan-4',
      type: 'action',
      title: 'Step 3: Weekly Review & Quiz',
      output: [
        'Review your summaries and take a weekly quiz.',
        '- [Start Quiz](#)',
        '- Get instant feedback and explanation.'
      ],
      onConfirm: () => alert('Weekly quiz started!')
    },
    {
      id: 'plan-5',
      type: 'normal',
      title: 'Step 4: Progress Report',
      output: [
        'AI will generate a progress report based on your reading logs and quiz results.',
        '- View radar chart and timeline.',
        '- Get personalized suggestions for next stage.'
      ]
    }
  ];

  const handleAddNode = () => {
    flowRef.current?.reset();
    let idx = 0;
    const pushNext = () => {
      if (idx < testNodes.length) {
        flowRef.current?.addNode(testNodes[idx]);
        idx++;
        setTimeout(pushNext, 1000);
      }
    };
    pushNext();
  };

  return (
    <>
      <div className="mb-2 text-xs text-gray-500">
        AIFlow: Supports AI Workflow Output & Streamed Display
        Showcase AI-generated workflows, study plans, and interactive flows with glassmorphism style. Supports streamed node output and dynamic AI process visualization.
      </div>
      <AIFlow nodes={[
        {
          id: '1',
          type: 'normal',
          title: 'Introduction',
          output: ['Welcome to the AIFlow demo!']
        },{
          id: '2',
          type: 'action',
          title: 'Get Started',
          onConfirm: () => alert('Getting Started...')
        }
      ]} ref={flowRef}/>
      <div className="mt-4"></div>
      <Button onClick={handleAddNode}>Show More Flow Node</Button>
    </>
  );
}