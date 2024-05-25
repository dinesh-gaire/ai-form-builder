"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

const EditForm = ({params}) => {
    const {user} = useUser();
    const [jsonForm, setJsonForm] = useState([]);
    useEffect(()=>{
      user && GetFormData();
    },[user])
    const GetFormData=async()=>{
        const result = await db.select().from(JsonForms)
        .where(and(eq(JsonForms.id, params?.formId), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))

        console.log(result[0].jsonform);
        setJsonForm(result[0].jsonform)
    }
  return (
    <div>EditForm</div>
  )
}

export default EditForm