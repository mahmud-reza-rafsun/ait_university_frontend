import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ provider: string }> }
) {
    const { provider } = await params;
    const redirect = req.nextUrl.searchParams.get("redirect") || "/";

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/${provider}/success?redirect=${encodeURIComponent(redirect)}`;

    const cookies = req.headers.get("cookie") || "";

    return NextResponse.redirect(backendUrl, {
        headers: { cookie: cookies },
    });
}
