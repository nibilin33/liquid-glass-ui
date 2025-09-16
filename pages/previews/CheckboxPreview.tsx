import React, { useState } from "react";
import { Checkbox } from "../../components/Checkbox";

export default function CheckboxPreview() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="I agree to the terms and conditions"
      checked={checked}
      onChange={setChecked}
    />
  );
}