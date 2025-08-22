import React, { useState } from "react";
import { motion } from "framer-motion";

export interface TableColumn {
    key: string;
    title: string;
    align?: "left" | "center" | "right";
    width?: string;
    sortable?: boolean;
    render?: (value: any, row: Record<string, any>, rowIndex: number) => React.ReactNode;
}

export interface TableProps {
    columns: TableColumn[];
    data: Record<string, any>[];
    className?: string;
    style?: React.CSSProperties;
    page?: number;
    pageSize?: number;
    total?: number;
    onPageChange?: (page: number) => void;
}

export const Table: React.FC<TableProps & { bodyHeight?: number | string }> = ({
    columns,
    data,
    className = "",
    style,
    page = 1,
    pageSize = 10,
    total,
    onPageChange,
    bodyHeight,
}) => {
    // 排序状态
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // 排序处理
    const sortedData = React.useMemo(() => {
        if (!sortKey) return data;
        return [...data].sort((a, b) => {
            if (a[sortKey] === b[sortKey]) return 0;
            if (sortOrder === 'asc') return a[sortKey] > b[sortKey] ? 1 : -1;
            return a[sortKey] < b[sortKey] ? 1 : -1;
        });
    }, [data, sortKey, sortOrder]);

    // 分页处理
    const totalCount = total ?? sortedData.length;
    const pageCount = Math.ceil(totalCount / pageSize);
    const currentPage = Math.max(1, Math.min(page, pageCount));
    const pagedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // 切换排序
    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    // 美化分页控件
    const renderPagination = () => {
        if (pageCount <= 1) return null;
        // 页码生成（最多显示7个，省略号）
        const pages: (number | string)[] = [];
        if (pageCount <= 7) {
            for (let i = 1; i <= pageCount; i++) pages.push(i);
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, '...', pageCount);
            } else if (currentPage >= pageCount - 3) {
                pages.push(1, '...', pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageCount);
            }
        }
        return (
            <div className="flex justify-end items-center gap-2 py-3 px-2 select-none">
                <button
                    className="liquid-glass px-2 py-1 rounded-xl text-sm text-emerald-700 font-semibold shadow-glass transition hover:scale-105 disabled:opacity-40"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange?.(currentPage - 1)}
                >Prev</button>
                {pages.map((p, idx) =>
                    typeof p === 'number' ? (
                        <button
                            key={p}
                            className={`px-3 py-1 rounded-xl mx-1 font-semibold shadow-glass transition text-base leading-tight
																							${p === currentPage
                                    ? 'bg-emerald-300 text-emerald-700 border border-emerald-300 cursor-default pointer-events-none'
                                    : 'text-gray-600 border border-emerald-300 hover:bg-emerald-100/40 hover:text-emerald-700'}
																						`}
                            style={{ minWidth: 28 }}
                            onClick={() => onPageChange?.(p)}
                            disabled={p === currentPage}
                        >{p}</button>
                    ) : (
                        <span key={idx} className="px-1 text-gray-400 text-base select-none">{p}</span>
                    )
                )}
                <button
                    className="liquid-glass text-sm px-2 py-1 rounded-xl text-emerald-700 font-semibold shadow-glass transition hover:scale-105 disabled:opacity-40"
                    disabled={currentPage === pageCount}
                    onClick={() => onPageChange?.(currentPage + 1)}
                >Next</button>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`liquid-glass rounded-2xl shadow-glass overflow-hidden ${className}`}
            style={style}
        >
            <div className="w-full">
                <div
                    style={{
                        maxHeight: bodyHeight !== undefined ? bodyHeight : undefined,
                        height: bodyHeight === undefined ? '100%' : undefined,
                        overflowY: 'auto',
                        width: '100%'
                    }}
                >
                    <table className="min-w-full text-sm text-gray-700" style={{ tableLayout: 'fixed' }}>
                        <thead className="sticky top-0 z-10 bg-transparent">
                            <tr>
                                {columns.map(col => (
                                    <th
                                        key={col.key}
                                        className="px-4 py-3 font-semibold text-emerald-700 bg-transparent select-none cursor-pointer"
                                        style={{ textAlign: col.align || "left", width: col.width || `${100 / columns.length}%` }}
                                        onClick={col.sortable ? () => handleSort(col.key) : undefined}
                                    >
                                        <span className="flex items-center gap-1">
                                            {col.title}
                                            {col.sortable && (
                                                <span className="ml-1">
                                                    {sortKey === col.key ? (
                                                        sortOrder === 'asc' ? (
                                                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="inline align-middle"><path d="M10 6l4 6H6l4-6z" fill="#10b981"/></svg>
                                                        ) : (
                                                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="inline align-middle"><path d="M10 14l-4-6h8l-4 6z" fill="#10b981"/></svg>
                                                        )
                                                    ) : (
                                                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="inline align-middle"><path d="M10 6l4 6H6l4-6z" fill="#d1d5db"/><path d="M10 14l-4-6h8l-4 6z" fill="#d1d5db"/></svg>
                                                    )}
                                                </span>
                                            )}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {pagedData.map((row, i) => (
                                <motion.tr
                                    key={i}
                                    whileHover={{ scale: 1.01, backgroundColor: "rgba(16,185,129,0.08)" }}
                                    className="transition-all"
                                >
                                    {columns.map(col => (
                                        <motion.td
                                            key={col.key}
                                            className={`px-4 py-2 border-b border-gray-100 ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}`}
                                            style={{ width: col.width || `${100 / columns.length}%` }}
                                        >
                                            {/* 保证加粗内容不影响宽度 */}
                                            <span className={col.align === 'center' ? 'inline-block w-full' : ''}>
                                                {col.render ? col.render(row[col.key], row, i) : row[col.key]}
                                            </span>
                                        </motion.td>
                                    ))}
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {pageCount > 1 && renderPagination()}
        </motion.div>
    );
}
