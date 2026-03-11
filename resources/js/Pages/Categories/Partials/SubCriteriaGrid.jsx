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
}) => {
    return (
        <div className="w-full p-4 grid grid-cols-1 gap-6">
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

                const percentage = (total / 100) * 100;
                const getScoreColor = (pct) => {
                    if (pct >= 80) return "from-green-500 to-emerald-600";
                    if (pct >= 60) return "from-blue-500 to-cyan-600";
                    if (pct >= 40) return "from-yellow-500 to-orange-600";
                    return "from-red-500 to-pink-600";
                };

                return (
                    <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="group bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/20 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_rgba(50,117,248,0.3)] hover:border-blue-500/50 transition-all duration-500"
                    >
                        <div className="flex flex-col md:flex-row">
                            {/* Candidate Info Sidebar */}
                            <div className="relative flex flex-col items-center md:w-80 bg-gradient-to-b from-neutral-950/80 to-neutral-900/80 p-8 border-r border-white/10">
                                {/* Decorative gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="relative z-10 w-full">
                                    {/* Image with animated border */}
                                    <div className="relative mb-6">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-75 blur transition-opacity duration-500" />
                                        <img
                                            src={imageSrc || defaultImage}
                                            alt={`${candidate.first_name} ${candidate.last_name}`}
                                            className="relative w-full h-80 object-cover rounded-xl shadow-2xl ring-2 ring-white/10 group-hover:ring-white/30 transition-all duration-300"
                                        />
                                    </div>

                                    {/* Candidate Number Badge */}
                                    <div className="flex justify-center mb-3">
                                        <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                                            CANDIDATE #{candidate.candidate_number}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-2xl font-bold text-white text-center mb-2 tracking-tight">
                                        {candidate.first_name} {candidate.last_name}
                                    </h3>

                                    {/* Course */}
                                    {candidate.course && (
                                        <p className="text-sm text-gray-400 text-center leading-relaxed mb-6 px-2">
                                            Bachelor of {candidate.course}
                                        </p>
                                    )}

                                    {/* Total Score Card */}
                                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 border border-white/10 shadow-xl">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${getScoreColor(percentage)} opacity-10`} />
                                        <div className="relative z-10">
                                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 text-center font-semibold">
                                                Total Score
                                            </p>
                                            <p className={`text-4xl font-black text-center bg-gradient-to-r ${getScoreColor(percentage)} bg-clip-text text-transparent`}>
                                                {total.toFixed(1)}
                                            </p>
                                            <p className="text-sm text-gray-500 text-center mt-1">
                                                out of 100
                                            </p>
                                            {/* Progress bar */}
                                            <div className="mt-4 h-2 bg-neutral-700 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 1, delay: 0.3 }}
                                                    className={`h-full bg-gradient-to-r ${getScoreColor(percentage)} rounded-full shadow-lg`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Scoring Section */}
                            <div className="flex-1 p-8">
                                <h4 className="text-lg font-semibold text-gray-300 mb-6 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                                    Scoring Criteria
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {subCriteria.map((sub, idx) => {
                                        const score = candidateScores[sub.key] || 0;
                                        const subPercentage = (score / sub.max) * 100;
                                        
                                        return (
                                            <motion.div
                                                key={sub.key}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                                className="relative flex flex-col items-center bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 rounded-xl p-5 border border-white/10 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group/card"
                                            >
                                                {/* Glow effect on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover/card:from-blue-500/5 group-hover/card:to-purple-500/5 rounded-xl transition-all duration-300" />
                                                
                                                <div className="relative z-10 w-full">
                                                    <label className="text-sm text-gray-300 mb-4 font-semibold text-center block leading-tight">
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
                                                    <div className="flex justify-between items-center mt-3 px-1">
                                                        <p className="text-xs text-gray-500">
                                                            Max: {sub.max}
                                                        </p>
                                                        <p className="text-xs font-semibold text-blue-400">
                                                            {subPercentage.toFixed(0)}%
                                                        </p>
                                                    </div>
                                                    {/* Mini progress bar */}
                                                    <div className="mt-2 h-1 bg-neutral-700 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${subPercentage}%` }}
                                                            transition={{ duration: 0.5 }}
                                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default SubCriteriaGrid;
