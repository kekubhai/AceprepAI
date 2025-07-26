"use client";

import React, { useState, FormEvent } from "react";
import { Plus, X, Trophy, Star, LoaderCircle, Briefcase, Code, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
import { FileUpload } from "../../../components/ui/file-upload";

interface JobTemplate {
  title: string;
  description: string;
  yearsExp: number;
  icon: React.ReactNode;
}

const jobTemplates: JobTemplate[] = [
  {
    title: 'Frontend Developer',
    description:
      'Build visually appealing and interactive user interfaces using React, JavaScript, HTML, and CSS. Learn to make responsive designs that work across devices and contribute to creating smooth web experiences.',
    yearsExp: 0,
    icon: <Code className="h-5 w-5 text-blue-500" />,
  },
  {
    title: 'Backend Engineer',
    description:
      'Work on the logic behind web applications using Node.js and Express. Learn to manage databases, create secure APIs, and understand how servers and cloud services power the web from behind the scenes.',
    yearsExp: 0,
    icon: <Code className="h-5 w-5 text-green-500" />,
  },
  {
    title: 'Full Stack Developer',
    description:
      'Get hands-on with both frontend and backend development using the MERN (MongoDB, Express, React, Node.js) stack. Understand how full web applications are built, tested, and deployed end-to-end.',
    yearsExp: 0,
    icon: <Code className="h-5 w-5 text-purple-500" />,
  },
  {
    title: 'Product Manager',
    description:
      'Collaborate with design, development, and marketing teams to define product vision and prioritize features. Learn how to manage project timelines, conduct user research, and communicate with stakeholders.',
    yearsExp: 0,
    icon: <Briefcase className="h-5 w-5 text-amber-500" />,
  },
];

export default function NewInterviewCard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [step, setStep] = useState(1);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = () => {};

  const closeDialog = () => {
    setOpenDialog(false);
    setStep(1);
    setJobPosition("");
    setJobDescription("");
    setJobExperience("");
    setLoading(false);
  };

  const selectTemplate = (template: JobTemplate) => {
    setJobPosition(template.title);
    setJobDescription(template.description);
    setJobExperience(template.yearsExp.toString());
    setStep(2);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      closeDialog();
    }, 1500);
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
        <DialogContent
          className="max-w-xl bg-white"
          style={{
            maxHeight: "90vh",
            overflowY: "auto",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE 10+
          }}
        >
          <style>
            {`
              /* Hide scrollbar for Chrome, Safari and Opera */
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <div className="no-scrollbar">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-semibold text-black">
                  {step === 1 ? 'Create Mock Interview' : 'Interview Details'}
                </DialogTitle>
                <Button
                  onClick={closeDialog}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
              <p className="text-gray-500 mt-2 bg-white">
                {step === 1
                  ? 'Choose a template or create a custom interview'
                  : 'Tell us more about the job position you\'re preparing for'}
              </p>
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
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Position
                    </label>
                    <Input
                      value={jobPosition}
                      placeholder="Ex: Full Stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Description / Tech Stack
                    </label>
                    <Textarea
                      value={jobDescription}
                      placeholder="Describe the key responsibilities and technologies"
                      required
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500 min-h-[100px] text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Experience
                    </label>
                    <Input
                      type="number"
                      value={jobExperience}
                      placeholder="5"
                      max={50}
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Resume (optional)
                    </label>
                    <div className="w-full mx-auto min-h-20 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg flex items-center justify-center">
                      <FileUpload onChange={handleFileUpload} />
                    </div>
                  </div>
                </div>
                <Alert variant="default" className="mt-4">
                  <AlertCircle className="h-5 w-5" />
                  <AlertTitle>These Data are predefined</AlertTitle>
                </Alert>
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

