
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from './Textarea';
import { Button } from './Button';
import { Feedback } from './Feedback';

export interface ImageQuizProps {
    imageUrl: string;
    question?: string;
    maxLength?: number;
    onSubmit?: (desc: string) => Promise<string | void>;
}

export const ImageQuiz: React.FC<ImageQuizProps> = ({ imageUrl, question, maxLength = 120, onSubmit }) => {
    const [desc, setDesc] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        if (onSubmit) {
            const result = await onSubmit(desc);
            if (typeof result === 'string') setFeedback(result);
        }
        setLoading(false);
    };

    return (
        <motion.div
            className="liquid-glass rounded-2xl p-6 shadow-glass bg-white/60 backdrop-blur w-full max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="flex flex-col md:flex-row gap-6 items-center w-full">
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <img src={imageUrl} alt="Image description" className="w-full max-h-64 object-contain rounded-xl shadow" />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    {question && <div className="text-base font-semibold text-emerald-700 mb-2 text-center md:text-left">{question}</div>}
                    <Textarea
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        placeholder="Please describe the content you see..."
                        maxLength={maxLength}
                        rows={4}
                        className="w-full"
                    />
                </div>
            </div>
            <div className="mt-2 w-full flex flex-col items-center">
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || !desc.trim()}
                        loading={loading}
                        color="emerald"
                    >
                        Submit
                    </Button>
                    {feedback && (
                        <Feedback correct={true} message={feedback} />
                    )}

        </div>
        </motion.div>
    );
};