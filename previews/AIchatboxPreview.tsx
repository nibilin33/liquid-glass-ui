import React, { useState } from "react";
import AIChatBox, { AIMessage } from "../components/AIassistant";

export default function AIchatboxPreview() {
  // 可选：初始消息
  const [initMessages] = useState<AIMessage[]>([
    { role: "ai", content: "Hi, how can I assist you today?" }
  ]);

  // 模拟流式回复
  const handleSend = async (msg, addMessage, replaceLast) => {
    addMessage({ role: 'ai', content: '', loading: true });
    // 模拟 SSE 流式响应
    const reply = "This is a demonstration of the AI's streaming response, displaying as it generates.";
    let aiText = '';
    for (let i = 0; i < reply.length; i++) {
      await new Promise(r => setTimeout(r, 40));
      aiText += reply[i];
      replaceLast({ role: 'ai', content: aiText, loading: true });
    }
    replaceLast({ role: 'ai', content: aiText });
  };

  return (
     <AIChatBox
        messages={initMessages}
        onSend={handleSend}
        placeholder="Chatting with AI..."
      />
  );
}
