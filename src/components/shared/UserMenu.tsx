"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    User,
    Settings,
    Bell,
    HelpCircle,
    LogOut,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface UserMenuProps {
    user: {
        name: string;
        email: string;
        image?: string;
    };
    onLogout?: () => void | Promise<void>;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
    const router = useRouter();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const handleConfirmLogout = async () => {
        if (onLogout) {
            await onLogout();
        }
        setShowLogoutDialog(false);
    };

    const menuItems = [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Profile", href: "/profile", icon: User },
        { label: "Settings", href: "/settings", icon: Settings },
        { label: "Notifications", href: "/notifications", icon: Bell },
        { label: "Help & Support", href: "/support", icon: HelpCircle },
    ];

    return (
        <>
            <DropdownMenu>
                {/* Directly using Avatar inside Trigger prevents nested button crash in Base UI */}
                <DropdownMenuTrigger className="relative h-10 w-10 rounded-full outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end">
                    {/* User Information Header */}
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none truncate">
                                {user.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground truncate">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {/* Navigation Items */}
                    <DropdownMenuGroup>
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <DropdownMenuItem
                                    key={item.href}
                                    onClick={() => router.push(item.href)}
                                    className="flex w-full items-center cursor-pointer"
                                >
                                    <Icon className="mr-2 h-4 w-4" />
                                    <span>{item.label}</span>
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    {/* Logout Action */}
                    <DropdownMenuItem
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                        onSelect={(e) => {
                            e.preventDefault();
                            setShowLogoutDialog(true);
                        }}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Logout Confirmation Dialog */}
            <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will need to sign in again to access your account dashboard and personal settings.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmLogout}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Logout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
