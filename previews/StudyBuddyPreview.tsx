import React, { useState } from 'react';
import StudyBuddy from '../components/StudyBuddy';

const StudyBuddyPreview: React.FC = () => {
  const [idleSeconds, setIdleSeconds] = useState<number>(6);
  const [persist, setPersist] = useState<boolean>(true);
  const [greeting, setGreeting] = useState<string>('Need help reviewing or have questions? Click me to start a chat~');

  return (
    <div className="p-2 bg-emerald-50">
      <div className="max-w-2xl mx-auto mb-6">
        <h2 className="text-2xl font-bold text-emerald-700 mb-3">StudyBuddy Preview</h2>
        <p className="text-sm text-gray-600 mb-4">
          Adjust the settings below, then wait the idle time (or directly drag/click the avatar at the bottom-right) to see the behavior.
        </p>

        <div className="bg-white/80 p-4 rounded-xl shadow mb-4">
          <label className="block text-sm text-gray-700 mb-2">Idle time to pop out (seconds)</label>
          <input
            type="number"
            min={1}
            value={idleSeconds}
            onChange={e => setIdleSeconds(Math.max(1, Number(e.target.value || 1)))}
            className="w-24 px-2 py-1 rounded border"
          />

          <div className="mt-3 flex items-center gap-3">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={persist}
                onChange={e => setPersist(e.target.checked)}
                className="form-checkbox"
              />
              <span className="text-sm text-gray-700">Remember dragged position (localStorage)</span>
            </label>
          </div>

          <div className="mt-3">
            <label className="block text-sm text-gray-700 mb-1">Greeting text</label>
            <input
              value={greeting}
              onChange={e => setGreeting(e.target.value)}
              className="w-full px-3 py-2 rounded border"
            />
          </div>
        </div>

        <div className="text-sm text-gray-600">
          The StudyBuddy avatar appears at the bottom-right of the preview. After the configured idle time it will show a tip. Click the avatar to open the chat panel; you can drag the avatar and its position will be remembered if enabled.
        </div>
      </div>

      {/* StudyBuddy instance */}
      <StudyBuddy idleSeconds={idleSeconds} persistPosition={persist} greeting={greeting} />
    </div>
  );
};

export default StudyBuddyPreview;