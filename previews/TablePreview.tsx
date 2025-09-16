import React, { useState } from "react";
import { Table } from "../components/Table";

export default function TablePreview() {
  const [page, setPage] = useState(1);
  const columns = [
    { key: "name", title: "Name", sortable: true },
    {
      key: "age",
      title: "Age",
      sortable: true,
      render: (v: any) => (
        <span className="font-bold text-emerald-600">{v}</span>
      ),
    },
    { key: "city", title: "City" },
  ];
  const data = [
    { name: "John", age: 22, city: "Shanghai" },
    { name: "Lisa", age: 28, city: "Beijing" },
    { name: "William", age: 35, city: "Guangzhou" },
    { name: "Zoe", age: 19, city: "Shenzhen" },
    { name: "Mason", age: 41, city: "Hangzhou" },
    { name: "Sunny", age: 25, city: "Chengdu" },
    { name: "Joe", age: 30, city: "Chongqing" },
    { name: "Wendy", age: 27, city: "Nanjing" },
    { name: "Edward", age: 33, city: "Suzhou" },
    { name: "Walter", age: 24, city: "Wuhan" },
  ];
  return (
    <div style={{ height: 320 }}>
      <Table
        columns={columns}
        data={data}
        page={page}
        pageSize={5}
        total={data.length}
        onPageChange={setPage}
      />
    </div>
  );
}