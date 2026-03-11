"use client";

import React, { useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import PageLayout from "@/Layouts/PageLayout";
import { Tabs } from "@/Components/ui/tabs";
import SubCriteriaGrid from "../Partials/SubCriteriaGrid";
import ScoreAlertDialog from "../Partials/ScoreAlertDialog";
import { toast } from "sonner";

const FinalRound = ({ candidates, scores }) => {
    const judgeId = usePage().props.auth.user.id;

    const maleCandidates = candidates.filter((c) => c.gender === "male");
    const femaleCandidates = candidates.filter((c) => c.gender === "female");

    const scoresRef = useRef({});

    const subCriteria = [
        {
            key: "intelligence_depth",
            label: "Intelligence & Depth of Answer",
            max: 40,
        },
        { key: "communication_skills", label: "Communication Skills", max: 25 },
        {
            key: "stage_presence_confidence",
            label: "Stage Presence & Confidence",
            max: 20,
        },
        { key: "overall_impact", label: "Overall Impact", max: 15 },
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
            const candidateScores = scoresRef.current[c.candidate_id];
            if (!candidateScores) return false;
            return subCriteria.every(
                (sub) =>
                    candidateScores[sub.key] !== undefined &&
                    candidateScores[sub.key] !== "",
            );
        });

        const handleSubmit = () => {
            if (submitted) return;

            const filteredScores = {};
            candidates.forEach((c) => {
                if (scoresRef.current[c.candidate_id]) {
                    filteredScores[c.candidate_id] =
                        scoresRef.current[c.candidate_id];
                }
            });

            if (!judgeId) {
                toast.error("Judge ID is missing!");
                return;
            }

            if (Object.keys(filteredScores).length !== candidates.length) {
                toast.error("Please fill in all scores before submitting!");
                return;
            }

            router.post(
                route("final_round.store"),
                {
                    judge_id: judgeId,
                    scores: filteredScores,
                },
                {
                    onSuccess: () => {
                        toast.success("Scores submitted successfully!");
                        setSubmitted(true);
                        router.reload();
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
                    category={"final_round"}
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
            category: "Male Final Round",
            content: <TabContent candidates={maleCandidates} />,
        },
        {
            title: "Female Candidates",
            value: "female",
            category: "Female Final Round",
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

export default FinalRound;
