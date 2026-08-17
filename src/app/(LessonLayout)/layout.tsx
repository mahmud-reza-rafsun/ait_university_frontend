"use client"
import { Navbar } from "./_components/Layout/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="min-h-screen bg-white dark:bg-[#030303]">
            <Navbar />
            <div className="flex pt-16">
                <div className="flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
