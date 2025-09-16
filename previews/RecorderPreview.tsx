import React from "react";
import { Recorder } from "../components/Recorder";

export default function RecorderPreview() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 text-xs text-gray-500">Speaking Recorder</div>
        <Recorder
          question="Please introduce yourself in English."
          maxDuration={30}
          onSubmit={(blob) =>
            alert("Audio submitted! Size: " + blob.size + " bytes")
          }
        />
      </div>
      <div>
        <div className="mb-2 text-xs text-gray-500">Read-Aloud Recorder</div>
        <Recorder
          question="Please read aloud the reference audio below."
          referenceAudio="/demo.mp3"
          maxDuration={20}
          onSubmit={(blob) =>
            alert("Audio submitted! Size: " + blob.size + " bytes")
          }
        />
      </div>
    </div>
  );
}