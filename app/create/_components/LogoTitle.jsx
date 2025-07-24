"use client";

import React from "react";
import HeadingDesc from "./HeadingDesc";
import Lookup from "@/app/_data/Lookup";

function LogoTitle({ formData, onHandleInputChange }) {
  return (
    <div className="my-10">
      <HeadingDesc
        title={Lookup?.LogoTitle}
        description={Lookup.LogoTitleDesc}
      />
      <input
        type="text"
        value={formData?.title || ""} // ← ensure it's always a string
        onChange={(e) => onHandleInputChange(e.target.value)}
        placeholder="Enter logo title"
        className="border px-2 py-1 rounded"
      />
    </div>
  );
}

export default LogoTitle;
