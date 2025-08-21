import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { FaMicrophone, FaStop, FaRedo, FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
export interface RecorderProps {
    question?: string; // 题目文本
    referenceAudio?: string; // 跟读原文音频
    maxDuration?: number; // 最长录音时长（秒）
    onSubmit?: (audioBlob: Blob) => void; // 回传音频
}

export function Recorder({ question, referenceAudio, maxDuration = 30, onSubmit }: RecorderProps) {
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioData, setAudioData] = useState<Uint8Array | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [history, setHistory] = useState<{ url: string; blob: Blob }[]>([]);
    const [playingRefAudio, setPlayingRefAudio] = useState(false);

    // 录音开始
    const startRecording = async () => {
        setAudioUrl(null);
        setAudioData(null);
        audioChunksRef.current = [];
        setTimer(0);
        if (timerRef.current) clearInterval(timerRef.current);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = (e) => {
            audioChunksRef.current.push(e.data);
        };
        mediaRecorder.onstop = async () => {
            const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            setAudioUrl(URL.createObjectURL(blob));
            setHistory(h => [{ url: URL.createObjectURL(blob), blob }, ...h]);
            if (onSubmit) onSubmit(blob);
            // 解析音频数据用于波纹动画
            const arrayBuffer = await blob.arrayBuffer();
            const audioCtx = new window.AudioContext();
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            const rawData = audioBuffer.getChannelData(0);
            // 简单采样
            const samples = 128;
            const blockSize = Math.floor(rawData.length / samples);
            const filteredData = new Uint8Array(samples);
            for (let i = 0; i < samples; i++) {
                const blockStart = blockSize * i;
                let sum = 0;
                for (let j = 0; j < blockSize; j++) {
                    sum += Math.abs(rawData[blockStart + j]);
                }
                filteredData[i] = Math.min(255, Math.floor((sum / blockSize) * 255));
            }
            setAudioData(filteredData);
        };
        mediaRecorder.start();
        setRecording(true);
        timerRef.current = setInterval(() => {
            setTimer(t => {
                if (t + 1 >= maxDuration) {
                    stopRecording();
                    return maxDuration;
                }
                return t + 1;
            });
        }, 1000);
    };

    // 录音停止
    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    // 重置
    const reset = () => {
        setAudioUrl(null);
        setAudioData(null);
        setRecording(false);
        setIsPlaying(false);
        setAudioProgress(0);
        setTimer(0);
        if (timerRef.current) clearInterval(timerRef.current);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };
    // 跟读模式：播放原文音频
    const playReference = () => {
        if (!referenceAudio) return;
        setPlayingRefAudio(true);
        const refAudio = new window.Audio(referenceAudio);
        refAudio.play();
        refAudio.onended = () => setPlayingRefAudio(false);
    };

    // 波纹渲染
    const renderWave = () => {
        if (!audioData || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 3;
        ctx.beginPath();
        const w = canvasRef.current.width;
        const h = canvasRef.current.height;
        for (let i = 0; i < audioData.length; i++) {
            const x = (i / audioData.length) * w;
            const y = h / 2 - (audioData[i] / 255) * (h / 2 - 8);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    };

    // 每次音频数据变化时渲染波纹
    useEffect(() => {
        if (audioData) {
            renderWave();
        }
    }, [audioData]);

    // 音频播放进度监听
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const updateProgress = () => {
            setAudioProgress(audio.currentTime / (audio.duration || 1));
        };
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', () => setIsPlaying(false));
        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
        };
    }, [audioUrl]);

    return (
        <div className="liquid-glass rounded-2xl p-6 shadow-glass bg-white/60 backdrop-blur w-full max-w-md mx-auto flex flex-col items-center gap-6">
            {/* 题目展示区 */}
            {question && (
                <div className="mb-4 text-xl font-bold text-gray-800 text-center tracking-wide drop-shadow-lg">{question}</div>
            )}
            {/* 跟读模式区 */}
            {referenceAudio && (
                <div className="mb-4 flex items-center justify-center gap-2">
                    <Button
                        color="blue"
                        onClick={playReference}
                        disabled={playingRefAudio}
                        ripple
                        className="rounded-full w-14 h-14 flex flex-col items-center justify-center text-xl shadow-lg bg-gradient-to-br from-blue-200 via-blue-100 to-white/80 gap-1"
                    >
                        <FaVolumeUp className="mx-auto text-2xl" />
                        <span className="block text-xs font-semibold mt-1">{playingRefAudio ? '播放中' : '原文'}</span>
                    </Button>
                </div>
            )}
            {/* 录音控制区 */}
            <div className="flex gap-4 mb-2 items-center justify-center">
                {!recording && (
                    <Button
                        color="green"
                        onClick={startRecording}
                        ripple
                        className="rounded-full w-20 h-20 flex items-center justify-center text-4xl shadow-lg bg-gradient-to-br from-emerald-400 via-emerald-200 to-white/80 animate-pulse"
                    >
                        <FaMicrophone />
                    </Button>
                )}
                {recording && (
                    <Button
                        color="red"
                        onClick={stopRecording}
                        ripple
                        className="rounded-full w-20 h-20 flex items-center justify-center text-4xl shadow-lg bg-gradient-to-br from-red-400 via-red-200 to-white/80 animate-pulse"
                    >
                        <FaStop />
                    </Button>
                )}
            </div>
            {/* 录音动画与计时器 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-full flex flex-col items-center"
            >
                <div className="flex flex-col items-center justify-center w-full mb-2">
                    {recording ? (
                        <motion.div
                            initial={{ opacity: 0.7, scale: 1 }}
                            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                            className="mb-2 flex items-center justify-center"
                        >
                            <FaMicrophone className="text-emerald-500 drop-shadow-lg" style={{ fontSize: '3.2rem' }} />
                        </motion.div>
                    ) : null}
                    <div className="text-lg font-mono tracking-wide text-emerald-700 font-bold">
                        {recording ? (
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >{timer}s / {maxDuration}s</motion.span>
                        ) : audioUrl ? (
                            <span className="text-emerald-700 font-bold">录音完成</span>
                        ) : ''}
                    </div>
                </div>
                <div className="relative w-full">
                    <canvas ref={canvasRef} width={320} height={64} className={`w-full rounded-xl shadow transition-all duration-300 ${recording ? 'bg-gradient-to-br from-emerald-100 via-emerald-50 to-white/80' : 'bg-gradient-to-br from-white/80 via-emerald-50 to-white/60'}`} />
                    {recording && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                            className="absolute inset-0 rounded-xl pointer-events-none bg-emerald-200/40"
                        />
                    )}
                </div>
                {/* 回放区 */}
                {audioUrl && (
                    <div className="w-full flex flex-col items-center mt-4">
                        <audio ref={audioRef} src={audioUrl} style={{ display: 'none' }} />
                        <Button
                            color={isPlaying ? 'red' : 'green'}
                            onClick={() => {
                                if (!audioRef.current) return;
                                if (isPlaying) {
                                    audioRef.current.pause();
                                    setIsPlaying(false);
                                } else {
                                    audioRef.current.play();
                                    setIsPlaying(true);
                                }
                            }}
                            ripple
                            className="rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg bg-gradient-to-br from-emerald-200 via-emerald-100 to-white/80 mb-2"
                        >
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </Button>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-emerald-400"
                                initial={{ width: 0 }}
                                animate={{ width: `${audioProgress * 100}%` }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        </div>
                        <Button color="amber" onClick={reset} ripple className="mt-2 rounded-full w-10 h-10 flex items-center justify-center text-lg"> <FaRedo /> </Button>
                        {onSubmit && (
                            <Button color="blue" onClick={() => onSubmit && audioUrl && fetch(audioUrl).then(r => r.blob()).then(onSubmit)} ripple className="mt-2 rounded-full w-10 h-10 flex items-center justify-center text-lg"> <FaPlay /> </Button>
                        )}
                    </div>
                )}
                {/* 历史回答区 */}
                {history.length > 1 && (
                    <div className="w-full mt-4">
                        <div className="text-xs text-gray-500 mb-1">历史录音：</div>
                        <div className="flex flex-col gap-2">
                            {history.slice(1).map((h, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-white/60 rounded-xl px-3 py-2 shadow-glass">
                                    <Button color="gray" ripple onClick={() => {
                                        setAudioUrl(h.url);
                                        setIsPlaying(false);
                                        setAudioProgress(0);
                                    }} className="rounded-full w-8 h-8 flex items-center justify-center text-base"> <FaPlay /> </Button>
                                    <Button color="blue" ripple onClick={() => onSubmit && onSubmit(h.blob)} className="rounded-full w-8 h-8 flex items-center justify-center text-base"> <FaPause /> </Button>
                                    <span className="text-xs text-gray-600">第{history.length - idx - 1}次</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
