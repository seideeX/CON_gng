"use client";

import React from "react";
import ScoreInput from "./ScoreInput";

const SubCriteriaGridTable = ({
    candidates,
    subCriteria,
    scoresRef,
    onScoreChange,
    submitted = false,
}) => {
    return (
        <div className="w-full p-4">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-neutral-950 border-b-2 border-blue-500/30">
                            <th className="p-4 text-left text-sm font-semibold text-gray-300 sticky left-0 bg-neutral-950 z-10">
                                Candidate
                            </th>
                            {subCriteria.map((sub) => (
                                <th
                                    key={sub.key}
                                    className="p-4 text-center text-sm font-semibold text-gray-300 min-w-[140px]"
                                >
                                    <div>{sub.label}</div>
                                    <div className="text-xs text-gray-500 font-normal mt-1">
                                        Max: {sub.max}
                                    </div>
                                </th>
                            ))}
                            <th className="p-4 text-center text-sm font-semibold text-gray-300 min-w-[120px]">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
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
                                <tr
                                    key={candidate.id}
                                    className="border-b border-white/10 hover:bg-neutral-800/30 transition-colors"
                                >
                                    <td className="p-4 sticky left-0 bg-neutral-900 z-10">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={imageSrc || defaultImage}
                                                alt={`${candidate.first_name} ${candidate.last_name}`}
                                                className="w-16 h-16 object-cover rounded-lg shadow-md"
                                            />
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1 font-mono">
                                                    #{candidate.candidate_number}
                                                </p>
                                                <p className="font-semibold text-white text-sm">
                                                    {candidate.first_name} {candidate.last_name}
                                                </p>
                                                {candidate.course && (
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {candidate.course}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    {subCriteria.map((sub) => (
                                        <td key={sub.key} className="p-4">
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
                                        </td>
                                    ))}
                                    <td className="p-4">
                                        <div className="flex justify-center">
                                            <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                                <p className="text-lg font-bold text-blue-400 text-center">
                                                    {total.toFixed(1)}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubCriteriaGridTable;
