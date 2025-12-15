import { NextRequest } from "next/server";

// Hardcoded secret key for prototype
// In production, use process.env.API_SECRET_KEY
const API_SECRET_KEY = process.env.API_SECRET_KEY || "finsight-secret-123";
const INTERNAL_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
// Automatically detect Vercel URL (System Env Var)
const VERCEL_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;

export function validateRequest(request: NextRequest): { isValid: boolean; error?: string; status?: number } {
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const apiKey = request.headers.get("x-api-key");
    const authHeader = request.headers.get("authorization"); // Support Bearer too

    // 1. Internal Access Check
    // Check if Origin or Referer matches our internal URL or Vercel URL
    if (origin) {
        if (origin.startsWith(INTERNAL_URL)) return { isValid: true };
        if (VERCEL_URL && origin.startsWith(VERCEL_URL)) return { isValid: true };
        // Allow Vercel preview URLs broadly if strict check fails? 
        // For now, VERCEL_URL logic handles the current deployment.
    }

    if (referer) {
        if (referer.startsWith(INTERNAL_URL)) return { isValid: true };
        if (VERCEL_URL && referer.startsWith(VERCEL_URL)) return { isValid: true };
    }

    // 2. External Access Check (API Key)
    // Support both x-api-key header AND Authorization: Bearer <key>
    let providedKey = apiKey;

    if (!providedKey && authHeader && authHeader.startsWith("Bearer ")) {
        providedKey = authHeader.split(" ")[1];
    }

    if (providedKey === API_SECRET_KEY) {
        return { isValid: true };
    }

    // Failed
    return {
        isValid: false,
        error: "Unauthorized: Invalid or missing API Key.",
        status: 401
    };
}
