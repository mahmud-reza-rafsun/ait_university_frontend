/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/lib/env";
import { cookies } from "next/headers";

const AUTH_URL = env.BACKEND_URL;

export const authService = {
    loginUser: async ({ email, password }: { email: string; password: string }) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${AUTH_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
                body: JSON.stringify({ email, password }),
            });

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                return {
                    data: null,
                    error: "Server returned an invalid response. Please try again later.",
                };
            }

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: result.message || "Invalid email or password.",
                };
            }
            const accessToken = result.data?.accessToken || result.accessToken;
            if (accessToken) {
                cookieStore.set("accessToken", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/",
                });
            }
            const sessionToken =
                result.data?.sessionToken ||
                result.data?.token ||
                result.sessionToken;

            if (sessionToken) {
                cookieStore.set("better-auth.session_token", sessionToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/",
                });
                cookieStore.set("better_auth.session_token", sessionToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/",
                });
            }

            const setCookieHeader = res.headers.get("set-cookie");
            if (setCookieHeader) {
                const cookiesList = setCookieHeader.split(/,(?=[^;]+;)/);
                for (const cookieStr of cookiesList) {
                    const [nameValue] = cookieStr.split(";");
                    const [name, ...valueParts] = nameValue.split("=");
                    const value = valueParts.join("=");
                    if (name && value) {
                        cookieStore.set(name.trim(), value.trim(), {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                            sameSite: "lax",
                            path: "/",
                        });
                    }
                }
            }

            return { data: result.data, error: null };
        } catch (error) {
            return {
                data: null,
                error: "Unable to connect to server. Please check your network connection.",
            };
        }
    },
};
