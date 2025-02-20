
"use client"
import { MockInterview } from '@/utils/schema'
import { SYSTEM_ENTRYPOINTS } from 'next/dist/shared/lib/constants'
import React from 'react'
import { useEffect } from 'react'
function page(params) {

   

    const GetInterviewDetails=async ()=>{
        const result =await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))
        console.log(result);
    }
    
  return (
    <div>
      Interview
    </div>
  )
}

export default page
