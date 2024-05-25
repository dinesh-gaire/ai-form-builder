"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormUi from '../_components/FormUi'

const EditForm = ({params}) => {
    const {user} = useUser();
    const [jsonForm, setJsonForm] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState();
    const [record, setRecord] = useState([]);
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
      console.log(result);
    }
  return (
    <div className='p-10'>
      <h2 className='flex gap-2 items-center my-5 cursor-pointer hover:font-bold' onClick={()=>router.back()}>
        <ArrowLeft/> Back
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='p-5 border rounded-lg shadow-md'>
          Controller
        </div>
        <div className='md:col-span-2 border rounded-lg p-5 flex items-center justify-center'>
          <FormUi jsonForm={jsonForm} onFieldUpdate={onFieldUpdate}/>
        </div>
      </div>
    </div>
  )
}

export default EditForm