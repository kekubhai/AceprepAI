"use client";
import React, { useState } from "react";
import companiesData from "./companies.json";

const companies = companiesData as Array<{
  name: string;
  sector: string;
  description: string;
  skillsByLevel: Record<string, string[]>;
}>;

const experienceLevels = ["Junior", "Mid", "Senior"];

export default function SkillsBankPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null);

  const openModal = (company: typeof companies[0]) => {
    setSelectedCompany(company);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCompany(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <h1 className="text-4xl font-bold text-blue-800">Skills Bank</h1>
        <p className="text-lg mt-2 text-gray-600">
          Explore top companies and the skills they look for in developers
        </p>
      </header>

      {/* Company Grid */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
        {companies.map((company) => (
          <div
            key={company.name}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-xl transition-all duration-200 cursor-pointer relative group"
            onClick={() => openModal(company)}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") openModal(company); }}
            aria-label={`View skills for ${company.name}`}
          >
            <h2 className="text-xl font-semibold text-gray-800">{company.name}</h2>
            <p className="text-sm text-blue-500 font-medium mb-2">{company.sector}</p>
            <p className="text-gray-600 text-sm mb-4">{company.description}</p>
            <button
              onClick={(e) => { e.stopPropagation(); openModal(company); }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
              tabIndex={-1}
            >
              View Skills
            </button>
          </div>
        ))}
      </section>

      {/* Modal */}
      {modalOpen && selectedCompany && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center min-h-screen overflow-y-auto">
          <div
            className="relative bg-white w-full max-w-2xl mx-4 my-12 rounded-xl shadow-2xl border border-blue-100 flex flex-col"
            role="dialog"
            aria-modal="true"
            style={{ maxHeight: "90vh" }}
          >
            {/* Fixed header section */}
            <div className="sticky top-0 bg-white p-6 pb-4 rounded-t-xl border-b border-gray-200 z-10">
              <Button
                className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-gray-800"
                onClick={closeModal}
                aria-label="Close modal"
              >
                &times;
              </Button>
              <h2 className="text-2xl font-bold text-blue-700 mb-1 pr-6">{selectedCompany.name}</h2>
              <p className="text-sm text-blue-500 font-medium">{selectedCompany.sector}</p>
            </div>

            {/* Scrollable content section */}
            <div className="overflow-y-auto p-6 pt-4">
              {/* Skills list by level */}
              <div className="divide-y divide-gray-200 space-y-4">
                {experienceLevels.map((level) => (
                  <div key={level} className="pt-4">
                    <h3 className="text-lg font-semibold text-purple-600 mb-2">{level} Level</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-800 text-sm">
                      {(selectedCompany.skillsByLevel as any)[level]?.map((skill: string) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div className="fixed inset-0 z-40" onClick={closeModal} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}