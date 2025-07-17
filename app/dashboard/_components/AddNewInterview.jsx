/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAiModels'
import { LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation'


const AddNewInterview = () => {
  const [openDialog, setDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Validation to ensure all fields are filled
    if (!jobPosition || !jobDescription || !jobExperience || !user?.primaryEmailAddress?.emailAddress) {
      console.error("Missing required fields");
      setLoading(false);
      return; // Exit early if any required field is missing
    }

    console.log(jobPosition, jobDescription, jobExperience);

    const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depending on the given information, please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} questions and their answers in JSON format. Provide questions and answers in JSON.`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text(); // Wait for the response to be text
      const mockJsonResponse = responseText.replace('```json', '').replace('```', ''); // Clean the AI response

      try {
        const parsedResponse = JSON.parse(mockJsonResponse); // Parse the cleaned JSON
        setJsonResponse(parsedResponse);
        console.log(parsedResponse);

        // Insert into the database
        const resp = await db.insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: mockJsonResponse,
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy'),
          })
          .returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID:", resp);

        // After successful insertion, navigate to the interview details page
        if (resp && resp.length > 0) {
          setDialog(false);
          router.push('/dashboard/interview/' + resp[0].mockId);
        } else {
          console.error("Database insertion failed", resp);
        }
      } catch (error) {
        console.error("Error parsing AI response:", error);
        setLoading(false);
        return; // Exit early if JSON parsing fails
      }
    } catch (error) {
      console.error("Error during AI session or database operation:", error);
      setLoading(false);
    } finally {
      setLoading(false); // Stop loading animation
    }
  }

  return (
    <div>
      {/* Button to open the dialog */}
      <div className='p-10 border rounded-lg bg-slate-100 hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setDialog(true)}
      >
        <h3 className='text-bold p-2 text-3xl text-black'>+ Add new</h3>
      </div>

      {/* Dialog for adding new interview */}
      <Dialog open={openDialog}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className='text-2xl'>
          <DialogHeader>
            <DialogTitle>Tell Us More About Your Job Interview</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h1>Add a description about your job</h1>

                  {/* Job Position Input */}
                  <div className='m-3 my-3'>
                    <label>Job Position</label>
                    <Input
                      placeholder="Ex Full Stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>

                  {/* Job Description Input */}
                  <div className='m-3 my-3'>
                    <label>Job Description/Tech Stack (In short)</label>
                    <Textarea
                      placeholder="MERN Stack Developer"
                      required
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>

                  {/* Years of Experience Input */}
                  <div className='m-3 my-3'>
                    <label>Years of Experience</label>
                    <Input
                      type="number"
                      placeholder="5"
                      max="50"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button disabled={loading} type="submit">
                  {loading ? (
                    <>
                      <LoaderCircle className='animate-spin' />
                      Generating From AI
                    </>
                  ) : (
                    'Start Interview'
                  )}
                </Button>

                {/* Cancel Button */}
                <Button onClick={() => setDialog(false)} className='bg-red-500 p-2 gap-3'>Cancel</Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview;
