"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Atom, Binary, Cpu } from "lucide-react";

const researchHubs = [
    {
        icon: Cpu,
        title: "Quantum Computing Lab",
        desc: "Developing next-generation fault-tolerant quantum algorithms for cryptography.",
        tag: "Breakthrough",
    },
    {
        icon: Atom,
        title: "Clean Energy & Fusion",
        desc: "Pioneering sustainable solar cell nano-architectures and zero-carbon grids.",
        tag: "Eco-Tech",
    },
    {
        icon: Binary,
        title: "Autonomous Systems Lab",
        desc: "Building multi-agent AI for self-navigating robotics and drone networks.",
        tag: "AI Research",
    },
];

export function ResearchSection() {
    return (
        <section className="relative py-20 bg-background overflow-hidden">
            {/* Soft Classroom Ambient Glow */}
            <div className="absolute bottom-0 right-10 w-[500px] h-[350px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
                    <div>
                        <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                            Pioneering Tomorrow
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mt-2">
                            Advanced Research Centers
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base max-w-md">
                        Our state-of-the-art facilities empower students and faculty to publish breakthroughs globally.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {researchHubs.map((hub, index) => {
                        const Icon = hub.icon;
                        return (
                            <div
                                key={index}
                                className="group relative rounded-2xl border border-border/60 bg-card/40 p-8 backdrop-blur-md transition-all hover:bg-card hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <span className="px-3 py-1 rounded-md text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
                                        {hub.tag}
                                    </span>
                                    <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all">
                                        <ArrowUpRight className="size-5" />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <Icon className="size-8 text-primary mb-3" />
                                    <h3 className="text-xl font-bold">{hub.title}</h3>
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {hub.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}