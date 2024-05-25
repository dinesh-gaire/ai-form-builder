import { Input } from '@/components/ui/input'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import FieldEdit from './FieldEdit'

  

const FormUi = ({jsonForm, onFieldUpdate}) => {
  return (
    <div className='border p-5 md:w-[600px] rounded-lg'>
        <h2 className='font-bold text-center text-2xl'>{jsonForm?.formTitle}</h2>
        <h2 className='text-sm text-gray-400 text-center'>{jsonForm?.formHeading}</h2>
        {jsonForm && jsonForm.fields && jsonForm.fields.length > 0 && (
          jsonForm.fields.map((field, index) => (
            <div key={index}className='flex items-center gap-2' >
              {field?.fieldType=='select'?
                <div className='my-3 w-full'>
                  <label className='text-xs text-gray-600'>{field?.label}</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field?.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field?.options.map((option,index)=>(
                        <SelectItem key={index} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                :
                field?.fieldType=='radio'?
                <div className='my-3 w-full'>
                  <label className='text-xs text-gray-600'>{field?.label}</label>
                  <RadioGroup>
                    {field?.options.map((option,index)=>(
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option?.label} id={option?.label} />
                        <Label htmlFor={option?.label}>{option?.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>

                </div>
                :
                field?.fieldType=='checkbox'?
                <div className='my-3 w-full'>
                  <label className='text-xs text-gray-600'>{field?.label}</label>
                    {field?.options?field?.options?.map((option,index)=>(
                      <div key={index} className='flex gap-2 items-center'>
                        <Checkbox/>
                        <h2>{option.label}</h2>
                      </div>
                    ))
                    :
                    <div className='flex gap-2 items-center'>
                      <Checkbox/>
                      <h2>{field?.label}</h2>
                    </div>
                    }
                </div>
                :
                <div className='my-3 w-full'>
                  <label className='text-xs text-gray-600'>{field?.label}</label>
                  <Input
                    type={field?.fieldType}
                    placeholder={field?.placeholder}
                    name={field?.fieldName}
                  />
                </div>
              }

              <div>
                <FieldEdit defaultValue={field} onUpdate={(value)=>onFieldUpdate(value,index)}/>
              </div>
            </div>
          ))
        )}

    </div>
  )
}

export default FormUi