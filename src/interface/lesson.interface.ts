export type LessonStatus = "completed" | "in-progress" | "locked";

export interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: string;          // e.g. "45 min"
    progress: number;          // 0–100
    status: LessonStatus;
    module: string;
    creditPoints: number;
}
