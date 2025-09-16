import React from "react";
import { Ordering } from "../components/Ordering";

export default function OrderingPreview() {
  return (
    <div>
      <div className="mb-2 text-xs text-gray-500">Draggable list items for sorting</div>
      <Ordering
        items={["Apple", "Banana", "Orange"]}
        onChange={(newOrder) => console.log(newOrder)}
      />
    </div>
  );
}