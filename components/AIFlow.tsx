import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export interface AINode {
	id: string;
	type: 'normal' | 'action';
	title: string;
	childrenIds?: string[]; // 子节点 id 数组
	output?: string[];
	onConfirm?: () => void;
}

interface AIFlowProps {
	nodes: AINode[];
	rootIds?: string[]; // 可指定渲染的根节点 id
}


export const AIFlow: React.FC<AIFlowProps> = ({ nodes, rootIds }) => {
	// 构建 id 到节点的索引
	const nodeMap = React.useMemo(() => {
		const map: Record<string, AINode> = {};
		nodes.forEach(n => { map[n.id] = n; });
		return map;
	}, [nodes]);

	// 默认渲染所有节点或指定根节点
	const renderIds = rootIds || nodes.map(n => n.id);

	return (
		<div className="space-y-6">
			{renderIds.map(id => (
				nodeMap[id] ? <AINodeCard key={id} node={nodeMap[id]} nodeMap={nodeMap} /> : null
			))}
		</div>
	);
};

const AINodeCardComp: React.FC<{ node: AINode; nodeMap: Record<string, AINode> }> = ({ node, nodeMap }) => {
	const [outputIdx, setOutputIdx] = useState(node.output ? node.output.length : 0);

	React.useEffect(() => {
		if (node.output && outputIdx < node.output.length) {
			const timer = setTimeout(() => setOutputIdx(outputIdx + 1), 600);
			return () => clearTimeout(timer);
		}
	}, [outputIdx, node.output]);

		return (
				<motion.div
					className={`relative rounded-3xl border-2 p-7 md:p-8 shadow-2xl backdrop-blur-xl transition-all
						${node.type === 'action'
							? 'border-emerald-400 bg-gradient-to-br from-emerald-200/70 via-white/80 to-emerald-100/80 shadow-emerald-300/30'
							: 'border-gray-200 bg-gradient-to-br from-white/60 via-emerald-100/40 to-white/80'}
					`}
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, type: 'spring', stiffness: 320, damping: 22 }}
				>
						<div className="font-extrabold text-xl md:text-2xl mb-3 flex items-center gap-2 drop-shadow-sm">
							<span className={node.type === 'action' ? 'text-emerald-700' : 'text-emerald-600'}>
								{node.title}
							</span>
							{node.type === 'action' && (
								<span className="px-2 py-0.5 rounded-xl bg-emerald-100/80 text-emerald-600 text-xs font-semibold shadow">Action</span>
							)}
						</div>
				{/* 流式输出区（支持 markdown） */}
						{node.output && (
							<div className="mb-3 text-base text-emerald-700 min-h-[24px] font-medium">
								{node.output.slice(0, outputIdx).map((line, i) => (
									<motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
										<ReactMarkdown
											components={{
												strong: ({ children }) => <strong className="text-emerald-600 font-bold">{children}</strong>,
												code: ({ children }) => <code className="bg-emerald-50 px-1 py-0.5 rounded text-emerald-700 font-mono text-xs">{children}</code>,
												a: ({ children, ...props }) => <a {...props} className="text-emerald-500 underline hover:text-emerald-700" />,
												ul: ({ children }) => <ul className="list-disc pl-5 text-emerald-700">{children}</ul>,
												li: ({ children }) => <li className="mb-1">{children}</li>,
											}}
										>{line}</ReactMarkdown>
									</motion.div>
								))}
							</div>
						)}
				{/* 动作类节点按钮 */}
						{node.type === 'action' && node.onConfirm && (
							<button
								className="mt-2 px-5 py-2 rounded-2xl bg-emerald-400 text-white font-bold shadow-lg hover:bg-emerald-500 transition-all text-base"
								onClick={node.onConfirm}
							>
								Confirm & Execute
							</button>
						)}
				{/* 子节点递归渲染（通过 childrenIds 查找） */}
						{node.childrenIds && node.childrenIds.length > 0 && (
							<div className="mt-4 pl-4 border-l-2 border-emerald-200/60 space-y-4">
								{node.childrenIds.map(cid => (
									nodeMap[cid] ? <AINodeCard key={cid} node={nodeMap[cid]} nodeMap={nodeMap} /> : null
								))}
							</div>
						)}
			</motion.div>
		);
	};

	const AINodeCard = React.memo(AINodeCardComp, (prev, next) => {
		// 只在 node 或 nodeMap 变更时重新渲染
		return prev.node === next.node && prev.nodeMap === next.nodeMap;
	});