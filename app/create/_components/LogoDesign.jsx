"use state"

import React, { useState } from "react";
import HeadingDesc from "./HeadingDesc";
import Lookup from "@/app/_data/Lookup";
import LogoDesig from "@/app/_data/LogoDesig";
import Image from "next/image";

function LogoDesign({onHandleInputChange,formData}) {
  const [selectedOption,setSelectedOption] = useState(formData?.design?.title);
  return (
    <div className="my-10">
      <HeadingDesc
        title={Lookup.LogoDesignTitle}
        description={Lookup.LogoDescDesc}
      />

      <div>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          {LogoDesig.map((design, index) => {
            return (
              <div key={index} className={`mb-6 p-1 hover:border-2 cursor-pointer border-[#E32935] rounded-xl ${selectedOption== design.title && 'border-2 rounded-xl border-[#E32935]'}`}
              onClick={()=>{setSelectedOption(design.title)
                onHandleInputChange(design)
              }}
              >
                <Image
                  src={design.image}
                  alt={design.title}
                  width={300}
                  height={200}
                  className="rounded-xl w-full shadow"
                />
                <p className="mt-2 font-semibold text-center">{design.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LogoDesign;
