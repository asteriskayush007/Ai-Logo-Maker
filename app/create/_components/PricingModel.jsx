import React from "react";
import HeadingDesc from "./HeadingDesc";
import Lookup from "@/app/_data/Lookup";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function PricingModel() {
  return (
    <div className="">
      <HeadingDesc
        title={Lookup.LogoPricingModelTitle}
        description={Lookup.LogoPricingModelDesc}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
        {Lookup.pricingOption.map((pricing, index) => {
          return (
            <div key={index} className="flex flex-col items-center p-10 border-2 rounded-xl">
              <Image
                src={pricing.icon}
                alt={pricing.title}
                width={60}
                height={60}
              />

              <h2 className="font-medium text-2xl">{pricing.title}</h2>
              <div>
                {pricing.features.map((features,index)=>{
                    return <h2 className="text-lg mt-3" key={index}>{features}</h2>
                })}
              </div>
              <Button>{pricing.button}</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PricingModel;
