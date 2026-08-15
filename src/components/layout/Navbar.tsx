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

// Custom SVG Logo for AIT
const AitLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 400 300"
    className={cn("h-8 w-auto fill-primary", className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 132 96 A 110 110 0 0 1 268 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="11"
      strokeLinecap="round"
    />
    <path
      d="M 134 204 A 110 110 0 0 0 266 204"
      fill="none"
      stroke="currentColor"
      strokeWidth="11"
      strokeLinecap="round"
    />
    <path d="M 158 102 L 106 198 L 138 198 L 158 160 L 178 198 L 198 198 Z" />
    <polygon points="158,128 144,154 172,154" />
    <polygon points="204,116 220,102 220,198 204,198" />
    <polygon points="230,102 295,102 295,120 271,120 271,198 254,198 254,120 230,120" />
  </svg>
);

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const defaultMenu: MenuItem[] = [
  { title: "Home", url: "#" },
  {
    title: "Academics",
    url: "#",
    items: [
      {
        title: "Undergraduate Programs",
        description: "Explore bachelor degree options across technology and science",
        icon: <GraduationCap className="size-5 shrink-0 text-primary" />,
        url: "#",
      },
      {
        title: "Postgraduate & Research",
        description: "Master’s, PhD, and advanced research facilities",
        icon: <BookOpen className="size-5 shrink-0 text-primary" />,
        url: "#",
      },
      {
        title: "Faculty & Schools",
        description: "Discover our academic departments and world-class faculty",
        icon: <Landmark className="size-5 shrink-0 text-primary" />,
        url: "#",
      },
    ],
  },
  {
    title: "Admissions",
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
    <section className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Layout */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Left Side Logo */}
          <a href={logo.url} className="flex items-center gap-3 group">
            <AitLogo className="transition-transform duration-200 group-hover:scale-105" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              {logo.title}
            </span>
          </a>

          {/* Right Side Items + Theme Toggle + Auth Buttons */}
          <div className="flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="h-5 w-px bg-border" />

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="rounded-full"
              >
                {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                render={<a href={auth.login.url}>{auth.login.title}</a>}
              />
              <Button
                size="sm"
                render={<a href={auth.signup.url}>{auth.signup.title}</a>}
              />
            </div>
          </div>
        </nav>

        {/* Mobile & Tablet Layout */}
        <div className="flex items-center justify-between lg:hidden">
          <a href={logo.url} className="flex items-center gap-2">
            <AitLogo />
            <span className="text-lg font-bold tracking-tight">{logo.title}</span>
          </a>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
              render={<a href={auth.login.url}>{auth.login.title}</a>}
            />

            <Sheet>
              <SheetTrigger render={<Button variant="outline" size="icon" />}>
                <Menu className="size-5" />
              </SheetTrigger>

              {/* Glassmorphism Mobile Drawer */}
              <SheetContent
                className="w-full max-w-xs border-l border-white/20 bg-background/80 backdrop-blur-md backdrop-saturate-150 p-6 dark:bg-background/80"
              >
                <SheetHeader className="text-left border-b pb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <AitLogo />
                    <span>{logo.title}</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col justify-between h-[calc(100vh-8rem)] pt-6">
                  <Accordion className="w-full space-y-2">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      className="w-full"
                      render={<a href={auth.login.url}>{auth.login.title}</a>}
                    />
                    <Button
                      className="w-full"
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
        <NavigationMenuTrigger className="bg-transparent font-medium hover:bg-accent/50">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="p-2 md:w-[400px] lg:w-[500px] bg-popover/95 backdrop-blur-md shadow-lg border">
          <ul className="grid gap-2 p-2">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink
                  render={
                    <a
                      className="flex select-none gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent"
                      href={subItem.url}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background">
                        {subItem.icon}
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-semibold leading-none text-foreground">
                          {subItem.title}
                        </div>
                        {subItem.description && (
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
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
        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:outline-none"
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
        <AccordionTrigger className="py-2 text-base font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="pt-2 pb-0">
          <div className="flex flex-col space-y-2 pl-2 border-l-2 border-primary/20">
            {item.items.map((subItem) => (
              <a
                key={subItem.title}
                href={subItem.url}
                className="flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-accent transition-colors"
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
      <a href={item.url} className="text-base font-semibold block hover:text-primary">
        {item.title}
      </a>
    </div>
  );
};

export { Navbar };