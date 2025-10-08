"use client";

import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    TableCaption,
} from "@/components/ui/table";
import PrintButton from "./PrintButton";

const ResultTable = ({ title, candidates, judgeOrder, category }) => {
    const tableRef = React.useRef();

    return (
        <div className="p-4 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl font-bold mb-4">{title}</h2>
                <PrintButton
                    title={title}
                    tableRef={tableRef}
                    category={category}
                />
            </div>

            <div ref={tableRef}>
                <Table className="bg-neutral-900 text-white border border-gray-700">
                    <TableCaption className="text-white">{title}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Candidate</TableHead>
                            {judgeOrder.map((judge) => (
                                <TableHead key={judge}>
                                    {judge.replace("_", " ").toUpperCase()}
                                </TableHead>
                            ))}
                            <TableHead>Total</TableHead>
                            <TableHead>Rank</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {candidates.map((c) => (
                            <TableRow
                                key={c.candidate.id}
                                className={
                                    c.rank === 1
                                        ? "bg-yellow-600 text-black font-bold"
                                        : ""
                                }
                            >
                                <TableCell>{c.candidate_number}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={
                                                c.candidate.profile_img
                                                    ? `/${c.candidate.profile_img.replace(
                                                          "admin/",
                                                          ""
                                                      )}`
                                                    : "/default-avatar.png"
                                            }
                                            alt={`${c.candidate.first_name} ${c.candidate.last_name}`}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span>
                                            {c.candidate.first_name}{" "}
                                            {c.candidate.last_name}
                                        </span>
                                    </div>
                                </TableCell>
                                {judgeOrder.map((judge) => (
                                    <TableCell key={judge}>
                                        {Number(c.scores[judge] ?? 0).toFixed(
                                            2
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    {Number(c.total).toFixed(2)}
                                </TableCell>
                                <TableCell>{c.rank}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ResultTable;
