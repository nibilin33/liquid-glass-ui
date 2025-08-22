import React, { useState, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import{ Button } from './Button';

export interface AINode {
  id: string;
  type: 'normal' | 'action';
  title: string;
  childrenIds?: string[];
  output?: string[];
  onConfirm?: () => void;
}

export interface AIFlowProps {
  nodes?: AINode[];
  rootIds?: string[];
}

export interface AIFlowRef {
  addNode: (node: AINode) => void;
  reset: () => void;
}

export const AIFlow = React.forwardRef<AIFlowRef, AIFlowProps>(
	({ nodes: initialNodes = [], rootIds }, ref) => {
		const [nodes, setNodes] = useState<AINode[]>(initialNodes);

		useImperativeHandle(ref, () => ({
			addNode: (node: AINode) => {
				setNodes(prev => [...prev, node]);
			},
			reset: () => {
				setNodes(initialNodes);
			}
		}), []);

		const nodeMap = React.useMemo(() => {
			const map: Record<string, AINode> = {};
			nodes.forEach(n => { map[n.id] = n; });
			return map;
		}, [nodes]);

		const renderIds = rootIds || nodes.map(n => n.id);

		return (
			<div className="space-y-6">
						{renderIds.map((id: string, idx) => (
							nodeMap[id] ? (
								<div key={id} className="relative w-full flex flex-row items-start">
									{/* 左侧连线区 */}
									<div className="flex flex-col items-center mr-4">
										<div className="w-2 h-6" />
										<div className="w-1 h-24 bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-200 rounded-full shadow-emerald-200/40 animate-pulse" style={{ visibility: idx < renderIds.length - 1 ? 'visible' : 'hidden' }} />
									</div>
									<div className="flex-1">
										<AINodeCard node={nodeMap[id]} nodeMap={nodeMap} />
									</div>
								</div>
							) : null
						))}
			</div>
		);
	}
);

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
					className={`relative rounded-xl border-2 p-4 shadow-2xl backdrop-blur-xl transition-all
						${node.type === 'action'
							? 'border-emerald-400 bg-gradient-to-br from-emerald-200/70 via-white/80 to-emerald-100/80 shadow-emerald-300/30'
							: 'border-gray-200 bg-gradient-to-br from-white/60 via-emerald-100/40 to-white/80'}
					`}
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, type: 'spring', stiffness: 320, damping: 22 }}
				>
						<div className="font-extrabold text-sm md:text-md mb-3 flex items-center gap-2 drop-shadow-sm">
							<span className={node.type === 'action' ? 'text-emerald-700' : 'text-emerald-600'}>
								{node.title}
							</span>
							{node.type === 'action' && (
								<span className="px-2 py-0.5 rounded-xl bg-emerald-100/80 text-emerald-600 text-xs font-semibold shadow">Action</span>
							)}
						</div>
				{/* 流式输出区（支持 markdown） */}
						{node.output && (
							<div className="ml-3 mb-3 text-sm min-h-[24px] font-medium">
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
							<Button
								size="sm"
								onClick={node.onConfirm}
							>
								Confirm & Execute
							</Button>
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