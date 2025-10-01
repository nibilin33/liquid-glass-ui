import React, { useState } from "react";
import { Input } from "../components/Input";

export default function InputPreview() {
  const [email, setEmail] = useState("");
  return (
    <div>
      <Input placeholder="Enter text" label="Input Field" />
      <div className="my-4" />
      <Input
        label="Email"
        required
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        validate={async (v: any) =>
          !v.includes("@") ? "Please enter a valid email" : ""
        }
        placeholder="Please enter your email"
      />
       <div className="my-4" />
       <Input
        type="file"
        label="Upload File"
        required
        placeholder="Choose a file"
      />
    </div>
  );
}