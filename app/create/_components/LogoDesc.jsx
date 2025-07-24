import React from "react";
import HeadingDesc from "./HeadingDesc";
import Lookup from "@/app/_data/Lookup";

function LogoDesc({ onHandleInputChange, formData }) {
  return (
    <div className="my-10">
      <HeadingDesc
        title={Lookup.LogoDescTitle}
        description={Lookup.LogoDescDesc}
      />

      <input
        type="text"
        placeholder={Lookup.TitlePlaceHolder}
        value={formData.desc || ""}
        className="p-4 border rounded-md w-full shadow-md mt-5"
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  );
}

export default LogoDesc;
