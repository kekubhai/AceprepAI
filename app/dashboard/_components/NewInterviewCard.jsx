"use client"


import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { chatSession } from '@/utils/GeminiAiModels';
import { useUser } from '@clerk/nextjs';
import { Briefcase, Code, LoaderCircle, Plus, Star, Trophy, X } from 'lucide-react';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const jobTemplates = [
  {
    title: 'Frontend Developer',
    description: 'React, JavaScript, CSS, HTML, responsive design experience',
    yearsExp: 2,
    icon: <Code className="h-5 w-5 text-blue-500" />
  },
  {
    title: 'Backend Engineer',
    description: 'Node.js, Express, databases, API design, cloud services',
    yearsExp: 3,
    icon: <Code className="h-5 w-5 text-green-500" />
  },
  {
    title: 'Full Stack Developer',
    description: 'MERN stack, full software lifecycle, deployment pipelines',
    yearsExp: 4,
    icon: <Code className="h-5 w-5 text-purple-500" />
  },
  {
    title: 'Product Manager',
    description: 'Agile, roadmap creation, stakeholder management, user research',
    yearsExp: 5,
    icon: <Briefcase className="h-5 w-5 text-amber-500" />
  }
];

export default function NewInterviewCard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 for templates, 2 for custom form
  const { user } = useUser();
  const router = useRouter();

  const selectTemplate = (template) => {
    setJobPosition(template.title);
    setJobDescription(template.description);
    setJobExperience(template.yearsExp.toString());
    setStep(2);
  };

  const resetForm = () => {
    setJobPosition('');
    setJobDescription('');
    setJobExperience('');
    setStep(1);
  };

  const closeDialog = () => {
    resetForm();
    setOpenDialog(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation to ensure all fields are filled
    if (!jobPosition || !jobDescription || !jobExperience || !user?.primaryEmailAddress?.emailAddress) {
      console.error("Missing required fields");
      setLoading(false);
      return; // Exit early if any required field is missing
    }

    const inputPrompt = `You are an experienced technical interviewer specializing in evaluating candidates for the role of: "${jobPosition}". 

Here is the Job Description:
${jobDescription}

Candidate's Years of Experience: ${jobExperience} years.

Your goal is to craft an interview experience that goes beyond textbook knowledge and assesses the candidate’s:
- Depth of understanding in core concepts related to this role.
- Practical experience in solving real-world, complex problems in this domain.
- Familiarity with best practices, trade-offs, and debugging in production environments.
- Ability to communicate technical decisions and reasoning clearly.

Requirements for your output:
1. Generate exactly ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions.
2. For each question, focus on pushing the candidate's thinking to uncover:
   - Their depth of expertise.
   - Their experience with hands-on implementation.
   - Common mistakes or misconceptions.
   - How they reason through ambiguity or incomplete requirements.
3. The questions should avoid generic or trivial queries (e.g., "What is React?").
4. Prioritize questions that lead to discussions about trade-offs, architectural decisions, debugging real-life issues, or performance bottlenecks.
5. Each question must be followed by a detailed, technically precise answer with examples when applicable.

Output Format (JSON):
[
  {
    "question": "...",
    "answer": "..."
  },
  ...
]

The JSON must be valid and syntactically correct.`;


    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text(); // Wait for the response to be text
      const mockJsonResponse = responseText.replace('```json', '').replace('```', ''); // Clean the AI response

      try {
        // Parse the cleaned JSON to validate it
        JSON.parse(mockJsonResponse);
        
        // Generate a unique ID for the interview
        const mockId = uuidv4();
  
        // Save to database
        await db.insert(MockInterview).values({
          jsonMockResp: mockJsonResponse,
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobExperience,
          createdBy: user.primaryEmailAddress.emailAddress,
          createdAt: moment().format('DD-MM-yyyy'),
          mockId: mockId
        });
  
        // Close dialog and redirect to the new interview page
        setOpenDialog(false);
        router.push(`/dashboard/interview/${mockId}`);
      } catch (error) {
        console.error("Error parsing JSON response:", error);
      }
    } catch (error) {
      console.error("Error creating interview:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-100 overflow-hidden">
      <div className="px-6 pt-6 pb-8 text-center">
        <div className="mx-auto w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mb-4">
          <Plus className="w-6 h-6" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Interview</h3>
        <p className="text-gray-600 text-sm mb-5">Get AI-generated questions tailored to your job role</p>
        
        <button
          onClick={() => setOpenDialog(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2 rounded-lg font-medium text-sm"
        >
          Start Now
        </button>
      </div>
      
      <div className="px-6 py-3 bg-blue-600 text-center">
        <p className="text-xs text-blue-100">Perfect for technical, behavioral & leadership interviews</p>
      </div>

      {/* Dialog for adding new interview */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-xl bg-white">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold text-black">
                {step === 1 ? 'Create Mock Interview' : 'Interview Details'}
              </DialogTitle>
              <button 
                onClick={closeDialog}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <DialogDescription className="text-gray-500 mt-2 bg-white">
              {step === 1 
                ? 'Choose a template or create a custom interview' 
                : 'Tell us more about the job position you\'re preparing for'}
            </DialogDescription>
          </DialogHeader>
          
          {step === 1 ? (
            <div>
              <div className="mb-6 bg-white">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-amber-500" />
                  Popular Templates
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {jobTemplates.map((template, index) => (
                    <div 
                      key={index}
                      className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-all flex items-center"
                      onClick={() => selectTemplate(template)}
                    >
                      <div className="p-2 bg-gray-50 rounded-lg mr-3">
                        {template.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{template.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                      </div>
                      <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {template.yearsExp} yrs
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center items-center">
                <div className="w-full border-t border-gray-200"></div>
                <span className="px-3 text-xs text-gray-500 bg-white">or</span>
                <div className="w-full border-t border-gray-200"></div>
              </div>
              
              <button 
                onClick={() => setStep(2)}
                className="w-full mt-6 py-2 px-4 text-center text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                Create Custom Interview
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Job Position Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Position
                </label>
                <Input
                  value={jobPosition}
                  placeholder="Ex: Full Stack Developer"
                  required
                  onChange={(e) => setJobPosition(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Job Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description / Tech Stack
                </label>
                <Textarea
                  value={jobDescription}
                  placeholder="Describe the key responsibilities and technologies"
                  required
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                />
              </div>

              {/* Years of Experience Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <Input
                  type="number"
                  value={jobExperience}
                  placeholder="5"
                  max="50"
                  required
                  onChange={(e) => setJobExperience(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-700 flex items-start">
                <Star className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                <p>We will generate tailored interview questions based on your job position, description, and experience level.</p>
              </div>

              <div className="flex space-x-3 pt-3">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className={`flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all flex items-center justify-center ${loading ? 'opacity-80' : ''}`}
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
                      Generating Questions...
                    </>
                  ) : (
                    'Create Interview'
                  )}
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
