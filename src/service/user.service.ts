/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { IUpdateProfile } from "@/interface/updateProfile.interface";
import { env } from "@/lib/env";
import { cookies } from "next/headers";

const AUTH_URL = env.BACKEND_URL

export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": allCookies,
                },
                credentials: "include",
                cache: "no-store",
            });

            if (!res.ok) {
                return { data: null, error: "Failed to fetch session" };
            }

            const session = await res.json();
            return { data: session, error: null };
        } catch (error) {
            return { data: null, error: "Something Went Wrong" };
        }
    },
    // updateProfile: async function (userId: string, payload: IUpdateProfile) {
    //     try {
    //         const cookieStore = await cookies();
    //         const sessionToken = cookieStore.get("better-auth.session_token")?.value;
    //         const accessToken = cookieStore.get("accessToken")?.value;

    //         const res = await fetch(`${AUTH_URL}/api/v1/auth/update-profile/${userId}`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Cookie": `better-auth.session_token=${sessionToken}; accessToken=${accessToken}`,
    //             },
    //             body: JSON.stringify(payload),
    //             cache: "no-store",
    //         });

    //         const result = await res.json();
    //         if (!res.ok) return { success: false, error: result.message || "Failed to update idea" };
    //         return { success: true, data: result.data, error: null };
    //     } catch (error) {
    //         return { success: false, error: "Something Went Wrong" };
    //     }
    // },
}
