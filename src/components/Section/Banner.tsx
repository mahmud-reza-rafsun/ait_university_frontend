"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    GraduationCap,
    Play,
    Sparkles,
    Users,
    Video,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Slide {
    id: number;
    tagline: string;
    title: string;
    subtitle: string;
    image: string;
    stats: { label: string; value: string }[];
    ctaPrimary: { text: string; url: string };
    ctaSecondary: { text: string; url: string };
}

const slides: Slide[] = [
    {
        id: 1,
        tagline: "Smart Virtual Classroom",
        title: "Next-Gen Interactive Learning Environment",
        subtitle:
            "Experience world-class AI-powered lectures, interactive lab simulations, and real-time collaboration with top faculties.",
        image:
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop",
        stats: [
            { label: "Active Classrooms", value: "150+" },
            { label: "Global Students", value: "12,000+" },
            { label: "Course Completion Rate", value: "98%" },
        ],
        ctaPrimary: { text: "Join Virtual Class", url: "#" },
        ctaSecondary: { text: "Explore Programs", url: "#" },
    },
    {
        id: 2,
        tagline: "Advanced Research Labs",
        title: "Innovation & Technological Breakthroughs",
        subtitle:
            "Empowering students to solve modern world problems through robotics, AI engineering, and data science research.",
        image:
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop",
        stats: [
            { label: "Research Papers", value: "450+" },
            { label: "AI & Innovation Hubs", value: "24" },
            { label: "Industry Partners", value: "85+" },
        ],
        ctaPrimary: { text: "Research Labs", url: "#" },
        ctaSecondary: { text: "View Projects", url: "#" },
    },
    {
        id: 3,
        tagline: "Global Campus Life",
        title: "Build Your Dream Future at AIT",
        subtitle:
            "A vibrant campus ecosystem designed for collaborative projects, international exchange programs, and holistic development.",
        image:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
        stats: [
            { label: "Clubs & Societies", value: "40+" },
            { label: "Scholarships Given", value: "$2.5M" },
            { label: "Graduate Employment", value: "95%" },
        ],
        ctaPrimary: { text: "Apply For Admission", url: "#" },
        ctaSecondary: { text: "Take Virtual Tour", url: "#" },
    },
];

// Animation Variants
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
        },
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
        },
    }),
};

export function Banner() {
    const [[page, direction], setPage] = React.useState([0, 0]);
    const [isAutoPlay, setIsAutoPlay] = React.useState(true);

    const slideIndex = Math.abs(page % slides.length);
    const currentSlide = slides[slideIndex];

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    // Auto-play Slider Effect
    React.useEffect(() => {
        if (!isAutoPlay) return;
        const timer = setInterval(() => {
            paginate(1);
        }, 6000);
        return () => clearInterval(timer);
    }, [page, isAutoPlay]);

    return (
        <div
            className="relative w-full overflow-hidden bg-background text-foreground py-8 md:py-16"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="w-full px-4 md:px-8 container mx-auto">
                <div className="relative w-full min-h-screen lg:min-h-[720px]  p-6 md:p-10 backdrop-blur-xl">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={page}
                            custom={direction}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
                        >
                            {/* Left Column: Content */}
                            <div className="lg:col-span-7 space-y-6 z-10 w-full">
                                {/* Tagline Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs md:text-sm font-semibold text-primary backdrop-blur-md"
                                >
                                    <Sparkles className="size-4 animate-pulse" />
                                    <span>{currentSlide.tagline}</span>
                                </motion.div>

                                {/* Main Heading */}
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]"
                                >
                                    {currentSlide.title}
                                </motion.h1>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
                                >
                                    {currentSlide.subtitle}
                                </motion.p>

                                {/* CTA Buttons (Fixed with shadcn asChild & proper Flex alignment) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full"
                                >
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto rounded-xl font-semibold shadow-lg shadow-primary/25"
                                    >
                                        <Link
                                            href={currentSlide.ctaPrimary.url}
                                            className="inline-flex items-center justify-center gap-2"
                                        >
                                            <span>{currentSlide.ctaPrimary.text}</span>
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full sm:w-auto rounded-xl font-semibold"
                                    >
                                        <Link
                                            href={currentSlide.ctaSecondary.url}
                                            className="inline-flex items-center justify-center gap-2"
                                        >
                                            <Play className="size-4 fill-current text-primary" />
                                            <span>{currentSlide.ctaSecondary.text}</span>
                                        </Link>
                                    </Button>
                                </motion.div>

                                {/* Live Stats */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60 w-full"
                                >
                                    {currentSlide.stats.map((stat, idx) => (
                                        <div key={idx} className="space-y-1">
                                            <p className="text-xl md:text-2xl font-black text-primary">
                                                {stat.value}
                                            </p>
                                            <p className="text-xs md:text-sm text-muted-foreground font-medium">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Right Column: Display Frame */}
                            <div className="lg:col-span-5 relative group w-full">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2 rounded-2xl border bg-background/90 p-3 shadow-xl backdrop-blur-md"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                                        <Video className="size-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">Classroom Live</p>
                                        <p className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                                            Session Ongoing
                                        </p>
                                    </div>
                                </motion.div>

                                <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl w-full">
                                    <motion.img
                                        src={currentSlide.image}
                                        alt={currentSlide.title}
                                        className="w-full h-[320px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.8 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                                        <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-md">
                                            <GraduationCap className="size-4 text-primary" />
                                            AIT Digital Campus
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-md">
                                            <Users className="size-4 text-emerald-400" />
                                            Interactive
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/40 w-full">
                        <div className="flex items-center gap-2">
                            {slides.map((_, idx) => (
                                <Button
                                    key={idx}
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        const newDirection = idx > slideIndex ? 1 : -1;
                                        setPage([idx, newDirection]);
                                    }}
                                    className={`p-0 h-2.5 rounded-full transition-all duration-300 ${idx === slideIndex
                                        ? "w-8 bg-primary hover:bg-primary"
                                        : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full size-10"
                                onClick={() => paginate(-1)}
                                aria-label="Previous Slide"
                            >
                                <ChevronLeft className="size-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full size-10"
                                onClick={() => paginate(1)}
                                aria-label="Next Slide"
                            >
                                <ChevronRight className="size-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}