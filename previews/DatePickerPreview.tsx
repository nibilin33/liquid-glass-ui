'use client'
import React, { useState } from "react";
import { DatePicker } from "../components/DatePicker";

export default function DatePickerPreview() {
  const [date, setDate] = useState<string>("");

  return (
    <div className="max-w-xs mx-auto mt-10 space-y-4">
      <div className="text-lg font-semibold mb-2">Glassmorphism DatePicker Demo</div>
      <DatePicker value={date} onChange={setDate} />
      <div className="text-sm text-gray-600">
        Selected date: <span className="font-mono">{date || "None"}</span>
      </div>
    </div>
    );
}