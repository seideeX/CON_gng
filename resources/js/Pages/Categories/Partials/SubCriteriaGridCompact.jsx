"use client";

import React from "react";
import { motion } from "motion/react";
import ScoreInput from "./ScoreInput";

const SubCriteriaGridCompact = ({
    candidates,
    subCriteria,
    scoresRef,
    onScoreChange,
    submitted = false,
}) => {
    return (
        <div className="w-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    if (pct >= 80) return { gradient: "from-green-500 to-emerald-600", glow: "shadow-green-500/20" };
                    if (pct >= 60) return { gradient: "from-blue-500 to-cyan-600", glow: "shadow-blue-500/20" };
                    if (pct >= 40) return { gradient: "from-yellow-500 to-orange-600", glow: "shadow-yellow-500/20" };
                    return { gradient: "from-red-500 to-pink-600", glow: "shadow-red-500/20" };
                };
                const scoreColor = getScoreColor(percentage);

                return (
                    <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        className="group bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/20 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_rgba(50,117,248,0.3)] hover:border-blue-500/50 transition-all duration-500"
                    >
                        {/* Header with Image and Info */}
                        <div className="relative flex items-center gap-5 p-5 bg-gradient-to-r from-neutral-950/80 to-neutral-900/80 border-b border-white/10">
                            {/* Decorative gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Profile Image */}
                            <div className="relative z-10">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-75 blur transition-opacity duration-500" />
                                <img
                                    src={imageSrc || defaultImage}
                                    alt={`${candidate.first_name} ${candidate.last_name}`}
                                    className="relative w-28 h-28 object-cover rounded-xl shadow-xl ring-2 ring-white/10 group-hover:ring-white/30 transition-all duration-300"
                                />
                            </div>

                            {/* Candidate Info */}
                            <div className="relative z-10 flex-1 min-w-0">
                                <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg mb-2">
                                    #{candidate.candidate_number}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1 truncate">
                                    {candidate.first_name} {candidate.last_name}
                                </h3>
                                {candidate.course && (
                                    <p className="text-sm text-gray-400 truncate">
                                        Bachelor of {candidate.course}
                                    </p>
                                )}
                            </div>

                            {/* Total Score Badge */}
                            <div className={`relative z-10 px-6 py-4 bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 rounded-xl shadow-xl ${scoreColor.glow}`}>
                                <div className={`absolute inset-0 bg-gradient-to-r ${scoreColor.gradient} opacity-10 rounded-xl`} />
                                <div className="relative">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 text-center font-semibold">
                                        Total
                                    </p>
                                    <p className={`text-3xl font-black text-center bg-gradient-to-r ${scoreColor.gradient} bg-clip-text text-transparent`}>
                                        {total.toFixed(1)}
                                    </p>
                                    <p className="text-xs text-gray-500 text-center">
                                        / 100
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SubCriteriaGridCompact;
