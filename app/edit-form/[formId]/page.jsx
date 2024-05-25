"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormUi from '../_components/FormUi'
import { toast } from 'sonner'
import Controller from '../_components/Controller'

const EditForm = ({params}) => {
    const {user} = useUser();
    const [jsonForm, setJsonForm] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState();
    const [record, setRecord] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState('light');
    const [selectedBackground, setSelectedBackground] = useState();
    const [selectedStyle, setSelectedStyle] = useState({});
    const router = useRouter();
    useEffect(()=>{
      user && GetFormData();
    },[user])
    const GetFormData=async()=>{
        const result = await db.select().from(JsonForms)
        .where(and(eq(JsonForms.id, params?.formId), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))

        // console.log(result[0].jsonform);
        setRecord(result[0])
        setJsonForm(JSON.parse(result[0].jsonform))
        setSelectedTheme(result[0].theme)
        setSelectedBackground(result[0].background)
    }

    useEffect(()=>{
      if(updateTrigger){
        setJsonForm(jsonForm);
        updateJsonFormInDb();
      }
    },[updateTrigger])

    const onFieldUpdate=(value,index)=>{
      // console.log(value,index);
      jsonForm.fields[index].label=value.label;
      jsonForm.fields[index].placeholder=value.placeholder;
      // console.log(jsonForm);
      setUpdateTrigger(Date.now())
    }

    const updateJsonFormInDb=async()=>{
      const result = await db.update(JsonForms)
      .set({
        jsonform:jsonForm
      }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))
      .returning({id:JsonForms.id})
      // console.log(result);

      toast('Updated!')
    }

    const deleteField=(indexToRemove)=>{
      const result = jsonForm.fields.filter((item,index)=>index!=indexToRemove)
      // console.log((result));
      jsonForm.fields = result;
      setUpdateTrigger(Date.now())
    }

    const updateControllerFields=async(value, columnName)=>{
      const result = await db.update(JsonForms)
      .set({
        [columnName]:value
      }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))
      .returning({id:JsonForms.id})

      toast('Updated!')
    }
    
  return (
    <div className='p-10'>
      <h2 className='flex gap-2 items-center my-5 cursor-pointer hover:font-bold' onClick={()=>router.back()}>
        <ArrowLeft/> Back
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='p-5 border rounded-lg shadow-md'>
          <Controller 
            selectedTheme={(value)=>
              {
                updateControllerFields(value,'theme')
                setSelectedTheme(value)
              }} 
            selectedBackground={(value)=>
              {
                updateControllerFields(value,'background')
                setSelectedBackground(value)
              }}
              selectedStyle={(value)=>{
                setSelectedStyle(value)
              }}
          />
        </div>
        <div className='md:col-span-2 border rounded-lg p-5 flex items-center justify-center' style={{backgroundImage:selectedBackground}}>
          <FormUi 
            jsonForm={jsonForm} 
            onFieldUpdate={onFieldUpdate} 
            deleteField={(index)=>deleteField(index)}
            selectedTheme={selectedTheme}
            selectedStyle={selectedStyle}
          />
        </div>
      </div>
    </div>
  )
}

export default EditForm