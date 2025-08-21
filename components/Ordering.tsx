import { useState } from 'react';
import { Reorder, motion } from 'framer-motion';

export interface OrderingProps {
    items: string[];
    onChange?: (newOrder: string[]) => void;
}

export function Ordering({ items: initialItems, onChange }: OrderingProps) {
    const [items, setItems] = useState(initialItems);

    const handleReorder = (newOrder: string[]) => {
        setItems(newOrder);
        onChange?.(newOrder);
    };

    return (
        <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="flex flex-col gap-2">
            {items.map(item => (
                <Reorder.Item
                    key={item}
                    value={item}
                    whileDrag={{
                        scale: 1.08,
                        boxShadow: '0 8px 32px rgba(52,181,139,0.25)',
                        borderColor: '#34d399',
                        background: 'rgba(52,181,139,0.08)',
                    }}
                    className="group text-sm px-4 py-2 rounded-xl bg-white/60 backdrop-blur border border-emerald-100 shadow-glass cursor-grab select-none flex items-center gap-2 transition-all duration-150"
                >
                    <span className="text-emerald-400 mr-2 opacity-80 group-hover:opacity-100">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="6" cy="7" r="1.1" fill="currentColor" />
                            <circle cx="6" cy="13" r="1.1" fill="currentColor" />
                            <circle cx="10" cy="7" r="1.1" fill="currentColor" />
                            <circle cx="10" cy="13" r="1.1" fill="currentColor" />
                            <circle cx="14" cy="7" r="1.1" fill="currentColor" />
                            <circle cx="14" cy="13" r="1.1" fill="currentColor" />
                        </svg>
                    </span>
                    <span className="flex-1">{item}</span>
                </Reorder.Item>
            ))}
        </Reorder.Group>
    );
}
