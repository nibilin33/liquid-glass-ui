'use client'
import React, { useState } from "react";
import { Switch } from "../components/Switch";

export default function SwitchPreview() {
  const [on, setOn] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="space-y-6 max-w-xs mx-auto mt-10">
      <div>
        <Switch checked={on} onChange={setOn} label="Glassmorphism Switch" />
        <div className="mt-2 text-sm text-gray-500">
          当前状态：{on ? "开" : "关"}
        </div>
      </div>
      <div>
        <Switch checked={disabled} disabled={disabled} onChange={setDisabled} label="禁用模式" />
      </div>
    </div>
  );
}