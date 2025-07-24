"use state"

import React, { useState } from "react";
import HeadingDesc from "./HeadingDesc";
import Lookup from "@/app/_data/Lookup";
import Colors from "@/app/_data/Colors";

function LogoPalette({onHandleInputChange,formData}) {
  const [selectedOption,setSelectedOption] = useState(formData?.Palette);
  return (
    <div className="my-10">
      <HeadingDesc
        title={Lookup?.LogoColorPaletteTitle}
        description={Lookup?.LogoColorPaletteDesc}
      />

      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {Colors.map((Palette, index) => {
            return (
              <div key={index} className={`my-4 flex-col p-1 cursor-pointer ${selectedOption== Palette.name && 'border rounded-lg border-[#E32935]'}`}>
                <p className="font-semibold mb-2">{Palette.name}</p>
                {Palette?.colors.map((color, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={()=>{setSelectedOption(Palette.name)
                        onHandleInputChange(Palette.name)
                      }}
                      className="h-14 w-full"
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LogoPalette;
