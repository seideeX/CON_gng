"use client";

import React from "react";
import PageLayout from "@/Layouts/PageLayout";
import { Tabs } from "@/Components/ui/tabs";

const ProductionNumber = ({ candidates }) => {
    const maleCandidates = candidates.filter((c) => c.gender === "male");
    const femaleCandidates = candidates.filter((c) => c.gender === "female");

    const tabs = [
        {
            title: "Male Candidates",
            value: "male",
            category: "Male Production Number", // <-- dynamic heading
            content: (
                <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {maleCandidates.map((candidate) => (
                        <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                        />
                    ))}
                </div>
            ),
        },
        {
            title: "Female Candidates",
            value: "female",
            category: "Female Production Number", // <-- dynamic heading
            content: (
                <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {femaleCandidates.map((candidate) => (
                        <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                        />
                    ))}
                </div>
            ),
        },
    ];

    return (
        <PageLayout>
            <div className=" w-full relative my-10 px-4">
                {/* Center Tabs */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-full max-w-8xl">
                        <Tabs tabs={tabs} />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

const CandidateCard = ({ candidate }) => {
    return (
        <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center">
            <img
                src={candidate.profile_img || "/linear.webp"}
                alt={`${candidate.first_name} ${candidate.last_name}`}
                className="w-24 h-24 object-cover rounded-full mb-2"
            />
            <h3 className="font-bold text-gray-800 text-center">
                {candidate.first_name} {candidate.last_name}
            </h3>
            <p className="text-sm text-gray-600">{candidate.gender}</p>
        </div>
    );
};

export default ProductionNumber;
