'use client'
import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";

export default function SidebarPreview() {
  const [active, setActive] = useState(1);

  const items = [
    "Dashboard",
    { label: "Profile", onClick: () => alert("Profile clicked!") },
    "Settings",
    "Help",
  ];

  return (
    <div className="flex min-h-[300px] bg-gradient-to-r from-emerald-100/40 to-white/60">
      <Sidebar items={items} activeIndex={active} onActiveChange={setActive} />
      <div className="flex-1 flex items-center justify-center text-xl">
        {typeof items[active] === "string" ? items[active] : items[active].label}
      </div>
    </div>
  );
}