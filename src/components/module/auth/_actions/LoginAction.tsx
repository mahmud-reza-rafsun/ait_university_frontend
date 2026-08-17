/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { authService } from "@/service/auth.service";

export async function LoginAction(email: string, password: string) {
    try {
        const res = await authService.loginUser({ email, password });

        if (res.error) {
            return { success: false, error: res.error };
        }

        return { success: true, data: res.data };
    } catch (error) {
        return {
            success: false,
            error: "An unexpected error occurred. Please try again.",
        };
    }
}
