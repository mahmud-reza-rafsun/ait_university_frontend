"use client";

import * as React from "react";
import Link from "next/link";
import {
    ArrowRight,
    Code2,
    Cpu,
    Globe2,
    Microscope,
    Palette,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

const programs = [
    {
        icon: Code2,
        title: "Computer Science & Engineering",
        desc: "Focus on AI, Systems Software, Cloud Computing, and Next-Gen Algorithms.",
        duration: "4 Years",
        credits: "148 Credits",
        url: "#",
    },
    {
        icon: Cpu,
        title: "Robotics & Automation",
        desc: "Hands-on experience in Embedded Systems, Industrial IoT, and Mechatronics.",
        duration: "4 Years",
        credits: "152 Credits",
        url: "#",
    },
    {
        icon: Microscope,
        title: "Biotechnology & Gen-AI",
        desc: "Explore Synthetic Biology, Computational Genomics, and Bio-Informatics.",
        duration: "4 Years",
        credits: "144 Credits",
        url: "#",
    },
    {
        icon: ShieldCheck,
        title: "Cyber Security & Defense",
        desc: "Master Ethical Hacking, Cryptography, and Global Network Security.",
        duration: "4 Years",
        credits: "140 Credits",
        url: "#",
    },
    {
        icon: Globe2,
        title: "Data Science & Analytics",
        desc: "Data Modeling, Predictive Analytics, Neural Networks, and Big Data.",
        duration: "4 Years",
        credits: "146 Credits",
        url: "#",
    },
    {
        icon: Palette,
        title: "Digital Design & HCI",
        desc: "User Experience Architecture, Interactive Media, and Spatial Design.",
        duration: "4 Years",
        credits: "136 Credits",
        url: "#",
    },
];

export function Subject() {
    return (
        <section className="relative py-20 overflow-hidden bg-background">
            {/* Soft Classroom Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider">
                            <Sparkles className="size-3.5" /> Academic Excellence
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                            Featured Undergraduate Programs
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed">
                        Choose from cutting-edge disciplines curated by industry leaders and world-class researchers.
                    </p>
                </div>

                {/* 6 Subjects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="group relative rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110">
                                        <Icon className="size-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                                    <div className="text-xs text-muted-foreground font-medium">
                                        <span>{item.duration}</span> • <span>{item.credits}</span>
                                    </div>
                                    <Link
                                        href={item.url}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                                    >
                                        View Details
                                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Link
                        href="#"
                        className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-semibold text-sm border border-border/80 bg-background hover:bg-muted/50 hover:border-primary/30 shadow-sm transition-all hover:scale-[1.02]"
                    >
                        <span>View All Programs</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}