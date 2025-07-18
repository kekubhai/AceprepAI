
"use client"
import { MockInterview } from '@/utils/schema'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

function InterviewPage({ params }) {
  const [interviewData, setInterviewData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    GetInterviewDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const GetInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewid))
      console.log(result)
      if (result.length > 0) {
        setInterviewData(result[0])
      }
    } catch (error) {
      console.error('Error fetching interview details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Interview Details</h1>
      {interviewData ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">{interviewData.jobPosition}</h2>
          <p className="text-gray-600 mb-2"><strong>Description:</strong> {interviewData.jobDesc}</p>
          <p className="text-gray-600 mb-2"><strong>Experience:</strong> {interviewData.jobExperience} years</p>
          <p className="text-gray-600 mb-4"><strong>Created:</strong> {interviewData.createdAt}</p>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Interview Questions</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">Questions will be loaded here...</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600">Interview not found</h2>
          <p className="text-gray-500 mt-2">The interview you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      )}
    </div>
  )
}

export default InterviewPage
