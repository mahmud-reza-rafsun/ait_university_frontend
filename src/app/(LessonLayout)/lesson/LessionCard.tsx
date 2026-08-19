"use client";

import * as React from "react";
import Link from "next/link";
import {
    BookOpen,
    Clock,
    PlayCircle,
    CheckCircle2,
    Lock,
    ChevronRight,
    Flame,
    Trophy,
    Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── Types ────────────────────────────────────────────────────────────────────

type LessonStatus = "completed" | "in-progress" | "locked";

interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: string;          // e.g. "45 min"
    progress: number;          // 0–100
    status: LessonStatus;
    module: string;
    creditPoints: number;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const lessons: Lesson[] = [
    {
        id: "1",
        title: "Introduction to Credit-Based Learning",
        description:
            "Understand how the AIT credit system works, how credits are earned, and how they map to your degree requirements.",
        duration: "32 min",
        progress: 100,
        status: "completed",
        module: "Foundation",
        creditPoints: 3,
    },
    {
        id: "2",
        title: "Academic Research Methodology",
        description:
            "Learn the fundamentals of structured research — from forming a hypothesis to citing primary sources correctly.",
        duration: "48 min",
        progress: 65,
        status: "in-progress",
        module: "Core Skills",
        creditPoints: 4,
    },
    {
        id: "3",
        title: "Data Analysis with Python",
        description:
            "Apply statistical methods and pandas to real datasets. Covers data cleaning, visualisation, and interpretation.",
        duration: "1h 20 min",
        progress: 20,
        status: "in-progress",
        module: "Data Science",
        creditPoints: 5,
    },
    {
        id: "4",
        title: "Professional Communication",
        description:
            "Write and present complex ideas clearly. This lesson covers academic writing, email etiquette, and oral presentation structure.",
        duration: "40 min",
        progress: 0,
        status: "locked",
        module: "Core Skills",
        creditPoints: 3,
    },
    {
        id: "5",
        title: "Machine Learning Fundamentals",
        description:
            "An end-to-end walkthrough of supervised and unsupervised learning models with hands-on exercises.",
        duration: "2h 05 min",
        progress: 0,
        status: "locked",
        module: "Data Science",
        creditPoints: 6,
    },
    {
        id: "6",
        title: "Entrepreneurship & Innovation",
        description:
            "Study real startup case studies and practice lean canvas planning, MVP scoping, and go-to-market strategy.",
        duration: "55 min",
        progress: 0,
        status: "locked",
        module: "Business",
        creditPoints: 4,
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusMeta: Record<
    LessonStatus,
    { label: string; icon: React.ReactNode; badgeClass: string }
> = {
    completed: {
        label: "Completed",
        icon: <CheckCircle2 className="size-4" />,
        badgeClass:
            "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
    },
    "in-progress": {
        label: "In Progress",
        icon: <PlayCircle className="size-4" />,
        badgeClass:
            "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
    },
    locked: {
        label: "Locked",
        icon: <Lock className="size-3.5" />,
        badgeClass:
            "bg-muted text-muted-foreground border-border",
    },
};

const progressBarColor = (progress: number, status: LessonStatus) => {
    if (status === "completed") return "bg-emerald-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress > 0) return "bg-amber-500";
    return "bg-border";
};

// ─── Stat card ────────────────────────────────────────────────────────────────

const StatCard = ({
    icon,
    label,
    value,
    sub,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    sub?: string;
}) => (
    <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card px-4 py-3.5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
            {icon}
        </div>
        <div>
            <p className="text-xs text-muted-foreground leading-none mb-1">{label}</p>
            <p className="text-lg font-semibold text-foreground leading-none">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
        </div>
    </div>
);

// ─── Lesson card ──────────────────────────────────────────────────────────────

const LessonCard = ({ lesson }: { lesson: Lesson }) => {
    const meta = statusMeta[lesson.status];
    const isLocked = lesson.status === "locked";
    const isCompleted = lesson.status === "completed";

    const buttonLabel =
        lesson.status === "completed"
            ? "Review again"
            : lesson.progress > 0
                ? "Continue"
                : "Start lesson";

    return (
        <article
            className={cn(
                "group relative flex flex-col rounded-2xl border bg-card transition-all duration-200",
                isLocked
                    ? "border-border/40 opacity-60"
                    : "border-border/60 hover:border-border hover:shadow-md hover:shadow-black/[0.04] dark:hover:shadow-black/20"
            )}
        >
            {/* Top strip — completed lessons get a thin green accent line */}
            {isCompleted && (
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-emerald-500" />
            )}

            <div className="flex flex-col flex-1 p-5 sm:p-6 gap-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Module tag */}
                        <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                            {lesson.module}
                        </span>
                        <span className="text-border">·</span>
                        {/* Credit badge */}
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                            <Trophy className="size-3" />
                            {lesson.creditPoints} credits
                        </span>
                    </div>

                    {/* Status badge */}
                    <Badge
                        variant="outline"
                        className={cn(
                            "shrink-0 gap-1.5 text-xs font-medium px-2 py-1 rounded-full border",
                            meta.badgeClass
                        )}
                    >
                        {meta.icon}
                        {meta.label}
                    </Badge>
                </div>

                {/* Title + description */}
                <div className="space-y-1.5 flex-1">
                    <h3
                        className={cn(
                            "text-base font-semibold leading-snug",
                            isLocked ? "text-muted-foreground" : "text-foreground"
                        )}
                    >
                        {lesson.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {lesson.description}
                    </p>
                </div>

                {/* Progress section */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">
                            Progress
                        </span>
                        <span
                            className={cn(
                                "font-semibold tabular-nums",
                                isCompleted
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : lesson.progress > 0
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-muted-foreground"
                            )}
                        >
                            {lesson.progress}%
                        </span>
                    </div>

                    {/* Custom progress bar */}
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                            className={cn(
                                "h-full rounded-full transition-all duration-500",
                                progressBarColor(lesson.progress, lesson.status)
                            )}
                            style={{ width: `${lesson.progress}%` }}
                        />
                    </div>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-1">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3.5" />
                        {lesson.duration}
                    </span>

                    {isLocked ? (
                        <Button
                            size="sm"
                            variant="outline"
                            disabled
                            className="h-8 px-3.5 text-xs font-medium gap-1.5 rounded-lg cursor-not-allowed"
                        >
                            <Lock className="size-3.5" />
                            Locked
                        </Button>
                    ) : (
                        <Link href={`/lesson/${lesson.id}`}>
                            <Button
                                size="sm"
                                variant={isCompleted ? "outline" : "default"}
                                className={cn(
                                    "h-8 px-3.5 text-xs font-medium gap-1.5 rounded-lg transition-all",
                                    !isCompleted &&
                                    "shadow-sm hover:shadow-md group-hover:gap-2.5"
                                )}
                            >
                                {buttonLabel}
                                <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
};

// ─── Filter tabs ──────────────────────────────────────────────────────────────

const filters = ["In Progress", "Completed", "Locked"] as const;
type Filter = (typeof filters)[number];

const matchesFilter = (lesson: Lesson, filter: Filter): boolean => {
    if (filter === "In Progress") return lesson.status === "in-progress";
    if (filter === "Completed") return lesson.status === "completed";
    if (filter === "Locked") return lesson.status === "locked";
    return true;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LessonPage() {
    const [activeFilter, setActiveFilter] = React.useState<Filter>("In Progress");

    const totalCredits = lessons
        .filter((l) => l.status === "completed")
        .reduce((sum, l) => sum + l.creditPoints, 0);

    const completedCount = lessons.filter((l) => l.status === "completed").length;
    const inProgressCount = lessons.filter((l) => l.status === "in-progress").length;
    const overallProgress = Math.round(
        lessons.reduce((sum, l) => sum + l.progress, 0) / lessons.length
    );

    const filtered = lessons.filter((l) => matchesFilter(l, activeFilter));

    return (
        <main className="min-h-screen bg-background pt-20 pb-16 flex flex-col items-center">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl flex flex-col items-center">

                {/* ── Stats row ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 w-full">
                    <StatCard
                        icon={<Flame className="size-4 text-orange-500" />}
                        label="Overall progress"
                        value={`${overallProgress}%`}
                        sub={`${completedCount} of ${lessons.length} done`}
                    />
                    <StatCard
                        icon={<PlayCircle className="size-4 text-blue-500" />}
                        label="In progress"
                        value={String(inProgressCount)}
                        sub="active lessons"
                    />
                    <StatCard
                        icon={<CheckCircle2 className="size-4 text-emerald-500" />}
                        label="Completed"
                        value={String(completedCount)}
                        sub="lessons finished"
                    />
                    <StatCard
                        icon={<Target className="size-4 text-violet-500" />}
                        label="Credits earned"
                        value={String(totalCredits)}
                        sub="of your target"
                    />
                </div>

                {/* ── Filter tabs ── */}
                <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto pb-0.5 scrollbar-none w-full">
                    {filters.map((f) => {
                        const count = lessons.filter((l) => matchesFilter(l, f)).length;

                        return (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={cn(
                                    "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    activeFilter === f
                                        ? "bg-foreground text-background shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                )}
                            >
                                {f}
                                <span
                                    className={cn(
                                        "inline-flex items-center justify-center rounded-full text-[10px] font-semibold min-w-[18px] h-[18px] px-1",
                                        activeFilter === f
                                            ? "bg-background/20 text-background"
                                            : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* ── Lesson grid ── */}
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center gap-3 w-full">
                        <BookOpen className="size-10 text-muted-foreground/40" />
                        <p className="text-muted-foreground text-sm">
                            No lessons in this category yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
                        {filtered.map((lesson) => (
                            <LessonCard key={lesson.id} lesson={lesson} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
