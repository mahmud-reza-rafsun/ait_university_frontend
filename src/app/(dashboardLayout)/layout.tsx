import { Navbar } from "../(LessonLayout)/_components/Layout/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="min-h-screen bg-white dark:bg-[#030303]">
            <Navbar />
            <div className="">
                <div className="">
                    {children}
                </div>
            </div>
        </div>
    );
}
