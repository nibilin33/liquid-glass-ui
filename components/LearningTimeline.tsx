import { motion } from 'framer-motion';

export interface LearningNode {
  date: string;
  title: string;
  description?: string;
  status?: 'done' | 'doing' | 'todo';
}

export interface LearningTimelineProps {
  nodes: LearningNode[];
  onNodeClick?: (node: LearningNode, index: number) => void; // 新增
}

export function LearningTimeline({ nodes, onNodeClick }: LearningTimelineProps) {
  return (
    <div className="w-full max-w-xl mx-auto py-6">
          <div className="relative pl-6" style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '6px',
              borderRadius: '6px',
              background: 'linear-gradient(to bottom, #d1fae5 0%, #a7f3d0 50%, #fff 100%)',
              zIndex: 0
            }} />
        {nodes.map((node, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, type: 'spring', stiffness: 320, damping: 22 }}
            className="mb-8 flex flex-col gap-2 relative"
            onClick={() => onNodeClick?.(node, idx)} // 新增
          >
            <div
              className="absolute -left-8 w-6 h-6 rounded-full bg-gradient-to-br from-white/80 via-emerald-100 to-white/60 border-2 border-emerald-300 shadow-lg flex items-center justify-center"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              {node.status === 'done' ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="9" stroke="#10B981" strokeWidth="2" fill="#ECFDF5" />
                  <path d="M6 10.5L9 13L14 7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : node.status === 'doing' ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
                  <circle cx="10" cy="10" r="8" stroke="#F59E42" strokeWidth="2" opacity="0.3" />
                  <path d="M10 2a8 8 0 018 8" stroke="#F59E42" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" stroke="#A7B3C2" strokeWidth="2" fill="#F3F4F6" />
                </svg>
              )}
            </div>
            <div className="liquid-glass rounded-xl px-5 py-4 shadow bg-white/70 backdrop-blur border border-emerald-100">
              <div className="text-xs text-emerald-500 font-bold mb-1">{node.date}</div>
              <div className="text-lg font-bold text-emerald-700 mb-1">{node.title}</div>
              {node.description && <div className="text-gray-500 text-sm">{node.description}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
