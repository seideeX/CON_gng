"use client";
import React, { useState } from "react";
import {
    Sidebar,
    SidebarBody,
    SidebarLink,
    Logo,
    LogoIcon,
    SidebarHeader,
} from "@/Components/ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";

export default function SidebarMain({ children, user }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="dark">
            <div
                className={cn(
                    "flex flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800 w-full h-screen"
                )}
            >
                <Sidebar open={open} setOpen={setOpen}>
                    <SidebarBody className="justify-between gap-10">
                        <div className="flex flex-col overflow-x-hidden overflow-y-auto">
                            {/* Logo at the top */}
                            {open ? <Logo /> : <LogoIcon />}

                            {/* Main section header */}
                            <SidebarHeader label="Top 5 Selection" />

                            {/* Main links */}
                            <div className="mt-2 flex flex-col gap-2">
                                {[
                                    {
                                        label: "Production Number",
                                        icon: <IconBrandTabler />,
                                    },
                                    {
                                        label: "Casual Wear",
                                        icon: <IconUserBolt />,
                                    },
                                    {
                                        label: "Swim Wear",
                                        icon: <IconSettings />,
                                    },
                                    {
                                        label: "Formal Wear",
                                        icon: <IconSettings />,
                                    },
                                ].map((link, idx) => {
                                    const iconElement = link.icon
                                        ? React.cloneElement(link.icon, {
                                              className:
                                                  "h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200",
                                          })
                                        : null;

                                    return (
                                        <SidebarLink
                                            key={idx}
                                            link={{
                                                ...link,
                                                icon: iconElement,
                                                className:
                                                    "text-neutral-700 dark:text-neutral-200",
                                            }}
                                        />
                                    );
                                })}
                            </div>

                            {/* Top 5 section header */}
                            <SidebarHeader label="Top 5 Finalist" />

                            {/* Top 5 links with icons */}
                            <div className="mt-2 flex flex-col gap-2">
                                {[
                                    {
                                        label: "Beauty of the Face and Figure",
                                        icon: <IconBrandTabler />,
                                    },
                                    {
                                        label: "Delivery",
                                        icon: <IconUserBolt />,
                                    },
                                    {
                                        label: "Over-all Appeal/X-factor",
                                        icon: <IconSettings />,
                                    },
                                ].map((link, idx) => {
                                    const iconElement = link.icon
                                        ? React.cloneElement(link.icon, {
                                              className:
                                                  "h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200",
                                          })
                                        : null;

                                    return (
                                        <SidebarLink
                                            key={idx}
                                            link={{
                                                ...link,
                                                icon: iconElement,
                                                className:
                                                    "text-neutral-700 dark:text-neutral-200",
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <SidebarLink
                                link={{
                                    label: `${
                                        user?.role === "admin"
                                            ? "Admin"
                                            : "Judge"
                                    }: ${user?.name || "User"}`,
                                    href: "#",
                                    icon: (
                                        <img
                                            src="https://assets.aceternity.com/manu.png"
                                            className="h-7 w-7 shrink-0 rounded-full"
                                            width={50}
                                            height={50}
                                            alt="Avatar"
                                        />
                                    ),
                                    className:
                                        "text-neutral-700 dark:text-neutral-200",
                                }}
                            />
                            <SidebarLink
                                link={{
                                    label: "Logout",
                                    href: "#",
                                    icon: (
                                        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                                    ),
                                    onClick: (e) => {
                                        e.preventDefault();
                                        router.post("/logout");
                                    },
                                    className:
                                        "text-neutral-700 dark:text-neutral-200",
                                }}
                            />
                        </div>
                    </SidebarBody>
                </Sidebar>

                <div className="flex flex-1">{children}</div>
            </div>
        </div>
    );
}
