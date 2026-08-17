import { NextRequest, NextResponse } from "next/server";
import { userService } from "./service/user.service";
import { roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    try {
        const { data } = await userService.getSession();
        const role = data?.role;

        const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";
        const isProtectedRoute = pathname.startsWith("/lesson") || pathname.startsWith("/dashboard");

        if (data && isAuthRoute) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        if (!data && isProtectedRoute) {
            const loginUrl = new URL("/sign-in", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }

        if (pathname.startsWith("/dashboard") && role) {
            const allowedDashboardRoles = [
                roles.super_admin,
                roles.professor,
                roles.administrator,
                roles.student,
            ];

            if (!allowedDashboardRoles.includes(role)) {
                return NextResponse.redirect(new URL("/unauthorized", request.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
}

export const config = {
    matcher: [
        "/sign-in",
        "/sign-up",
        "/lesson",
        "/lesson/:path*",
        "/dashboard",
        "/dashboard/:path*",
    ],
};
