"use client";

import React, { useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import PageLayout from "@/Layouts/PageLayout";
import { Tabs } from "@/Components/ui/tabs";
import SubCriteriaGrid from "./Partials/SubCriteriaGrid";
import ScoreAlertDialog from "./Partials/ScoreAlertDialog";
import { toast } from "sonner";

const ProductionNumber = ({ candidates, scores }) => {
    const judgeId = usePage().props.auth.user.id;
    const maleCandidates = candidates.filter((c) => c.gender === "male");
    const femaleCandidates = candidates.filter((c) => c.gender === "female");

    const scoresRef = useRef({});

    const subCriteria = [
        { key: "energy_performance", label: "Energy & Performance", max: 30 },
        {
            key: "mastery_choreography",
            label: "Mastery of Choreography",
            max: 25,
        },
        { key: "stage_presence", label: "Stage Presence", max: 20 },
        { key: "facial_expression", label: "Facial Expression", max: 15 },
        { key: "overall_impact", label: "Overall Impact", max: 10 },
    ];

    const TabContent = ({ candidates }) => {
        const [_, setRerender] = useState(0);
        const [submitted, setSubmitted] = useState(false);

        const handleScoreChange = (candidateId, subKey, score) => {
            if (!scoresRef.current[candidateId]) {
                scoresRef.current[candidateId] = {};
            }
            scoresRef.current[candidateId][subKey] = score;
            setRerender((r) => r + 1);
        };

        const allScoresFilled = candidates.every((c) => {
            const candidateScores = scoresRef.current[c.id];
            if (!candidateScores) return false;
            return subCriteria.every(
                (sub) =>
                    candidateScores[sub.key] !== undefined &&
                    candidateScores[sub.key] !== "",
            );
        });

        const handleSubmit = () => {
            const filteredScores = {};
            candidates.forEach((c) => {
                if (scoresRef.current[c.id]) {
                    filteredScores[c.id] = scoresRef.current[c.id];
                }
            });

            if (!judgeId) {
                alert("Judge ID is missing!");
                return;
            }

            if (Object.keys(filteredScores).length !== candidates.length) {
                alert("Please fill in all scores before submitting!");
                return;
            }

            router.post(
                route("production_number.store"),
                {
                    judge_id: judgeId,
                    scores: filteredScores,
                },
                {
                    onSuccess: () => {
                        toast.success("Scores submitted successfully!");
                        router.reload();
                        setSubmitted(true);
                    },
                    onError: () => {
                        toast.error("Failed to submit scores. Check console.");
                    },
                },
            );
        };

        return (
            <div className="flex flex-col items-center gap-6">
                <SubCriteriaGrid
                    candidates={candidates}
                    subCriteria={subCriteria}
                    scoresRef={scoresRef}
                    onScoreChange={handleScoreChange}
                    submitted={submitted}
                    scores={scores}
                />

                <ScoreAlertDialog
                    candidates={candidates}
                    scoresRef={scoresRef}
                    allScoresFilled={allScoresFilled}
                    handleSubmit={handleSubmit}
                    submitted={submitted}
                />
            </div>
        );
    };

    const tabs = [
        {
            title: "Male Candidates",
            value: "male",
            category: "Male Production Number",
            content: <TabContent candidates={maleCandidates} />,
        },
        {
            title: "Female Candidates",
            value: "female",
            category: "Female Production Number",
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

export default ProductionNumber;
