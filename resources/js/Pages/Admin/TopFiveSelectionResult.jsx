"use client";

import React from "react";
import PageLayout from "@/Layouts/PageLayout";
import TopFiveSelectionTable from "./Partials/TopFiveSelectionTable";

const TopFiveSelectionResult = ({
    categoryName = "Top Five Selection Results",
    maleCandidates,
    femaleCandidates,
    categories,
}) => {
    return (
        <PageLayout>
            <h2 className="text-white text-xl font-bold mb-4 justify-center flex mt-6">
                Top Five Selection Results
            </h2>

            <TopFiveSelectionTable
                title="Male Candidates"
                candidates={maleCandidates}
                categories={categories}
                category={`${categoryName} Male Results`}
            />

            <TopFiveSelectionTable
                title="Female Candidates"
                candidates={femaleCandidates}
                categories={categories}
                category={`${categoryName} Female Results`}
            />
        </PageLayout>
    );
};

export default TopFiveSelectionResult;
