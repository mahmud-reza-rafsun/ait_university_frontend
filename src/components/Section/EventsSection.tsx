"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar, MapPin, Sparkles } from "lucide-react";

const events = [
    {
        day: "28",
        month: "AUG",
        title: "International AI & Robotics Symposium 2026",
        location: "Auditorium Hall A & Live Stream",
        time: "10:00 AM - 04:00 PM",
    },
    {
        day: "04",
        month: "SEP",
        title: "Global Student Exchange & Immersion Orientation",
        location: "Student Center Plaza",
        time: "11:30 AM - 02:00 PM",
    },
    {
        day: "12",
        month: "SEP",
        title: "Annual Hackathon: Code for Climate Action",
        location: "Innovation Hub Floor 3",
        time: "48 Hours Continuous",
    },
];

export function EventsSection() {
    return (
        <section className="relative py-20 bg-muted/10 border-t border-border/50 overflow-hidden">
            {/* Classroom Glow Effect */}
            <div className="absolute top-10 left-10 w-[450px] h-[300px] bg-primary/5 blur-[90px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
                        <Sparkles className="size-3.5" /> Campus Life
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                        Upcoming Events & Seminars
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Stay connected with guest lectures, hackathons, and cultural festivals happening on campus.
                    </p>
                </div>

                <div className="space-y-4 max-w-4xl mx-auto">
                    {events.map((event, idx) => (
                        <div
                            key={idx}
                            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-md transition-all hover:border-primary/40 hover:bg-card hover:shadow-lg"
                        >
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-center justify-center h-16 w-16 rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0">
                                    <span className="text-xl font-extrabold leading-none">
                                        {event.day}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
                                        {event.month}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                                        {event.title}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="size-3.5 text-primary" />
                                            {event.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="size-3.5 text-primary" />
                                            {event.time}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="#"
                                className="inline-flex items-center justify-center h-10 px-5 rounded-xl font-semibold text-xs border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shrink-0 w-full sm:w-auto"
                            >
                                Register Event
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}