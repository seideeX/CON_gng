"use client";

import React from "react";
import PageLayout from "@/Layouts/PageLayout";

const ProductionNumberResult = ({ candidates, judgeOrder }) => {
    return (
        <PageLayout>
            <div className="overflow-x-auto p-4">
                <table className="min-w-full border border-gray-300 text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 border">#</th>
                            <th className="px-4 py-2 border">Candidate</th>
                            {judgeOrder.map((judge) => (
                                <th key={judge} className="px-4 py-2 border">
                                    {judge.replace("_", " ").toUpperCase()}
                                </th>
                            ))}
                            <th className="px-4 py-2 border">
                                Total Production Number
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((c, index) => (
                            <tr key={c.candidate.id}>
                                <td className="px-4 py-2 border text-white">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-2 border text-white">
                                    {c.candidate.first_name}{" "}
                                    {c.candidate.last_name}
                                </td>
                                {judgeOrder.map((judge) => (
                                    <td
                                        key={judge}
                                        className="px-4 py-2 border text-white"
                                    >
                                        {Number(c.scores[judge] ?? 0).toFixed(
                                            2
                                        )}
                                    </td>
                                ))}
                                <td className="px-4 py-2 border text-white">
                                    {Number(c.total).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PageLayout>
    );
};

export default ProductionNumberResult;
