"use client";

import React, { useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import PageLayout from "@/Layouts/PageLayout";
import { Tabs } from "@/Components/ui/tabs";
import CandidateGrid from "./Partials/CandidateGrid";
import { HoverBorderGradient } from "@/Components/ui/hover-border-gradient";

const FormalWear = ({ candidates }) => {
    const judgeId = usePage().props.auth.user.id;

    const maleCandidates = candidates.filter((c) => c.gender === "male");
    const femaleCandidates = candidates.filter((c) => c.gender === "female");

    const scoresRef = useRef({});

    // We will track a local version for each tab to trigger re-renders
    const TabContent = ({ candidates }) => {
        const [_, setRerender] = useState(0);

        const handleScoreChange = (candidateId, score) => {
            scoresRef.current = { ...scoresRef.current, [candidateId]: score };
            setRerender((r) => r + 1); // re-render this tab only
        };

        const allScoresFilled = candidates.every(
            (c) =>
                scoresRef.current[c.id] !== undefined &&
                scoresRef.current[c.id] !== ""
        );

        const handleSubmit = () => {
            const filteredScores = Object.fromEntries(
                candidates
                    .map((c) => [c.id, scoresRef.current[c.id]])
                    .filter(([_, score]) => score !== undefined && score !== "")
            );

            if (!judgeId) {
                alert("Judge ID is missing!");
                return;
            }

            if (Object.keys(filteredScores).length !== candidates.length) {
                alert("Please fill in all scores before submitting!");
                return;
            }

            router.post(
                route("formal_wear.store"), // <-- using route name
                {
                    judge_id: judgeId,
                    scores: filteredScores,
                },
                {
                    onSuccess: () => alert("Scores submitted successfully!"),
                    onError: () =>
                        alert(
                            "Failed to submit scores. Check console for details."
                        ),
                }
            );
        };

        return (
            <div className="flex flex-col items-center gap-6">
                <CandidateGrid
                    candidates={candidates}
                    maxScore={20}
                    scoresRef={scoresRef}
                    onScoreChange={handleScoreChange}
                />
                <div className="mb-12">
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className={`dark:bg-neutral-800 bg-white text-black dark:text-neutral-100 flex items-center space-x-2 px-6 py-2 text-lg font-semibold ${
                            !allScoresFilled
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                        onClick={handleSubmit}
                        disabled={!allScoresFilled}
                    >
                        <span>Submit Scores</span>
                    </HoverBorderGradient>
                </div>
            </div>
        );
    };

    const tabs = [
        {
            title: "Male Candidates",
            value: "male",
            category: "Male Formal Wear",
            content: <TabContent candidates={maleCandidates} />,
        },
        {
            title: "Female Candidates",
            value: "female",
            category: "Female Formal Wear",
            content: <TabContent candidates={femaleCandidates} />,
        },
    ];

    return (
        <PageLayout>
            <div className="w-full relative my-10 px-4 flex flex-col items-center">
                <div className="w-full max-w-8xl">
                    <Tabs tabs={tabs} />
                </div>
            </div>
        </PageLayout>
    );
};

export default FormalWear;
