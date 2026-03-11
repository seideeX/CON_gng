"use client";

import React from "react";
import { LayoutGrid, LayoutList, Table, Sparkles } from "lucide-react";

const LayoutSwitcher = ({ currentLayout, onLayoutChange }) => {
    const layouts = [
        { id: "default", label: "Card View", icon: LayoutGrid },
        { id: "compact", label: "Compact", icon: LayoutList },
        { id: "table", label: "Table", icon: Table },
        { id: "minimal", label: "Minimal", icon: Sparkles },
    ];

    return (
        <div className="flex items-center gap-2 bg-neutral-900 border border-white/20 rounded-lg p-1">
            {layouts.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    onClick={() => onLayoutChange(id)}
                    className={`
                        flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200
                        ${
                            currentLayout === id
                                ? "bg-blue-500 text-white shadow-lg"
                                : "text-gray-400 hover:text-white hover:bg-neutral-800"
                        }
                    `}
                >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{label}</span>
                </button>
            ))}
        </div>
    );
};

export default LayoutSwitcher;
