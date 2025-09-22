import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { Feedback } from "./Feedback";

// 解析 [id=xxx type=mc ...] 这样的 meta，返回对象
function parseMetaFromString(metaRaw: string) {
  if (!metaRaw) return null;
  const match = metaRaw.match(/^\s*\[([^\]]+)\]\s*(.*)$/s);
  if (!match) return null;
  const pairsStr = match[1];
  const rest = match[2] || "";
  const meta = Object.fromEntries(
    pairsStr
      .split(/\s+/)
      .map((pair) => pair.split("="))
      .map(([k, v]) => [k, v])
  );
  return { meta, rest: rest.trim() };
}

function getTextFromNode(node: any): string {
  if (!node) return "";
  if (node.type === "text") return node.value || "";
  if (Array.isArray(node.children))
    return node.children.map((c: any) => getTextFromNode(c)).join("");
  return "";
}

function sliceRaw(markdown: string, node: any) {
  try {
    if (node && node.position && typeof node.position.start.offset === "number" && typeof node.position.end.offset === "number") {
      return markdown.slice(node.position.start.offset, node.position.end.offset);
    }
  } catch (e) {
    // fallback
  }
  return getTextFromNode(node);
}

export interface AnswersheetRendererProps {
  markdown: string;
  onSubmit?: (answers: Record<string, any>) => Promise<any>;
  id: string;
  onResult?: (result: any) => void;
}

export interface AnswersheetRendererRef {
  submit: () => Promise<void>;
  getAnswers: () => Record<string, any>;
}

const DEFAULT_SECTION_ID = "__root";

export const AnswersheetRenderer = forwardRef<AnswersheetRendererRef, AnswersheetRendererProps>(
  ({ markdown, onSubmit, id, onResult }, ref) => {
    const storageKey = `answersheet:${id}`;
    const [answers, setAnswers] = useState<Record<string, any>>(() => {
      try {
        return JSON.parse(
          typeof window !== "undefined" ? localStorage.getItem(storageKey) || "{}" : "{}"
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

    // ---------------------------
    // 解析 markdown -> sections & items
    // ---------------------------
    const tree = unified().use(remarkParse).parse(markdown || "");

    type Section = {
      id: string;
      topic?: string | null;
      items: any[]; // items: {type: 'content'|'question', raw?, question? }
    };

    const sections: Section[] = [
      { id: DEFAULT_SECTION_ID, topic: null, items: [] },
    ];
    let currentSection = sections[0];
    let lastQuestion: any = null;

    // helper: extract options from a list node
    const listNodeToOptions = (listNode: any) => {
      const opts: string[] = [];
      if (!listNode || !Array.isArray(listNode.children)) return opts;
      listNode.children.forEach((li: any) => {
        // extract raw for li
        const txt = getTextFromNode(li);
        // if li contains checkbox token [ ] / [x], remove it when rendering option label
        const cleaned = txt.replace(/^\s*\[[ xX]\]\s*/, "");
        opts.push(cleaned);
      });
      return opts;
    };

    // helper: check paragraph text lines for potential options
    const extractOptionsFromParagraph = (paraText: string) => {
      const lines = paraText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      const opts: string[] = [];
      lines.forEach((ln) => {
        if (/^[\-\*]\s+/.test(ln)) {
          opts.push(ln.replace(/^[\-\*]\s+/, ""));
        } else if (/^\[[ xX]\]\s+/.test(ln)) {
          opts.push(ln.replace(/^\[[ xX]\]\s+/, ""));
        }
      });
      return opts;
    };

    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];

      // heading like ## Question 1
      if (node.type === "heading" && node.depth >= 2) {
        const headingText = getTextFromNode(node);
        const parsed = parseMetaFromString(headingText);

        if (parsed && parsed.meta && parsed.meta.type === "section") {
          // new section
          const sid = parsed.meta.id || `section-${sections.length}`;
          const topic = parsed.meta.topic || parsed.rest || headingText.replace(/\[.*\]/, "").trim();
          const sec: Section = { id: sid, topic: topic || null, items: [] };
          sections.push(sec);
          currentSection = sec;
          lastQuestion = null;
          continue;
        }

        if (parsed && parsed.meta) {
          // heading itself contains question meta
          const qid = parsed.meta.id || `q-${i}`;
          const qtype = parsed.meta.type || "text";
          const qmode = parsed.meta.mode || (parsed.meta.type === "mc" ? "single" : "single");
          const qtext = parsed.rest || headingText.replace(/\[.*\]/, "").trim();
          const q: any = { id: qid, type: qtype, mode: qmode, text: qtext, options: [] };

          // lookahead for list or paragraphs for options / long text
          const next = tree.children[i + 1];
          if (next && next.type === "list" && qtype === "mc") {
            q.options = listNodeToOptions(next);
            i++; // consume the list node
          } else if (next && next.type === "paragraph" && qtype === "mc") {
            // paragraph could contain lines that are options
            const rawPara = sliceRaw(markdown, next);
            const opts = extractOptionsFromParagraph(rawPara);
            if (opts.length) {
              q.options = opts;
              i++; // consume the paragraph
            }
          } else if (!q.text) {
            // if no text in heading and next is paragraph -> treat that as question text
            if (next && next.type === "paragraph") {
              q.text = getTextFromNode(next);
              i++; // consume
              // check further for list options
              const nn = tree.children[i + 1];
              if (nn && nn.type === "list" && qtype === "mc") {
                q.options = listNodeToOptions(nn);
                i++;
              }
            }
          }

          currentSection.items.push({ type: "question", question: q });
          lastQuestion = q;
          continue;
        }

        // heading without meta -> treat as plain content
        const raw = sliceRaw(markdown, node);
        currentSection.items.push({ type: "content", raw });
        lastQuestion = null;
        continue;
      }

      // paragraph
      if (node.type === "paragraph") {
        const paraText = getTextFromNode(node);
        const parsed = parseMetaFromString(paraText);
        const raw = sliceRaw(markdown, node);

        if (parsed && parsed.meta && parsed.meta.type === "section") {
          const sid = parsed.meta.id || `section-${sections.length}`;
          const topic = parsed.meta.topic || parsed.rest || paraText.replace(/\[.*\]/, "").trim();
          const sec: Section = { id: sid, topic: topic || null, items: [] };
          sections.push(sec);
          currentSection = sec;
          lastQuestion = null;
          continue;
        }

        if (parsed && parsed.meta) {
          // meta sits in a paragraph. It can be a question too.
          const qid = parsed.meta.id || `q-${i}`;
          const qtype = parsed.meta.type || "text";
          const qmode = parsed.meta.mode || (qtype === "mc" ? "single" : "single");
          const qtext = parsed.rest || ""; // rest might be the question text

          const q: any = { id: qid, type: qtype, mode: qmode, text: qtext, options: [] };

          // if rest empty, maybe next paragraph holds the question text
          if (!q.text) {
            const next = tree.children[i + 1];
            if (next && next.type === "paragraph") {
              q.text = getTextFromNode(next);
              i++; // consume the next paragraph
            }
          }

          // check for options in following list or paragraph
          const next2 = tree.children[i + 1];
          if (next2 && next2.type === "list" && qtype === "mc") {
            q.options = listNodeToOptions(next2);
            i++;
          } else if (qtype === "mc") {
            // maybe options are inline in the paragraph (following lines)
            const opts = extractOptionsFromParagraph(raw.replace(/\[.*\]/, ""));
            if (opts.length) q.options = opts;
          }

          currentSection.items.push({ type: "question", question: q });
          lastQuestion = q;
          continue;
        }

        // normal paragraph: it might contain option-like lines for the lastQuestion
        if (lastQuestion && lastQuestion.type === "mc") {
          const rawPara = sliceRaw(markdown, node);
          const opts = extractOptionsFromParagraph(rawPara);
          if (opts.length) {
            lastQuestion.options = lastQuestion.options.concat(opts);
            // do not push as content
            continue;
          }
        }

        // otherwise treat as plain content
        currentSection.items.push({ type: "content", raw });
        lastQuestion = null;
        continue;
      }

      // list node
      if (node.type === "list") {
        const raw = sliceRaw(markdown, node);
        if (lastQuestion && lastQuestion.type === "mc") {
          lastQuestion.options = lastQuestion.options.concat(listNodeToOptions(node));
          continue;
        }
        currentSection.items.push({ type: "content", raw });
        lastQuestion = null;
        continue;
      }

      // fallback: other nodes -> render raw
      const raw = sliceRaw(markdown, node);
      currentSection.items.push({ type: "content", raw });
      lastQuestion = null;
    }

    // ---------------------------
    // 渲染 helpers
    // ---------------------------
    const renderQuestion = (q: any) => {
      const userAns = answers[q.id];
      const feedback = results?.results?.[q.id];

      if (q.type === "mc") {
        return (
          <div key={q.id} className="p-3 my-2 border rounded">
            <div className="font-semibold">
              <ReactMarkdown>{q.text}</ReactMarkdown>
            </div>

            {(q.options || []).map((opt: string, idx: number) => {
              const isSelected = q.mode === "multi" ? (userAns || []).includes(idx) : userAns === idx;
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
                    type={q.mode === "multi" ? "checkbox" : "radio"}
                    name={q.id}
                    checked={!!isSelected}
                    onChange={(e) => {
                      if (q.mode === "multi") {
                        const prev = userAns || [];
                        updateAnswer(
                          q.id,
                          e.target.checked ? [...prev, idx] : prev.filter((x: number) => x !== idx)
                        );
                      } else {
                        updateAnswer(q.id, idx);
                      }
                    }}
                  />
                  <span className="ml-2">
                    <ReactMarkdown>{opt}</ReactMarkdown>
                  </span>
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

      // text / fill
      if (q.type === "text" || q.type === "fill") {
        return (
          <div key={q.id} className="p-3 my-2 border rounded">
            <div className="font-semibold">
              <ReactMarkdown>{q.text}</ReactMarkdown>
            </div>
            <input
              type="text"
              value={answers[q.id] || ""}
              onChange={(e) => updateAnswer(q.id, e.target.value)}
              className="border p-1 rounded w-full mt-1"
            />
            {results?.results?.[q.id] && (
              <div className="mt-1 text-sm">
                <Feedback
                  correct={!!results.results[q.id].correct}
                  message={results.results[q.id].message}
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

    // ---------------------------
    // 渲染整个文档：section + items（同时保留常规 markdown 内容）
    // ---------------------------
    return (
      <div className="space-y-6">
        {sections.map((sec) => (
          <section key={sec.id} className="p-3 border rounded">
            {sec.topic && <h3 className="text-lg font-bold mb-2">{sec.topic}</h3>}

            {sec.items.map((it: any, idx: number) => {
              if (it.type === "content") {
                return (
                  <div key={idx} className="mb-2">
                    <ReactMarkdown>{it.raw}</ReactMarkdown>
                  </div>
                );
              }

              if (it.type === "question") {
                return <div key={it.question.id}>{renderQuestion(it.question)}</div>;
              }

              return null;
            })}
          </section>
        ))}
      </div>
    );
  }
);

