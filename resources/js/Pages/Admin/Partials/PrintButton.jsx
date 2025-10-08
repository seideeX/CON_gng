"use client";

import React from "react";
import { HoverBorderGradient } from "@/Components/ui/hover-border-gradient";
import html2pdf from "html2pdf.js";

const PrintButton = ({ title, tableRef, category }) => {
    const handlePrintPDF = () => {
        const filename = `${(category || title).replace(/\s+/g, "_")}.pdf`;
        const element = tableRef.current;
        if (!element) return;

        html2pdf()
            .set({
                margin: 2,
                filename,
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            })
            .from(element)
            .save();
    };

    return (
        <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-neutral-800 bg-white text-black dark:text-neutral-100 flex items-center space-x-2 px-12 py-1 text-lg font-semibold"
            onClick={handlePrintPDF}
        >
            <span>Print PDF</span>
        </HoverBorderGradient>
    );
};

export default PrintButton;
