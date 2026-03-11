"use client";

import React from "react";
import ScoreInput from "./ScoreInput";

const SubCriteriaGridMinimal = ({
    candidates,
    subCriteria,
    scoresRef,
    onScoreChange,
    submitted = false,
}) => {
    return (
        <div className="w-full p-4 space-y-8">
            {candidates.map((candidate, index) => {
                const defaultImage = "/candidates/linear.jfif";
                const genderFolder =
                    candidate.gender?.toLowerCase() || "unknown";
                const imageSrc = candidate.profile_img
                    ? candidate.profile_img
                    : `/candidates/${genderFolder}/${genderFolder}_${
                          index + 1
                      }.jpg`;

                const candidateScores = scoresRef.current[candidate.id] || {};
                const total = subCriteria.reduce(
                    (sum, sub) => sum + (candidateScores[sub.key] || 0),
                    0
                );

                return (
                    <div
                        key={candidate.id}
                        className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                    >
                        {/* Candidate Header */}
                        <div className="relative h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-b border-white/10">
                            <div className="absolute inset-0 flex items-center justify-between px-8">
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full"></div>
                                        <img
                                            src={imageSrc || defaultImage}
                                            alt={`${candidate.first_name} ${candidate.last_name}`}
                                            className="relative w-32 h-32 object-cover rounded-full border-4 border-white/20 shadow-2xl"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-blue-400 mb-2 font-mono tracking-wider">
                                            CANDIDATE #{candidate.candidate_number}
                                        </p>
                                        <h3 className="text-3xl font-bold text-white mb-2">
                                            {candidate.first_name} {candidate.last_name}
                                        </h3>
                                        {candidate.course && (
                                            <p className="text-sm text-gray-400">
                                                Bachelor of {candidate.course}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-400 mb-2">Total Score</p>
                                    <div className="px-6 py-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
                                        <p className="text-4xl font-bold text-white">
                                            {total.toFixed(1)}
                                        </p>
                                        <p className="text-sm text-blue-100">/ 100</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Scoring Section */}
                        <div className="p-8">
                            <div className="grid grid-cols-5 gap-4">
                                {subCriteria.map((sub) => (
                                    <div
                                        key={sub.key}
                                        className="flex flex-col items-center p-4 bg-neutral-800/40 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all"
                                    >
                                        <label className="text-xs text-gray-400 mb-3 text-center font-medium uppercase tracking-wide">
                                            {sub.label}
                                        </label>
                                        <ScoreInput
                                            value={candidateScores[sub.key] ?? ""}
                                            onChange={(val) =>
                                                onScoreChange(
                                                    candidate.id,
                                                    sub.key,
                                                    val
                                                )
                                            }
                                            max={sub.max}
                                            disabled={submitted}
                                        />
                                        <p className="text-xs text-gray-600 mt-2">
                                            Max: {sub.max}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SubCriteriaGridMinimal;
