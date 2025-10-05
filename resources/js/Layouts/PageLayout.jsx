"use client";
import React from "react";
import SidebarMain from "@/Components/SidebarMain";

export default function PageLayout({ children, user }) {
    return <SidebarMain user={user}>{children}</SidebarMain>;
}
