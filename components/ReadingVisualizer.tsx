import React from 'react';

export interface MindmapNode {
  id: string;
  title: string;
  children?: MindmapNode[];
  note?: string;
  color?: string;
}

export interface ReadingVisualizerProps {
  text: string;
  annotations: Array<{
    start: number;
    end: number;
    type: string;
    color?: string;
    note?: string;
  }>;
  mindmap: MindmapNode;
  defaultOpen?: boolean;
}

// 高亮文本渲染
function renderAnnotatedText(text: string, annotations: ReadingVisualizerProps['annotations']) {
  if (!annotations?.length) return <span>{text}</span>;
  // 按 start 排序，避免嵌套错乱
  const sorted = [...annotations].sort((a, b) => a.start - b.start);
  const result = [];
  let last = 0;
  sorted.forEach((ann, i) => {
    if (ann.start > last) {
      result.push(<span key={last + '-' + i}>{text.slice(last, ann.start)}</span>);
    }
    result.push(
      <mark
        key={ann.start + '-' + ann.end + '-' + i}
        className='p-1 rounded shadow-sm text-sm'
        style={{
          background: ann.color || 'rgba(16,185,129,0.18)',
          color: ann.color ? '#fff' : '#176c4f',
          fontWeight: 500,
        }}
        title={ann.note || ann.type}
      >
        {text.slice(ann.start, ann.end)}
      </mark>
    );
    last = ann.end;
  });
  if (last < text.length) {
    result.push(<span key={last + '-end'}>{text.slice(last)}</span>);
  }
  return result;
}

// 递归渲染思维导图
function MindmapTree({ node, depth = 0 }: { node: MindmapNode; depth?: number }) {
  return (
    <div style={{ marginLeft: depth ? 18 : 0, borderLeft: depth ? '2px solid #10b98122' : undefined, paddingLeft: depth ? 12 : 0 }}>
      <div
        className="flex items-center gap-2 mb-1"
        style={{ fontWeight: 600, color: node.color || '#176c4f', fontSize: depth ? 15 : 16 }}
      >
        <span>{node.title}</span>
        {node.note && <span className="text-xs text-gray-400">{node.note}</span>}
      </div>
      {node.children && node.children.length > 0 && (
        <div className="ml-2 mt-1 flex flex-col gap-1">
          {node.children.map(child => (
            <MindmapTree key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export const ReadingVisualizer: React.FC<ReadingVisualizerProps> = ({ text, annotations, mindmap, defaultOpen = true }) => {
  return (
    <div className="liquid-glass rounded-2xl shadow-glass bg-white/60 backdrop-blur p-6 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 w-full">
        <div className="font-semibold text-emerald-700 mb-2">阅读文本</div>
        <div className="text-base leading-relaxed text-gray-700">
          {renderAnnotatedText(text, annotations)}
        </div>
      </div>
      <div className="md:w-1/2 w-full">
        <div className="font-semibold text-emerald-700 mb-2">解题思维导图</div>
        <div className="bg-white/50 rounded-xl p-4 shadow">
          <MindmapTree node={mindmap} />
        </div>
      </div>
    </div>
  );
};
