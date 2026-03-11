// Assuming you pass the current category as a prop, e.g., category="evening_gown"
"use client";

import React from "react";
import { motion } from "motion/react";
import ScoreInput from "./ScoreInput";

const SubCriteriaGrid = ({
    candidates,
    subCriteria,
    scoresRef,
    onScoreChange,
    submitted = false,
    scores = [],
    category, // <-- new prop for dynamic category
}) => {
    return (
        <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {candidates.map((candidate, index) => {
                const defaultImage = "/candidates/linear.jfif";
                const genderFolder =
                    candidate.gender?.toLowerCase() || "unknown";
                const imageSrc = candidate.profile_img
                    ? candidate.profile_img
                    : `/candidates/${genderFolder}/${genderFolder}_${index + 1}.jpg`;

                const candidateScores = scoresRef.current[candidate.id] || {};

                // Dynamically get saved score & sub-scores for this category
                const savedScore = scores?.[candidate.id] || null;
                const parsedSubScores = savedScore?.[category]
                    ? JSON.parse(savedScore[category])
                    : null;
                const savedTotal = savedScore?.[`${category}_total`] || null;

                const total = subCriteria.reduce(
                    (sum, sub) => sum + (candidateScores[sub.key] || 0),
                    0,
                );
                // Convert savedTotal to a number
                const numericSavedTotal =
                    savedTotal !== null ? parseFloat(savedTotal) : null;

                const percentage = ((savedTotal ?? total) / 100) * 100;
                const getScoreColor = (pct) => {
                    if (pct >= 80) return "from-green-500 to-emerald-600";
                    if (pct >= 60) return "from-blue-500 to-cyan-600";
                    if (pct >= 40) return "from-yellow-500 to-orange-600";
                    return "from-red-500 to-pink-600";
                };

                return (
                    <motion.div
                        key={candidate.id}
                        className="bg-neutral-900 border border-white/20 rounded-xl p-6 shadow-[0_4px_15px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.5)] transition-shadow duration-300"
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Candidate Info */}
                            <div className="flex flex-col items-center md:w-1/4">
                                <img
                                    src={imageSrc || defaultImage}
                                    alt={`${candidate.first_name} ${candidate.last_name}`}
                                    className="w-full h-64 object-cover rounded-md mb-3"
                                />
                                <p className="text-xs text-gray-400 mb-1">
                                    # {candidate.candidate_number}
                                </p>
                                <h3 className="font-bold text-white text-center">
                                    {candidate.first_name} {candidate.last_name}
                                </h3>
                                {candidate.course && (
                                    <p className="text-sm text-gray-300 mt-1 text-center">
                                        {candidate.course}
                                    </p>
                                )}
                                <div className="mt-4 text-center">
                                    <p className="text-lg font-bold text-blue-400">
                                        Total:{" "}
                                        {(numericSavedTotal ?? total).toFixed(
                                            1,
                                        )}{" "}
                                        / 100
                                    </p>
                                </div>
                            </div>

                            {/* Sub-Criteria Scores */}
                            {parsedSubScores ? (
                                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {Object.entries(parsedSubScores).map(
                                        ([key, value]) => {
                                            const sub = subCriteria.find(
                                                (s) => s.key === key,
                                            );
                                            const max = sub?.max || 10;

                                            return (
                                                <div
                                                    key={key}
                                                    className="flex flex-col justify-center items-center bg-neutral-800 px-4 py-4 rounded-md shadow hover:shadow-lg transition-shadow duration-200"
                                                >
                                                    <span className="text-2xl font-bold text-blue-400 mb-1">
                                                        {value} / {max}
                                                    </span>
                                                    <span className="text-gray-300 capitalize text-sm text-center">
                                                        {key.replaceAll(
                                                            "_",
                                                            " ",
                                                        )}
                                                    </span>
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            ) : (
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {subCriteria.map((sub) => (
                                        <div
                                            key={sub.key}
                                            className="flex flex-col"
                                        >
                                            <label className="text-sm text-gray-300 mb-2 font-medium">
                                                {sub.label}
                                            </label>
                                            <ScoreInput
                                                value={
                                                    candidateScores[sub.key] ??
                                                    ""
                                                }
                                                onChange={(val) =>
                                                    onScoreChange(
                                                        candidate.id,
                                                        sub.key,
                                                        val,
                                                    )
                                                }
                                                max={sub.max}
                                                disabled={submitted}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default SubCriteriaGrid;
