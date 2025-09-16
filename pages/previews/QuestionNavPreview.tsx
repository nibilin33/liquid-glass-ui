import React, { useState } from "react";
import { QuestionNav } from "../../components/QuestionNav";
import { Button } from "../../components/Button";

export default function QuestionNavPreview() {
  const [countdown, setCountdown] = useState<number | undefined>(undefined);
  return (
    <div className="space-y-6">
      <div className="mb-2 text-xs text-gray-500">
        Question Navigation Example (Countdown Auto Next, Glassmorphism, Interactive Quiz, EdTech)
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <QuestionNav
          current={2}
          total={5}
          title="Listening"
          countdown={countdown}
          onPrev={() => true}
          onNext={() => true}
        />
        <Button onClick={() => setCountdown(8)}>Show Countdown</Button>
      </div>
    </div>
  );
}