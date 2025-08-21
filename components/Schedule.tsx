import React from 'react';
import { motion } from 'framer-motion';

export interface ScheduleItem {
  time: string; // 起始时间（如 08:00 或 2025-08-21）
  endTime?: string; // 结束时间（如 09:00 或 2025-08-21）
  week?: string; // 周次分组（如 "第1周"）
  date?: string; // 日期（如 "2025-08-21"）
  title: string;
  description?: string;
  color?: string;
  stage?: string; // 阶段分组
  tags?: string[]; // 标签
  progress?: number; // 进度百分比
}

export interface ScheduleProps {
  items: ScheduleItem[];
  className?: string;
}

export function Schedule({ items, className = '' }: ScheduleProps) {
  // 按周分组
  const grouped = items.reduce((acc, item) => {
    const key = item.week || item.stage || '默认分组';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  return (
    <div className={`w-full max-w-3xl mx-auto p-2 ${className}`}>
      <div className="flex flex-col gap-2">
        {Object.entries(grouped).map(([week, weekItems], sIdx) => (
          <div key={week} className="mb-2">
            <div className="mb-1 text-xs font-bold text-emerald-600 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2" />
              {week}
              {/* 展示日期区间 */}
              {weekItems.length > 0 && weekItems[0].date && weekItems[weekItems.length-1].date && (
                <span className="ml-2 text-gray-400 font-normal">{weekItems[0].date} ~ {weekItems[weekItems.length-1].date}</span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {weekItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: sIdx * 0.1 + idx * 0.04 }}
                  className={`liquid-glass rounded-lg shadow-glass border border-white/30 backdrop-blur px-3 py-2 flex flex-col gap-1 min-h-[56px] ${item.color ? 'text-white' : 'text-emerald-800'}`}
                  style={{ background: item.color ? item.color : 'rgba(255,255,255,0.7)' }}
                >
                  <div className={`flex items-center gap-2 text-xs font-mono ${item.color ? 'text-white/80' : 'text-gray-500'}`}>
                    <span>{item.date ? item.date : item.time}{item.endTime ? ` ~ ${item.endTime}` : ''}</span>
                    {item.tags && item.tags.map((tag, i) => (
                      <span key={i} className={`px-1 py-0.5 rounded-full ${item.color ? 'bg-white/30 text-white' : 'bg-emerald-100/60 text-emerald-600'} text-[10px] font-medium border border-emerald-200`}>{tag}</span>
                    ))}
                  </div>
                  <div className={`font-semibold text-sm truncate ${item.color ? 'text-white' : 'text-emerald-700'}`} title={item.title}>{item.title}</div>
                  {item.description && <div className={`text-xs leading-relaxed truncate ${item.color ? 'text-white/80' : 'text-gray-600'}`} title={item.description}>{item.description}</div>}
                  {typeof item.progress === 'number' && (
                    <div className={`w-full h-1.5 rounded-full overflow-hidden shadow-glass mt-1 ${item.color ? 'bg-white/30' : 'bg-emerald-100/60'}`}>
                      <motion.div
                        className="h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
