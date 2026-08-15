"use client";

import * as React from "react";
import { Award, BookOpenCheck, Globe, Users2 } from "lucide-react";

const stats = [
    {
        icon: Users2,
        value: "15,000+",
        label: "Enrolled Students",
        sub: "From 60+ Countries",
    },
    {
        icon: BookOpenCheck,
        value: "96.4%",
        label: "Graduate Employment",
        sub: "Within 6 Months",
    },
    {
        icon: Award,
        value: "#12",
        label: "Global Rank in AI",
        sub: " QS World Ranking",
    },
    {
        icon: Globe,
        value: "$14M+",
        label: "Research Grants",
        sub: "Annual Funding",
    },
];

export function StatsSection() {
    return (
        <section className="relative py-16 overflow-hidden bg-muted/20 border-y border-border/50">
            {/* Classroom Glow Effect */}
            <div className="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className="relative rounded-2xl border border-border/40 bg-background/60 p-6 backdrop-blur-md shadow-sm"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                                        <Icon className="size-6" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-extrabold text-foreground tracking-tight">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-base font-semibold text-foreground">
                                    {item.label}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {item.sub}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}