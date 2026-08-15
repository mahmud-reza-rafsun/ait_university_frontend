"use client";

import * as React from "react";
import {
  BookOpen,
  GraduationCap,
  Landmark,
  Menu,
  Moon,
  Sparkles,
  Sun,
  UserCheck,
  Users,
  Code,
  Cpu,
  Microscope,
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

const AitLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 420 180"
    className={cn(
      "h-11 w-auto text-[#325E6A] dark:text-white",
      className
    )}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    {/* AIT — Geometric Monogram */}

    {/* A */}
    <path
      d="
        M 28 148
        L 78 28
        L 108 28
        L 158 148
        L 128 148
        L 116 116
        L 70 116
        L 58 148
        Z

        M 80 91
        L 106 91
        L 93 55
        Z
      "
      fill="currentColor"
      fillRule="evenodd"
    />

    {/* I — integrated vertical pillar */}
    <path
      d="
        M 168 28
        H 198
        V 148
        H 168
        Z
      "
      fill="currentColor"
    />

    {/* T — strong horizontal crown + stem */}
    <path
      d="
        M 210 28
        H 382
        V 58
        H 321
        V 148
        H 291
        V 58
        H 210
        Z
      "
      fill="currentColor"
    />

    {/* Signature geometric cut */}
    <path
      d="
        M 210 28
        H 250
        L 210 68
        Z
      "
      fill="white"
      className="dark:fill-[#0f1720]"
    />

    {/* Small institutional accent */}
    <path
      d="
        M 28 158
        H 158
        V 166
        H 28
        Z
      "
      fill="currentColor"
      opacity="0.9"
    />
  </svg>
);

const defaultMenu: MenuItem[] = [
  { title: "Home", url: "#" },
  {
    title: "Admission",
    url: "#",
    items: [
      {
        title: "How to Apply",
        description: "Step-by-step guidance for domestic & international students",
        icon: <UserCheck className="size-5 shrink-0 text-primary" />,
        url: "#",
      },
      {
        title: "Scholarships & Aid",
        description: "Financial support and merit-based scholarship programs",
        icon: <Sparkles className="size-5 shrink-0 text-primary" />,
        url: "#",
      },
      {
        title: "Student Life",
        description: "Clubs, housing, campus activities, and sports facilities",
        icon: <Users className="size-5 shrink-0 text-primary" />,
        url: "#",
      },
    ],
  },
  {
    title: "Subject",
    url: "#",
    items: [
      {
        title: "Computer Science & AI",
        description: "Explore Machine Learning, Software Engineering, and AI Systems",
        icon: <Cpu className="size-5 shrink-0 text-primary" />,
        url: "#",
      },
      {
        title: "Data Science & Analytics",
        description: "Master big data tools, statistical modeling, and predictive analytics",
        icon: <Code className="size-5 shrink-0 text-primary" />,
        url: "#",
      },
      {
        title: "Biotechnology & Health AI",
        description: "Advanced bio-computing, genomic data science, and health technologies",
        icon: <Microscope className="size-5 shrink-0 text-primary" />,
        url: "#",
      },
    ],
  },
  { title: "Research", url: "#" },
  { title: "About AIT", url: "#" },
];

const Navbar = ({
  logo = { url: "#", title: "AIT University" },
  menu = defaultMenu,
  auth = {
    login: { title: "Sign In", url: "#" },
    signup: { title: "Apply Now", url: "#" },
  },
  className,
}: NavbarProps) => {
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <section
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md backdrop-saturate-150 transition-all duration-200",
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6 py-3">
        {/* Desktop Layout */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Left Side Logo */}
          <a href={logo.url} className="flex items-center gap-3 group">
            <AitLogo className="transition-transform duration-200 group-hover:scale-105" />
          </a>

          {/* Right Side Items + Theme Toggle + Auth Buttons */}
          <div className="flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="h-5 w-px bg-border/60" />

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="rounded-full h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
              <Button
                variant="ghost"
                className="h-9 px-4 font-normal text-muted-foreground hover:text-foreground bg-muted transition-colors"
                render={<a href={auth.login.url}>{auth.login.title}</a>}
              />
              <Button
                className="h-9 px-5 font-medium shadow-sm transition-all hover:shadow-md"
                render={<a href={auth.signup.url}>{auth.signup.title}</a>}
              />
            </div>
          </div>
        </nav>

        {/* Mobile & Tablet Layout */}
        <div className="flex items-center justify-between lg:hidden">
          <a href={logo.url} className="flex items-center gap-2">
            <AitLogo />
            <span className="text-lg font-medium tracking-tight">{logo.title}</span>
          </a>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full h-9 w-9"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button
              variant="ghost"
              className="hidden sm:inline-flex h-9 px-4 font-normal"
              render={<a href={auth.login.url}>{auth.login.title}</a>}
            />

            <Sheet>
              <SheetTrigger render={<Button variant="outline" size="icon" className="h-9 w-9" />}>
                <Menu className="size-5" />
              </SheetTrigger>

              {/* Glassmorphism Mobile Drawer */}
              <SheetContent
                className="w-full max-w-xs border-l border-border/40 bg-background/90 backdrop-blur-xl p-6"
              >
                <SheetHeader className="text-left border-b border-border/40 pb-4">
                  <SheetTitle className="flex items-center gap-2 font-medium">
                    <AitLogo />
                    <span>{logo.title}</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col justify-between h-[calc(100vh-8rem)] pt-6">
                  <Accordion className="w-full space-y-1">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-2.5 pt-6 border-t border-border/40">
                    <Button
                      variant="outline"
                      className="w-full h-10 font-normal"
                      render={<a href={auth.login.url}>{auth.login.title}</a>}
                    />
                    <Button
                      className="w-full h-10 font-medium"
                      render={<a href={auth.signup.url}>{auth.signup.title}</a>}
                    />
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
        <NavigationMenuContent className="p-2 md:w-[380px] lg:w-[440px] bg-popover/95 backdrop-blur-md border border-border/50 shadow-lg rounded-xl">
          <ul className="grid gap-1.5 p-1.5">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink
                  render={
                    <a
                      className="flex select-none gap-3 rounded-lg p-2.5 leading-none no-underline outline-none transition-colors hover:bg-muted/60 focus:bg-muted/60"
                      href={subItem.url}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/60">
                        {subItem.icon}
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium leading-none text-foreground">
                          {subItem.title}
                        </div>
                        {subItem.description && (
                          <p className="line-clamp-2 text-xs leading-normal text-muted-foreground font-normal pt-1">
                            {subItem.description}
                          </p>
                        )}
                      </div>
                    </a>
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
      <a
        href={item.url}
        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3.5 py-2 text-sm font-normal text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/40 focus:bg-muted/40 focus:outline-none"
      >
        {item.title}
      </a>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-2.5 text-sm font-normal text-foreground hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="pt-1 pb-2">
          <div className="flex flex-col space-y-1 pl-2 border-l border-primary/20">
            {item.items.map((subItem) => (
              <a
                key={subItem.title}
                href={subItem.url}
                className="flex items-center gap-3 rounded-md p-2 text-xs font-normal text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {subItem.icon}
                <span>{subItem.title}</span>
              </a>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <div key={item.title} className="py-2">
      <Link href={item.url} className="text-sm font-normal text-foreground block hover:text-primary transition-colors">
        {item.title}
      </Link>
    </div>
  );
};

export { Navbar };