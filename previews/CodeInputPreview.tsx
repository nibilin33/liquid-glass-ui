import React, { useState } from "react";
import { CodeInput } from "../components/CodeInput";

const CodeInputPreview: React.FC = () => {
  const [code, setCode] = useState("");
  const [complete, setComplete] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6 text-emerald-700">验证码输入预览</h2>
      <CodeInput
        length={6}
        value={code}
        onChange={v => {
          setCode(v);
          setComplete(false);
        }}
        onComplete={v => {
          setCode(v);
          setComplete(true);
        }}
        autoFocus
        className="mb-4"
      />
      <div className="mt-2 text-emerald-700 text-lg">
        当前输入：{code || "——"}
      </div>
      {complete && (
        <div className="mt-2 text-green-600 font-semibold">
          输入完成！
        </div>
      )}
    </div>
  );
};

export default CodeInputPreview;