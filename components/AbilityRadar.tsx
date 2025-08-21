import React from 'react';

export interface AbilityRadarProps {
  abilities: Array<{
    name: string;
    value: number; // 0-100
    color?: string;
  }>;
  max?: number;
  title?: string;
}

// 简单雷达图 SVG 实现
export const AbilityRadar: React.FC<AbilityRadarProps> = ({ abilities, max = 100, title }) => {
  const count = abilities.length;
  const angleStep = (2 * Math.PI) / count;
  const radius = 80;
  const center = 100;
  // 计算点坐标
  const points = abilities.map((a, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (a.value / max) * radius;
    return [
      center + r * Math.cos(angle),
      center + r * Math.sin(angle)
    ];
  });
  // 雷达区块路径
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ') + ' Z';
  return (
    <div className="liquid-glass rounded-2xl shadow-glass bg-white/60 backdrop-blur p-6 w-full max-w-md mx-auto flex flex-col items-center">
      {title && <div className="font-bold text-emerald-700 mb-2">{title}</div>}
      <svg width={200} height={230} viewBox="0 0 200 200">
        {/* 雷达网格 */}
        {[0.25,0.5,0.75,1].map((r, idx) => (
          <polygon
            key={r}
            points={abilities.map((a, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const rr = r * radius;
              return `${center + rr * Math.cos(angle)},${center + rr * Math.sin(angle)}`;
            }).join(' ')}
            fill="none"
            stroke="#d1fae5"
            strokeDasharray="2 2"
            strokeWidth={1}
          />
        ))}
        {/* 能力区块 */}
        <path
          d={path}
          fill="#34d39933"
          stroke="#10b981"
          strokeWidth={2}
        />
        {/* 能力点 */}
        {points.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={4} fill={abilities[i].color || '#10b981'} />
        ))}
        {/* 文字标签 */}
        {abilities.map((a, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelR = radius + 18;
          const x = center + labelR * Math.cos(angle);
          const y = center + labelR * Math.sin(angle);
          return (
            <text
              key={a.name}
              x={x}
              y={y}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize={13}
              fill="#176c4f"
              fontWeight={600}
            >
              {a.name}
            </text>
          );
        })}
      </svg>
      <div className="mt-4 grid grid-cols-2 gap-2 w-full">
        {abilities.map(a => (
          <div key={a.name} className="flex items-center gap-2 text-sm">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: a.color || '#10b981' }} />
            <span className="font-bold text-emerald-700">{a.name}</span>
            <span className="ml-auto text-gray-500">{a.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
