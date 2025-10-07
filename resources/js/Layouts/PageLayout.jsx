// PageLayout.jsx
"use client";
import React from "react";
import SidebarMain from "@/Components/SidebarMain";

export default function PageLayout({ children, auth }) {
    const user = auth?.user; // extract user here
    return <SidebarMain user={user}>{children}</SidebarMain>;
}
