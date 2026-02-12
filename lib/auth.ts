import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const ADMIN_COOKIE = "admin_token";
const TOKEN_VALUE = "authenticated";

/** Check password against the env var and return whether it matches */
export function verifyPassword(password: string): boolean {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) return false;
    return password === expected;
}

/** Set the admin auth cookie */
export async function setAuthCookie(): Promise<void> {
    const store = await cookies();
    store.set(ADMIN_COOKIE, TOKEN_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
    });
}

/** Clear the admin auth cookie */
export async function clearAuthCookie(): Promise<void> {
    const store = await cookies();
    store.delete(ADMIN_COOKIE);
}

/** Check if the current request is authenticated (for API routes) */
export function isAuthenticatedFromRequest(req: NextRequest): boolean {
    const cookie = req.cookies.get(ADMIN_COOKIE);
    return cookie?.value === TOKEN_VALUE;
}

/** Check if the current cookies indicate authentication (for server components / route handlers) */
export async function isAuthenticated(): Promise<boolean> {
    const store = await cookies();
    const cookie = store.get(ADMIN_COOKIE);
    return cookie?.value === TOKEN_VALUE;
}
