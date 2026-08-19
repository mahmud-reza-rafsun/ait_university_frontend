import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react';
import React from 'react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = React.useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle("dark");
    };
    return (
        <div>
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="rounded-full h-9 w-9 text-muted-foreground cursor-pointer hover:text-foreground"
            >
                {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
        </div>
    )
}
