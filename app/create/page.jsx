"use client"

import React, { useState } from 'react'
import LogoTitle from './_components/LogoTitle'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import LogoDesc from './_components/LogoDesc'
import LogoPalette from './_components/LogoPalette'
import LogoDesign from './_components/LogoDesign'
import LogoIdea from './_components/LogoIdea'
import PricingModel from './_components/PricingModel'

function CreateLogo() {

  const[step,setStep] = useState(1);

  const [formData,setFormData] =useState({});

  const onHandleInputChange=(field,value)=>{

    setFormData(prev=>({
      ...prev,
      [field]:value
    }))

    console.log(formData);
  }
  return (
    <div className='mt-28 p-10 border rounded-xl 2xl:mx-72'>
      { step==1?
        <LogoTitle onHandleInputChange={(v)=>onHandleInputChange('title',v)}
        formData={formData}/> :
        step==2?
        <LogoDesc onHandleInputChange={(v)=>onHandleInputChange('description',v)}
        formData={formData}/> :
        step==3?
        <LogoPalette onHandleInputChange={(v)=>onHandleInputChange('palette',v)}
        formData={formData}/> :
        step==4?
        <LogoDesign onHandleInputChange={(v)=>onHandleInputChange('design',v)}
        formData={formData}/> :
        step==5?
        <LogoIdea onHandleInputChange={(v)=>onHandleInputChange('idea',v)}
        formData={formData}/> :
        step==6?
        <PricingModel onHandleInputChange={(v)=>onHandleInputChange('pricing',v)}
        formData={formData}/> :
        null
        

      }
      

      <div className='flex items-center justify-between'>
        {step!=1 && <Button variant="outline" onClick={()=>setStep(step-1)}><ArrowLeft/> Previous</Button>}
        <Button 
          className="bg-[#E32935]" 
          onClick={()=>setStep(step+1)}>
          <ArrowRight/> Next
        </Button>
      </div>
    </div>
  )
}

export default CreateLogo
