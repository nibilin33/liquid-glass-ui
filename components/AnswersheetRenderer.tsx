import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import ReactMarkdown from "react-markdown";
import { Feedback } from "./Feedback";

// 工具方法：解析题目或 section 元信息，例如 [id=q1 type=mc mode=single]
function parseMeta(text: string) {
  const match = text.match(/\[([^\]]+)\]/);
  if (!match) return {};
  return Object.fromEntries(
    match[1]
      .split(/\s+/)
      .map((pair) => pair.split("="))
      .map(([k, v]) => [k, v])
  );
}

export interface AnswersheetRendererProps {
  markdown: string;
  onSubmit?: (answers: Record<string, any>) => Promise<any>;
  id: string;
  onResult?: (result: any) => void; // 提交后回调
}

export interface AnswersheetRendererRef {
  submit: () => Promise<void>;
  getAnswers: () => Record<string, any>;
}

export const AnswersheetRenderer = forwardRef<
  AnswersheetRendererRef,
  AnswersheetRendererProps
>(({ markdown, onSubmit, id, onResult }, ref) => {
  const storageKey = `answersheet:${id}`;
  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    try {
      return JSON.parse(
        typeof window !== "undefined"
          ? localStorage.getItem(storageKey) || "{}"
          : "{}"
      );
    } catch {
      return {};
    }
  });
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(answers));
    }
  }, [answers, storageKey]);

  const updateAnswer = (qid: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  // 暴露 submit 和 getAnswers 方法
  useImperativeHandle(ref, () => ({
    submit: async () => {
      if (onSubmit) {
        const res = await onSubmit(answers);
        setResults(res);
        onResult?.(res);
      }
    },
    getAnswers: () => answers,
  }));

  // 渲染每一道题
  const renderQuestion = (node: any, meta: any) => {
    console.log("Rendering question node:", node, meta);
    const qid = meta.id || node.position?.start?.offset || Math.random().toString();
    const type = meta.type || "text";
    const mode = meta.mode || "single";
    const userAns = answers[qid];
    const feedback = results?.results?.[qid];

    // 提取题目文本
    const text = node.children?.map((c: any) => c.value || "").join("") || "";

    // 如果是单/多选题，提取选项
    let opts: string[] = [];
    if (type === "mc" && node.next && node.next.type === "list") {
      node.next.children.forEach((li: any) => {
        opts.push(li.children.map((c: any) => c.value || "").join(""));
      });
    }

    // 渲染单/多选题
    if (type === "mc") {
      return (
        <div key={qid} className="p-3 my-2 border rounded">
          <div className="font-semibold">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
          {opts.map((opt, idx) => {
            const isSelected = mode === "multi" ? userAns?.includes(idx) : userAns === idx;
            return (
              <label
                key={idx}
                className={`block p-1 cursor-pointer rounded ${
                  feedback
                    ? feedback.correct && isSelected
                      ? "bg-green-200"
                      : !feedback.correct && isSelected
                      ? "bg-red-200"
                      : ""
                    : ""
                }`}
              >
                <input
                  type={mode === "multi" ? "checkbox" : "radio"}
                  name={qid}
                  checked={!!isSelected}
                  onChange={(e) => {
                    if (mode === "multi") {
                      const prev = userAns || [];
                      updateAnswer(
                        qid,
                        e.target.checked
                          ? [...prev, idx]
                          : prev.filter((x: number) => x !== idx)
                      );
                    } else {
                      updateAnswer(qid, idx);
                    }
                  }}
                />
                <ReactMarkdown>{opt}</ReactMarkdown>
              </label>
            );
          })}
          {feedback && (
            <div className="mt-1 text-sm">
              <Feedback
                correct={!!feedback.correct}
                message={feedback.message}
                correctText="Correct! 🎉"
                errorText="Incorrect ❌"
              />
            </div>
          )}
        </div>
      );
    }

    // 渲染填空/文本题
    if (type === "fill" || type === "text") {
      return (
        <div key={qid} className="p-3 my-2 border rounded">
          <div className="font-semibold">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
          <input
            type="text"
            value={userAns || ""}
            onChange={(e) => updateAnswer(qid, e.target.value)}
            className="border p-1 rounded w-full mt-1"
          />
          {feedback && (
            <div className="mt-1 text-sm">
              <Feedback
                correct={!!feedback.correct}
                message={feedback.message}
                correctText="Correct! 🎉"
                errorText="Incorrect ❌"
              />
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  // 遍历 Markdown AST 渲染
  const renderNode = (node: any) => {
    const meta = parseMeta(
      node.children?.map((c: any) => c.value || "").join("") || ""
    );

    if (meta.type === "section") {
      return (
        <div key={meta.id} className="my-4 p-2 border-l-4 border-blue-400">
          <h2>{meta.topic}</h2>
          {node.children?.map(renderNode)}
        </div>
      );
    }

    if (meta.type) {
      return renderQuestion(node, meta);
    }

    return null;
  };

  return (
    <div className="space-y-4">
      <ReactMarkdown
        components={{
          h2({ node, ...props }) {
            return renderNode(node) || <h2 {...props} />;
          },
          h3({ node, ...props }) {
            return renderNode(node) || <h3 {...props} />;
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
});
