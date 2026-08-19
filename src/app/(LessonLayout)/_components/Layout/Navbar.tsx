"use client";

import {
    Menu,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MenuItem, NavbarProps } from "@/interface/navbar.interface";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import ThemeToggle from "@/components/shared/theme/ThemeToggle";
import { UserMenu } from "@/components/shared/UserMenu";

const defaultMenu: MenuItem[] = [
    { title: "Lesson", url: "/lesson" },
    { title: "Research", url: "/research" },
    { title: "AIT Crecker", url: "/ait-crecker" },
];

const Navbar = ({
    menu = defaultMenu,
    className,
}: NavbarProps) => {

    const currentUser = {
        name: "John Doe",
        email: "john@example.com",
        image: "https://github.com/shadcn.png",
    };

    const handleLogout = async () => {
        // Logout logic here
        console.log("User logged out");
    };


    return (
        <section
            className={cn(
                "fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md backdrop-saturate-150 transition-all duration-200",
                className
            )}
        >
            <div className="container mx-auto px-4 md:px-6 py-3">
                <nav className="hidden items-center justify-between lg:flex">
                    <Link href="/" className="flex items-center gap-3">
                        <Logo />
                    </Link>

                    <div className="flex items-center gap-6">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-1">
                                {menu.map((item) => renderMenuItem(item))}
                            </NavigationMenuList>
                        </NavigationMenu>

                        <div className="h-5 w-px bg-border/60" />

                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            <UserMenu user={currentUser} onLogout={handleLogout} />
                            <Button
                                className="h-9 px-5 font-medium transition-all"
                                render={<Link href="/dashboard">Dashboard</Link>} />
                        </div>
                    </div>
                </nav>

                <div className="flex items-center justify-between lg:hidden">
                    <Link href="/" className="flex items-center gap-2">
                        <Logo />
                    </Link>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <UserMenu user={currentUser} onLogout={handleLogout} />
                        <Sheet>
                            <SheetTrigger className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-border bg-background text-foreground hover:bg-muted transition-colors">
                                <Menu className="size-5" />
                            </SheetTrigger>

                            <SheetContent className="w-full max-w-xs border-l border-border/40 bg-background/95 backdrop-blur-xl p-0 [&>button]:top-4 [&>button]:right-5 [&>button]:text-muted-foreground [&>button]:hover:text-foreground">
                                <SheetHeader className="flex flex-row items-center h-[57px] px-5 border-b border-border/40">
                                    <SheetTitle className="flex items-center gap-2.5 font-medium text-foreground m-0 p-0 leading-none">
                                        <Logo />
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col justify-between h-[calc(100vh-57px)] px-5 pt-3 pb-6">
                                    <Accordion className="w-full">
                                        {menu.map((item) => renderMobileMenuItem(item))}
                                    </Accordion>

                                    <div className="flex flex-col gap-2.5 pt-5 border-t border-border/40">
                                        <Button
                                            className="w-full h-10 font-medium"
                                            render={<Link href="/dashboard">Dashboard</Link>} />

                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger className="bg-transparent font-normal text-muted-foreground hover:text-foreground focus:text-foreground data-[state=open]:text-foreground hover:bg-muted/40 transition-colors">
                    {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-2 md:w-95 lg:w-110 backdrop-blur-md rounded-xl">
                    <ul className="grid gap-1.5 p-1.5">
                        {item.items.map((subItem) => (
                            <li key={subItem.title}>
                                <NavigationMenuLink
                                    render={
                                        <Link
                                            href={subItem.url}
                                            className="flex select-none gap-3 rounded-lg p-2.5 no-underline outline-none transition-colors hover:bg-muted/60 focus:bg-muted/60"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/60">
                                                {subItem.icon}
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none text-foreground">
                                                    {subItem.title}
                                                </p>
                                                {subItem.description && (
                                                    <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground pt-0.5">
                                                        {subItem.description}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <Link
                href={item.url}
                className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3.5 py-2 text-sm font-normal text-muted-foreground no-underline transition-colors hover:text-foreground hover:bg-muted/40 focus:bg-muted/40 focus:outline-none"
            >
                {item.title}
            </Link>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b border-border/30">
                <AccordionTrigger className="py-3 text-sm font-normal text-foreground hover:text-foreground hover:no-underline [&>svg]:text-muted-foreground">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="pb-3 pt-0">
                    <div className="flex flex-col space-y-0.5 pl-3 ml-1 border-l-2 border-primary/20">
                        {item.items.map((subItem) => (
                            <Link
                                key={subItem.title}
                                href={subItem.url}
                                className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-normal text-muted-foreground no-underline hover:text-foreground hover:bg-muted/50 transition-colors"
                            >
                                <span className="shrink-0 [&>svg]:size-4">{subItem.icon}</span>
                                <span>{subItem.title}</span>
                            </Link>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <div key={item.title} className="border-b border-border/30">
            <Link
                href={item.url}
                className="flex items-center py-3 text-sm font-normal text-foreground no-underline hover:text-primary transition-colors"
            >
                {item.title}
            </Link>
        </div>
    );
};

export { Navbar };
